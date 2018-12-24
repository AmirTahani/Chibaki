import PropTypes from 'prop-types';
import React, { Component } from 'react';
import objectFitImages from 'object-fit-images';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.less';
import 'slick-carousel/slick/slick-theme.less';
import './Slider.styl';


export default class ProfessionSliders extends Component {
    static propTypes = {
        sliders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired
    };

    state = {
        index: 0
    };

    sliderOptions = {
        rows: 1,
        rtl: true,
        slidesPerRow: 3,
        lazyLoad: 'progressive'
    };

    getSlider = (slider) => {
        return (
            <Slider
                className="catSlider"
                {...this.sliderOptions}
            >
                {slider.slides.map(this.mapSlides)}
            </Slider>
        );
    };

    mapSlides = (slide, idx) => {
        return (
            <div
                className="catSlider__slide"
                key={idx}
            >
                <Link to={`/${encodeURI('خدمات')}/${slide.label.split(' ').join('_')}`} className="catSlider__item">
                    <div className="catSlider-item__inner">
                        <div className="catSlider__bg">
                            <img
                                alt={slide.label}
                                src={slide.img}
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
