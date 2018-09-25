import React, { Component } from 'react';
import { MobileStepper } from '@material-ui/core';
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
        const { questions } = this.props;
        return (
            <MobileStepper
                steps={questions.questions.length}
            />
        );
    }
}

export default connect(state => ({
    questions: state.questions.data
}))(Questions)