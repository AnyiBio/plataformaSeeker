import React,{ useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getArticulosAction } from '../../actions/dashboardActions'
import Articulo from './Articulo'
//redux
import { useDispatch,useSelector } from 'react-redux';

const Articulos = () => {

    const dispatch = useDispatch();
    const articulos = useSelector(state => state.dash.articulos);
    const preferencias = useSelector(state => state.perfil.preferencias);
    const loadArticulos = useSelector(state => state.dash.loadArticulos);

    useEffect(() => {
        dispatch(getArticulosAction(preferencias));
    }, [preferencias])

    return (
        <div className='articulos mt-3'> 
            <div className='dasboard-header head-arti row'>
                <h2 className='icon-articulo'><FontAwesomeIcon icon="book" /></h2>
                <h3>Articulos</h3>
            </div>
            {loadArticulos
                ?   <div className='row justify-content-center align-items-center'>                                
                        <Spinner className='mt-5' size="lg" animation="border" role="status">
                        </Spinner>
                    </div>  
                : 
                    articulos.length > 0 ? articulos.map((articulo,index) => (
                        <Articulo 
                            key={index}
                            articulo={articulo}
                        />
                    )) : <h1>No se Encontraron articulos relacionados</h1>
            }
        </div>
     );
}
 
export default Articulos;