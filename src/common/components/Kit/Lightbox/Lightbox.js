import PropTypes from "prop-types";
import React, { Component } from "react";

import LightboxComponent from "react-image-lightbox";

export default class Lightbox extends Component {
	static propTypes = {
		images: PropTypes.arrayOf(PropTypes.string),
		photoIndex: PropTypes.number,
		isOpen: PropTypes.bool
	};

	state = {
		photoIndex: this.props.photoIndex || 0
	};

	onClose = () => {
		this.props.onClose();
	};

	render() {
		const { images } = this.props;
		const { photoIndex } = this.state;

		return (
			<div>
				<LightboxComponent
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => this.onClose()}
					onMovePrevRequest={() =>
						this.setState({
							photoIndex: (photoIndex + images.length - 1) % images.length
						})
					}
					onMoveNextRequest={() =>
						this.setState({
							photoIndex: (photoIndex + 1) % images.length
						})
					}
				/>
			</div>
		);
	}
}
