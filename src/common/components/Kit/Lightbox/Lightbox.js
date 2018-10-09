import PropTypes from "prop-types";
import React, { Component } from "react";
import LightboxComponent from "react-image-lightbox";

import 'react-image-lightbox/style.css'

export default class Lightbox extends Component {
	static propTypes = {
		images: PropTypes.arrayOf(PropTypes.string)
	};

	state = {
		photoIndex: this.props.photoIndex || 0,
		isOpen: this.props.isOpen
	};

	onClose = () => {
		this.props.onClose();
	}

	render() {
		const { isOpen, images } = this.props;
		const { photoIndex } = this.state;
		return (
			<div>
				{isOpen ? (
					<LightboxComponent
						mainSrc={images[photoIndex]}
						nextSrc={images[(photoIndex + 1) % images.length]}
						prevSrc={
							images[
								(photoIndex + images.length - 1) % images.length
							]
						}
						onCloseRequest={() => this.onClose()}
						onMovePrevRequest={() =>
							this.setState({
								photoIndex:
									(photoIndex + images.length - 1) %
									images.length
							})
						}
						onMoveNextRequest={() =>
							this.setState({
								photoIndex: (photoIndex + 1) % images.length
							})
						}
					/>
				) : null}
			</div>
		);
	}
}
