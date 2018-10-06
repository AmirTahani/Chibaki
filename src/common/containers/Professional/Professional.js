import "antd/dist/antd.less";

import "../../styles/card.styl";
import "../../styles/btn.styl";
import "../Services/Services.css";

import { Col, Divider, Rate, Row } from "antd";
import { connect } from "react-redux";
import React, { Component } from "react";

import Header from "../../components/Header/Header";
import styles from "./ProfessionalStyle.module.css";

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
							style={{ "margin-top": 85 }}
						>
							<Col>
								<Row type="flex" justify="center">
									<Col>
										<h1>
											{professional.user.firstname +
												" " +
												professional.user.lastname}
										</h1>
										<Row type="flex" justify="center" style={{ 'margin-bottom': 30 }}>
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
								<Row
									type="flex"
									className="l-flex-row l-flex-wrap"
									justify='center'
								>
									<Col className="">
										<button className="c-btn c-btn--round c-btn--border">
											تماس با متخصص
										</button>
									</Col>
									<Col className="">
										<button className="c-btn c-btn--round c-btn--border">
											ارسال پیام برای متخصص
										</button>
									</Col>
									<Col className="">
										<button className="c-btn c-btn--round c-btn--border">
											دریافت قیمت از متخصص
										</button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Divider type="horizontal" />
						<Row className={styles.card__body}>
							{professional.user.professions[selectedProfession]
								.intro &&
							professional.user.professions[selectedProfession]
								.intro.description &&
							professional.user.professions[selectedProfession]
								.intro.description.length > 0 ? (
								<p>
									{
										professional.user.professions[
											selectedProfession
										].intro.description
									}
								</p>
							) : (
								"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."
							)}
						</Row>
						<Divider type="horizontal" />
						<Row>
							<Col span={12}>
								<Row className={styles.title}>نشان ها</Row>
								<Row>badge</Row>
							</Col>
							<Col span={12}>
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
									].intro.photo1 ? (
										<img
											src={
												"https://chibaki.ir" +
												professional.user.professions[
													selectedProfession
												].intro.photo1.replace(
													"public",
													""
												)
											}
											className={styles.profImage}
										/>
									) : null}
									{professional.user.professions[
										selectedProfession
									].intro.photo2 ? (
										<img
											src={
												"https://chibaki.ir" +
												professional.user.professions[
													selectedProfession
												].intro.photo2.replace(
													"public",
													""
												)
											}
											className={styles.profImage}
										/>
									) : null}
									{professional.user.professions[
										selectedProfession
									].intro.photo3 ? (
										<img
											src={
												"https://chibaki.ir" +
												professional.user.professions[
													selectedProfession
												].intro.photo3.replace(
													"public",
													""
												)
											}
											className={styles.profImage}
										/>
									) : null}
									{professional.user.professions[
										selectedProfession
									].intro.photo4 ? (
										<img
											src={
												"https://chibaki.ir" +
												professional.user.professions[
													selectedProfession
												].intro.photo4.replace(
													"public",
													""
												)
											}
											className={styles.profImage}
										/>
									) : null}
									{professional.user.professions[
										selectedProfession
									].intro.photo5 ? (
										<img
											src={
												"https://chibaki.ir" +
												professional.user.professions[
													selectedProfession
												].intro.photo5.replace(
													"public",
													""
												)
											}
											className={styles.profImage}
										/>
									) : null}
									{professional.user.professions[
										selectedProfession
									].intro.photo6 ? (
										<img
											src={
												"https://chibaki.ir" +
												professional.user.professions[
													selectedProfession
												].intro.photo6.replace(
													"public",
													""
												)
											}
											className={styles.profImage}
										/>
									) : null}
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
