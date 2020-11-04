import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { loginTokenAction } from '../../actions/authActions'
import { cargarPreferenciaAction } from '../../actions/perfilActions'


const CargarDatos = () => {

    //redux
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
        
        dispatch(loginTokenAction()); 
        if(token){
           dispatch(cargarPreferenciaAction()); 
        }
    },[token]);

    return ( 
        <>

        </>
     );
}
 
export default CargarDatos;