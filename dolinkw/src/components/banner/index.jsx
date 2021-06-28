import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import back from '../../imgs/icons/back.svg'
import logo from '../../imgs/logo.png'

class Banner extends Component {
    constructor(){
        super()
    }

    render(){
        return (
                <div className="fundoBanner_img" style={{backgroundImage : `url(${this.props.img})`}}>
                        <div className="banner">
                            <Link to="/" ><img src={back} onClick={this.backHome} /></Link>
                            <div className="textos">
                                <img src={logo} alt="" />
                                <h1>{this.props.titulo}</h1>
                                <p>{this.props.texto}</p>
                            </div>
                        </div>
                </div>
        )
    }
}

export default Banner