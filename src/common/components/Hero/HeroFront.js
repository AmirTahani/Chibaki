import React, { Component } from "react";

import { AutoComplete } from '../Kit';

export default class HeroFront extends Component {
	render() {
		return (
			<div className="c-hero__front">
				<div className="c-hero__content">
					<div className="c-hero__text">
						چی باکی
					</div>
					<div className="c-autocomplete">
						<AutoComplete />
					</div>
				</div>
			</div>
		);
	}
}
