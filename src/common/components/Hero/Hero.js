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
                            <h1 className="c-hero__title">هر کاری داری بگو!</h1>
                            <h5 className="c-hero__sub">
                                از مدرس زبان و برنامه نویس تا مربی بدن سازی و نقاش ساختمان، ما مناسبترین فرد را <strong>کاملاً رایگان</strong> برای ارائه&zwnj;ی خدمت به شما معرفی می کنیم
                            </h5>
                        </div>
                        <AutoComplete
                            options={this.props.professions}
                            onSubmit={this.onAutocompleteSubmit}
                            valueAs={'obj'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
