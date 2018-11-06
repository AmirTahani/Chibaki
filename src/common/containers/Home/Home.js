import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flattenProfessionsByCategories } from '../../utils/serverHelper';
import Categories from '../../components/Professions/Categories/Categories';
import Hero from '../../components/Hero/Hero';
import Questions from '../../components/Questions/Questions';
import ProfessionSliders from '../../components/Professions/Slider/Slider';
import './Home.css';
import { loader } from '../../redux/modules/professions';

class Home extends Component {
    static propTypes = {
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        sliders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        loadConnect: PropTypes.func.isRequired
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
        const flattenProfessions = flattenProfessionsByCategories(professions);

        return (
            <div className="Home">
                <Hero
                    professions={flattenProfessions}
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

export default connect(state => ({
    professions: state.professions.categories,
    sliders: state.professions.professionsList
}),
{
    loadConnect: loader
})(Home);
