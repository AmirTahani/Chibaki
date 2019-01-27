import React, { PureComponent } from 'react';
import { Modal, Col, Row, Button, message, Progress, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProvinces } from '../../redux/modules/provinces';
import { loadQuestions, setAnswer, submitAnswers, clearAnswers } from '../../redux/modules/questions';
import {
    login,
    setUserMobile,
    setUserCode,
    setUserLastName,
    setUserName,
    setUserGender,
    register,
    verify,
    clearState,
    getUser,
    updateUser
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
import { defualtQuestions } from '../../config';
import { phoneNumberRegex } from '../../utils/persian';
import { redirectToProfile } from '../../utils/helpers';

class Questions extends PureComponent {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        loadProvincesConnect: PropTypes.func.isRequired,
        loadQuestionsConnect: PropTypes.func.isRequired,
        direct: PropTypes.bool,
        professionId: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        gender: PropTypes.string.isRequired,
        questionGender: PropTypes.string.isRequired,
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        provinces: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadedProvinces: PropTypes.bool.isRequired,
        loadingProvinces: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
        submitted: PropTypes.bool.isRequired,
        setAnswerConnect: PropTypes.func.isRequired,
        clearAnswersConnect: PropTypes.func.isRequired,
        answers: PropTypes.objectOf(PropTypes.any).isRequired,
        loginConnect: PropTypes.func.isRequired,
        setUserMobileConnect: PropTypes.func.isRequired,
        setUserCodeConnect: PropTypes.func.isRequired,
        setUserLastNameConnect: PropTypes.func.isRequired,
        setUserNameConnect: PropTypes.func.isRequired,
        setUserGenderConnect: PropTypes.func.isRequired,
        clearStateConnect: PropTypes.func.isRequired,
        registerConnect: PropTypes.func.isRequired,
        verifyConnect: PropTypes.func.isRequired,
        submitAnswersConnect: PropTypes.func.isRequired,
        getUserConnect: PropTypes.func.isRequired,
        mobile: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        updateUserConnect: PropTypes.func.isRequired
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
        this.props.clearAnswersConnect();
        this.props.onClose();
        this.setState({
            visible: !this.state.visible
        });
        this.toggleBodyClass(false);
    };

    toggleBodyClass = (force) => {
        const method = force ? 'add' : 'remove';
        document.body
            .classList[method]('modal-is-open');
    };

    getQuestions = (questions, gender) => {
        const { user } = this.props;
        let newQuestions = [...questions];
        if (gender === 'ask') {
            newQuestions = [...newQuestions, {
                _id: 'gender',
                title: 'جنسیت متخصص مربوطه را مشخص کنید.',
                options: [
                    'خانم',
                    'آقا',
                    'فرقی نمیکند'
                ],
                type: 'single',
                skipable: false
            }];
        }
        newQuestions = [...newQuestions, ...defualtQuestions];
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
            gender,
            firstName,
            lastName,
            loginConnect,
            setUserMobileConnect,
            setUserCodeConnect,
            setUserLastNameConnect,
            setUserNameConnect,
            setUserGenderConnect,
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
                            onEnter={this.next}
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
                            onEnter={this.next}
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
                            onEnter={this.next}
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
                            onEnter={this.next}
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
                            onEnter={this.next}
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
                            onEnter={this.next}
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
                            onEnter={this.next}
                        />
                    };
                } else if (question.type === 'getName') {
                    return {
                        title: '',
                        question,
                        content: <GetName
                            question={question}
                            gender={gender}
                            firstName={firstName}
                            lastName={lastName}
                            setUserName={setUserNameConnect}
                            setUserGender={setUserGenderConnect}
                            setUserLastName={setUserLastNameConnect}
                            onEnter={this.next}
                        />
                    };
                } else if (question.type === 'askGender') {
                    return {
                        title: '',
                        question,
                        content: <GetName
                            question={question}
                            gender={gender}
                            firstName={firstName}
                            lastName={lastName}
                            setUserName={setUserNameConnect}
                            setUserGender={setUserGenderConnect}
                            setUserLastName={setUserLastNameConnect}
                            showOnlyGender
                            onEnter={this.next}
                        />
                    };
                } else if (question.type === 'success') {
                    return {
                        title: '',
                        question,
                        content: <Success onEnter={this.toggleModal} />
                    };
                }
            });
        }
        return [];
    };

    checkHasAnswer = (question) => {
        const { answers, firstName, lastName, gender } = this.props;
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
            if (firstName && lastName && gender) {
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

    next = async () => {
        try {
            const { current } = this.state;
            const {
                mobile,
                firstName,
                lastName,
                registerConnect,
                gender,
                code,
                verifyConnect,
                submitAnswersConnect,
                user,
                getUserConnect,
                updateUserConnect
            } = this.props;
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
                    registerConnect({ firstName, lastName, mobile, gender }, resolve, reject);
                }).then(() => {
                    this.setState({
                        current: current + 1
                    });
                });
            } else if (code && contents[current].question.type === 'verify') {
                try {
                    await new Promise((resolve, reject) => verifyConnect(code, resolve, reject));
                    await this.submitAnswers();
                    this.setState({
                        questions: [...this.state.questions, {
                            _id: 'success',
                            type: 'success',
                            title: 'درخواست شما با موفقیت ثبت شد.'
                        }],
                        current: current + 1
                    });
                } catch (err) {
                    console.log('Questions on next on verify', err);
                }
            } else if (contents[current].question.type === 'askGender') {
                new Promise((resolve, reject) => {
                    updateUserConnect({ gender }, resolve, reject);
                }).then(async () => {
                    try {
                        //hereeeeee
                        await this.submitAnswers();
                        this.setState({
                            questions: [...this.state.questions, {
                                _id: 'success',
                                type: 'success',
                                title: 'درخواست شما با موفقیت ثبت شد.'
                            }],
                            current: current + 1
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }).catch(err => console.log(err));
            } else if (contents[current].question._id === 'location' && current === contents.length - 1 && hasAnswer) {
                try {
                    await this.submitAnswers();
                    this.setState({
                        questions: [...this.state.questions, {
                            _id: 'success',
                            type: 'success',
                            title: 'درخواست شما با موفقیت ثبت شد.'
                        }],
                        current: current + 1
                    });
                } catch (err) {
                    console.log('Questions on next on location', err);
                }
            } else if (contents[current].question.skipable || hasAnswer) {
                this.setState({
                    current: current + 1
                });
            } else {
                message.error('لطفا ابتدا پاسخ مناسب را انتخاب کنید.', 3);
            }
        } catch (err) {
            console.log('Questions on next', err);
        }
    };

    onFormSubmit = (e, contents) => {
        e.preventDefault();

        this.next();

        return false;
    };

    submitAnswers = async () => {
        try {
            const {
                getUserConnect,
                submitAnswersConnect,
                submitting
            } = this.props;

            if (submitting) return;

            const fetchUser = await new Promise((resolveFetch, rejectFetch) => getUserConnect(resolveFetch, rejectFetch));
            if (!fetchUser.gender || fetchUser.gender === 'na') {
                this.askGender();
            } else {
                await new Promise((resolve, reject) => submitAnswersConnect(resolve, reject));
            }

            redirectToProfile('projects');

            return Promise.resolve(fetchUser);
        } catch (err) {
            console.log(err, 'submitAnswers');
            return Promise.reject(err);
        }
    };

    askGender = () => {
        this.setState({
            questions: [...this.state.questions, {
                _id: 'askGender',
                type: 'askGender',
                title: 'لطفا جنسیت خود را انتخاب کنید'
            }],
            current: this.state.current + 1
        });
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
        this.toggleBodyClass(true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questions && nextProps.questions !== this.props.questions && !nextProps.loading && nextProps.loaded) {
            this.getQuestions(nextProps.questions, nextProps.questionGender);
        }
    }

    render() {
        const { current, shouldRegister, begin } = this.state;
        const { loading, loaded, submitted, submitting } = this.props;
        const contents = this.getContent();
        const contentsLength = shouldRegister ? contents.length + 1 : contents.length;
        return (
            <Row>
                <Col>
                    <Modal
                        visible={this.state.visible}
                        className={`${styles.modal} ${this.exist(contents[current], 'question.type') === 'success' ? styles.modalSuccess : ''}`}
                        centered
                        width={500}
                        footer={
                            [
                                begin ? <button
                                    className={`${styles.beginBtn} c-btn c-btn--md c-btn--primary`}
                                    autoFocus
                                    onClick={this.begin}
                                    type="submit"
                                    form="questionsForm"
                                >
                                    شروع
                                </button> : null,
                                (
                                    !begin &&
                                    !(this.exist(contents[current], 'question._id') === 'success') &&
                                    (
                                        current < contents.length - 1 ||
                                        this.exist(contents[current], 'question._id') === 'getPhone'
                                    )
                                )
                                && <Button
                                    className={styles.buttonNext}
                                    htmlType="submit"
                                    form="questionsForm"
                                >
                                    <span className="icon-next" />
                                    بعدی
                                </Button>,
                                !begin &&
                                current === contents.length - 1 &&
                                !['getPhone', 'app', 'success'].includes(contents[current].question._id)
                                && <Button
                                    className={styles.button}
                                    type="primary"
                                    htmlType="submit"
                                    form="questionsForm"
                                    disabled={submitting && !submitted}
                                >
                                    ثبت درخواست
                                </Button>,
                                !begin &&
                                current > 0 &&
                                <Button
                                    className={styles.buttonBack}
                                    onClick={() => this.prev(contents)}
                                >
                                    قبلی
                                    <span className="icon-back" />
                                </Button>,
                                !begin &&
                                contents[current] &&
                                contents[current].question &&
                                contents[current].question._id === 'success' &&
                                <Button
                                    className={styles.button}
                                    onClick={this.toggleModal}
                                    htmlType="submit"
                                    form="questionsForm"
                                >
                                    باشه
                                </Button>
                            ]
                        }
                        closable
                        maskClosable={false}
                        onCancel={this.toggleModal}
                        title={!loading && loaded && !begin ? <div>
                            {
                                contents[current] && contents[current].question && contents[current].question.type !== 'success' ?
                                    <Progress
                                        percent={current === contents.length - 1 ? 100 : ((current / contentsLength) * 100)}
                                        showInfo={false}
                                        strokeWidth={20}
                                        className={styles.progressBar}
                                    /> : null
                            }
                        </div> : null
                        }
                    >
                        <form
                            name="questionsForm"
                            id="questionsForm"
                            onSubmit={(e) => {
                                this.onFormSubmit(e);
                            }}
                            ref={(c) => {
                                this.formRef = c;
                            }}
                        >
                            {
                                loading && !loaded && !begin ?
                                    <div className={styles.spinnerWrapper}><Spin /></div> : null
                            }
                            {
                                !loading && loaded && !begin
                                    ? <div
                                        className={styles.stepsContent}
                                    >
                                        {contents[current] && contents[current].content}
                                    </div> : null
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
                                        سوال کوتاه پاسخ دهید.
                                    </p>
                                </div> : null
                            }
                        </form>
                    </Modal>
                </Col>
            </Row>
        );
    }
}

export default connect(state => ({
    questions: state.questions.questions,
    questionGender: state.questions.gender,
    user: state.auth.user,
    title: state.questions.title,
    answers: state.questions.answers,
    loading: state.questions.loading,
    loaded: state.questions.loaded,
    error: state.questions.error,
    submitting: state.questions.submitting,
    submitted: state.questions.submitted,
    provinces: state.provinces.provinces,
    loadingProvinces: state.provinces.loading,
    loadedProvinces: state.provinces.loaded,
    mobile: state.auth.mobile,
    gender: state.auth.gender,
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
    setUserGenderConnect: setUserGender,
    setUserLastNameConnect: setUserLastName,
    registerConnect: register,
    verifyConnect: verify,
    submitAnswersConnect: submitAnswers,
    clearStateConnect: clearState,
    clearAnswersConnect: clearAnswers,
    getUserConnect: getUser,
    updateUserConnect: updateUser
})(Questions);
