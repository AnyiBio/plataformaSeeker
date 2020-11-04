import {
    GET_PREFERENCIAS,
    CARGAR_PREFERENCIAS,
    AGREGAR_PREFERENCIA,
    ELIMINAR_PREFERENCIA,
    AGREGA_CATEGORIA,
    ELIMINA_CATEGORIA
} from '../types';

import clienteAxios from '../components/config/axios';

//funcion para traer todas las preferencias de la bd
export function getPreferenciasAction(){    
    return async(dispatch) => {
        //dispatch(loading({load:true, error:false}));
        try {
            //endpoint registrar
            const ans = await clienteAxios.get('preferencias');

            //Guarda en redux storage
            dispatch(getPreferencias(ans.data))
            

            return 1;
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para enviar las preferencias seleccionadas a la bd
export function setPreferenciasAction(preferencias){    
    return async(dispatch) => {
        //dispatch(loading({load:true, error:false}));
        try {
            //trae el token 
            const token = localStorage.getItem('token');
             const tokenDecrypy = atob(token);
            //endpoint para guardar prefeencias
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            await clienteAxios.post('preferencias',preferencias);

            const ans = await clienteAxios.get('preferencias/usuario');
            //cargar preferencias
            await dispatch(cargaPreferencia(ans.data));
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            return 0;
        }
    }
}

//funcion para agregar una preferencia al array de envio a bd
export function agregaPreferenciaAction(id){    
    return async(dispatch) => {        
        try {
            //agrega preferencia
            dispatch(agregaPreferencia({'id':id}))
            
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para eliminar una preferencia del array de envio a bd
export function eliminaPreferenciaAction(id){    
    return async(dispatch) => {        
        try {
            //agrega preferencia
            dispatch(eliminaPreferencia(id))
            
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para cargar las preferencias cuando se inicia sesion
export function cargarPreferenciaAction(){    
    return async(dispatch) => {        
        try {
            //trae el token 
            const token = localStorage.getItem('token');
            const tokenDecrypy = atob(token);
            //endpoint para cargar preferencias
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            const ans = await clienteAxios.get('preferencias/usuario');
            //cargar preferencias
            dispatch(cargaPreferencia(ans.data))
            
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para agregar una categoria al redux
export function agregarCategoriaAction(categoria){    
    return async(dispatch) => {        
        try {
            //agrega la categoria a redux store 
            dispatch(agregarCategoria(categoria))
            
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para agregar una categoria al redux
export function eliminaCategoriaAction(categoria){    
    return async(dispatch) => {        
        try {
            //agrega la categoria a redux store 
            dispatch(eliminaCategoria(categoria))
            
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

/////////**Funciones que llama el Action */

//carga todas las preferencias
const getPreferencias = perfiles => ({
    type:GET_PREFERENCIAS,
    payload:perfiles
});

//Agrega preferencia
const agregaPreferencia = id => ({
    type:AGREGAR_PREFERENCIA,
    payload:id
});

//Elimina preferencia
const eliminaPreferencia = id => ({
    type:ELIMINAR_PREFERENCIA,
    payload:id
});

//Cargar preferencias
const cargaPreferencia = id => ({
    type:CARGAR_PREFERENCIAS,
    payload:id
});

//Agrega categoria
const agregarCategoria = categoria => ({
    type:AGREGA_CATEGORIA,
    payload:categoria
});

//Elimina categoria
const eliminaCategoria = categoria => ({
    type:ELIMINA_CATEGORIA,
    payload:categoria
});

