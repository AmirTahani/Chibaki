import "./HowItWorks.styl";
import "../../../styles/section.styl";

import { Col, Row } from "antd";
import React, { Component } from "react";

export default class HowItWorks extends Component {
	render() {
		return (
			<div>
				<div className="l-container l-container--md">
					<div className="c-howitworks">
						<Row>
							<Col>
								<h4 className="c-section__heading">
									چی باکی
									چگونه کار می
									کند
								</h4>
							</Col>
						</Row>
						<Row>
							<Col span={24} md={8}>
								<div className="c-howitworks__item">
									<div className="c-howitworks__icon">
										<i className="icon-circle icon--back" />
										<i className="icon-list icon--front" />
									</div>
									<div className="c-howitworks__text">
										<div className="c-howitworks__title">
											ثبت
											رایگان
											پروژه
										</div>
										<div className="c-howitworks__desc">
											در
											ابتدا
											مشخص
											کنید
											به چه
											متخصصی
											نیاز
											دارید
											و به
											سوالات
											ما
											پاسخ
											دهید
										</div>
									</div>
								</div>
							</Col>
							<Col span={24} md={8}>
								<div className="c-howitworks__item">
									<div className="c-howitworks__icon">
										<i className="icon-circle icon--back" />
										<i className="icon-people icon--front" />
									</div>
									<div className="c-howitworks__text">
										<div className="c-howitworks__title">
											بررسی
											و
											مقایسه
										</div>
										<div className="c-howitworks__desc">
											در عرض
											چند
											ساعت
											چندین
											پیشنهاد
											قیمت
											از
											متخصصین
											دریافت
											می
											کنید
										</div>
									</div>
								</div>
							</Col>
							<Col span={24} md={8}>
								<div className="c-howitworks__item">
									<div className="c-howitworks__icon">
										<i className="icon-circle icon--back" />
										<i className="icon-check icon--front" />
									</div>
									<div className="c-howitworks__text">
										<div className="c-howitworks__title">
											انتخاب
										</div>
										<div className="c-howitworks__desc">
											پس از
											بررسی
											قیمت,
											پروفایل,
											درصد
											اطمینان
											و ...
											, فرد
											مناسب
											را
											انتخاب
											کنید
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		);
	}
}
