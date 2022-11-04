import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class DeletePelicula extends Component {

    state = {
        status : false
    }

    //FUNCION DELETE DENTRO DE UN FORM POR ELLO LA VARIABE e Y LA LINEA 14
    eliminar = (e) => {
        e.preventDefault();

        var request = "/api/Peliculas/" + this.props.idPeli;
        var url = Global.url + request;

        //ELIMINACION DE LA PELICULA
        axios.delete(url).then( res => {
            this.setState({
                status : true
            })
        })
    }

    render() {
        return (<div>
            <h1>DeletePelicula</h1>

            <form>
                <h1>¿Estás seguro de que deseaas eliminar esta pelicula?</h1>

                <button onClick={this.eliminar} className="btn btn-danger">Eliminar</button>
            </form>
            <NavLink className="btn btn-info" to={`/`}>Volver</NavLink>
        </div>)
    }
}
