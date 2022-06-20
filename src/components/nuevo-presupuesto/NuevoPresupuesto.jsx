import React, { useState } from "react";

import { Mensaje } from "../mensaje/Mensaje";

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

   const [ mensaje, setMensaje ] = useState('');

   const handlePresupuesto = ( e ) => {
      e.preventDefault();
      if ( !presupuesto || presupuesto < 0 ) {
         setMensaje(' No es un presupuesto válido ');
         return;
      }
      setMensaje('');
      setIsValidPresupuesto( true );
   }

   return (
      <div className="contenedor-presupuesto contenedor sombra">
         <form className="formulario" onSubmit={ handlePresupuesto }>
            <div className="campo">
               <label> Definir presupuesto </label>
               <input 
                  className="nuevo-presupuesto" 
                  type="number"
                  value={ presupuesto } 
                  placeholder="Añade tu presupuesto"
                  onChange={ e => setPresupuesto( Number(e.target.value ))} />
            </div>

            <input type="submit" value="Añadir" />
            { mensaje && <Mensaje tipo="error"> { mensaje } </Mensaje> }

         </form>
      </div>
   )
}