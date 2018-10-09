import "./Slider.styl";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "antd";
import objectFitImages from "object-fit-images";

export default class ProfessionSliders extends Component {
	static propTypes = {
		sliders: PropTypes.arrayOf(
			PropTypes.object
		)
	};

	IS_WEB = typeof window !== "undefined";
	IS_MOBILE =
		typeof window !== "undefined" &&
		window.innerWidth < 500;

	SHOULD_INIT_SLIDER =
		this.IS_WEB && !this.IS_MOBILE;

	componentWillMount() {
		if (this.SHOULD_INIT_SLIDER) {
			require("flickity");
			require("flickity/dist/flickity.min.css");
		}
	}

	componentDidMount() {
		objectFitImages();
	}

	sliderOptions = {
		lazyLoad: 1,
		pageDots: true,
		cellSelector: ".catSlider__slide",
		rightToLeft: true,
		wrapAround: true,
		groupCells: true,
		percentPosition: false,
		selectedAttraction: 0.015,
		friction: 0.2,
		freeScroll: false
	};

	onBtnClick = profId => {
		console.log(profId);
	};

	render() {
		console.log(this.props.sliders);

		const getSlider = slider => {
			return (
				<div
					className="catSlider"
					data-flickity={JSON.stringify(
						this.sliderOptions
					)}
				>
					{slider.slides.map(mapSlides)}
				</div>
			);
		};

		const mapSlides = (slide, idx) => {
			return (
				<div
					className="catSlider__slide"
					key={idx}
				>
					<div className="catSlider__item">
						<div className="catSlider-item__inner">
							<div className="catSlider__bg">
								<img
									data-flickity-lazyload={
										slide.img
									}
									src={
										slide.img
									}
									alt={
										slide.label
									}
								/>
                            </div>

							<div className="catSlider__over">
								<Button
									type="primary"
									className="catSlider__btn"
									onClick={() =>
										this.onBtnClick(
											slide._id
										)
									}
								>
									<div>
										<span>
											ثبت
											درخواست
										</span>
									</div>
								</Button>
							</div>
						</div>
						<div className="catSlider__label">
							<h3>{slide.label}</h3>
							<div className="catSlider__price">
								{slide.price}
							</div>
						</div>
					</div>
				</div>
			);
		};

		const sliders = this.props.sliders.map(
			(slider, idx) => {
				return (
					<div
						className="catSlider__wrapper"
						key={idx}
					>
						<div>
							<h2 className="catSlider__heading">
								{slider.title}
							</h2>
						</div>
						<div className="catSlider__outer">
							{getSlider(slider)}
						</div>
					</div>
				);
			}
		);

		return (
			<div>
				<div className="l-container l-container--sm">
					{sliders}
				</div>
			</div>
		);
	}
}
