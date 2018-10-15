import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from '../Kit';
import HeroBack from './HeroBack';
import './Hero.styl';

export default class Hero extends Component {
    static propTypes = {
        professions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        onSelect: PropTypes.func.isRequired
    };

    onAutocompleteSubmit = (profession) => {
        this.props.onSelect(profession);
    };

    render() {
        return (
            <div className="c-hero c-hero--home">
                <HeroBack />

                <div className="c-hero__front">
                    <div className="c-hero__content">
                        <div className="c-hero__text">
                            چی باکی
                        </div>
                        <AutoComplete
                            options={this.props.professions}
                            onSubmit={this.onAutocompleteSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
