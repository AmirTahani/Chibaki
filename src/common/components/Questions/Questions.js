import React, { PureComponent } from 'react';
import { Modal, Col, Row, Button, message, Progress } from 'antd';
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
import styles from './Questions.module.css';
import GetName from './GetName';
import Success from './Success';

class Questions extends PureComponent {
    state = {
        visible: true,
        current: 0,
        questions: [],
        shouldRegister: false
    };

    toggleModal = () => {
        this.props.onClose();
        this.setState({
            visible: !this.state.visible
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
        if (!user.id) {
            newQuestions = [...newQuestions, {
                _id: 'getPhone',
                title: 'لطفا شماره خود را وارد کنید.',
                skipable: false,
                type: 'getPhone'
            }];
        }
        this.setState({
            questions: newQuestions
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
            return questions.map(question => {
                if (question.type === 'multi' || question.type === 'mtext') {
                    return {
                        title: '',
                        question: question,
                        content: <Multi
                            question={question}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                        />
                    }
                } else if (question.type === 'single' || question.type === 'stext') {
                    return {
                        title: '',
                        question: question,
                        content: <Single
                            question={question}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                        />
                    };
                } else if (question.type === 'location') {
                    return {
                        title: '',
                        question: question,
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
                        question: question,
                        content: <SingleWithDatePicker
                            question={question}
                            answers={answers}
                            setAnswer={setAnswerConnect}
                        />
                    };
                } else if (question.type === 'text') {
                    return {
                        title: '',
                        question: question,
                        content: <Description
                            question={question}
                            setAnswer={setAnswerConnect}
                            answers={answers}
                        />
                    };
                } else if (question.type === 'getPhone') {
                    return {
                        title: '',
                        question: question,
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
                        question: question,
                        content: <Verify
                            question={question}
                            answers={answers}
                            setUserCode={setUserCodeConnect}
                        />
                    };
                } else if (question.type === 'getName') {
                    return {
                        title: '',
                        question: question,
                        content: <GetName
                            question={question}
                            setUserName={setUserNameConnect}
                            setUserLastName={setUserLastNameConnect}
                        />
                    };
                } else if (question.type === 'success') {
                    return {
                        title: '',
                        question: question,
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


    next = (contents) => {
        const { current } = this.state;
        const { mobile, firstName, lastName, registerConnect, code, verifyConnect, submitAnswersConnect } = this.props;
        const hasAnswer = this.checkHasAnswer(contents[current].question);
        if (mobile && contents[current].question.type === 'getPhone') {
            new Promise((resolve, reject) => {
                this.props.loginConnect(mobile, resolve, reject);
            }).then(() => {
                this.setState({
                    questions: [...this.state.questions, {
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
                            questions: [...this.state.questions, {
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
        }
        else if (firstName && lastName && contents[current].question.type === 'getName') {
            new Promise((resolve, reject) => {
                registerConnect({ firstName, lastName, mobile }, resolve, reject);
            }).then(() => {
                this.setState({
                    current: current + 1
                });
            })
        }
        else if (code && contents[current].question.type === 'verify') {
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
                        }]
                    });
                });
            });
        }
        else if (contents[current].question._id === 'location' && current === contents.length - 1) {
            new Promise((resolve, reject) => {
                submitAnswersConnect(resolve, reject);
            }).then(() => {
                this.setState({
                    questions: [...this.state.questions, {
                        _id: 'success',
                        type: 'success',
                        title: 'درخواست شما با موفقیت ثبت شد.'
                    }]
                });
            });
        }
        else if (contents[current].question.skipable || hasAnswer) {
            this.setState({
                current: current + 1
            });
        }
        else {
            message.error('لطفا ابتدا پاسخ مناسب را انتخاب کنید.', 3)
        }
    };

    prev = () => {
        this.setState({
            current: this.state.current - 1
        });
    };

    handleClick = () => {
        this.props.submitAnswersConnect();
    };

    render() {

        const { current, shouldRegister } = this.state;
        const contents = this.getContent();
        const contentsLength = shouldRegister ? contents.length + 1 : contents.length;
        return (
            <Row>
                <Col>
                    <Modal
                        visible={this.state.visible}
                        className={styles.modal}
                        footer={null}
                        closable={false}
                    >
                        <button className={styles.closeButton} onClick={() => this.toggleModal()}>X</button>
                        <Row>
                            <Progress percent={((current / contentsLength) * 100)} showInfo={false} />
                        </Row>
                        <div className={styles.stepsContent}>{contents[current] && contents[current].content}</div>
                        <div className={styles.footer}>
                            {
                                (
                                    current < contents.length - 1 ||
                                    (
                                        contents[current] &&
                                        contents[current].question &&
                                        contents[current].question._id === 'getPhone'
                                    )
                                )
                                && <Button className={styles.button} onClick={() => this.next(contents)}>
                                    <Icon iconName="next" />
                                </Button>
                            }
                            {
                                current === contents.length - 1 &&
                                contents[current].question._id !== 'getPhone' &&
                                <Button onClick={this.handleClick} type="primary">ثبت درخواست</Button>
                            }
                            {
                                current > 0 && <Button className={styles.button} onClick={() => this.prev()}>
                                    <Icon iconName="back" />
                                </Button>
                            }
                        </div>
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
})(Questions)