import React from 'react';
import ReactDOM from 'react-router-dom';
import './index.css';
import logo from '../../imgs/logo.png'

const Footer = () => {

    return (
        <div>
            <footer className="footer">
                <img src={logo} alt=""/>
                <p>© 2021 Copyright - DoLink - todos os seus direitos estão garantidos!</p>
            </footer>
        </div>
    )

}

export default Footer;