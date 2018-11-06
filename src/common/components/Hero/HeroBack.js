import React, { Component } from 'react';
import objectFitImages from 'object-fit-images';

export default class HeroBack extends Component {
    state = {
        index: 0
    };

    images = [{
        path: '/assets/images/hero/home/architect.jpg',
        alt: 'نقشه کشی'
    }, {
        path: '/assets/images/hero/home/chef.jpg',
        alt: 'آشپز'
    }, {
        path: '/assets/images/hero/home/dj.jpg',
        alt: ''
    }, {
        path: '/assets/images/hero/home/handyman.jpg',
        alt: ''
    }, {
        path: '/assets/images/hero/home/seo.jpg',
        alt: 'بهینه ساز موتور جستجو'
    }, {
        path: '/assets/images/hero/home/tailor.jpg',
        alt: 'خیاط'
    }];

    sliderOptions = {
        lazyLoad: true,
        cellSelector: 'img',
        autoPlay: 3000,

        prevNextButtons: false,
        pageDots: false
    };

    getImages = () => {
        return this.images.map((item) => {
            return (<img
                className="c-hero__slide"
                data-flickity-lazyload={item.path}
                key={item.path}
                alt={item.alt}
            />);
        });
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
        const { Flickity } = this;
        return (
            <div className="c-hero__back slider--hero">
                {Flickity ? <Flickity
                    options={this.sliderOptions}
                >
                    {this.getImages()}
                </Flickity> : <div>
                    {this.getImages()}
                </div>}
            </div>
        );
    }
}
