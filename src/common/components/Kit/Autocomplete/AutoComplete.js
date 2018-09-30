import "./AutoComplete.styl";

import { AutoComplete as AntAutoComplete } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";

import Bloodhound from "bloodhound-js";

const Option = AntAutoComplete.Option;

export default class AutoComplete extends Component {
	static propTypes = {
		options: PropTypes.arrayOf(
			PropTypes.object
		).isRequired,
		onSubmit: PropTypes.func.isRequired
	};

	state = {
		options: []
	};

	engineConf = new Bloodhound({
		initialize: true,
		local: this.props.options,
		queryTokenizer:
			Bloodhound.tokenizers.whitespace,
		datumTokenizer: obj =>
			Bloodhound.tokenizers.whitespace(
				obj.title
			),
		identify: obj => obj._id
	});

	componentDidMount() {
		this.engine = this.engineConf.initialize();
	}

	handleChange = value => {
		this.engineConf.search(value, options =>
			this.setState({
				options
			})
		);
	};

	renderOption(item) {
		return (
			<Option
				key={item._id}
				text={item.title}
			>
				{item.title}
			</Option>
		);
	}

	render() {
		const { onSubmit } = this.props;
		const { options } = this.state;

		return (
			<div className="c-autocomplete">
				<div className="c-autocomplete__form">
					<AntAutoComplete
						dataSource={options.map(
							this.renderOption
						)}
						style={{ width: 200 }}
						onChange={
							this.handleChange
						}
						onSearch={
							this.handleChange
						}
						onSelect={onSubmit}
						placeholder="به چه خدمتی نیاز دارید؟"
					>
						<input
							type="text"
							className="c-autocomplete__field"
						/>
					</AntAutoComplete>
					<button className="c-autocomplete__btn">
						ادامه
					</button>
				</div>
			</div>
		);
	}
}
