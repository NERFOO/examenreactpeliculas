import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import spider from './../assets/images/spider.jpg';
import Global from '../Global';
import axios from 'axios';

export default class Menu extends Component {

    state = {
        statusGeneros : false ,
        statusNacionalidad : false ,
        generos : [] ,
        nacionalidad : []
    }

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
    componentDidMount = () => {
        this.cargarGeneros();
        this.cargarNacionalidades();
    }

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
                                this.state.nacionalidad.map((nac, index) => {
                                    return(<li key={index}>
                                        <NavLink to={`/nacionalidad/${nac.idNacionalidad}/PeliculasNacionalidad/${nac.nombre}`} >{nac.nombre}</NavLink>
                                    </li>)
                                })
                            }
                        </ul>
                        </li>
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
