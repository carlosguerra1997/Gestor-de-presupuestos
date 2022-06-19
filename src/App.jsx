import { useState, useEffect } from 'react';

// Componentes
import { Header } from './components/header/Header';
import { ListadoGastos } from './components/listado-gastos/ListadoGastos';
import { Modal } from './components/modal-nuevo-gasto/Modal';
import { Filtros } from './components/filtro/Filtro';

// Helpers
import { genId } from './helpers/index';

// Iconos SVG
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [presupuesto, setPresupuesto] = useState( Number( localStorage.getItem( 'presupuesto' ) ) ?? 0 );
  const [ gastos, setGastos ] = useState( 
    localStorage.getItem( 'gastos' ) ? JSON.parse( localStorage.getItem( 'gastos' ) ) : [] 
  );
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState( false );
  const [ modal, setModal ] = useState( false );
  const [ animarModal, setAnimarModal ] = useState( false );
  const[ gastoEditar, setGastoEditar ] = useState({});
  const [ filtro, setFiltro ] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([]);

  useEffect( () => {
    if ( Object.keys( gastoEditar ).length ) {
      setModal( true );
      setTimeout( () => {
        setAnimarModal( true );
      }, 250 );
    }
  }, [ gastoEditar ]);

  useEffect( () => {
    localStorage.setItem( 'presupuesto', presupuesto ?? 0 );
  }, [ presupuesto ]);

  useEffect( () => {
    localStorage.setItem( 'gastos', JSON.stringify( gastos ) ?? [] );
  }, [ gastos ]);

  useEffect( () => {
    if ( filtro ) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );
      setGastosFiltrados( gastosFiltrados );
    }
  }, [ filtro ]);

  useEffect( () => {
    const presupuestoLS = Number( localStorage.getItem( 'presupuesto' ) ) ?? 0;
    if ( presupuestoLS > 0 ) setIsValidPresupuesto( true ); 
  }, []);

  const handleNuevoGasto = () => {
    setModal( true );
    setGastoEditar({});
    setTimeout( () => {
      setAnimarModal( true );
    }, 250 );
  }

  const guardarGasto = ( gasto ) => {
    if ( gasto.id ) {
      const gastoActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState );
      setGastos( gastoActualizados );
      setGastoEditar({});
    } else {
      gasto.id = genId();
      gasto.fecha = Date.now();
      setGastos([ ...gastos, gasto ]);
    }

    setAnimarModal( false );
      setTimeout( () => {
         setModal( false );
      }, 250 );
  }

  const eliminarGasto = ( id ) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
    setGastos( gastosActualizados );
  }

  return (
    <div className={ modal ? 'fijar' : '' }>

      <Header 
        presupuesto={ presupuesto } 
        setPresupuesto={ setPresupuesto } 
        isValidPresupuesto={ isValidPresupuesto } 
        setIsValidPresupuesto={ setIsValidPresupuesto } 
        gastos={ gastos }
        setGastos={ setGastos }
      />

      {
        isValidPresupuesto && 
        ( 
          <>
            <main>
              <Filtros filtro={ filtro } setFiltro={ setFiltro } />
              <ListadoGastos 
                gastos={ gastos } 
                setGastoEditar={ setGastoEditar } 
                eliminarGasto={ eliminarGasto }
                filtro={ filtro } 
                gastosFiltrados={ gastosFiltrados } />
            </main>
            <div className="nuevo-gasto">
              <img  src={ IconoNuevoGasto } alt="Icono Nuevo Gasto" onClick={ handleNuevoGasto } />
            </div> 
          </>
        )
      }

      { modal && <Modal 
        setModal={ setModal } 
        animarModal={ animarModal } 
        setAnimarModal={ setAnimarModal } 
        guardarGasto={ guardarGasto } 
        gastoEditar={ gastoEditar } 
        setGastoEditar={ setGastoEditar } /> 
      }

    </div>
  )
}

export default App
