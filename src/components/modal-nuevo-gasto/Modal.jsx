import React, { useState, useEffect } from "react";

// Componentes
import { Mensaje } from "../mensaje/Mensaje";

// Iconos SVG
import CerrarBtn from '../../img/cerrar.svg';

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

   const [ nombre, setNombre ] = useState('');
   const [ cantidad, setCantidad ] = useState('');
   const [ categoria, setCategoria ] = useState('');
   const [ id, setId ] = useState('');
   const [ fecha, setFecha ] = useState('');
   const [ mensaje, setMensaje ] = useState('');

   useEffect( () => {
      if ( Object.keys( gastoEditar ).length ) {
         setNombre( gastoEditar.nombre );
         setCantidad( gastoEditar.cantidad );
         setCategoria( gastoEditar.categoria );
         setId( gastoEditar.id );
         setFecha( gastoEditar.fecha );
      }
   }, []);

   const handleOcultarModal = () => {
      setAnimarModal( false );
      setGastoEditar({});
      setTimeout( () => {
         setModal( false );
      }, 250 )
   }

   const handleSubmit = ( e ) => {
      e.preventDefault();
      if ([ nombre, cantidad, categoria ].includes('')) {
         setMensaje('Todos los campos son obligatorios');
         return;
      }

      setMensaje('');
      guardarGasto({ nombre, cantidad, categoria, id, fecha });
   }

   return (
      <div className="modal">

         <div className="cerrar-modal">
            <img src={ CerrarBtn } alt="Boton cerrar modal" onClick={ handleOcultarModal } />
         </div>

         <form className={`formulario ${ animarModal ? "animar" : "cerrar" }`} onSubmit={ handleSubmit }>
            <legend> { gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto' } </legend>

            { mensaje && <Mensaje tipo="error"> { mensaje } </Mensaje> }

            <div className="campo">
               <label htmlFor="nombre"> Nombre del gasto </label>
               <input id="nombre" type="text" placeholder="Añade el nombre del gasto" value={ nombre } onChange={ e => setNombre( e.target.value ) } />
            </div>

            <div className="campo">
               <label htmlFor="cantidad"> Cantidad gastada </label>
               <input id="cantidad" type="number" placeholder="Añade la cantidad gastada: ej.300" value={ cantidad } onChange={ e => setCantidad( Number(e.target.value )) } />
            </div>

            <div className="campo">
               <label htmlFor="categoria"> Categoría </label>
               <select id="categoria" value={ categoria } onChange={ e => setCategoria( e.target.value ) }>
                  <option value=""> -- Seleccione una opción -- </option>
                  <option value="ahorro"> Ahorro </option>
                  <option value="casa"> Casa </option>
                  <option value="comida"> Comida </option>
                  <option value="gastos"> Gastos varios </option>
                  <option value="ocio"> Ocio </option>
                  <option value="salud"> Salud </option>
                  <option value="suscripciones"> Suscripciones </option>
               </select>
            </div>

            <input type="submit" value={ gastoEditar.nombre ? 'Guardar cambios' : 'Nuevo gasto' } />

         </form>

      </div>
   )
}