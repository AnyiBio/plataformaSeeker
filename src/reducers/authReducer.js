import {
    LOADING,
    LOGIN_SUCCESS,
    LOG_OUT,
    LOGIN_FAIL
} from '../types';

//state
const initialState = {
    token:null,
    nombres:null,
    apellidos:null,
    perfil:0,
    loading:false,
    error:null,
    recarga:true,
    autenticado:false
}

export default function(state = initialState, action){
    switch(action.type){

        case LOADING:
            return{
                loading:action.payload.load,
                error:action.payload.error
            }

        case LOGIN_SUCCESS:
            return{
                ...state,
                token:action.payload.token,
                nombres:action.payload.user.nombres,
                apellidos:action.payload.user.apellidos,
                perfil:action.payload.user.perfil_verificado,
                loading:false,
                error:false,
                recarga:false,
                autenticado:true
            }

        case LOGIN_FAIL:
            return{
                ...state,
                recarga:false
            }

        case LOG_OUT:
            return{
                ...state,
                token:null,
                nombres:null,
                apellidos:null,
                loading:false,
                error:null,
                recarga:false,
                autenticado:false
            }

        default:
            return state;
    }
}