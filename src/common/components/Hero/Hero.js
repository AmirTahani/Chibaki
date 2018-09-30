import "./Hero.styl";

import React, { Component } from "react";

import { AutoComplete } from "../Kit";
import HeroBack from "./HeroBack";

export default class Hero extends Component {
	onAutocompleteSubmit = profession => {
		console.log(profession);
	};

	render() {
		return (
			<div className="c-hero c-hero--home">
				<HeroBack />

				<div className="c-hero__front">
					<div className="c-hero__content">
						<div className="c-hero__text">
							چی باکی
						</div>
						<AutoComplete
							options={
								this.props
									.professions
							}
							onSubmit={
								this
									.onAutocompleteSubmit
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}
