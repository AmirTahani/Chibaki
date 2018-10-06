import "../../styles/container.styl";
import "./Home.css";

import { connect } from "react-redux";
import React, { Component } from "react";

import { flattenProfessionsByCategories } from "../../utils/serverHelper";
import Categories from "../../components/Professions/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import HowItWorks from '../../components/Kit/HowItWorks/HowItWorks';
import ProfessionSliders from "../../components/Professions/Slider/Slider";

class Home extends Component {
	render() {
		let { professions, sliders } = this.props;
		professions = flattenProfessionsByCategories(
			professions
		);
		return (
			<div className="Home">
				<Header />

				<Hero professions={professions} />

				<Categories />

				<ProfessionSliders
					sliders={sliders}
				/>

				<HowItWorks />

				{/* <Questions /> */}
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

export default connect(state => ({
	professions: state.professions.categories,
	sliders: state.professions.professionsList
}))(Home);
