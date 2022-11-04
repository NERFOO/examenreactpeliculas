import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Menu from './components/Menu';
import Peliculas from './components/Peliculas';
import Home from './components/Home';
import Pelicula from './components/Pelicula';
import DeletePelicula from './components/DeletePelicula';
import UpdatePelicula from './components/UpdatePelicula';

export default class Router extends Component {
    render() {

        function CargarComponente() {
            var { id, nom, valor } = useParams();
            return(<Peliculas id={id} nom={nom} valor={valor}/>)
        }

        function DetallePelicula() {
            var { id } = useParams();
            return(<Pelicula id={id}/>)
        }

        function EliminarPelicula() {
            var { idPeli } = useParams();
            return(<DeletePelicula idPeli={idPeli}/>)
        }

        function ModificarPelicula() {
            var { idPeli, idGen, idNac, nom } = useParams();
            return(<UpdatePelicula idPeli={idPeli} idGen={idGen} idNac={idNac} nom={nom}/>)
        }


        return (<div>
            <BrowserRouter>
            <Menu />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/genero/:id/:nom/:valor" element={<CargarComponente />}/>
                    <Route path="/nacionalidad/:id/:nom/:valor" element={<CargarComponente />}/>
                    <Route path="/pelicula/:id/" element={<DetallePelicula />}/>
                    <Route path="/eliminar/:idPeli/" element={<EliminarPelicula />}/>
                    <Route path="/modificar/:idPeli/:idGen/:idNac/:nom" element={<ModificarPelicula />}/>
                </Routes>
            </BrowserRouter>
        </div>)
    }
}
