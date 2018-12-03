import React, { Component } from 'react';
import { Col, Divider, Dropdown, Menu, Radio, Rate, Row } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import objectFitImages from 'object-fit-images';
import { Icon } from '../../components/Kit';
import Questions from '../../components/Questions/Questions';
import Comments from '../../components/Professional/Comments';
import { sitePath } from '../../config';
import { setProfId } from '../../redux/modules/questions';
import { load } from '../../redux/modules/professional';
import styles from './Professional.style.module.styl';
import queryString from 'query-string';


class Professional extends Component {
    static propTypes = {
        setProfIdConnect: PropTypes.func.isRequired,
        routeParams: PropTypes.objectOf(PropTypes.any).isRequired,
        professional: PropTypes.objectOf(PropTypes.any).isRequired,
        location: PropTypes.objectOf(PropTypes.any).isRequired,
        comments: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired
    };

    state = {
        selectedProfession: 0,
        showQuestions: false,
        professionId: '',
        tooltipVisible: false
    };

    onProfImageClick = (e) => {
        e.preventDefault();
        this.flkty.viewFullscreen();
    };

    onProfessionChange = (e) => {
        e.preventDefault();
        const { professional, location, match, history } = this.props;
        const params = queryString.parse(location.search);

        const professions = this.exist(professional, 'user.professions');
        const activeProfession = professions.find((profession) => {
            return profession.profession._id === e.target.value;
        });
        history.replace(`${decodeURI(location.pathname)}?id=${params.id}&profId=${e.target.value}`);
        this.setState({
            selectedProfession: activeProfession
        });
    };

    getProfsDropdown = () => {
        const { professions } = this.props.professional.user;

        const profs = professions.map((prof) => {
            return (
                <Menu.Item key={prof._id} onClick={() => this.createProject(prof.profession._id)}>
                    {prof.profession.title}
                </Menu.Item>
            );
        });

        return <Menu>{profs}</Menu>;
    };

    getProfImage = () => {
        const { selectedProfession } = this.state;

        if (this.exist(selectedProfession, 'intro')) {
            return Object.keys(selectedProfession.intro).reduce((acc, current) => {
                if (current.indexOf('photo') >= 0 && selectedProfession.intro[current]) {
                    if (current === 'photos') {
                        acc = selectedProfession.intro[current].map(photo => `${sitePath}${photo.replace('public', '')}`);
                    } else {
                        acc.push(`${sitePath}${selectedProfession.intro[current].replace('public', '')}`);
                    }
                    return acc;
                }
                return acc;
            }, []);
        }
        return [];
    };

    handleClose = () => {
        this.setState({
            showQuestions: false,
            professionId: ''
        });
    };

    requestBtn = (text, icon, classnames = 'c-btn--border c-btn--md') => {
        return this.props.professional.user.professions.length > 1 ? (<Dropdown
            overlay={this.getProfsDropdown()}
            trigger={['click']}
            placement="bottomCenter"
        >
            <button className={`c-btn ${classnames}`}>
                {icon && <span className={`icon-${icon}`} />}
                <span>{text}</span>
            </button>
        </Dropdown>) : (<button
            onClick={
                () => this.createProject(this.props.professional.user.professions[0].profession._id)
            }
            className={`c-btn ${classnames}`}
        >
            {icon && <span className={`icon-${icon}`} />}
            <span>{text}</span>
        </button>);
    };

    createProject = (professionId) => {
        this.setState({
            showQuestions: true,
            professionId
        });
    };

    sliderOptions = {
        fullscreen: true,
        lazyLoad: 1,
        rightToLeft: true,
        cellAlign: 'right',
        groupCells: true,
        pageDots: false,
        prevNextButtons: false,
        index: 0
    };

    Flickity = null;

    copyCallback = () => {
        this.setState({
            tooltipVisible: true
        });
        setTimeout(() => {
            this.setState({
                tooltipVisible: false
            });
        }, 2000);
    };

    // sharePopover = () => {
    //     const url = 'http://chibaki.pro/sepehr';
    //     const size = 42;
    //     return (
    //         <div className={styles.shareBody}>
    //             <div style={{ display: 'none' }}>
    //                 <Tooltip title={'لینک کپی شد'} visible={this.state.tooltipVisible}>
    //                     <CopyToClipboard text={url} onCopy={this.copyCallback}>
    //                         <Input.Group compact className={styles.shareInputGroup}>
    //                             <Input
    //                                 value={url}
    //                                 disabled
    //                                 className={styles.shareInput}
    //                             />
    //                             <Button type={'primary'} icon={'copy'}>کپی</Button>
    //                         </Input.Group>
    //                     </CopyToClipboard>
    //                 </Tooltip>
    //             </div>
    //             <div className={styles.shareBtnHeading}>اشتراک گذاری در:</div>
    //             <div className={styles.shareBtnWrapper}>
    //                 <TelegramShareButton className={styles.shareBtn} url={url}>
    //                     <TelegramIcon size={size} round fill />
    //                 </TelegramShareButton>
    //                 <LinkedinShareButton className={styles.shareBtn} url={url}>
    //                     <LinkedinIcon size={size} round fill />
    //                 </LinkedinShareButton>
    //                 <TwitterShareButton className={styles.shareBtn} url={url}>
    //                     <TwitterIcon size={size} round fill />
    //                 </TwitterShareButton>
    //                 <WhatsappShareButton className={styles.shareBtn} url={url}>
    //                     <WhatsappIcon size={size} round fill />
    //                 </WhatsappShareButton>
    //             </div>
    //         </div>
    //     );
    // };

    calculateNotRated = () => {
        const { professional } = this.props;
        if (this.exist(professional, 'user.trust.amount')) {
            if (professional.user.trust.amount >= 80) {
                return 4.5;
            }
            if (professional.user.trust.amount >= 50 && professional.user.trust.amount < 80) {
                return 4;
            }
            if (professional.user.trust.amount >= 30 && professional.user.trust.amount < 50) {
                return 3.5;
            }
        }
        return 3;
    };

    getImageData = () => {
        const { professional } = this.props;
        const result = {};
        if (this.exist(professional, 'user.trust.profilePicture.filePath')) {
            result.src = `https://chibaki.ir${professional.user.trust.profilePicture.filePath.replace('public', '')}`;
        } else {
            result.src = '/assets/images/avatar.svg';
        }
        if (this.exist(professional, 'user.firstname') || this.exist(professional, 'user.lastname')) {
            result.alt = `${this.exist(professional, 'user.firstname')} - ${this.exist(professional, 'user.lastname')}`;
        } else {
            result.alt = 'user profile picture';
        }
        return result;
    };

    getBadgeStyles = (type) => {
        const { professional } = this.props;
        let result = `${styles.badge}`;
        if (this.exist(professional, `user.trust.${type}.verified`)) {
            result += ` ${styles.badgeActive}`;
        }
        return result;
    };

    getRate = () => {
        const { professional } = this.props;
        const { selectedProfession } = this.state;
        const professions = this.exist(professional, 'user.professions');
        if (professions && professions.length && selectedProfession) {
            const foundProfessions = professions.find(profession => profession.profession._id === selectedProfession.profession._id);
            return foundProfessions && foundProfessions.rate && foundProfessions.rate > 0 ? foundProfessions.rate : this.calculateNotRated();
        }
        return this.calculateNotRated();
    };

    getComments = () => {
        const { comments } = this.props;
        const { selectedProfession } = this.state;
        if (comments && comments.comments && comments.comments.length) {
            return comments.comments.reduce((acc, current) => {
                if (this.exist(current, 'userProfession.profession._id') === this.exist(selectedProfession, 'profession._id')) {
                    acc.push(current);
                    return acc;
                }
                return acc;
            }, []);
        }
    };

    componentWillReceiveProps(nextProps) {
        const { location, professional } = nextProps;
        const params = queryString.parse(location.search);

        if (professional && professional.user) {
            const professions = this.exist(professional, 'user.professions');
            const activeProfession = professions.find((profession) => {
                return profession.profession._id === params && params.profId;
            });
            this.setState({
                selectedProfession: activeProfession
            });
        }
    }

    componentDidMount() {
        console.log(this.props);
        const { location, professional, history } = this.props;
        const params = queryString.parse(location.search);

        const professions = this.exist(professional, 'user.professions');
        if (professions && professions.length) {
            const activeProfession = professions.find((profession) => {
                return profession.profession._id === params && params.profId ;
            });
            if (activeProfession && activeProfession._id) {
                this.setState({
                    selectedProfession: activeProfession
                });
            } else {
                this.setState({
                    selectedProfession: professions[0]
                });
                history.replace(`${decodeURI(location.pathname)}?id=${params.id}&profId=${professions[0].profession._id}`);
            }
        }
        this.props.setProfIdConnect(params.id);
        this.event({
            category: 'user',
            action: 'PROFILE_VIEW'
        });
        if (!this.Flickity) {
            this.Flickity = require('react-flickity-component');
            require('flickity-fullscreen');
            require('flickity/dist/flickity.min.css');
            require('flickity-fullscreen/fullscreen.css');
            this.setState({
                index: this.state.index + 1
            });
        }

        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect(params.id, params.profId);
        }
        objectFitImages();
    }

    render() {
        const { professional } = this.props;
        const { selectedProfession, showQuestions, professionId } = this.state;
        const { Flickity } = this;
        const images = this.getProfImage();
        const comments = this.getComments();

        return (
            <div className={styles.wrapper}>
                <Helmet>
                    <title>
                        {
                            `Chibaki - چی باکی
                            -
                            ${this.exist(professional, 'user.firstname')}
                            ${this.exist(professional, 'user.lastname')}`
                        }
                    </title>
                </Helmet>
                {
                    showQuestions && professionId ?
                        <Questions
                            professionId={professionId}
                            direct
                            onClose={this.handleClose}
                        /> : null
                }
                {
                    professional && professional.user ?
                        <div className="l-container l-container--sm">
                            <div className={styles.card}>
                                <Row>
                                    <Col span={24} className={styles.cover}>
                                        {' '}
                                    </Col>
                                    <img
                                        src={this.getImageData().src}
                                        alt={this.getImageData().alt}
                                        className={styles.avatar}
                                    />
                                </Row>
                                <Row className={styles.card__body}>
                                    {/*<Popover*/}
                                    {/*content={this.sharePopover()}*/}
                                    {/*// title={'اشتراک گذاری'}*/}
                                    {/*style={{*/}
                                    {/*display: 'none'*/}
                                    {/*}}*/}
                                    {/*trigger={'click'}*/}
                                    {/*>*/}
                                    {/*<Button className={styles.share}>*/}
                                    {/*<span className="icon-share" />*/}
                                    {/*معرفی این متخصص به دوستان*/}
                                    {/*</Button>*/}
                                    {/*</Popover>*/}
                                    <Col>
                                        <Row type="flex" justify="center">
                                            <Col style={{ marginTop: 80 }}>
                                                <h1 className={styles.userName}>
                                                    {professional.user.firstname}
                                                    {' '}
                                                    {professional.user.lastname}
                                                </h1>
                                                <Row type="flex" justify="center" style={{ marginBottom: 30 }}>
                                                    <Col>
                                                        <Rate
                                                            disabled
                                                            allowHalf
                                                            defaultValue={(Math.round(this.getRate() * 2) / 2)}
                                                            style={{
                                                                fontSize: '30px'
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col>
                                                {this.requestBtn('تماس با متخصص', 'phone')}
                                            </Col>
                                            <Col>
                                                {this.requestBtn('ارسال پیام برای متخصص', 'chat')}
                                            </Col>
                                            <Col>
                                                {this.requestBtn('دریافت قیمت از متخصص', 'label')}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Divider type="horizontal" />
                                <div>
                                    <Row className={styles.card__body}>
                                        <Col span={24}>
                                            <div className={styles.desc}>
                                                {
                                                    this.exist(selectedProfession, 'intro.description') ?
                                                        this.exist(selectedProfession, 'intro.description') :
                                                        <div className={styles.cardEmpty}>
                                                            متخصص هنوز متن معارفه‌ای ننوشته است
                                                        </div>
                                                }
                                            </div>
                                            <div className="u-t--c">
                                                {this.requestBtn('ثبت سفارش', null, 'c-btn--primary c-btn--md')}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Divider type="horizontal" />
                                </div>
                                <Row className={styles.card__body}>
                                    <Col span={24}>
                                        <Row className={styles.heading}>
                                            <Col>اطلاعات</Col>
                                        </Row>
                                        <div
                                            className={`${styles.badgesWrapper} ${this.exist(professional, 'user.trust.amount') < 15 && styles.badgesEmpty}`}
                                        >
                                            <div
                                                className={this.getBadgeStyles('addressProof')}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <Icon iconName="map" />
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        آدرس
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={this.getBadgeStyles('idCard')}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <Icon iconName="idCard" />
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        کارت ملی
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={this.getBadgeStyles('certificate')}
                                            >
                                                <Row>
                                                    <Col span="24">
                                                        <Icon iconName="degree" />
                                                    </Col>
                                                    <Col className={styles.badgeText} span="24">
                                                        مدرک تحصیلی
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={this.getBadgeStyles('identity')}
                                            >
                                                <Row>
                                                    <Col span="24">
                                                        <Icon
                                                            iconName="identity"
                                                        />
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        تایید هویت
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={this.getBadgeStyles('backgroundCheck')}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <Icon iconName="backgroundCheck" />
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        گواهی عدم سوء‌پیشینه
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider type="horizontal" />
                                <Row className={styles.card__body}>
                                    <Col span={24}>
                                        <Row className={styles.heading}>
                                            <Col span={24}>تخصص ها</Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Radio.Group
                                                    value={this.exist(selectedProfession, 'profession._id')}
                                                    className="radio-btn-round-md"
                                                    buttonStyle="solid"
                                                    onChange={this.onProfessionChange}
                                                >
                                                    {professional.user.professions.map((prof) => {
                                                        return (
                                                            <Radio.Button
                                                                value={prof.profession._id}
                                                                key={prof._id}
                                                            >
                                                                {prof.profession.title}
                                                            </Radio.Button>
                                                        );
                                                    })}
                                                </Radio.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Divider type="horizontal" />
                                <div>
                                    <Row className={styles.card__body}>
                                        <Col span={24}>
                                            <div className={styles.heading}>نمونه کارها</div>
                                            {
                                                images && images.length ?
                                                    <div>
                                                        {
                                                            this.Flickity ?
                                                                <Flickity
                                                                    options={this.sliderOptions}
                                                                    flickityRef={(c) => {
                                                                        this.flkty = c;
                                                                    }}
                                                                >
                                                                    {images.map((item, idx) => {
                                                                        return (
                                                                            <div
                                                                                className="profImage"
                                                                                key={item._id}
                                                                            >
                                                                                <a
                                                                                    href={item}
                                                                                    onClick={e => this.onProfImageClick(e, idx)}
                                                                                >
                                                                                    <img
                                                                                        src={item}
                                                                                        alt="user documents"
                                                                                    />
                                                                                </a>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </Flickity>
                                                                : null
                                                        }
                                                    </div>
                                                    :
                                                    <div
                                                        className={`${styles.profImageWrapper} ${styles.profImageWrapperEmpty}`}
                                                    />
                                            }
                                        </Col>
                                    </Row>
                                    <Divider type="horizontal" />
                                </div>
                                <div>
                                    <Row className={styles.card__body}>
                                        <Col span={24}>
                                            <div className={styles.heading}>نظر مشتریان</div>
                                            {
                                                comments && comments.length ?
                                                    <div className={styles.rateWrapper}>
                                                        {
                                                            comments.map((comment) => {
                                                                return (
                                                                    <Comments comment={comment} />
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div className={styles.cardEmpty}>
                                                        متخصص هنوز نظری از طرف مشتریان دریافت نکرده ‌است
                                                    </div>
                                            }
                                        </Col>
                                    </Row>
                                    <Divider type="horizontal" />
                                </div>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className={styles.card__body}
                                    style={{ padding: '40px 60px 60px' }}
                                >
                                    <Col>
                                        {this.requestBtn('تماس با متخصص', 'phone')}
                                    </Col>
                                    <Col>
                                        {this.requestBtn('ارسال پیام برای متخصص', 'chat')}
                                    </Col>
                                    <Col>
                                        {this.requestBtn('دریافت قیمت از متخصص', 'label')}
                                    </Col>
                                </Row>
                            </div>
                        </div> : null
                }
            </div>
        );
    }
}

export const connectedProfessional = connect(state => ({
    professional: state.professional.professional,
    comments: state.professional.comments
}), {
    setProfIdConnect: setProfId,
    loadConnect: load
})(Professional);

export default withRouter(connectedProfessional);
