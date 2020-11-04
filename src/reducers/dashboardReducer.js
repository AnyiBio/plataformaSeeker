import {
    GET_NOTICIAS,
    LOADING_NOTICIAS,
    GET_ARTICULOS,
    LOADING_ARTICULOS,
    RESET_ARTICULOS,
    GET_VIDEOS,
    LOADING_VIDEOS,
    GET_MEGUSTA,
    AGREGA_MEGUSTA,
    ELIMINA_MEGUSTA
} from '../types';

//state
const initialState = {
    noticias:[],
    loadNoticias:false,
    noticiasTotal:null,
    articulos:[],
    loadArticulos:false,
    videos:[],
    loadVideos:false,
    megusta:[]
}

export default function(state = initialState, action){
    switch(action.type){

        case GET_NOTICIAS:
            return{
                ...state,
                noticias:action.payload.articles,
                noticiasTotal:action.payload.totalResults
            }

        case LOADING_NOTICIAS:
            return{
                ...state,
                loadNoticias:action.payload,
            }

        case GET_ARTICULOS:
            return{
                ...state,
                articulos:[...state.articulos,action.payload],
            }

        case LOADING_ARTICULOS:
            return{
                ...state,
                loadArticulos:action.payload,
            }

        case RESET_ARTICULOS:
            return{
                ...state,
                articulos:[],
            }
        
        case GET_VIDEOS:
            return{
                ...state,
                videos:action.payload
            }

        case LOADING_VIDEOS:
            return{
                ...state,
                loadVideos:action.payload,
            }

        case GET_MEGUSTA:
            return{
                ...state,
                megusta:action.payload
            }
        
        case AGREGA_MEGUSTA:
            return{
                ...state,
                megusta:[...state.megusta,action.payload]
            }
        
        case ELIMINA_MEGUSTA:
            return{
                ...state,
                megusta:state.megusta.filter(gusta => gusta.nombre !== action.payload.nombre)
            }

        default:
            return state;
    }
}