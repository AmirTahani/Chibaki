import React, { Component } from "react";
import { List, Navigation, ListItem, ListLink } from "./Nav.styles";

class Nav extends Component {
	constructor() {
		super();
		this.state = {
			navItems: [
				{
					label: "ورود",
					link: "#"
				},
				{
					label: "خدمات",
					link: encodeURI('خدمات')
				}
			]
		};
	}

	render() {
		const { navItems } = this.state;

		return (
			<Navigation>
				<List>
					{navItems.map((item, idx) => {
						return (
							<ListItem pr key={idx}>
								<ListLink to={item.link} className="c-nav__link">
									{item.label}
								</ListLink>
							</ListItem>
						);
					})}
				</List>
			</Navigation>
		);
	}
}

export default Nav;
