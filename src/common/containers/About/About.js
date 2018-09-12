import React from 'react';
import { Link } from 'react-router';
import '../Home/Home.css';

export default class About extends React.Component {
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
