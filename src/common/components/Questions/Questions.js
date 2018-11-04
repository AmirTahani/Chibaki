import React, { PureComponent } from 'react';
import { Modal, Col, Row, Button, message, Progress, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProvinces } from '../../redux/modules/provinces';
import { Icon } from '../Kit';
import { loadQuestions, setAnswer, submitAnswers } from '../../redux/modules/questions';
import {
    login,
    setUserMobile,
    setUserCode,
    setUserLastName,
    setUserName,
    register,
    verify,
    clearState
} from '../../redux/modules/auth';
import Single from './Single';
import SelectLocation from './SelectLocation';
import Multi from './Multi';
import Description from './Description';
import SingleWithDatePicker from './SingleWithDatePicker';
import GetPhone from './GetPhone';
import Verify from './Verify';
import styles from './Questions.module.styl';
import GetName from './GetName';
import Success from './Success';

class Questions extends PureComponent {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        loadProvincesConnect: PropTypes.func.isRequired,
        loadQuestionsConnect: PropTypes.func.isRequired,
        direct: PropTypes.bool,
        professionId: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        gender: PropTypes.string.isRequired,
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadedProvinces: PropTypes.bool.isRequired,
        loadingProvinces: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        setAnswerConnect: PropTypes.func.isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        loginConnect: PropTypes.func.isRequired,
        setUserMobileConnect: PropTypes.func.isRequired,
        setUserCodeConnect: PropTypes.func.isRequired,
        setUserLastNameConnect: PropTypes.func.isRequired,
        setUserNameConnect: PropTypes.func.isRequired,
        clearStateConnect: PropTypes.func.isRequired,
        registerConnect: PropTypes.func.isRequired,
        verifyConnect: PropTypes.func.isRequired,
        submitAnswersConnect: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    };

    static defaultProps = {
        direct: false
    };

    state = {
        visible: true,
        current: 0,
        questions: [],
        shouldRegister: false,
        defaultQuestions: [],
        begin: true
    };

    toggleModal = () => {
        this.props.onClose();
        this.setState({
            visible: !this.state.visible
        });
    };

    getQuestions = (questions) => {
        const { gender, user } = this.props;
        let newQuestions = [...questions];
        if (gender === 'ask') {
            newQuestions = [...newQuestions, {
                _id: 'gender',
                title: 'جنسیت متخصص مربوطه را مشخص کنید.',
                options: [
                    { title: 'خانم' },
                    { title: 'آقا' },
                    { title: 'فرقی نمیکند' }
                ],
                type: 'single',
                skipable: false
            }];
        }
        if (!user._id) {
            newQuestions = [...newQuestions, {
                _id: 'getPhone',
                title: 'لطفا شماره خود را وارد کنید.',
                skipable: false,
                type: 'getPhone'
            }];
        }
        this.setState({
            questions: newQuestions,
            defaultQuestions: newQuestions
        });
    };

    getContent = () => {
        const {
            provinces,
            loadedProvinces,
            loadingProvinces,
            loading,
            loaded,
            setAnswerConnect,
            answers,
            loginConnect,
            setUserMobileConnect,
            setUserCodeConnect,
            setUserLastNameConnect,
            setUserNameConnect,
            clearStateConnect,
            mobile
        } = this.props;
        const { questions } = this.state;
        if (!loading && loaded) {
            return questions.map((question) => {
                if (question.type === 'multi' || question.type === 'mtext') {
                    return {
                        title: '',
                        question,
                        content: <Multi
                            question={question}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                        />
                    };
                } else if (question.type === 'single' || question.type === 'stext') {
                    return {
                        title: '',
                        question,
                        content: <Single
                            question={question}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                        />
                    };
                } else if (question.type === 'location') {
                    return {
                        title: '',
                        question,
                        content: <SelectLocation
                            question={question}
                            loading={loadingProvinces}
                            provinces={provinces}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                            loaded={loadedProvinces}
                        />
                    };
                } else if (question.type === 'singleWithDatePicker') {
                    return {
                        title: '',
                        question,
                        content: <SingleWithDatePicker
                            question={question}
                            answers={answers}
                            setAnswer={setAnswerConnect}
                        />
                    };
                } else if (question.type === 'text') {
                    return {
                        title: '',
                        question,
                        content: <Description
                            question={question}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                        />
                    };
                } else if (question.type === 'getPhone') {
                    return {
                        title: '',
                        question,
                        content: <GetPhone
                            mobile={mobile}
                            question={question}
                            login={loginConnect}
                            setUserMobile={setUserMobileConnect}
                            clearState={clearStateConnect}
                        />
                    };
                } else if (question.type === 'verify') {
                    return {
                        title: '',
                        question,
                        content: <Verify
                            question={question}
                            answers={answers}
                            setUserCode={setUserCodeConnect}
                            submit={this.next}
                            login={this.props.loginConnect}
                            mobile={this.props.mobile}
                        />
                    };
                } else if (question.type === 'getName') {
                    return {
                        title: '',
                        question,
                        content: <GetName
                            question={question}
                            setUserName={setUserNameConnect}
                            setUserLastName={setUserLastNameConnect}
                        />
                    };
                } else if (question.type === 'success') {
                    return {
                        title: '',
                        question,
                        content: <Success />
                    };
                }
            });
        }
        return [];
    };

    checkHasAnswer = (question) => {
        const { answers, firstName, lastName } = this.props;
        const answer = answers[question._id];
        if (question._id === 'location') {
            if (
                answers[question._id] &&
                answers[question._id].province &&
                answers[question._id].city &&
                answers[question._id].province._id &&
                answers[question._id].city._id &&
                answers['address'] &&
                answers['address'].text_option
            ) {
                return true;
            }
        }

        if (question._id === 'getName') {
            if (firstName && lastName) {
                return true;
            }
        }
        return !!((answer && answer.text_option) || (answer && answer.selected_options && answer.selected_options.length));
    };

    begin = () => {
        this.setState({
            begin: false
        });
    };

    next = () => {
        const { current } = this.state;
        const { mobile, firstName, lastName, registerConnect, code, verifyConnect, submitAnswersConnect } = this.props;
        const contents = this.getContent();
        const hasAnswer = this.checkHasAnswer(contents[current].question);
        if (mobile && contents[current].question.type === 'getPhone') {
            new Promise((resolve, reject) => {
                this.props.loginConnect(mobile, resolve, reject);
            }).then(() => {
                this.setState({
                    questions: [...this.state.defaultQuestions, {
                        _id: 'verify',
                        title: 'لطفا کد ارسال شده را وارد کنید.',
                        skipable: false,
                        type: 'verify'
                    }],
                    current: current + 1
                });
            }).catch((error) => {
                if (error.status === 422) {
                    if (!this.state.questions.find(item => item._id === 'getName')) {
                        this.setState({
                            questions: [...this.state.defaultQuestions, {
                                _id: 'getName',
                                title: 'لطفا نام و نام خانوادگی خود را وارد کنید.',
                                skipable: false,
                                type: 'getName'
                            }, {
                                _id: 'verify',
                                title: 'لطفا کد ارسال شده را وارد کنید.',
                                skipable: false,
                                type: 'verify'
                            }],
                            current: current + 1,
                            shouldRegister: true
                        });
                    } else {
                        this.setState({
                            current: current + 1
                        });
                    }
                }
            });
        } else if (firstName && lastName && contents[current].question.type === 'getName') {
            new Promise((resolve, reject) => {
                registerConnect({ firstName, lastName, mobile }, resolve, reject);
            }).then(() => {
                this.setState({
                    current: current + 1
                });
            });
        } else if (code && contents[current].question.type === 'verify') {
            new Promise((resolve, reject) => {
                verifyConnect(code, resolve, reject);
            }).then(() => {
                new Promise((resolve, reject) => {
                    submitAnswersConnect(resolve, reject);
                }).then(() => {
                    this.setState({
                        questions: [...this.state.questions, {
                            _id: 'success',
                            type: 'success',
                            title: 'درخواست شما با موفقیت ثبت شد.'
                        }],
                        current: current + 1
                    });
                });
            });
        } else if (contents[current].question._id === 'location' && current === contents.length - 1) {
            new Promise((resolve, reject) => {
                submitAnswersConnect(resolve, reject);
            }).then(() => {
                this.setState({
                    questions: [...this.state.questions, {
                        _id: 'success',
                        type: 'success',
                        title: 'درخواست شما با موفقیت ثبت شد.'
                    }],
                    current: current + 1
                });
            });
        } else if (contents[current].question.skipable || hasAnswer) {
            this.setState({
                current: current + 1
            });
        } else {
            message.error('لطفا ابتدا پاسخ مناسب را انتخاب کنید.', 3);
        }
    };

    prev = () => {
        this.setState({
            current: this.state.current - 1
        });
    };

    componentDidMount() {
        message.config({
            top: 70,
            duration: 2,
            maxCount: 1,
        });
        this.props.loadQuestionsConnect(this.props.professionId, this.props.direct);
        this.props.loadProvincesConnect();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questions && nextProps.questions !== this.props.questions && !nextProps.loading && nextProps.loaded) {
            this.getQuestions(nextProps.questions);
        }
    }

    render() {
        const { current, shouldRegister, begin } = this.state;
        const { loading, loaded } = this.props;
        const contents = this.getContent();
        const contentsLength = shouldRegister ? contents.length + 1 : contents.length;
        return (
            <Row>
                <Col>
                    <Modal
                        visible={this.state.visible}
                        className={styles.modal}
                        centered
                        width={500}
                        footer={
                            [
                                begin ? <Button
                                    type="primary"
                                    className={styles.buttonBegin}
                                    onClick={this.begin}
                                >
                                    شروع
                                </Button> : null,
                                (
                                    !begin &&
                                    current < contents.length - 1 ||
                                    (
                                        contents[current] &&
                                        contents[current].question &&
                                        contents[current].question._id === 'getPhone'
                                    )
                                )
                                && <Button className={styles.buttonNext} onClick={() => this.next(contents)}>
                                    <span className="icon-next" />
                                    بعدی
                                </Button>,
                                !begin &&
                                current === contents.length - 1 &&
                                contents[current].question._id !== 'getPhone' &&
                                contents[current].question._id !== 'success'
                                && <Button onClick={() => this.next(contents)} type="primary">ثبت درخواست</Button>,
                                !begin &&
                                current > 0 && <Button className={styles.buttonBack} onClick={() => this.prev(contents)}>
                                    قبلی
                                    <span className="icon-back" />
                                </Button>,
                                !begin &&
                                contents[current] &&
                                contents[current].question &&
                                contents[current].question._id === 'success' && <Button className={styles.button} onClick={this.toggleModal}>
                                    باشه
                                </Button>
                            ]
                        }
                        closable={false}
                    >
                        <button className={styles.closeButton} onClick={() => this.toggleModal()}>
                            <span className="icon-close" />
                        </button>
                        {
                            loading && !loaded && !begin ? <div className={styles.spinnerWrapper}><Spin /></div> : null
                        }
                        {
                            !loading && loaded && !begin ? <Col>
                                <div>
                                    <Progress
                                        percent={current === contents.length - 1 ? 100 : ((current / contentsLength) * 100)}
                                        showInfo={false}
                                        strokeWidth={20}
                                        className={styles.progressBar}
                                    />
                                </div>
                                <div
                                    className={styles.stepsContent}
                                >
                                    {contents[current] && contents[current].content}
                                </div>
                            </Col> : null
                        }
                        {
                            begin ? <div className={styles.beginWrapper}>
                                <img
                                    src="/assets/images/logo/logo-text.svg"
                                    alt="chibaki logo"
                                    className={styles.logo}
                                />
                                <p className={styles.beginText}>برای آنکه بتوانیم بهترین افراد متخصص را به شما معرفی
                                    کنیم، ابتدا نیاز هست که به چند
                                    سوال کوتاه پاسخ دهید</p>
                            </div> : null
                        }
                    </Modal>
                </Col>
            </Row>
        );
    }
}

export default connect(state => ({
    questions: state.questions.questions,
    gender: state.questions.gender,
    user: state.auth.user,
    title: state.questions.title,
    answers: state.questions.answers,
    loading: state.questions.loading,
    loaded: state.questions.loaded,
    error: state.questions.error,
    provinces: state.provinces.provinces,
    loadingProvinces: state.provinces.loading,
    loadedProvinces: state.provinces.loaded,
    mobile: state.auth.mobile,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    code: state.auth.code
}), {
    loadProvincesConnect: loadProvinces,
    loadQuestionsConnect: loadQuestions,
    setAnswerConnect: setAnswer,
    loginConnect: login,
    setUserMobileConnect: setUserMobile,
    setUserCodeConnect: setUserCode,
    setUserNameConnect: setUserName,
    setUserLastNameConnect: setUserLastName,
    registerConnect: register,
    verifyConnect: verify,
    submitAnswersConnect: submitAnswers,
    clearStateConnect: clearState
})(Questions);
