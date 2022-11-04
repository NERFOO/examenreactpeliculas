import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';
import loading from './../assets/images/loading'

export default class Peliculas extends Component {

    state = {
        status : false ,
        datos : []
    }

    cargarComponente = () => {
        var peticion = "";
        if(this.props.nom == "PeliculasGenero") {
            peticion = this.props.nom;
        } else {
            peticion = this.props.nom;
        }
        var request = "/api/Peliculas/" + peticion + "/" + this.props.id;
        var url = Global.url + request;

        axios.get(url).then( res => {
            this.setState({
                status : true ,
                datos : res.data
            })
        })
    }
    componentDidMount = () => {
        this.cargarComponente();
    }
    componentDidUpdate = (oldProps) => {
        if(this.props.id != oldProps.id) {
            this.cargarComponente();
        }
    }

    render() {
        if(this.state.status == false) {
            return(<img src={loading} alt="cargando" style={{width:"100%"}}/>)
        } else {
            return (<div>
                <h1>Peliculas</h1>

                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>TITULO</th>
                            <th>IMAGEN</th>
                            <th>NACIONALIDAD/GENERO</th>
                            <th>DETALLES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.datos.map((dato, index) => {
                                return(<tr key={index}>
                                    <td>{dato.titulo}</td>
                                    <td>
                                        <img src={dato.foto} alt="img" style={{width:"100px"}} />
                                    </td>
                                    <td>{this.props.valor}</td>
                                    <td>
                                        <NavLink to={`/pelicula/${dato.idPelicula}`} className="btn btn-success">Detalles</NavLink>
                                        <NavLink to={`/eliminar/${dato.idPelicula}/`} className="btn btn-danger">Eliminar</NavLink>
                                        <NavLink to={`/modificar/${dato.idPelicula}/${dato.idGenero}/${dato.idNacionalidad}/${this.props.nom}`} className="btn btn-info">Modificar</NavLink>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>

            </div>)
        }
    }
}
