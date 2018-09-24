import "./Home.css";

import React, { Component } from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Header />

				<Footer />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
					integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0="
					crossOrigin="anonymous"
				/>
			</div>
		);
	}
}

export default Home;
