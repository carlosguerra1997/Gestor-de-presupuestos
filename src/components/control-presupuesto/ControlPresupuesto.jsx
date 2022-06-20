import React, { useState, useEffect } from "react";

// Gráficas circulares
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto }) => {

   const [ porcentaje, setPorcentaje ] = useState(0);
   const [ disponible, setDisponible ] = useState(0);
   const [ gastado, setGastado ] = useState(0);

   useEffect( () => {
      const totalGastado = gastos.reduce( ( total, gasto ) => gasto.cantidad + total, 0 );
      const totalDisponible = presupuesto - totalGastado;

      // Calcular el porcentaje gastado
      const nuevoPorcentaje = ( ( ( presupuesto - totalDisponible ) / presupuesto ) * 100).toFixed(2);

      setDisponible( totalDisponible );
      setGastado( totalGastado );
      setTimeout( () => {
         setPorcentaje( nuevoPorcentaje );
      }, 400)
   }, [ gastos ]);

   const formatToCurrency = ( cantidad ) => {
      return cantidad.toLocaleString('es-ES', {
         style: 'currency',
         currency: 'EUR'
      });
   }

   const handleResetApp = () => {
      const resultado = confirm( '¿Está seguro de que deseas reiniciar el presupuesto?' );
      if ( resultado ) {
         setGastos([]);
         setPresupuesto(0);
         setIsValidPresupuesto( false );
      }
   }

   return (
      <div className="contenedor-presupuesto contenedor sombra dos-columnas">

         <div>
            <CircularProgressbar 
               styles={ buildStyles({
                  pathColor: porcentaje > 100 ? '#DC2626' : 'blue',
                  trailColor: '#F5F5F5',
                  textColor: porcentaje > 100 ? '#DC2626' : 'blue'
               })} 
               value={ porcentaje } 
               text={ `${porcentaje}% Gastado` } />
         </div>

         <div className="contenido-presupuesto">
            <button className="reset-app" type="button" onClick={ handleResetApp } >
               Resetear APP
            </button>
            <p>
               <span> Presupuesto: </span>  { formatToCurrency( presupuesto ) }
            </p>

            <p className={` ${ disponible < 0 ? 'negativo': '' } `}>
               <span> Disponible: </span>  { formatToCurrency( disponible ) }
            </p>

            <p>
               <span> Gastado: </span>  { formatToCurrency( gastado ) }
            </p>

         </div>

      </div>
   )
}