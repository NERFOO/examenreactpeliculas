import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import spider from './../assets/images/spider.jpg';
import Global from '../Global';
import axios from 'axios';

export default class Menu extends Component {

    //DECLARACION DE LAS VARIABLES CAMBIANTES
    state = {
        statusGeneros : false ,
        statusNacionalidad : false ,
        generos : [] ,
        nacionalidad : []
    }

    //FUNCION PARA LA CARGA DE LOS GENEROS EN EL MENU DESPLEGABLE
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

    //FUNCION PARA LA CARGA DE LAS NACIONALIDADES EN EL MENU DESPLEGABLE
    cargarNacionalidades = () => {
        var request = "/api/Nacionalidades/";
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                statusNacionalidad : true ,
                nacionalidad : res.data
            })
        })
    }
    //COMPONENTE QUE HACE QUE CARGUEN LAS FUNCIONES AL CARGAR LA PAGINA
    componentDidMount = () => {
        this.cargarGeneros();
        this.cargarNacionalidades();
    }

    //VISUALIZACION DE DATOS
    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={spider} style={{width:"50px"}} />

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/" >Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Generos</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {
                                //RECORREMOS CON UN MAP LA VARIABLE CON TODOS LOS DATOS DE GENEROS Y PINTAMOS SU NOMBRE
                                this.state.generos.map((genero, index) => {
                                    return(<li key={index}>
                                        <NavLink to={`/genero/${genero.idGenero}/PeliculasGenero/${genero.nombre}`} >{genero.nombre}</NavLink>
                                    </li>)
                                })
                            }
                        </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Nacionalidades</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        {
                                //RECORREMOS CON UN MAP LA VARIABLE CON TODOS LOS DATOS DE NACIONALIDAD Y PINTAMOS SU NOMBRE
                                this.state.nacionalidad.map((nac, index) => {
                                    return(<li key={index}>
                                        <NavLink to={`/nacionalidad/${nac.idNacionalidad}/PeliculasNacionalidad/${nac.nombre}`} >{nac.nombre}</NavLink>
                                    </li>)
                                })
                            }
                        </ul>
                        </li>
                        {/* EL BUSCADOR ES SOLO VISUAL, NO HAY HECHO NADA */}
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </ul>
                </div>
            </div>
        </nav>)
    }
}