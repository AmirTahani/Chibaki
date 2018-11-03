import React, { Component } from 'react';
import { Link } from 'react-router';
import './Categories.styl';

export default class Categories extends Component {
    categories = [
        {
            id: 5,
            label: 'خدمات هنری',
            icon: 'icon-art'
        },
        {
            id: 3,
            label: 'ورزش و سلامت',
            icon: 'icon-sport'
        },
        {
            id: 0,
            label: 'خدمات منزل',
            icon: 'icon-house'
        },
        {
            id: 6,
            label: 'خدمات آموزشی',
            icon: 'icon-educate'
        },
        {
            id: 7,
            label: 'فنی و مهندسی',
            icon: 'icon-tech'
        },
        {
            id: 1,
            label: 'خدمات کامپیوتری',
            icon: 'icon-computer'
        },
        {
            id: 4,
            label: 'کسب و کار',
            icon: 'icon-job'
        },
        {
            id: 2,
            label: 'زبان‌های خارجه',
            icon: 'icon-lang'
        },
        {
            id: 8,
            label: 'سایر',
            icon: 'icon-other'
        }
    ];

    render() {
        const slider = this.categories.map(
            (cat) => {
                return (
                    <li
                        key={cat.label}
                        className="cat__item"
                    >
                        <Link className="cat__link" to={`/${encodeURI('خدمات')}?cat=${cat.label.split(' ').join('_')}`}>
                            <div className="cat__icon">
                                <i
                                    className={cat.icon}
                                />
                            </div>
                            <div>
                                <h2 className="cat__label">
                                    {cat.label}
                                </h2>
                            </div>
                        </Link>
                    </li>
                );
            }
        );

        return (
            <div>
                <div className="l-container l-container--md">
                    <div className="cat">
                        <ul className="cat__list">
                            {slider}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
