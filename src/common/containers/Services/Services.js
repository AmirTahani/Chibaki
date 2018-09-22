import React from 'react';
import { Link } from 'react-router';
import '../Services/Services.css';
import { Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css'

class Services extends React.Component {
    render() {
        const { name, cat } = this.props;
        return (
            <div className="Home Container">
                {cat.map((item)=>{
                    return(
                        <section >
                            <h2 className="services_heading">{item.category}</h2>
                            <Row>
                            {item.professions.map((it)=>{
                                return(
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
                                        <h3 className='title'>
                                            <Tooltip title={it.description}>
                                                <Link to={`/${encodeURI('خدمات')}/${it.title.split(' ').join('_')}`}>{it.title}</Link>
                                            </Tooltip>
                                        </h3>
                                    </Col>
                                )
                            })}
                            </Row>
                            <div className='seprator'/>
                        </section>

                    )
                })}
            </div>
        );
    }
}
export default connect(
    state => ({
        cat: state.professions.categories
    }),
    undefined
)(Services)
