import React, { Component } from 'react';
import logo from './../assets/images/pelis.jpg';

export default class Home extends Component {
    render() {
        return (<div>

            {/* PANTALLA DE INICIO */}
            <h1>Peliculas</h1>

            <img src={logo} alt="foto" style={{width:"100%"}}/>
        </div>)
    }
}
