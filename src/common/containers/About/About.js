import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../Home/Home.css';
import { changeName } from '../../redux/modules/test';

class About extends React.Component {

    componentDidMount() {
        this.props.changeNameConnect();
    }

    render() {
        const { name } = this.props;
        return (
            <div className="Home">
                <div className="Home-header">
                    <h2>About page</h2>
                </div>
                <p>
                    <Link to="home">{name}</Link>
                </p>
            </div>
        );
    }
}

export default connect(state => ({
    name: state.test.name
}), {
    changeNameConnect: changeName
})(About)
