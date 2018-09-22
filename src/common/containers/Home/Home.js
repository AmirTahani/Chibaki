import React from 'react';
import { Link } from 'react-router';
import './Home.css';
import Header from "../../components/Header/Header";

class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <Header/>
            </div>
        );
    }
}

export default Home;
