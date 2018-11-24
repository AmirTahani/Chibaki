import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Row, Col, Tooltip, Button, Rate, Spin, Icon } from 'antd';
import { Helmet } from 'react-helmet';
import objectFitImages from 'object-fit-images';
import { connect } from 'react-redux';
import moment from 'moment-jalali';
import Questions from '../../components/Questions/Questions';
import Autocomplete from '../../components/Kit/AutoComplete/AutoComplete';
import styles from './Service.module.styl';
import { load } from '../../redux/modules/serviceContainer';
import { load as loadProfessionts } from '../../redux/modules/proficients';
import { setAnswer, clearAnswers } from '../../redux/modules/questions';
import ProfessionalCard from '../../components/professionalCard/professionalCard';
import { commaSeprator } from '../../utils/helpers';
import Loader from '../../components/Kit/Loader/Loader';

const SHOULD_INIT_SLIDER = typeof window !== 'undefined' && window.innerWidth > 350;
const Flickity = SHOULD_INIT_SLIDER ? require('react-flickity-component') : 'div';
require('flickity/dist/flickity.min.css');

class Services extends Component {
    static propTypes = {
        selectedProfession: PropTypes.objectOf(PropTypes.any).isRequired,
        proficients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        router: PropTypes.objectOf(PropTypes.any).isRequired,
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        professionsJobs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired,
        setAnswerConnect: PropTypes.func.isRequired,
        clearAnswersConnect: PropTypes.func.isRequired,
        loadedComplete: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        loadMoreProfessiontsConnect: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired,
        paginationEnded: PropTypes.bool.isRequired
    };

    sliderOptions = {
        lazyLoad: 1,
        rightToLeft: true,
        cellAlign: 'center',
        contain: true,
        groupCells: '100%',
        pageDots: false,
        prevNextButtons: true
    };

    state = {
        showQuestions: false,
        jobCardClass: '',
        provinceValue: {}
    };

    formatJobDate = (date) => {
        return moment(date).format(' jD jMMMM jYYYY');
    };

    registerProject = () => {
        this.setState({
            showQuestions: true
        });
    };

    getProvinceObjByName = (props, value) => {
        const { location, provinces } = props;
        if (value) {
            return provinces.find(province => province.name === value);
        }
        if (this.exist(location, 'query.province')) {
            return provinces.find(province => province.name === location.query.province);
        }
        return {};
    };

    onProvinceSelect = (value) => {
        const { router } = this.props;
        const provinceValue = this.getProvinceObjByName(this.props, value);
        this.setState({
            provinceValue
        });
        this.props.setAnswerConnect('location', { province: provinceValue });
        router.push(`${decodeURI(router.getCurrentLocation().pathname)}?province=${value}`);
        this.props.loadConnect(null, null, { province: value }, router.params.title);
    };

    getProfessionPrice = () => {
        const { priceBase, priceRange } = this.props.selectedProfession;
        if (!priceRange || !priceRange.min) {
            return '';
        }

        let unit;
        switch (priceBase) {
            case 'Second':
                unit = 'ثانیه ای';
                break;
            case 'Hour':
                unit = 'ساعتی';
                break;
            case 'Day':
                unit = 'روزی';
                break;
            case 'Month':
                unit = 'ماهی';
                break;
            case 'Session':
                unit = 'جلسه ای';
                break;
            case 'Project':
                unit = 'پروژه ای';
        }
        return ` از ${unit} ${commaSeprator(priceRange.min)} تومان`;
    };

    handleClose = () => {
        this.setState({
            showQuestions: false
        });
    };

    more = () => {
        const { title, selectedProfession } = this.props;
        this.props.loadMoreProfessiontsConnect(selectedProfession._id, title, selectedProfession, null, true);
    };

    handleAutoCompleteChange = (value) => {
        const { provinceValue } = this.state;
        if (provinceValue && provinceValue.name) {
            this.setState({
                provinceValue: {}
            });
        }
    };

    componentWillMount() {
        const provinceValue = this.getProvinceObjByName(this.props);
        this.state.provinceValue = provinceValue;
        this.props.setAnswerConnect('location', { province: provinceValue });
    }

    componentDidMount() {
        const { location, router } = this.props;
        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect(null, null, location.query, router.params.title);
        }
        objectFitImages();
        if (this.jobCardFlickity) {
            this.jobCardFlickity.on('ready', () => {
                this.setState({
                    jobCardClass: styles.jobCardFull
                });
            });
        }
    }

    componentWillUnmount() {
        this.props.clearAnswersConnect();
    }

    render() {
        const { title, selectedProfession, count, provinces, professionsJobs, loadedComplete, loading, fetching, paginationEnded } = this.props;
        const { showQuestions, provinceValue } = this.state;
        const proficients = this.props.proficients.reduce((acc, cur) => {
            const profession = cur.professions.find(prof => prof.profession === selectedProfession._id);
            acc.push({ ...cur, profession });
            return acc;
        }, []);

        return (
            <div className={styles.wrapper}>
                <Helmet>
                    <title>
                        {
                            `چی باکی - ${title.split('_').join(' ')} ${provinceValue && provinceValue.name ? `در ${provinceValue.name}` : ''} - Chibaki`
                        }
                    </title>
                </Helmet>
                {
                    showQuestions ?
                        <Questions professionId={this.props.selectedProfession._id} onClose={this.handleClose} /> : null
                }
                <div className={styles.hero}>
                    <div className={styles.heroBg} />
                    <div className={styles.heroContent}>
                        <div>
                            <h1 className={styles.heroTitle}>
                                {title.split('_').join(' ')}
                                {(provinceValue && provinceValue.name) && <div className={styles.heroTitleCity}>
                                    {`در ${provinceValue.name}`}
                                </div>}
                            </h1>
                            <div>
                                <button className="c-btn c-btn--white c-btn--lg" onClick={this.registerProject}>
                                    ثبت درخواست
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>

                    <div className={styles.price}>
                        شروع قیمت در چی باکی:
                        {this.getProfessionPrice()}
                    </div>

                    {
                        selectedProfession && selectedProfession.description &&
                        <div className={styles.desc}>
                            {selectedProfession.description}
                        </div>
                    }

                    {loading && !loadedComplete
                        ? <Loader />
                        : <div>
                            <div className={`${styles.section} u-t--c`}>
                                <div className={styles.cityForm}>
                                    <div className={styles.cityFormText}>استان خود را انتخاب کنید</div>
                                    <div>
                                        {provinceValue && provinceValue.name ?
                                            <Autocomplete
                                                valueAs="name"
                                                options={provinces.map((province) => {
                                                    province.title = province.name;
                                                    return province;
                                                })}
                                                defaultValue={provinceValue}
                                                onSubmit={this.onProvinceSelect}
                                                showBtn={false}
                                                placeholder="انتخاب استان"
                                                showOptionsWhenEmpty
                                            /> :
                                            <Autocomplete
                                                valueAs="name"
                                                options={provinces.map((province) => {
                                                    province.title = province.name;
                                                    return province;
                                                })}
                                                onSubmit={this.onProvinceSelect}
                                                showBtn={false}
                                                placeholder="انتخاب استان"
                                                showOptionsWhenEmpty
                                            />
                                        }
                                    </div>
                                </div>
                            </div>

                            {proficients && proficients.length ?
                                <div>
                                    <div>
                                        <h2 className={styles.title}>
                                            متخصصین {title.split('_').join(' ')} در {provinceValue && provinceValue.name ? provinceValue.name : 'چی باکی'} ({count} متخصص)
                                        </h2>
                                        <div className={styles.subtitle}>نمایش تصادفی</div>
                                    </div>
                                    <div className={styles.cardWrapper}>
                                        {proficients.map((item) => {
                                            return <ProfessionalCard key={item._id} professional={item} />;
                                        })}
                                    </div>
                                    <div className="u-t--c">
                                        {!paginationEnded && proficients.length > 8
                                            ? <button className={styles.btnMore} onClick={this.more}>
                                                {fetching
                                                    ? <Spin />
                                                    : <span>نمایش بیشتر</span>
                                                }
                                            </button>
                                            : null
                                        }
                                    </div>
                                </div>
                                : <div>
                                    متخصصی در این خدمت وجود ندارد.
                                </div>
                            }

                            {
                                professionsJobs && professionsJobs.length > 3 ?
                                    <div>
                                        <div>
                                            <div className={styles.title}>آخرین درخواست‌های مشابه در چی‌با‌کی</div>
                                            <div className={styles.subtitle}>{selectedProfession.title}</div>
                                        </div>
                                        <Flickity
                                            options={this.sliderOptions}
                                            className={styles.jobCardWrapper}
                                            flickityRef={(c) => {
                                                this.jobCardFlickity = c;
                                                c.on('ready', () => {
                                                    this.setState({
                                                        jobCardClass: styles.jobCardFull
                                                    });
                                                });
                                            }}
                                        >
                                            {professionsJobs.map((job) => {
                                                return (
                                                    <div
                                                        key={job._id}
                                                        className={`${styles.jobCard} ${this.state.jobCardClass}`}
                                                    >
                                                        <div className={styles.jobCardDate}>
                                                            ثبت شده در تاریخ
                                                            {this.formatJobDate(job.createdAt)}
                                                        </div>
                                                        <div className={styles.jobCardRow}>
                                                            <div className={styles.jobCardTitle}>
                                                                {this.exist(job, 'location.province.name') ? `${job.location.province.name}, ` : '-'}
                                                                {this.exist(job, 'location.city.name') ? job.location.city.name : '-'}
                                                            </div>
                                                            <div className={styles.jobCardSub}>شهر</div>
                                                        </div>

                                                        {job.attributes.map((attr) => {
                                                            return (
                                                                <div className={styles.jobCardRow}>
                                                                    <div className={styles.jobCardTitle}>
                                                                        {attr.text || attr.options.join(' ')}
                                                                    </div>
                                                                    <div
                                                                        className={styles.jobCardSub}
                                                                    >{attr.title}</div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </Flickity>
                                    </div> : null
                            }
                        </div>}

                </div>

            </div>
        );
    }
}

export const connectedServices = connect(state => ({
    proficients: state.proficients.proficients,
    title: state.proficients.title,
    selectedProfession: state.proficients.selectedProfession,
    answers: state.questions.answers,
    count: state.proficients.count,
    provinces: state.provinces.provinces,
    professionsJobs: state.ProjectsForProfession.ProjectsForProfession,
    loadedComplete: state.serviceContainer.loaded,
    loading: state.serviceContainer.loading,
    fetching: state.proficients.fetching,
    paginationEnded: state.proficients.paginationEnded
}), {
    loadConnect: load,
    loadMoreProfessiontsConnect: loadProfessionts,
    setAnswerConnect: setAnswer,
    clearAnswersConnect: clearAnswers
})(Services);

export default withRouter(connectedServices);
