import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Rate, Row } from 'antd';
import styles from './Comments.module.styl';

export default class Comments extends Component {
    static propTypes = {
        comment: PropTypes.objectOf(PropTypes.any).isRequired
    };

    render() {
        const { comment } = this.props;
        return (
            <Row className={styles.rateItem} key={comment._id}>
                <Col span={24}>
                    <Row
                        type="flex"
                        justify="space-between"
                        align="middle"
                    >
                        <Col>
                            {this.exist(comment, 'customer.firstname')}
                            {' '}
                            {this.exist(comment, 'customer.lastname')}
                        </Col>
                        <Col>
                            <Rate
                                disabled
                                defaultValue={comment.rate}
                            />
                        </Col>
                    </Row>
                    <div>
                        {
                            this.exist(comment, 'userProfession.userProfession.title') ?
                                this.exist(comment, 'userProfession.userProfession.title') :
                                ''
                        }
                    </div>
                    <div
                        className={styles.rateText}
                    >
                        {comment && comment.text}
                    </div>
                </Col>
            </Row>
        );
    }
}
