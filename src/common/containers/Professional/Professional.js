import "../../styles/btn.styl";
import "../../styles/card.styl";
import "../Services/Services.css";

import { Col, Divider, Radio, Rate, Row } from "antd";
import { connect } from "react-redux";
import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Lightbox from "../../components/Kit/Lightbox/Lightbox";
import styles from "./ProfessionalStyle.module.css";

// import professions from "../../redux/modules/professions";

class Professional extends Component {
	onProfImageClick = (e, idx) => {
		e.preventDefault();

		this.setState({
			selectedProfPhoto: idx,
			isLightboxOpen: true
		});
	};

	onLightboxClose = () => {
		this.setState({
			isLightboxOpen: false
		});
	};

	getProfImage = () => {
		const { professional } = this.props;
		const { selectedProfession } = this.state;
		let images = [];
		if (
			professional.user.professions &&
			professional.user.professions[selectedProfession] &&
			professional.user.professions[selectedProfession].intro
		) {
			Object.keys(professional.user.professions[selectedProfession].intro).map(function(key, index) {
				if (key.indexOf("photo") >= 0 && professional.user.professions[selectedProfession].intro[key]) {
					images.push(
						"https://chibaki.ir" +
							professional.user.professions[selectedProfession].intro[key].replace("public", "")
					);
				}
			});
		}
		return images;
	};

	state = {
		selectedProfession: 0,
		selectedProfPhoto: 0,
		isLightboxOpen: false
	};

	render() {
		const { professional, comments } = this.props;
		const { selectedProfession } = this.state;
		const images = this.getProfImage();
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
									professional.user.trust.profilePicture.filePath
										? "https://chibaki.ir" +
										  professional.user.trust.profilePicture.filePath.replace("public", "")
										: "https://chibaki.ir/profile/images/unknown.jpg"
								}
								className={styles.avatar}
							/>
						</Row>
						<Row className={styles.card__body}>
							<Col>
								<Row type="flex" justify="center">
									<Col style={{ marginTop: 80 }}>
										<h1 className={styles.userName}>
											{professional.user.firstname + " " + professional.user.lastname}
										</h1>
										<Row type="flex" justify="center" style={{ marginBottom: 30 }}>
											<Col>
												<Rate
													disabled
													defaultValue={
														professional.user.professions[selectedProfession].rateSum
													}
												/>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row type="flex" justify="center">
									<Col className="">
										<button className="c-btn c-btn--border c-btn--lg">تماس با متخصص</button>
									</Col>
									<Col className="">
										<button className="c-btn c-btn--border c-btn--lg">ارسال پیام برای متخصص</button>
									</Col>
									<Col className="">
										<button className="c-btn c-btn--border c-btn--lg">دریافت قیمت از متخصص</button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							<Col span={24}>
								<p className={styles.desc}>
									{professional.user.professions[selectedProfession].intro &&
									professional.user.professions[selectedProfession].intro.description &&
									professional.user.professions[selectedProfession].intro.description.length > 0
										? professional.user.professions[selectedProfession].intro.description
										: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."}
								</p>
							</Col>
							<Col span={24}>
								<Row type="flex" justify="center">
									<Col>
										<button className="c-btn c-btn--primary c-btn--lg">ثبت سفارش</button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							<Col span={24}>
								<Row className={styles.heading}>
									<Col>اطلاعات</Col>
								</Row>
								<Row
									style={{
										textAlign: "center"
									}}
									className={styles.badgesWrapper}
									type="flex"
									justify="space-around"
								>
									<Col
										span={12}
										md={24}
										className={[
											"l-flex-shrink",
											professional.user.trust.addressProof.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										تایید آدرس
									</Col>
									<Col
										span={12}
										md={24}
										className={[
											"l-flex-shrink",
											professional.user.trust.backgroundCheck.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										گواهی عدم سوء‌پیشینه
									</Col>
									<Col
										span={12}
										md={24}
										className={[
											"l-flex-shrink",
											professional.user.trust.identity.verified &&
											professional.user.trust.identity.filePath
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										تایید هویت
									</Col>
									<Col
										span={12}
										md={24}
										className={[
											"l-flex-shrink",
											professional.user.trust.certificate.verified
												? styles.activeBadge
												: styles.inactiveBadge
										]}
									>
										مدرک تحصیلی، کارت دانشجویی و یا مدارک
									</Col>
									<Col
										span={12}
										md={24}
										className={[
											"l-flex-shrink",
											professional.user.trust.idCard.verified
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
								<Row className={styles.heading}>
									<Col span={24}>تخصص ها</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Radio.Group
											defaultValue={professional.user.professions[0].profession._id}
											className="radio-btn-round-lg"
											buttonStyle="solid"
										>
											{professional.user.professions.map((prof, idx) => {
												return (
													<Radio.Button
														defaultChecked={idx === 0 ? true : false}
														value={prof.profession._id}
													>
														{prof.profession.title}
													</Radio.Button>
												);
											})}
										</Radio.Group>
									</Col>
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						{images && images.length > 0 ? (
							<Row className={styles.card__body}>
								<Col span={24}>
									<div className={styles.heading}>نمونه کارها</div>
									<div className={styles.profImageWrapper}>
										{images.map((item, idx) => {
											return (
												<div className={styles.profImage}>
													<a href={item} onClick={e => this.onProfImageClick(e, idx)}>
														<img src={item} />
													</a>
												</div>
											);
										})}
									</div>
									<Lightbox
										images={this.getProfImage()}
										photoIndex={this.state.selectedProfPhoto}
										isOpen={this.state.isLightboxOpen}
										onClose={this.onLightboxClose}
									/>
								</Col>
							</Row>
						) : null}
						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							{comments.comments ? (
								<Col span={24}>
									<div className={styles.heading}>نظر مشتریان</div>
									<div className={styles.rateWrapper}>
										{comments.comments.map(comment => {
											return (
												<Row className={styles.rateItem}>
													<Col span={24}>
														<Row type="flex" justify="space-between" align='middle'>
															<Col>
																{comment.customer.firstname +
																	" " +
																	comment.customer.lastname}
															</Col>
															<Col>
																<Rate disabled defaultValue={comment.rate} />
															</Col>
														</Row>
														<div>
															{comment.userProfession &&
															comment.userProfession.userProfession &&
															comment.userProfession.userProfession.title
																? comment.userProfession.userProfession.title
																: ""}
														</div>
														<div className={styles.rateText}>{comment.text}</div>
													</Col>
												</Row>
											);
										})}
									</div>
								</Col>
							) : null}
						</Row>
						<Divider type="horizontal" />
						<Row
							type="flex"
							justify="center"
							className={styles.card__body}
							style={{ padding: "40px 60px 60px" }}
						>
							<Col>
								<button className="c-btn c-btn--primary c-btn--lg">ثبت سفارش</button>
							</Col>
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
