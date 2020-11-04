import {
    GET_PREFERENCIAS,
    AGREGAR_PREFERENCIA,
    ELIMINAR_PREFERENCIA,
    CARGAR_PREFERENCIAS,
    AGREGA_CATEGORIA,
    ELIMINA_CATEGORIA
} from '../types';

//state
const initialState = {
    perfiles:[],
    preferencias:[],
    categorias:[]
}

export default function(state = initialState, action){
    switch(action.type){

        case GET_PREFERENCIAS:
            return{
                ...state,
                perfiles:action.payload
            }
        
        case CARGAR_PREFERENCIAS:
            return{
                ...state,
                preferencias:action.payload
            }
        
        case AGREGAR_PREFERENCIA:
            return{
                ...state,
                preferencias:[...state.preferencias,action.payload]
            }
        
        case ELIMINAR_PREFERENCIA:
            return{
                ...state,
                preferencias:state.preferencias.filter(preferencia => preferencia != action.payload)
            }

        case AGREGA_CATEGORIA:
            return{
                ...state,
                categorias:[...state.categorias,action.payload]
            }

        case ELIMINA_CATEGORIA:
            return{
                ...state,
                categorias:state.categorias.filter(categoria => categoria.id != action.payload.id)
            }

        default:
            return state;
    }
}