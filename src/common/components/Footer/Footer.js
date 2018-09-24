import { Col, Row } from "antd";
import { Link } from "react-router";
import React, { Component } from "react";

import {
	Copyright,
	CopyrightText,
	FooterInner,
	IconLink,
	Logo,
	PageLink
} from "./Footer.styles";

export default class Footer extends Component {
	static propTypes = {
		// name: PropTypes.string,
	};

	render() {
		return (
			<footer>
				<FooterInner>
					<Row
						type="flex"
						align="middle"
					>
						<Col
							md={{
								span: 8,
								order: 1
							}}
							span={24}
							order={2}
						>
							<Row
								type="flex"
								align="middle"
								justify="center"
							>
								<Col>
									<PageLink>
										تماس با ما
									</PageLink>
									<PageLink>
										درباره ما
									</PageLink>
								</Col>
								<Col>
									<IconLink
										href="https://www.instagram.com/chibaki.ir/"
										className="social__link"
										rel="nofollow noopener noreferrer"
										target="_blank"
									>
										<i className="fa fa-instagram fa-2x" />
									</IconLink>
									<IconLink
										href="https://t.me/chibaki_ir"
										className="social__link"
										rel="nofollow noopener noreferrer"
										target="_blank"
									>
										<i className="fa fa-telegram fa-2x" />
									</IconLink>
									<IconLink
										href="https://www.linkedin.com/company/jopp-ir/"
										className="social__link"
										rel="nofollow noopener noreferrer"
										target="_blank"
									>
										<i className="fa fa-linkedin fa-2x" />
									</IconLink>
									<IconLink
										href="https://twitter.com/chibaki_ir"
										className="social__link"
										rel="nofollow noopener noreferrer"
										target="_blank"
									>
										<i className="fa fa-twitter fa-2x" />
									</IconLink>
								</Col>
							</Row>
						</Col>
						<Col
							md={{
								span: 8,
								order: 2
							}}
							span={24}
							order={3}
						>
							<Copyright>
								<div>
									<Link to="/">
										<Logo
											src="/assets/images/logo/logo-1-1.svg"
											alt="Chibaki - چی‌باکی"
										/>
									</Link>
								</div>
								<CopyrightText>
									تمامی حقوق
									متعلق به
									وبسایت چی‌باکی
									می باشد
								</CopyrightText>
							</Copyright>
						</Col>
						<Col
							md={{
								span: 8,
								order: 3
							}}
							span={24}
							order={1}
						>
							{/* Badges */}
							<div />
							<div />
						</Col>
					</Row>
				</FooterInner>
			</footer>
		);
	}
}
