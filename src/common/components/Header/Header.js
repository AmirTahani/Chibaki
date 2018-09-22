import React, { Component } from "react";
import Nav from "../Nav/Nav";
import { HeaderComponent, HeaderInner, Logo, LogoImg } from "./Header.styles";

class Header extends Component {
	render() {
		return (
			<HeaderComponent>
				<HeaderInner>
					<Nav />

					<Logo>
						<div className="sr-only">چی باکی</div>
						<LogoImg src="/assets/images/logo/logo-text.svg" />
					</Logo>
				</HeaderInner>
			</HeaderComponent>
		);
	}
}

export default Header;
