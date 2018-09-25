import React, { Component } from 'react';
import { Steps, Modal, Col, Row } from 'antd';
import Multi from './Multi';
import { connect } from 'react-redux';
import Single from './Single';

class Questions extends Component {
    state = {
        visible: true
    };

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    getContent = () => {
        const { questions } = this.props;
        return questions.questions.map(question => {
            if (question.type === 'multi' || question.type === 'mtext') {
                return {
                    title: '',
                    content: <Multi question={question} />
                }
            } else if (question.type === 'single' || question.type === 'stext') {
                return {
                    title: '',
                    content: <Single question={question} />
                };
            }
        });

    };

    handleOk = () => {
        console.log('lets submit project');
    };

    handleCancel = () => {
        console.log('submit project canceld');
    };

    render() {
        const contents = this.getContent();
        return (
            <Row>
                <Col>
                    <Modal
                        title="ثبت درخواست"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Steps progressDot>
                            {
                                contents.map(content => {
                                    return <Steps.Step
                                        title={content.title}
                                    />

                                })
                            }
                        </Steps>
                    </Modal>
                </Col>
            </Row>
        );
    }
}

export default connect(state => ({
    questions: state.questions.data
}))(Questions)