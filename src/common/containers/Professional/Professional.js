import React, { Component } from 'react';
import { Col, Divider, Dropdown, Menu, Radio, Rate, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import objectFitImages from 'object-fit-images';
import Questions from '../../components/Questions/Questions';
import { setProfId } from '../../redux/modules/questions';
import { load } from '../../redux/modules/professional';
import styles from './Professional.style.module.styl';

// import professions from "../../redux/modules/professions";

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
        professionId: ''
    };

    onProfImageClick = (e) => {
        e.preventDefault();
        this.flkty.viewFullscreen();
    };

    onProfessionChange = (e) => {
        this.setState({
            selectedProfession: e.target.value
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
        const { professional } = this.props;
        const { selectedProfession } = this.state;
        if (this.exist(professional, `user.professions.${selectedProfession}.intro`)) {
            return Object.keys(professional.user.professions[selectedProfession].intro).reduce((acc, current) => {
                if (current.indexOf('photo') >= 0 && professional.user.professions[selectedProfession].intro[current]) {
                    if (current === 'photos') {
                        acc = professional.user.professions[selectedProfession].intro[current].map(photo => `https://chibaki.ir${photo.replace('public', '')}`);
                    } else {
                        acc.push(
                            `https://chibaki.ir${professional.user.professions[selectedProfession].intro[current].replace('public', '')}`
                        );
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
    calculateNotRated = () => {
        const { professional } = this.props;
        if (professional.user && professional.user.trust && professional.user.trust.amount) {
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

    componentDidMount() {
        const { location, professional } = this.props;
        this.props.setProfIdConnect(location.query.id);
        const professions = this.exist(professional, 'user.professions');
        if (professions && professions.length) {
            const index = professions.findIndex((profession) => {
                return profession.profession._id === this.exist(location, 'query.profId');
            });
            this.setState({
                selectedProfession: index
            });
        }
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
            this.props.loadConnect(location.query.id);
        }
        objectFitImages();
    }

    render() {
        console.log(this.state, 'this is the state');
        const { professional, comments } = this.props;
        const { selectedProfession, showQuestions, professionId } = this.state;
        const { Flickity } = this;
        const images = this.getProfImage();
        const rate = this.exist(professional, `user.professions.${selectedProfession}.rate`) ?
            this.exist(professional, `user.professions.${selectedProfession}.rate`) :
            this.calculateNotRated();

        return (
            <div className={styles.wrapper}>
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
                                        src={
                                            professional.user &&
                                            professional.user.trust &&
                                            professional.user.trust.profilePicture &&
                                            professional.user.trust.profilePicture.filePath
                                                ? `https://chibaki.ir${professional.user.trust.profilePicture.filePath.replace('public', '')}`
                                                : 'https://chibaki.ir/profile/images/avatar.svg'
                                        }
                                        alt={`${professional.user && professional.user.firstname
                                            ? professional.user && professional.user.firstname : ''} ${professional.user && professional.user.lastname
                                            ? professional.user.lastname : ''}`}
                                        className={styles.avatar}
                                    />
                                </Row>
                                <Row className={styles.card__body}>
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
                                                            defaultValue={(Math.round(rate * 2) / 2)}
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
                                            <p className={styles.desc}>
                                                {
                                                    this.exist(professional, `user.professions.${selectedProfession}.intro.description`) ?
                                                        this.exist(professional, `user.professions.${selectedProfession}.intro.description`) :
                                                        <div className={styles.cardEmpty}>
                                                            متخصص هنوز متن معارفه‌ای ننوشته است
                                                        </div>
                                                }
                                            </p>
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
                                            className={`${styles.badgesWrapper} ${professional.user.trust.amount < 15 && styles.badgesEmpty}`}
                                        >
                                            <div
                                                className={`${styles.badge}
                                        ${professional.user.trust.addressProof.verified && styles.badgeActive}`}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M372.8 172.1c-5.4-3.6-12.2-4.3-18.2-1.9l-58.3 23.5-46.9-9.2 7-14.6c9.6-19.8 5.6-43.5-10-59-20.1-20.1-52.9-20.1-73.1 0a51.59 51.59 0 0 0-11.1 56.5l-8.5-1.7a19.52 19.52 0 0 0-23.2 19.1v183.6c0 9.3 6.6 17.3 15.7 19.1l144.4 28.4a24.16 24.16 0 0 0 13.4-1.3l65.1-26.2c7.4-3 12.2-10.1 12.2-18.1v-182c.1-6.5-3.1-12.6-8.5-16.2zm-190.5-52.4c7.6-7.6 17.7-11.4 27.7-11.4s20 3.8 27.7 11.4a39.18 39.18 0 0 1 7.6 44.7L210 237.3l-35.2-72.9a39 39 0 0 1 7.5-44.7zm111.8 160c-3.5 0-6.3 2.8-6.3 6.3v30.8L202.4 302a6.23 6.23 0 1 0-2.1 12.3l87.5 15.2v38.4L178 349.2V221.3l11.2 1.9 9.8 20.3c.5 1.1 1.1 2 1.9 2.8 2.2 2.5 5.5 4 9 4 4.7 0 8.8-2.6 10.9-6.8l6.7-13.8 66.4 11.3h.3c1 .1 1.9 0 2.8-.3l39.7-13.9V354l-36.3 12.7v-80.9c0-3.3-2.8-6.1-6.3-6.1zm74.8 90.6c0 2.9-1.7 5.4-4.4 6.4L299.4 403c-2 .8-4.2 1-6.3.6l-144.4-28.4c-3.3-.6-5.6-3.5-5.6-6.8V184.7c0-2.1.9-4 2.5-5.4a7.2 7.2 0 0 1 5.8-1.5l17.6 3.5 13.6 28-9.7-1.7a6.23 6.23 0 0 0-7.3 6.2v140.5c0 3.1 2.2 5.7 5.2 6.2l123.1 21c.3.1.7.1 1.1.1.7 0 1.4-.1 2.1-.4l48-16.8c2.5-.9 4.2-3.2 4.2-5.9V218.1c0-2-1-3.9-2.6-5.1a6.14 6.14 0 0 0-5.7-.8l-46.5 16.3-61.3-10.5 10.6-22 52 10.2c1.2.2 2.4.1 3.5-.3l60-24.2c2.2-.9 4.5-.6 6.5.7 1.9 1.3 3.1 3.4 3.1 5.8v182.1z"
                                                            />
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M210 121.2c-14.5 0-26.2 11.8-26.2 26.2s11.8 26.2 26.2 26.2c14.5 0 26.2-11.8 26.2-26.2s-11.8-26.2-26.2-26.2zm0 39.9c-7.6 0-13.7-6.2-13.7-13.7 0-7.6 6.2-13.7 13.7-13.7 7.6 0 13.7 6.2 13.7 13.7s-6.2 13.7-13.7 13.7zM300.3 259.7c-.1-.4-.2-.8-.4-1.2-.2-.4-.4-.7-.6-1.1-.2-.3-.5-.7-.8-1s-.6-.6-1-.8c-.3-.2-.7-.4-1.1-.6-.4-.2-.8-.3-1.2-.4-.4-.1-.8-.1-1.2-.1-.4 0-.8 0-1.2.1-.4.1-.8.2-1.2.4-.4.2-.7.4-1.1.6a7 7 0 0 0-1 .8c-.3.3-.6.6-.8 1-.2.3-.4.7-.6 1.1-.2.4-.3.8-.4 1.2s-.1.8-.1 1.2a6.28 6.28 0 0 0 2.8 5.2c.3.2.7.4 1.1.6.4.2.8.3 1.2.4.4.1.8.1 1.2.1.4 0 .8 0 1.2-.1.4-.1.8-.2 1.2-.4.4-.2.7-.4 1.1-.6a6.2 6.2 0 0 0 2.8-5.2c.2-.4.1-.8.1-1.2z"
                                                            />
                                                        </svg>
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        آدرس
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={`${styles.badge}
                                        ${professional.user.trust.idCard.verified && styles.badgeActive}`}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M415.86 395H96.14C82.83 395 72 382.83 72 367.88V175.34c0-15 10.82-27.12 24.13-27.12h319.73c13.31 0 24.13 12.17 24.13 27.12v192.54C440 382.83 429.17 395 415.86 395zM96.14 164C90.55 164 86 169.07 86 175.34v192.54c0 6.27 4.54 11.38 10.13 11.38h319.73c5.59 0 10.13-5.11 10.13-11.38V175.34c0-6.27-4.54-11.38-10.13-11.38z"
                                                            />
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M174.23 268a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm0-49.93a18 18 0 1 0 18 18 18 18 0 0 0-18-17.97zM219.16 337.45h-89.87a10.67 10.67 0 0 1-10.61-11.51 55.73 55.73 0 0 1 111.09 0 10.66 10.66 0 0 1-10.61 11.51zm-86.07-14h82.28a41.73 41.73 0 0 0-82.28 0zM349.37 244.38h-64.78a7 7 0 0 1 0-14h64.78a7 7 0 0 1 0 14zM380.62 282.23h-96a7 7 0 1 1 0-14h96a7 7 0 0 1 0 14zM299.65 320.09h-15.06a7 7 0 0 1 0-14h15.06a7 7 0 0 1 0 14zM342.45 320.09h-15.06a7 7 0 0 1 0-14h15.06a7 7 0 0 1 0 14zM385.25 320.09h-15.06a7 7 0 0 1 0-14h15.06a7 7 0 0 1 0 14z"
                                                            />
                                                        </svg>
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        کارت ملی
                                                    </Col>
                                                </Row>
                                            </div>


                                            <div
                                                className={`${styles.badge}
                                        ${professional.user.trust.certificate.verified && styles.badgeActive}`}
                                            >
                                                <Row>
                                                    <Col span="24">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M415.86 395H96.14C82.83 395 72 382.83 72 367.88V175.34c0-15 10.82-27.12 24.13-27.12h319.73c13.31 0 24.13 12.17 24.13 27.12v192.54C440 382.83 429.17 395 415.86 395zM96.14 164C90.55 164 86 169.07 86 175.34v192.54c0 6.27 4.54 11.38 10.13 11.38h319.73c5.59 0 10.13-5.11 10.13-11.38V175.34c0-6.27-4.54-11.38-10.13-11.38z"
                                                            />
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M164.23 295a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm0-49.93a18 18 0 1 0 18 18 18 18 0 0 0-18-17.97zM344.37 259.38h-64.78a7 7 0 0 1 0-14h64.78a7 7 0 0 1 0 14zM375.62 297.24h-96a7 7 0 1 1 0-14h96a7 7 0 0 1 0 14zM375.62 338.1h-96a7 7 0 0 1 0-14h96a7 7 0 0 1 0 14zM433 199.09H79a7 7 0 0 1 0-14h354a7 7 0 0 1 0 14z"
                                                            />
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M182.84 347.09a7 7 0 0 1-5-2.1l-13.78-14.06-14.88 14.22a7 7 0 0 1-11.84-5.06v-60.4a7 7 0 0 1 14 0v44l8-7.69a7 7 0 0 1 9.84.16l6.61 6.75v-43.22a7 7 0 0 1 14 0v60.4a7 7 0 0 1-7 7z"
                                                            />
                                                        </svg>
                                                    </Col>
                                                    <Col className={styles.badgeText} span="24">
                                                        مدرک تحصیلی
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={`${styles.badge}
                                       ${professional.user.trust.identity.verified && professional.user.trust.identity.filePath && styles.badgeActive}`}
                                            >
                                                <Row>
                                                    <Col span="24">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M194.47 249.17A47.48 47.48 0 1 1 242 201.69a47.53 47.53 0 0 1-47.53 47.48zm0-81A33.48 33.48 0 1 0 228 201.69a33.52 33.52 0 0 0-33.53-33.48zM267.32 361.73h-145.7a12.92 12.92 0 0 1-12.87-14 86 86 0 0 1 171.44 0 12.9 12.9 0 0 1-12.87 14zm-144.51-14h143.33a72 72 0 0 0-143.33 0zM310.69 282.73a7 7 0 0 1-4.95-2.05l-37.45-37.45a7 7 0 0 1 9.9-9.9l32.5 32.5 80.65-80.66a7 7 0 0 1 9.9 9.9l-85.6 85.61a7 7 0 0 1-4.95 2.05z"
                                                            />
                                                        </svg>
                                                    </Col>
                                                    <Col className={styles.badgeText} span={24}>
                                                        تایید هویت
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div
                                                className={`${styles.badge}
                                        ${professional.user.trust.backgroundCheck.verified && styles.badgeActive}`}
                                            >
                                                <Row>
                                                    <Col span={24}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M415.86 395H96.14C82.83 395 72 382.83 72 367.88V175.34c0-15 10.82-27.12 24.13-27.12h319.73c13.31 0 24.13 12.17 24.13 27.12v192.54C440 382.83 429.17 395 415.86 395zM96.14 164C90.55 164 86 169.07 86 175.34v192.54c0 6.27 4.54 11.38 10.13 11.38h319.73c5.59 0 10.13-5.11 10.13-11.38V175.34c0-6.27-4.54-11.38-10.13-11.38z"
                                                            />
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M181.54 286.71a28.31 28.31 0 1 1 28.31-28.31 28.34 28.34 0 0 1-28.31 28.31zm0-42.61a14.31 14.31 0 1 0 14.31 14.3 14.32 14.32 0 0 0-14.31-14.3zM351.62 228.08h-64.78a7 7 0 0 1 0-14h64.78a7 7 0 0 1 0 14zM351.62 265.4h-64.78a7 7 0 0 1 0-14h64.78a7 7 0 1 1 0 14zM203.18 310h-43.27a7 7 0 1 1 0-14h43.27a7 7 0 0 1 0 14z"
                                                            />
                                                            <path
                                                                fill="#1e87f0"
                                                                d="M241.47 338.81H121.61a7 7 0 0 1-7-7V212a7 7 0 0 1 7-7h119.86a7 7 0 0 1 7 7v119.81a7 7 0 0 1-7 7zm-112.86-14h105.86V219H128.61zM338.32 336.4a7 7 0 0 1-4.95-2l-23.1-23.1a7 7 0 0 1 9.9-9.9l18.15 18.15 47.85-47.85a7 7 0 0 1 9.9 9.9l-52.8 52.8a7 7 0 0 1-4.95 2z"
                                                            />
                                                        </svg>
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
                                                    value={this.state.selectedProfession}
                                                    className="radio-btn-round-md"
                                                    buttonStyle="solid"
                                                    onChange={this.onProfessionChange}
                                                >
                                                    {professional.user.professions.map((prof, idx) => {
                                                        return (
                                                            <Radio.Button
                                                                value={idx}
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
                                                comments.comments && comments.comments.length ?
                                                    <div className={styles.rateWrapper}>
                                                        {
                                                            comments.comments.map((comment) => {
                                                                return (
                                                                    <Row className={styles.rateItem} key={comment._id}>
                                                                        <Col span={24}>
                                                                            <Row
                                                                                type="flex" justify="space-between"
                                                                                align="middle"
                                                                            >
                                                                                <Col>
                                                                                    {comment.customer && comment.customer.firstname}
                                                                                    {' '}
                                                                                    {comment.customer && comment.customer.lastname}
                                                                                </Col>
                                                                                <Col>
                                                                                    <Rate
                                                                                        disabled
                                                                                        defaultValue={comment.rate}
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                            <div>
                                                                                {comment.userProfession &&
                                                                                comment.userProfession.userProfession &&
                                                                                comment.userProfession.userProfession.title
                                                                                    ? comment.userProfession.userProfession.title
                                                                                    : ''}
                                                                            </div>
                                                                            <div
                                                                                className={styles.rateText}
                                                                            >{comment.text}</div>
                                                                        </Col>
                                                                    </Row>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div className={styles.cardEmpty}>
                                                        متخصص هنوز نظری از طرف مشتریان دریافت نکرده ‌است
                                                    </div>}
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
                        </div> : null}
            </div>
        );
    }
}

export default connect(state => ({
    professional: state.professional.professional,
    comments: state.professional.comments
}), {
    setProfIdConnect: setProfId,
    loadConnect: load
})(Professional);
