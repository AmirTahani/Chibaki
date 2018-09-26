import React, { Component } from 'react';

export default class HeroFront extends Component {
	render() {
		return (
			<div className='c-hero__front'>
				<div className="c-hero__content">
					<div className="c-hero__text">
						چی باکی
					</div>
					<div className="c-autocomplete">
						<input type="text" className="c-autocomplete__field" placeholder='تخصص' />
						<button className="c-autocomplete__btn">ثبت</button>
					</div>
				</div>
			</div>
		);
	}
}
