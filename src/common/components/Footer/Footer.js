import { Col, Row } from "antd";
import { Link } from "react-router";
import React, { Component } from "react";

import { Copyright, CopyrightText, Logo } from './Footer.styles';

export default class Footer extends Component {
	static propTypes = {
		// name: PropTypes.string,
	};

	render() {
		return (
			<footer>
				<Row type="flex" align="middle">
					<Col span={8}>
						<Row />
						<Col>
							<Link>تماس با ما</Link>
							<Link>درباره ما</Link>
						</Col>
						<Col>
							<a
								href="https://www.instagram.com/chibaki.ir/"
								class="social__link"
								rel="nofollow noopener noreferrer"
								target="_blank"
							>
								<i class="fa fa-instagram fa-2x" />
							</a>
							<a
								href="https://t.me/chibaki_ir"
								class="social__link"
								rel="nofollow noopener noreferrer"
								target="_blank"
							>
								<i class="fa fa-telegram fa-2x" />
							</a>
							<a
								href="https://www.linkedin.com/company/jopp-ir/"
								class="social__link"
								rel="nofollow noopener noreferrer"
								target="_blank"
							>
								<i class="fa fa-linkedin fa-2x" />
							</a>
							<a
								href="https://twitter.com/chibaki_ir"
								class="social__link"
								rel="nofollow noopener noreferrer"
								target="_blank"
							>
								<i class="fa fa-twitter fa-2x" />
							</a>
						</Col>
					</Col>
					<Col span={8}>
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
								تمامی حقوق متعلق به وبسایت چی‌باکی می باشد
							</CopyrightText>
						</Copyright>
					</Col>
					<Col span={8} />
				</Row>
			</footer>
		);
	}
}
