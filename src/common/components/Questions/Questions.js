import React, { Component } from 'react';
import { Steps, Modal, Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import { loadProvinces } from '../../redux/modules/provinces';
import { loadQuestions, setAnswer } from '../../redux/modules/questions';
import Single from './Single';
import SelectLocation from './SelectLocation';
import Multi from './Multi';
import Description from './Description';
import SingleWithDatePicker from './SingleWithDatePicker';
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
        this.props.loadQuestionsConnect('589d9c5ec38184ca3e38b3da', false);
        this.props.loadProvincesConnect();
    }

    getContent = () => {
        const {
            questions,
            provinces,
            loadedProvinces,
            loadingProvinces,
            loading,
            loaded,
            setAnswerConnect
        } = this.props;

        if (!loading && loaded) {
            return questions.map((question, index) => {
                if (question.type === 'multi' || question.type === 'mtext') {
                    return {
                        title: '',
                        content: <Multi
                            question={question}
                            setAnswer={setAnswerConnect}
                        />
                    }
                } else if (question.type === 'single' || question.type === 'stext') {
                    return {
                        title: '',
                        content: <Single
                            question={question}
                            setAnswer={setAnswerConnect}
                        />
                    };
                } else if (question.type === 'location') {
                    return {
                        title: '',
                        content: <SelectLocation
                            question={question}
                            loading={loadingProvinces}
                            provinces={provinces}
                            setAnswer={setAnswerConnect}
                            loaded={loadedProvinces}
                        />
                    };
                } else if (question.type === 'singleWithDatePicker') {
                    return {
                        title: '',
                        content: <SingleWithDatePicker
                            question={question}
                            setAnswer={setAnswerConnect}
                        />
                    };
                } else if (question.type === 'text') {
                    return {
                        title: '',
                        content: <Description
                            question={question}
                            setAnswer={setAnswerConnect}
                        />
                    };
                }
            });
        }
        return [];
    };

    handleOk = () => {
        console.log('lets submit project');
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    next = () => {
        this.setState({
            current: this.state.current + 1
        });
    };

    prev = () => {
        this.setState({
            current: this.state.current - 1
        });
    };

    render() {
        const contents = this.getContent();
        const { current } = this.state;
        return (
            <Row>
                <Col>
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        className={styles.modal}
                        onCancel={this.handleCancel}
                    >
                        <Row>
                            <Steps size="small" current={current} progressDot>
                                {
                                    contents && contents.length && contents.map(content => {
                                        return <Steps.Step
                                            title={content.title}
                                        />
                                    })
                                }
                            </Steps>
                        </Row>
                        {
                            <div className="steps-content">{contents[current] && contents[current].content}</div>
                        }
                        {
                            current < contents.length - 1
                            && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            current === contents.length - 1
                            && <Button type="primary">Done</Button>
                        }
                        {
                            current > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )
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
    title: state.questions.title,
    answers: state.questions.answers,
    loading: state.questions.loading,
    loaded: state.questions.loaded,
    error: state.questions.error,
    provinces: state.provinces.provinces,
    loadingProvinces: state.provinces.loading,
    loadedProvinces: state.provinces.loaded
}), {
    loadProvincesConnect: loadProvinces,
    loadQuestionsConnect: loadQuestions,
    setAnswerConnect: setAnswer
})(Questions)