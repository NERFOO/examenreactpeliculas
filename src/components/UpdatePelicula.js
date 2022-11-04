import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';

export default class UpdatePelicula extends Component {

    state = {
        status : false ,
        statusGeneros : false ,
        generos : [] ,
        statusPeliculas : false ,
        peliculas : [] ,
        statusPelicula : false ,
        pelicula : {} ,
        statusGenero : false ,
        genero : {}
    }

    //CARGA TODOS LOS GENEROS EN EL SELECT
    cargarGeneros = () => {
        var request = "/api/Generos/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusGeneros : true ,
                generos : res.data
            })
        })
    }
    //CARGA TODAS PELICULAS EN EL SELECT
    cargarPeliculas = () => {
        var request = "/api/Peliculas/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusPeliculas : true ,
                peliculas : res.data
            })
        })
    }

    //CARGA UNA PELICULA
    cargarPelicula = () => {
        var request = "/api/Peliculas/" + this.props.idPeli;
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusPelicula : true ,
                pelicula : res.data
            })
        })
    }
    //CARGA UN GENERO
    cargarGenero = () => {
        var request = "/api/Generos/" + this.props.idGen;
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusGenero : true ,
                genero : res.data
            })
        })
    }
    //CARGA LOS COMPONENTES AL CARGAR LA PAGINA
    componentDidMount = () => {
        this.cargarGeneros();
        this.cargarPeliculas();
        this.cargarPelicula();
        this.cargarGenero();
    }

    //DECLARACION DE REFERENCIAS PARA LOS SELECT
    genero =  React.createRef();
    pelicula =  React.createRef();

    updatePelicula = (e) => {
        e.preventDefault();

        var peticion = "";
        //CONDICION DOND COMPRUEBA SI VIENE DE GENERO O NACIONALIDAD
        //NO FUNCIONA POR QUE ES PELICULA Y NO PELICULAS
        if(this.props.nom == "PeliculasGenero") {
            peticion = this.props.idGen;

        } else {
            peticion = this.props.idNac;
        }

        //DEVUELVO LOS CAMBIOS PARA ACTUALIZAR LA PELICULA
        var cambio = {
            idPelicula : this.props.idPeli ,
            idGenero: peticion
        }

        var request = `/api/Peliculas/Update${this.props.nom}/${this.props.idPeli}/${this.props.nom}`;
        console.log(request)
        var url = Global.url + request;

        axios.put(url, cambio).then( res => {
            console.log("cambiado");
            this.setState({
                status : true
            })
        })
    }

    render() {
        if (this.state.status == true) {
            return(<Navigate to={`/pelicula/${this.props.idPeli}`} />)
        } else {
            return (<div>
                <h1>Personajes y series</h1>
                    <form>
                        <label>Seleccione un genero</label><br />
                        <select ref={this.genero} className='form-select'>
                            {
                                this.state.generos.map((gen, index) => {
                                    return(<option key={index} value={gen.idGenero}>{gen.nombre}</option>)
                                })
                            }
                        </select>
                        <br />
                        <label>Seleccione una pelicula</label><br />
                        <select ref={this.pelicula} className='form-select'>
                            {
                                this.state.peliculas.map((pel, index) => {
                                    return(<option key={index+100} value={pel.idPelicula}>{pel.titulo}</option>)
                                })
                            }
                        </select>
                            <br />
                        <button onClick={this.updatePelicula} className="btn btn-info">Guardar cambios</button>
                    </form>
            </div>)
        }
    }
}
