import styled from "react-emotion";

export const HeaderHeight = "60px";

const LogoHeight = "40px";
const LogoWidth = "116px";
const LogoPadding = "10px";

export const HeaderComponent = styled("header")`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;

	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);

	background-color: #fff;

	z-index: 99999;
`;

export const HeaderInner = styled("div")`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-flow: nowrap row;

	padding: 0 20px;

	@media (max-width: 992px) {
		padding: 0 10px;
	}
`;

export const Logo = styled("div")`
	height: ${HeaderHeight};
	padding: ${LogoPadding};
`;

export const LogoImg = styled("img")`
	width: ${LogoWidth};
	height: ${LogoHeight};
`;
