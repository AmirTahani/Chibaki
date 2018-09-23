import { Link } from 'react-router';
import styled from "react-emotion";

import { HeaderHeight } from '../Header/Header.styles';
import { primaryColor } from '../../styles/vars';

export const Navigation = styled("nav")`
	// flex: 1 0 100%;
`;

export const List = styled("ul")`
	margin: 0;
	padding: 0;

	display: flex;
	flex-wrap: nowrap;

	list-style: none;
`;

export const ListItem = styled("li")`
	//margin: 0 15px;
`;

export const ListLink = styled(Link)`
	display: block;
	padding: 0 15px;

	font-size: .9rem;
	font-weight: 900;
	
	line-height: ${HeaderHeight};
	height: ${HeaderHeight};

	color: ${primaryColor};

	transition: 0s;

	&:hover {
		color: #62abf5;
	}
`;