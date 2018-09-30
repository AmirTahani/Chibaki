import PropTypes from "prop-types";
import React, { Component } from "react";

export default class ProfessionSliders extends Component {
	static propTypes = {
		sliders: PropTypes.arrayOf(PropTypes.object)
	};

	render() {
		console.log(this.props.sliders);
		return <div>{this.props.sliders.map(slider => {
			<h2>
				{ slider.label }
			</h2>
		})}</div>;
	}
}
