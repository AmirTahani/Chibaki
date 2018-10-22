import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flattenProfessionsByCategories } from '../../utils/serverHelper';
import Categories from '../../components/Professions/Categories/Categories';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Questions from '../../components/Questions/Questions';
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import GetApp from '../../components/GetApp/GetApp';
import ProfessionSliders from '../../components/Professions/Slider/Slider';
import './Home.css';

class Home extends Component {
    static propTypes = {
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        sliders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
    };

    state = {
        showQuestions: false,
        professionId: ''
    };

    handleSelect = (professionId) => {
        this.setState({
            showQuestions: true,
            professionId
        });
    };

    handleClose = () => {
        this.setState({
            showQuestions: false,
            professionId: ''
        });
    };

    render() {
        const { professions, sliders } = this.props;
        const { professionId, showQuestions } = this.state;
        return (
            <div className="Home">
                <Header />

                <Hero
                    professions={flattenProfessionsByCategories(professions)}
                    onSelect={this.handleSelect}
                />

                <Categories />

                <ProfessionSliders
                    sliders={sliders}
                    onSelect={this.handleSelect}
                />

                <HowItWorks />

                <Features />

                <GetApp />

                {
                    showQuestions && professionId ?
                        <Questions professionId={professionId} onClose={this.handleClose} /> : null
                }
                <Footer />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0="
                    crossOrigin="anonymous"
                />
            </div>
        );
    }
}

export default connect(state => ({
    professions: state.professions.categories,
    sliders: state.professions.professionsList
}))(Home);
