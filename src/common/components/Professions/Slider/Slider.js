import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'antd';
import objectFitImages from 'object-fit-images';
import { Link } from 'react-router';
import './Slider.styl';


export default class ProfessionSliders extends Component {
    static propTypes = {
        sliders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
        onSelect: PropTypes.func.isRequired
    };

    state = {
        index: 0
    }

    sliderOptions = {
        lazyLoad: 1,
        pageDots: true,
        cellSelector: '.catSlider__slide',
        rightToLeft: true,
        wrapAround: true,
        groupCells: true,
        percentPosition: false,
        selectedAttraction: 0.015,
        friction: 0.2,
        freeScroll: false
    };

    Flickity = null;

    getSlider = (slider) => {
        const { Flickity } = this;
        return Flickity ? (<Flickity
            className="catSlider"
            options={this.sliderOptions}
        >
            {slider.slides.map(this.mapSlides)}
        </Flickity>) : (<div
            className="catSlider"
        >
            {slider.slides.map(this.mapSlides)}

        </div>);
    };

    mapSlides = (slide, idx) => {
        return (
            <div
                className="catSlider__slide"
                key={idx}
            >
                <Link to={`/${encodeURI('خدمات')}/${slide.label.replace(' ', '_')}`} className="catSlider__item">
                    <div className="catSlider-item__inner">
                        <div className="catSlider__bg">
                            <img
                                data-flickity-lazyload={slide.img}
                                alt={slide.label}
                            />
                        </div>
                    </div>
                    <div className="catSlider__label">
                        <h3>{slide.label}</h3>
                        <div className="catSlider__price">
                            {slide.price}
                        </div>
                    </div>
                </Link>
            </div>
        );
    };

    componentDidMount() {
        if (!this.Flickity) {
            this.Flickity = require('react-flickity-component');
            require('flickity/dist/flickity.min.css');
            this.setState({
                index: 1
            });
        }
        objectFitImages();
    }

    render() {
        return (
            <div>
                <div className="l-container l-container--sm">
                    {
                        this.props.sliders.map(
                            (slider) => {
                                return (
                                    <div
                                        className="catSlider__wrapper"
                                        key={slider.title}
                                    >
                                        <div>
                                            <h2 className="catSlider__heading">
                                                {slider.title}
                                            </h2>
                                        </div>
                                        <div className="catSlider__outer">
                                            {this.getSlider(slider)}
                                        </div>
                                    </div>
                                );
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}
