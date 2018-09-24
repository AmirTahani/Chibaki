import { Link } from "react-router";
import { css } from "emotion";
import styled from "react-emotion";

import { primaryColor } from "../../styles/vars";

export const FooterInner = styled("div")`
	padding: 20px 15px;
`;

export const Copyright = styled("div")`
	text-align: center;
	padding: 10px;
`;

export const CopyrightText = styled("span")`
	font-weight: 100;
	font-size: 1.1rem;
`;

export const Logo = styled("img")`
	width: 50px;
	height: 50px;

	margin-bottom: 1.5rem;
`;

export const FooterLink = css`
	display: inline-block;

	color: #666;

	font-weight: 900;
	font-size: 1rem;

	line-height: 2;

	text-decoration: none;

	transition: 0s;

	&:hover,
	&:focus {
		color: ${primaryColor};
	}
`;

export const PageLink = styled(Link)`
	${FooterLink};

	border-bottom: 2px solid rgba(0, 0, 0, 0);

	padding: 0 1rem 0.2rem;

	&:hover,
	&:focus {
		border-bottom-color: ${primaryColor};
	}
`;

export const IconLink = styled("a")`
	${FooterLink};

	padding: 4px;

	margin: 0 4px;
`;
