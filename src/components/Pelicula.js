import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class Pelicula extends Component {

    state = {
        status : false ,
        pelicula : {}
    }

    //CARGA LA PELICULA Y BUSCA POR EL ID QUE VIENE POR PROPS
    cargarPelicula = () => {
        var request = "/api/Peliculas/" + this.props.id;
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                status : true ,
                pelicula : res.data
            })
        })
    }
    //CARGA LA PELICULA AL INICIAR LA PAGINA
    componentDidMount = () => {
        this.cargarPelicula();
    }

    render() {
        return (<div>
            <h1>Pelicula</h1>

            <div className="card" style={{width: "18rem"}}>
                <img src={this.state.pelicula.foto} className="card-img-top" alt="" style={{width:"100%"}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.pelicula.titulo}</h5>
                    <p className="card-text">{this.state.pelicula.argumento}</p>
                    <a href={this.state.pelicula.youTube} className="btn btn-danger" target="_blank">Youtube</a>

                    <NavLink to="/" className="btn btn-info">Volver</NavLink>
                </div>
            </div>

        </div>)
    }
}
