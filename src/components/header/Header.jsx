import React from "react";

import { NuevoPresupuesto } from "../nuevo-presupuesto/NuevoPresupuesto";
import { ControlPresupuesto } from "../control-presupuesto/ControlPresupuesto";

export const Header = ({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) => {
   return (
      <header>
         <h1> Gestor de gastos </h1>
         {
            isValidPresupuesto ? 
            ( 
               <ControlPresupuesto 
                  presupuesto={ presupuesto } 
                  setPresupuesto={ setPresupuesto } 
                  gastos={ gastos } setGastos={ setGastos } 
                  setIsValidPresupuesto={ setIsValidPresupuesto } 
                  /> 
            ) 
            :
            ( <NuevoPresupuesto presupuesto={ presupuesto } setPresupuesto={ setPresupuesto } setIsValidPresupuesto={ setIsValidPresupuesto } /> )
         }
      </header>
   )
}