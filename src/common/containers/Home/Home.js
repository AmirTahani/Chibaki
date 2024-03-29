import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Categories from '../../components/Professions/Categories/Categories';
import Hero from '../../components/Hero/Hero';
import Questions from '../../components/Questions/Questions';
import ProfessionSliders from '../../components/Professions/Slider/Slider';
import './Home.css';
import { loader } from '../../redux/modules/professions';

class Home extends Component {
    static propTypes = {
        professionsFlatChildren: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        sliders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired,
        history: PropTypes.objectOf(PropTypes.any).isRequired
    };

    state = {
        showQuestions: false,
        professionId: ''
    };

    componentDidMount() {
        if (window && window.__renderType__ === 'client') {
            this.props.loadConnect();
        }
    }

    handleSelect = (profession) => {
        this.props.history.push(`/${encodeURI('خدمات')}/${profession.title.split(' ').join('-')}-${profession._id}?province=all`);
    };

    handleClose = () => {
        this.setState({
            showQuestions: false,
            professionId: ''
        });
    };

    render() {
        const { professionsFlatChildren, sliders } = this.props;
        const { professionId, showQuestions } = this.state;

        return (
            <div className="Home">
                <Helmet>
                    <title>
                        {
                            'چی باکی - Chibaki'
                        }
                    </title>
                </Helmet>
                <Hero
                    professions={professionsFlatChildren}
                    onSelect={this.handleSelect}
                />

                <Categories />

                <ProfessionSliders
                    sliders={sliders}
                />
                {
                    showQuestions && professionId ?
                        <Questions professionId={professionId} onClose={this.handleClose} /> : null
                }
            </div>
        );
    }
}

export default withRouter(connect(state => ({
    professionsFlatChildren: state.professions.professionsFlatChildren,
    sliders: state.professions.professionsList
}),
{
    loadConnect: loader
})(Home));
