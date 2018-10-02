import React, { Component } from "react";
import "./Categories.styl";

export default class Categories extends Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	categories = [
		{
			id: 5,
			label: "خدمات هنری",
			icon: "icon-art"
		},
		{
			id: 3,
			label: "ورزش و سلامت",
			icon: "icon-sport"
		},
		{
			id: 0,
			label: "خدمات منزل",
			icon: "icon-house"
		},
		{
			id: 6,
			label: "خدمات آموزشی",
			icon: "icon-educate"
		},
		{
			id: 7,
			label: "فنی و مهندسی",
			icon: "icon-tech"
		},
		{
			id: 1,
			label: "خدمات کامپیوتری",
			icon: "icon-computer"
		},
		{
			id: 4,
			label: "کسب و کار",
			icon: "icon-job"
		},
		{
			id: 2,
			label: "زبان‌های خارجه",
			icon: "icon-lang"
		},
		{
			id: 8,
			label: "سایر",
			icon: "icon-other"
		}
	];

	render() {
		const slider = this.categories.map(
			(cat, idx) => {
				return (
					<li key={idx} className="cat__item">
						<a className="cat__link">
							<div className="cat__icon">
								<i
									className={
										cat.icon
									}
								/>
							</div>
							<div>
								<h2 className="cat__label">
									{cat.label}
								</h2>
							</div>
						</a>
					</li>
				);
			}
		);

		return (
			<div>
				<div className="cat">
					<ul className="cat__list">
						{slider}
					</ul>
				</div>
			</div>
		);
	}
}
