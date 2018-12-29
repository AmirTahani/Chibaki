import React, { Component } from 'react';
import objectFitImages from 'object-fit-images';
import Slider from 'react-slick';
import { LazyImage } from 'react-lazy-images';
import 'slick-carousel/slick/slick.less';
import 'slick-carousel/slick/slick-theme.less';

export default class HeroBack extends Component {
    images = [{
        path: '/assets/images/hero/home/architect.jpg',
        alt: 'نقشه کشی'
    }, {
        path: '/assets/images/hero/home/chef.jpg',
        alt: 'آشپز'
    }, {
        path: '/assets/images/hero/home/dj.jpg',
        alt: 'دی جی'
    }, {
        path: '/assets/images/hero/home/handyman.jpg',
        alt: 'تعمیر کار'
    }, {
        path: '/assets/images/hero/home/seo.jpg',
        alt: 'بهینه ساز موتور جستجو'
    }, {
        path: '/assets/images/hero/home/tailor.jpg',
        alt: 'خیاط'
    }];

    sliderOptions = {
        rows: 1,
        rtl: true,
        slidesPerRow: 1,
        autoplay: true
    };

    getImages = () => {
        return this.images.map((item) => {
            return (
                <LazyImage
                    src={item.path}
                    alt={item.alt}
                    key={item.path}
                    placeholder={({ imageProps, ref }) => (
                        <img
                            ref={ref}
                            src={'/assets/images/logo/Load-14.svg'}
                            alt={imageProps.alt}
                            className="c-hero__slide"
                        />
                    )}
                    actual={({ imageProps }) => (
                        <img
                            className="c-hero__slide"
                            {...imageProps}
                        />
                    )}
                />
            );
        });
    };

    componentDidMount() {
        objectFitImages();
    }

    render() {
        return (
            <div className="c-hero__back slider--hero">
                <Slider
                    {...this.sliderOptions}
                >
                    {this.getImages()}
                </Slider>
            </div>
        );
    }
}
