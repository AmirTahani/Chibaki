import React from 'react';
import { sitePath } from '../../config';

export default class About extends React.Component {
    render() {
        return (
            <div>
                <div className="hero">
                    <div className="heroBg">
                        <img
                            src={`${sitePath}assets/images/about/hero.jpg`}
                            srcSet={`${sitePath}assets/images/about/hero-sm.jpg 320w,
                                    ${sitePath}assets/images/about/hero.jpg 600w`}
                            alt="Chibaki Team | چی باکی"
                        />
                    </div>
                    <div className="heroContent">
                        <h1 className="heroTitle">
                            درباره ما
                        </h1>
                    </div>
                </div>
                <div className="l-container">
                    <p className="aboutText">
                        هر گامی در اعتلای اقتصاد
                        برداشته شود، رفاه اجتماعی را
                        به همراه خواهد داشت. جامعه
                        سالم در سایه اشتغال، دوام می
                        یابد. این گام را هر چند کوچک،
                        ما برداشتیم. فرزندان این
                        سرزمین که خود برتافته از جمع
                        شما و از برگزیدگان دانشگاه‌های
                        معتبر این مرز و بومند، در قالب
                        گروهی متخصص، برآنند که دستان
                        خود را به دستان شما گره زده
                        انبوهی از نیازها را با درایت و
                        تخصص ویژه به همیاری یکدیگر
                        سامان بخشند. شبکه متخصص دست
                        می‌دهد، دست می‌گیرد و به دستان
                        دیگر می‌سپارد. نگاه متخصص،
                        نگاهبان کمال در فرآیند برآورده
                        شدن نیازمندی‌های جامعه در
                        تمامی زمینه‌های شغلی می‌باشد.
                        متخصص، برآیند رشد و کمال جامعه
                        و تخصص، خدمت بهینه شده آن است.
                        به ما بپیوندید، پیوند با شما
                        دوام ما و شما را تضمین می‌کند.
                    </p>
                </div>
            </div>
        );
    }
}
