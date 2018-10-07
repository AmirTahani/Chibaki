import React, { Component } from 'react';
import { Steps, Modal, Col, Row, Button, message, Progress } from 'antd';
import { connect } from 'react-redux';
import { loadProvinces } from '../../redux/modules/provinces';
import { loadQuestions, setAnswer } from '../../redux/modules/questions';
import { login, setUserMobile } from '../../redux/modules/auth';
import Single from './Single';
import SelectLocation from './SelectLocation';
import Multi from './Multi';
import Description from './Description';
import SingleWithDatePicker from './SingleWithDatePicker';
import GetPhone from './GetPhone';
import styles from './Questions.module.css'

class Questions extends Component {
    state = {
        visible: true,
        current: 0,
    };

    toggleModal = () => {
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
        this.props.loadQuestionsConnect('589d9c5ec38184ca3e38b3da', false);
        this.props.loadProvincesConnect();
    }

    getQuestions = () => {
        const { gender, questions, user } = this.props;
        if (gender === 'ask') {
            return [...questions, {
                _id: 'gender',
                title: 'جنسیت متخصص مربوطه را مشخص کنید.',
                options: [
                    { title: 'خانم' },
                    { title: 'آقا' },
                    { title: 'فرقی نمیکند' }
                ],
                type: 'single',
                skipable: false
            }]
        }
        if (!user.id) {
            return [
                ...questions, {
                    _id: 'getPhone',
                    title: 'لطفا شماره خود را وارد کنید.',
                    skipable: false,
                    type: 'getPhone'
                }
            ];
        }
        return questions;
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
            setUserMobileConnect
        } = this.props;
        const newQuestions = this.getQuestions();

        if (!loading && loaded) {
            return newQuestions.map((question, index) => {
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
                            question={question}
                            login={loginConnect}
                            setUserMobile={setUserMobileConnect}
                        />
                    };
                }
            });
        }
        return [];
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    checkHasAnswer = (question) => {
        const { answers } = this.props;
        const answer = answers[question._id];
        return !!((answer && answer.text_option) || (answer && answer.selected_options && answer.selected_options.length));
    };


    next = (contents) => {
        setTimeout(()=>{
            console.log(this.state , 'satte')
        }, 1000)
        const { current } = this.state;
        const { mobile } = this.props;
        const hasAnswer = this.checkHasAnswer(contents[current].question);
        if (mobile && contents[current].question.type === 'getPhone') {
            new Promise((resolve, reject) => {
                this.props.loginConnect(mobile, resolve, reject);
            }).then(() => {
                this.setState({
                    current: current + 1
                });
            });
        } else if (contents[current].question.skipable || hasAnswer) {
            this.setState({
                current: current + 1
            });
        } else {
            message.error('لطفا ابتدا پاسخ مناسب را انتخاب کنید.', 3)
        }
    };

    prev = () => {
        setTimeout(()=>{
            console.log(this.state, 'satte')
        }, 1000)

        this.setState({
            current: this.state.current - 1
        });
    };

    handleClick = () => {
        console.log('its here');
    };

    render() {
        const contents = this.getContent();
        const { current } = this.state;
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
                            <Progress percent={(current / contents.length - 1) * 100} showInfo={false} />
                        </Row>
                        {
                            <div className={styles.stepsContent}>{contents[current] && contents[current].content}</div>
                        }
                        <div className={styles.footer}>
                            {
                                current < contents.length - 1
                                && <Button type="primary" onClick={() => this.next(contents)}>بعدی</Button>
                            }
                            {
                                current === contents.length - 1
                                && <Button onClick={this.handleClick} type="primary">ثبت درخواست</Button>
                            }
                            {
                                current > 0 && (
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                        قبلی
                                    </Button>
                                )
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
    mobile: state.auth.mobile
}), {
    loadProvincesConnect: loadProvinces,
    loadQuestionsConnect: loadQuestions,
    setAnswerConnect: setAnswer,
    loginConnect: login,
    setUserMobileConnect: setUserMobile
})(Questions)