import React, { Component } from 'react';
import { Link } from 'react-router';
import '../Services/Services.css';
import { Row, Col, Divider } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.less'
import styles from './ProfessionalStyle.module.css'
// import professions from "../../redux/modules/professions";


class Professional extends Component {

    state = {
        selectedProfession: 0
    };

    render() {
        const { professional, comments } = this.props;
        const { selectedProfession } = this.state;
        console.log(professional)
        console.log(comments)
        return (
            <div className="Home Container">
                    <Row>
                        <Col span={24} className={styles.backred}> </Col>
                        <img src={professional.user && professional.user.trust && professional.user.trust.profilePicture && professional.user.trust.profilePicture.filePath ? 'https://chibaki.ir' + professional.user.trust.profilePicture.filePath.replace('public', '') : 'https://chibaki.ir/profile/images/unknown.jpg'} className={styles.avatar}/>
                    </Row>
                    <Row className={styles.detailContainer}>
                        <h1>{professional.user.firstname + ' ' +  professional.user.lastname}</h1>
                        <div>{professional.user.professions[selectedProfession].rateSum}</div>
                        {professional.user.professions[selectedProfession].intro
                        && professional.user.professions[selectedProfession].intro.description
                        && professional.user.professions[selectedProfession].intro.description.length > 0
                            ? <p>{professional.user.professions[selectedProfession].intro.description}</p>
                            :null
                        }
                    </Row>
                <Divider type="horizontal" />
                <Row>
                    <Col span={12}>
                        <Row className={styles.title}>
نشان ها
                        </Row>
                        <Row>
                            <Col span={24} className={professional.user.trust.addressProof.verified ? styles.activeBadge : styles.inactiveBadge}>
                                تایید آدرس
                            </Col>
                            <Col span={24} className={professional.user.trust.backgroundCheck.verified ? styles.activeBadge : styles.inactiveBadge}>
                                گواهی عدم سوء‌پیشینه
                            </Col>
                            <Col span={24} className={professional.user.trust.identity.verified &&  professional.user.trust.identity.filePath ? styles.activeBadge : styles.inactiveBadge}>
                                تایید هویت
                            </Col>
                            <Col span={24} className={professional.user.trust.certificate.verified ? styles.activeBadge : styles.inactiveBadge}>
                                مدرک تحصیلی، کارت دانشجویی و یا مدارک
                            </Col>
                            <Col span={24} className={professional.user.trust.idCard.verified ? styles.activeBadge : styles.inactiveBadge}>
                                آپلود کارت ملی
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row className={styles.title}>
تخصص ها
                        </Row>
                        <Row>
                            {professional.user.professions.map( (prof) => {
                                return (<div>
                                        {prof.profession.title}
                                </div>)
                            })}
                        </Row>
                    </Col>
                </Row>
                <Divider type="horizontal" />
                {professional.user.professions[selectedProfession].intro
                && (professional.user.professions[selectedProfession].intro.photo1
                || professional.user.professions[selectedProfession].intro.photo2
                || professional.user.professions[selectedProfession].intro.photo3
                || professional.user.professions[selectedProfession].intro.photo4
                || professional.user.professions[selectedProfession].intro.photo5
                || professional.user.professions[selectedProfession].intro.photo6)
                    ?  <Row>
                        <div className={styles.title}>
                            نمونه کارها
                        </div>
                        <div>

                            {professional.user.professions[selectedProfession] && professional.user.professions[selectedProfession].intro ?
                                Object.keys(professional.user.professions[selectedProfession].intro).map(function(key, index) {
                                    if(key.indexOf('photo') >= 0 && professional.user.professions[selectedProfession].intro[key]) {
                                        const url =  professional.user.professions[selectedProfession].intro[key].replace('public', '');
                                        return (
                                            <img src={'https://chibaki.ir' + url} className={styles.profImage}/>
                                    );

                                    }}) : null }
                        </div>
                    </Row>
                    : null
                }
                <Divider type="horizontal" />
                <Row>
                    {comments.comments
                    ?  <Col span={24}>
                        <div className={styles.title}>
                            نظر مشتریان
                        </div>
                            {comments.comments.map((comment)=>{
                                return(
                                    <Row>
                                        <Col span={16}>{comment.text}</Col>
                                        <Col span={8}>{comment.rate}</Col>
                                    </Row>
                                )
                            })}
                        </Col>
                    : null
                    }
                </Row>
            </div>
        );
    }
}
export default connect(
    state => ({
        professional: state.professional.professional,
        comments: state.professional.comments
    }),
    undefined
)(Professional)
