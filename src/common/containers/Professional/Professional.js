import "../../styles/btn.styl";
import "../../styles/card.styl";
import "../Services/Services.css";

import { Button, Col, Divider, Rate, Row } from "antd";
import { connect } from "react-redux";
import React, { Component } from "react";

import Header from "../../components/Header/Header";
import styles from "./ProfessionalStyle.module.css";
import flex from "../../styles/grid.styl";

// import professions from "../../redux/modules/professions";

class Professional extends Component {
	state = {
		selectedProfession: 0
	};

	render() {
		const { professional, comments } = this.props;
		const { selectedProfession } = this.state;
		console.log(professional);
		console.log(comments);
		return (
			<div className={styles.wrapper}>
				<Header />
				<div className="l-container l-container--sm">
					<div className={styles.card}>
						<Row className={styles.card__hover}>
							<Col span={24} className={styles.cover}>
								{" "}
							</Col>
							<img
								src={
									professional.user &&
									professional.user.trust &&
									professional.user.trust.profilePicture &&
									professional.user.trust.profilePicture
										.filePath
										? "https://chibaki.ir" +
										  professional.user.trust.profilePicture.filePath.replace(
												"public",
												""
										  )
										: "https://chibaki.ir/profile/images/unknown.jpg"
								}
								className={styles.avatar}
							/>
						</Row>
						<Row
							className={styles.card__body}
							style={{ marginTop: 85 }}
						>
							<Col>
								<Row type="flex" justify="center">
									<Col>
										<h1 className={styles.userName}>
											{professional.user.firstname +
												" " +
												professional.user.lastname}
										</h1>
										<Row
											type="flex"
											justify="center"
											style={{ marginBottom: 30 }}
										>
											<Col>
												<Rate
													disabled
													defaultValue={
														professional.user
															.professions[
															selectedProfession
														].rateSum
													}
												/>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row type="flex" justify="center">
									<Col className="">
										<button className="c-btn c-btn--border c-btn--lg">
											تماس با متخصص
										</button>
									</Col>
									<Col className="">
										<button className="c-btn c-btn--border c-btn--lg">
											ارسال پیام برای متخصص
										</button>
									</Col>
									<Col className="">
										<button className="c-btn c-btn--border c-btn--lg">
											دریافت قیمت از متخصص
										</button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							<Col span={24}>
								<p className={styles.desc}>
									{professional.user.professions[
										selectedProfession
									].intro &&
									professional.user.professions[
										selectedProfession
									].intro.description &&
									professional.user.professions[
										selectedProfession
									].intro.description.length > 0
										? professional.user.professions[
												selectedProfession
										  ].intro.description
										: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."}
								</p>
							</Col>
							<Col span={24}>
								<Row type="flex" justify="center">
									<Col>
										<button className="c-btn c-btn--primary c-btn--lg">
											ثبت سفارش
										</button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							<Col span={24}>
								<Row className={styles.title}>
									<Col>اطلاعات</Col>
								</Row>
								<Row
									style={{
										flexWrap: "nowrap",
										textAlign: "center"
									}}
									type="flex"
									justify="space-around"
								>
									<Col
										className={[
											"l-flex-1-100",
											professional.user.trust.addressProof
												.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										تایید آدرس
									</Col>
									<Col
										className={[
											"l-flex-1-100",
											professional.user.trust
												.backgroundCheck.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										گواهی عدم سوء‌پیشینه
									</Col>
									<Col
										className={[
											"l-flex-1-100",
											professional.user.trust.identity
												.verified &&
											professional.user.trust.identity
												.filePath
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										تایید هویت
									</Col>
									<Col
										className={[
											"l-flex-1-100",
											professional.user.trust.certificate
												.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										مدرک تحصیلی، کارت دانشجویی و یا مدارک
									</Col>
									<Col
										className={[
											"l-flex-1-100",
											professional.user.trust.idCard
												.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										آپلود کارت ملی
									</Col>
								</Row>
							</Col>
						</Row>

						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							<Col span={24}>
								<Row className={styles.title}>تخصص ها</Row>
								<Row>
									{professional.user.professions.map(prof => {
										return (
											<div>{prof.profession.title}</div>
										);
									})}
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						{(professional.user.professions[selectedProfession]
							.intro &&
							professional.user.professions[selectedProfession]
								.intro.photo1) ||
						professional.user.professions[selectedProfession].intro
							.photo2 ||
						professional.user.professions[selectedProfession].intro
							.photo3 ||
						professional.user.professions[selectedProfession].intro
							.photo4 ||
						professional.user.professions[selectedProfession].intro
							.photo5 ||
						professional.user.professions[selectedProfession].intro
							.photo6 ? (
							<Row>
								<div className={styles.title}>نمونه کارها</div>
								<div>
									{professional.user.professions[
										selectedProfession
									] &&
									professional.user.professions[
										selectedProfession
									].intro
										? Object.keys(
												professional.user.professions[
													selectedProfession
												].intro
										  ).map(function(key, index) {
												if (
													key.indexOf("photo") >= 0 &&
													professional.user
														.professions[
														selectedProfession
													].intro[key]
												) {
													const url = professional.user.professions[
														selectedProfession
													].intro[key].replace(
														"public",
														""
													);
													return (
														<img
															src={
																"https://chibaki.ir" +
																url
															}
															className={
																styles.profImage
															}
														/>
													);
												}
										  })
										: null}
								</div>
							</Row>
						) : null}
						<Divider type="horizontal" />
						<Row>
							{comments.comments ? (
								<Col span={24}>
									<div className={styles.title}>
										نظر مشتریان
									</div>
									{comments.comments.map(comment => {
										return (
											<Row>
												<Col span={16}>
													{comment.text}
												</Col>
												<Col span={8}>
													{comment.rate}
												</Col>
											</Row>
										);
									})}
								</Col>
							) : null}
						</Row>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(state => ({
	professional: state.professional.professional,
	comments: state.professional.comments
}))(Professional);
