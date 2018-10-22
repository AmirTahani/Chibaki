import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default class About extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="hero">
                    <div className="heroBg">
                        <img
                            src="https://chibaki.ir/assets/images/about/hero.jpg"
                            alt="Chibaki Team"
                        />
                    </div>
                    <div className="heroContent">
                        <div className="heroTitle">
                            درباره ما
                        </div>
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
                <Footer />
            </div>
        );
    }
}
