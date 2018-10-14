import "antd/dist/antd.less";
import "./App.styl";
import "../../styles/container.styl";
import "../../styles/grid.styl";
import "../../styles/icon.styl";
import "../../styles/App.styl";

import { Router, Route, browserHistory } from "react-router";
import React from "react";

import { Home, About, Services, Tos, Service, Professional,ContactUs } from "../";

const Routes = props => {
	return (
		<Router history={browserHistory} {...props}>
			<Route path="/" component={Home} />
			<Route path="home" component={Home} />
			<Route path="about" component={About} />
			<Route path="tos" component={Tos} />
			<Route path="contactus" component={ContactUs} />
			<Route exact path={encodeURI("خدمات")} component={Services} />
			<Route path={`${encodeURI("خدمات")}/:title`} component={Service} />
			<Route path={`professional/:id`} component={Professional} />
		</Router>
	);
};

export default Routes;
