import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Row, Col, Tooltip, Button, Rate, Spin } from 'antd';
import objectFitImages from 'object-fit-images';
import { connect } from 'react-redux';
import moment from 'moment-jalali';
import Questions from '../../components/Questions/Questions';
import Autocomplete from '../../components/Kit/AutoComplete/AutoComplete';
import styles from './Service.module.styl';
import { load } from '../../redux/modules/serviceContainer';
import { load as loadProfessionts } from '../../redux/modules/proficients';
import ProfessionalCard from '../../components/professionalCard/professionalCard';
import { commaSeprator } from '../../utils/helpers';

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
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        professionsJobs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired,
        loadedComplete: PropTypes.bool.isRequired,
        loadMoreProfessiontsConnect: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired,
        paginationEnded: PropTypes.bool.isRequired,

    };

    sliderOptions = {
        lazyLoad: 1,
        rightToLeft: true,
        cellAlign: 'center',
        contain: true,
        groupCells: '100%',
        pageDots: false,
        prevNextButtons: true,
        adaptiveHeight: true
    };

    state = {
        showQuestions: false
    };

    formatJobDate = (date) => {
        return moment(date).format(' jD jMMMM jYYYY');
    };

    registerProject = () => {
        this.setState({
            showQuestions: true
        });
    };

    onProvinceSelect = (value, option) => {
        // console.log('onSubmit', value, option);
    };

    getProfessionPrice = () => {
        const { priceBase, priceRange } = this.props.selectedProfession;
        if (priceRange && !priceRange.min) {
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
    componentDidMount() {
        const { location } = this.props;
        const title = location.pathname.split('/').reverse()[0].split('_').join(' ');
        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect(null, null, location.query, title);
        }
        objectFitImages();
    }

    render() {
        const { title, selectedProfession, count, provinces, professionsJobs, loadedComplete, fetching, paginationEnded } = this.props;
        const { showQuestions } = this.state;
        const proficients = this.props.proficients.reduce((acc, cur) => {
            const profession = cur.professions.find(prof => prof.profession === selectedProfession._id);
            acc.push({ ...cur, profession });
            return acc;
        }, []);

        return (
            <div className={styles.wrapper}>
                {
                    showQuestions ?
                        <Questions professionId={this.props.selectedProfession._id} onClose={this.handleClose} /> : null
                }
                {
                    loadedComplete && proficients.length > 0
                        ? <div>
                            <div className={styles.hero}>
                                <div className={styles.heroBg}>
                                    <img src="https://chibaki.ir/assets/images/hero/architect.jpg" alt="Smiley face" />
                                </div>
                                <div className={styles.heroContent}>
                                    <div>
                                        <h1 className={styles.heroTitle}>{title}</h1>
                                        <Button type="primary" size="large" onClick={this.registerProject}>
                                            ثبت درخواست
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.container}>

                                <div className={styles.price}>
                                    شروع قیمت در چی باکی:
                                    {this.getProfessionPrice()}
                                </div>

                                <div className={styles.desc}>
                                    {selectedProfession.description}
                                </div>

                                <div className={`${styles.section} u-t--c`}>
                                    <div style={{ display: 'none' }}>
                                        <div>استان خود را انتخاب کنید</div>
                                        <div>
                                            <Autocomplete
                                                options={provinces.map((province) => {
                                                    province.title = province.name;
                                                    return province;
                                                })}
                                                onSubmit={this.onProvinceSelect}
                                                showBtn={false}
                                                placeholder="انتخاب استان"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button className="c-btn c-btn--primary c-btn--lg" onClick={this.registerProject}>
                                            ثبت درخواست
                                        </button>

                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <h1 className={styles.title}>
                                            متخصصین {title} در چی باکی ({count} متخصص)
                                        </h1>
                                        <div className={styles.subtitle}>نمایش تصادفی</div>
                                    </div>
                                    <div className={styles.cardWrapper}>
                                        {proficients.map((item) => {
                                            return <ProfessionalCard item={item} />;
                                        })}
                                    </div>
                                    <div className="u-t--c">
                                        {!paginationEnded
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

                                {
                                    professionsJobs && professionsJobs.length ?
                                        <div>
                                            <div>
                                                <div className={styles.title}>درخواست‌های مشابه ثبت شده در چی‌با‌کی</div>
                                                <div className={styles.subtitle}>{selectedProfession.title}</div>
                                            </div>
                                            <Flickity options={this.sliderOptions} className={styles.jobCardWrapper}>
                                                {professionsJobs.map((job) => {
                                                    return (
                                                        <div key={job._id} className={styles.jobCard}>
                                                            <div className={styles.jobCardDate}>
                                                                ثبت شده در تاریخ
                                                                {this.formatJobDate(job.createdAt)}
                                                            </div>
                                                            <div className={styles.jobCardRow}>
                                                                <div className={styles.jobCardTitle}>
                                                                    {this.exist(job, 'location.province.name') ? job.location.province.name : '-'}
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

                            </div>

                        </div>
                        : null
                }
            </div>
        );
    }
}

export default connect(state => ({
    proficients: state.proficients.proficients,
    title: state.proficients.title,
    selectedProfession: state.proficients.selectedProfession,
    count: state.proficients.count,
    provinces: state.provinces.provinces,
    professionsJobs: state.ProjectsForProfession.ProjectsForProfession,
    loadedComplete: state.serviceContainer.loaded,
    fetching: state.proficients.fetching,
    paginationEnded: state.proficients.paginationEnded
}), {
    loadConnect: load,
    loadMoreProfessiontsConnect: loadProfessionts
})(Services);
