import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Spin, Popover } from 'antd';
import { Helmet } from 'react-helmet';
import objectFitImages from 'object-fit-images';
import { connect } from 'react-redux';
import moment from 'moment-jalali';
import {
    TelegramIcon,
    TelegramShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import queryString from 'query-string';
import { toggleAuthModal } from '../../redux/modules/auth';
import Questions from '../../components/Questions/Questions';
import Autocomplete from '../../components/Kit/AutoComplete/AutoComplete';
import styles from './Service.module.styl';
import { load } from '../../redux/modules/serviceContainer';
import { load as loadProfessionts } from '../../redux/modules/proficients';
import { setAnswer, clearAnswers } from '../../redux/modules/questions';
import ProfessionalCard from '../../components/professionalCard/professionalCard';
import { commaSeprator } from '../../utils/helpers';
import Loader from '../../components/Kit/Loader/Loader';
import { profilePath } from '../../config';
import { redirect as redirectMethod } from '../../redux/modules/redirect';

const SHOULD_INIT_SLIDER = typeof window !== 'undefined' && window.innerWidth > 350;
const Flickity = SHOULD_INIT_SLIDER ? require('react-flickity-component') : 'div';
require('flickity/dist/flickity.min.css');

class Services extends Component {
    static propTypes = {
        selectedProfession: PropTypes.objectOf(PropTypes.any).isRequired,
        childProfession: PropTypes.objectOf(PropTypes.any).isRequired,
        relatedProfessions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        proficients: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        count: PropTypes.number.isRequired,
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        redirect: PropTypes.objectOf(PropTypes.any).isRequired,
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        professionsJobs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired,
        setAnswerConnect: PropTypes.func.isRequired,
        clearAnswersConnect: PropTypes.func.isRequired,
        loadedComplete: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        loadMoreProfessiontsConnect: PropTypes.func.isRequired,
        fetching: PropTypes.bool.isRequired,
        paginationEnded: PropTypes.bool.isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired,
        match: PropTypes.objectOf(PropTypes.any).isRequired,
        toggleAuth: PropTypes.func.isRequired,
        redirectConnect: PropTypes.func.isRequired,
        user: PropTypes.objectOf(PropTypes.any).isRequired
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
        const params = queryString.parse(location.search);

        if (value) {
            return provinces.find(province => province.name === value);
        }
        if (params && params.province) {
            return provinces.find(province => province.name === params.province);
        }
        return {};
    };

    onProvinceSelect = (value) => {
        const { history, location, match } = this.props;
        const provinceValue = this.getProvinceObjByName(this.props, value);
        this.setState({
            provinceValue
        });
        this.props.setAnswerConnect('location', { province: provinceValue });
        history.push(`${decodeURI(location.pathname)}?province=${value}`);
        this.props.loadConnect(null, null, { province: value }, this.getProfessionIdAndTitle());
    };

    getProfessionPrice = () => {
        const {
            selectedProfession,
            childProfession
        } = this.props;
        let { priceBase, priceRange } = selectedProfession;

        if (childProfession && childProfession.priceRange && childProfession.priceBase) {
            priceBase = childProfession.priceBase;
            priceRange = childProfession.priceRange;
        }

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

    sharePopover = () => {
        const { match } = this.props;
        const url = typeof window !== 'undefined' ? window.location.href : 'h';
        const desc = `اگر در ${match.params.title} تخصص دارید به جمع متخصصین چی باکی بپیوندید`;
        const size = 35;
        return (
            <div className={styles.popoverShareWrapper}>
                <div className={styles.popoverShareHeading}>اشتراک گذاری در:</div>
                <div className={styles.popoverShareBody}>
                    <TelegramShareButton className={styles.popoverShareBtn} url={url} title={desc}>
                        <TelegramIcon size={size} round fill />
                    </TelegramShareButton>
                    <LinkedinShareButton className={styles.popoverShareBtn} url={url} title={desc}>
                        <LinkedinIcon size={size} round fill />
                    </LinkedinShareButton>
                    <TwitterShareButton className={styles.popoverShareBtn} url={url} title={desc}>
                        <TwitterIcon size={size} round fill />
                    </TwitterShareButton>
                    <WhatsappShareButton className={styles.popoverShareBtn} url={url} title={desc}>
                        <WhatsappIcon size={size} round fill />
                    </WhatsappShareButton>
                </div>
            </div>
        );
    };

    handleClose = () => {
        this.setState({
            showQuestions: false
        });
    };

    more = () => {
        const { match, selectedProfession } = this.props;

        this.props.loadMoreProfessiontsConnect(
            selectedProfession._id,
            match.params.title,
            {
                parent: selectedProfession
            },
            null,
            true
        );
    };

    handleAutoCompleteChange = (value) => {
        const { provinceValue } = this.state;
        if (provinceValue && provinceValue.name) {
            this.setState({
                provinceValue: {}
            });
        }
    };

    getTitle = () => {
        const { match } = this.props;
        const titleArray = match.params.title.split('-');
        titleArray.pop();
        return titleArray.join(' ');
    };
    getProfessionIdAndTitle = () => {
        const { match } = this.props;
        const routeTitleArray = match.params.title.split('-');
        return {
            _id: routeTitleArray.pop(),
            title: routeTitleArray.join(' ')
        };
    };

    componentWillMount() {
        const provinceValue = this.getProvinceObjByName(this.props);
        this.state.provinceValue = provinceValue;
        this.props.setAnswerConnect('location', { province: provinceValue });
    }

    componentDidMount() {
        const { location, redirect, history, redirectConnect } = this.props;
        console.log(redirect, ' this is redirect');
        if (redirect && redirect.shouldRedirect) {
            redirectConnect(history);
        }
        const params = queryString.parse(location.search);

        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect(null, null, params, this.getProfessionIdAndTitle());
        }
        objectFitImages();
        this.setState({
            jobCardClass: ''
        }, () => {
            if (this.jobCardFlickity) {
                this.jobCardFlickity.on('ready', () => {
                    this.setState({
                        jobCardClass: styles.jobCardFull
                    });
                });
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { location, match } = this.props;
        const params = queryString.parse(location.search);

        if (prevProps.match.params.title !== match.params.title) {
            if (window && window.__renderType__ === 'client') {
                this.props.loadConnect(null, null, params, this.getProfessionIdAndTitle());
            }
        }
        return this.props;
    }

    componentWillUnmount() {
        this.props.clearAnswersConnect();
    }

    render() {
        const {
            selectedProfession,
            childProfession,
            relatedProfessions,
            count,
            provinces,
            professionsJobs,
            loadedComplete,
            loading,
            fetching,
            paginationEnded,
            toggleAuth,
            user
        } = this.props;
        const { showQuestions, provinceValue } = this.state;
        const proficients = this.props.proficients.reduce((acc, cur) => {
            const profession = cur.professions.find(prof => prof.profession === selectedProfession._id);
            acc.push({ ...cur, profession });
            return acc;
        }, []);
        const title = this.getTitle();

        return (
            <div className={styles.wrapper}>
                <Helmet>
                    <title>
                        {
                            `چی باکی - ${title} ${provinceValue && provinceValue.name ? `در ${provinceValue.name}` : ''} - Chibaki`
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
                                {title}
                                {(provinceValue && provinceValue.name) && <div className={styles.heroTitleCity}>
                                    {`در ${provinceValue.name}`}
                                </div>}
                            </h1>
                            <div>
                                <button
                                    className={styles.heroBtn}
                                    onClick={this.registerProject}
                                    autoFocus
                                >
                                    دریافت رایگان قیمت
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
                        childProfession && childProfession.description
                            ? <div className={styles.desc}>
                                {childProfession.description}
                            </div>
                            : (selectedProfession && selectedProfession.description) &&
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
                                            متخصصین {title} در {provinceValue && provinceValue.name ? provinceValue.name : 'چی باکی'} ({count} متخصص)
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
                                :
                                <div
                                    className={styles.noProficients}
                                >
                                    <div
                                        className={styles.noProficientsText}
                                    >
                                        هنوز متخصصی در این زمینه وجود ندارد.
                                        اگر در این زمینه تخصص دارید به جمع ما بپیوندید
                                        یا چی‌باکی را به دوستان خود معرفی کنید.
                                    </div>
                                    <div>
                                        {
                                            user &&
                                            user._id ?
                                                <a
                                                    className="c-btn c-btn--primary c-btn--md"
                                                    href={profilePath}
                                                >
                                                    ورود به پروفایل
                                                </a> :
                                                <button
                                                    className="c-btn c-btn--primary c-btn--md"
                                                    onClick={toggleAuth}
                                                >
                                                    ثبت نام متخصص
                                                </button>
                                        }
                                        <Popover
                                            content={this.sharePopover()}
                                            trigger={'click'}
                                        >
                                            <button
                                                className="c-btn c-btn--primary c-btn--md"
                                            >
                                                <span className="icon-share" />
                                                اشتراک گذاری این فرصت
                                            </button>
                                        </Popover>
                                    </div>
                                </div>
                            }

                            {
                                professionsJobs && professionsJobs.length > 3 ?
                                    <div>
                                        <div>
                                            <div className={styles.title}>آخرین درخواست‌های مشابه در چی‌با‌کی</div>
                                            <div className={styles.subtitle}>{title}</div>
                                        </div>
                                        <Flickity
                                            options={this.sliderOptions}
                                            className={styles.jobCardWrapper}
                                            flickityRef={(c) => {
                                                this.jobCardFlickity = c;
                                                c.on('ready', () => {
                                                    this.setState({ jobCardClass: '' }, () => {
                                                        this.setState({
                                                            jobCardClass: styles.jobCardFull
                                                        });
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
                                                            <div className={styles.jobCardSub}>شهر</div>
                                                            <div className={styles.jobCardTitle}>
                                                                {this.exist(job, 'location.province.name') ? `${job.location.province.name}، ` : '-'}
                                                                {this.exist(job, 'location.city.name') ? job.location.city.name : '-'}
                                                            </div>
                                                        </div>

                                                        {job.attributes.map((attr) => {
                                                            return (
                                                                <div className={styles.jobCardRow}>
                                                                    <div
                                                                        className={styles.jobCardSub}
                                                                    >{attr.title}</div>
                                                                    <div className={styles.jobCardTitle}>
                                                                        {attr.text || attr.options.join(' ')}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </Flickity>
                                    </div> : null
                            }
                            <div className={styles.sectionCTA}>
                                <button className="c-btn c-btn--primary c-btn--md" onClick={this.registerProject}>
                                    دریافت رایگان قیمت
                                </button>
                            </div>

                            <div className={styles.sectionRelated}>
                                <div>
                                    <div className={styles.title}>خدمات مرتبط در چی‌با‌کی</div>
                                    <div className={styles.subtitle}>{title}</div>
                                </div>
                                <div className={styles.relatedLinkWrapper}>
                                    {relatedProfessions.map((profession) => {
                                        return (
                                            <div>
                                                <Link
                                                    to={`/${encodeURI('خدمات')}/${profession.title.split(' ').join('-')}-${profession._id}`}
                                                    className={styles.relatedLink}
                                                >
                                                    {profession.title}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>}

                </div>

                <div className={styles.heroBtnFixedWrapper}>
                    <button
                        className={`${styles.heroBtn} ${styles.heroBtnFixed}`}
                        onClick={this.registerProject}
                    >
                        دریافت رایگان قیمت
                    </button>
                </div>
            </div>
        );
    }
}

export const connectedServices = connect(state => ({
    proficients: state.proficients.proficients,
    selectedProfession: state.proficients.selectedProfession,
    childProfession: state.proficients.childProfession,
    relatedProfessions: state.serviceContainer.relatedProfessions,
    answers: state.questions.answers,
    count: state.proficients.count,
    provinces: state.provinces.provinces,
    professionsJobs: state.ProjectsForProfession.ProjectsForProfession,
    loadedComplete: state.serviceContainer.loaded,
    loading: state.serviceContainer.loading,
    fetching: state.proficients.fetching,
    paginationEnded: state.proficients.paginationEnded,
    user: state.auth.user,
    redirect: state.redirect
}), {
    loadConnect: load,
    loadMoreProfessiontsConnect: loadProfessionts,
    setAnswerConnect: setAnswer,
    clearAnswersConnect: clearAnswers,
    toggleAuth: toggleAuthModal,
    redirectConnect: redirectMethod
})(Services);

export default withRouter(connectedServices);
