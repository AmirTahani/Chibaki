import React, { Component } from "react";

import HeroBack from "./HeroBack";
import HeroFront from "./HeroFront";

import "./Hero.styl";

export default class Hero extends Component {
	render() {
		console.log("salam hero");
		return (
			<div className="c-hero c-hero--home">
				<HeroBack />
				<HeroFront />
			</div>
		);
	}
}
