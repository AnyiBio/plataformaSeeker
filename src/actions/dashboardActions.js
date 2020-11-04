import {
    GET_NOTICIAS,
    LOADING_NOTICIAS,
    GET_ARTICULOS,
    LOADING_ARTICULOS,
    GET_VIDEOS,
    LOADING_VIDEOS,
    RESET_ARTICULOS,
    GET_MEGUSTA,
    AGREGA_MEGUSTA,
    ELIMINA_MEGUSTA
} from '../types';

import axios from 'axios';
import clienteAxios from '../components/config/axios';
//funcion para traer las noticias de News API
export function getNoticiasAction(preferencias){    
    return async(dispatch) => {
        dispatch(loadNoticias(true));
        try {
            //texto para busqueda
            var busqueda = preferencias[0].nombre;
            for (var i=1; i<preferencias.length; i++){ 
                busqueda = busqueda + ' OR '; 
                busqueda = busqueda + " "+ preferencias[i].nombre;
            }
            //consulta API News
            const ans = await axios.get('https://newsapi.org/v2/everything?q=('+busqueda+')&apiKey=d563a07ec373479ab97cb68f82aec890');
            
            //Guarda en redux storage
            dispatch(getNoticias(ans.data))
            dispatch(loadNoticias(false));

        } catch (error) {
            dispatch(loadNoticias(false));
        }
    }
}

//funcion para traer los articulos de wikipedia
export function getArticulosAction(preferencias){    
    return async(dispatch) => {
        dispatch(loadArticulos(true));
        try {
            //texto para busqueda

            for (var i=0; i<preferencias.length; i++){ 
               //configuracion para la api de wikipedia
                var url = "https://en.wikipedia.org/w/api.php"; 
                var params = {
                    action: "query",
                    list: "search",
                    srsearch: preferencias[i].nombre,
                    format: "json"
                };

                url = url + "?origin=*";
                Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

                //llama api de wikipedia
                fetch(url)
                .then(
                    function(response){
                        return response.json();
                    }
                )
                .then(function(response) {
                    for (var j=0; j<response.query.search.length; j++){
                        dispatch(getArticulos(response.query.search[j]));
                    }
                });
            }
            dispatch(loadArticulos(false));
        } catch (error) {
            dispatch(loadArticulos(false));
        }
    }
}

//funcion para traer los videos de Youtube API
export function getVideosAction(preferencias){    
    return async(dispatch) => {
        dispatch(loadVideos(true));
        try {
            //texto para busqueda
            var busqueda = preferencias[0].nombre;
            for (var i=1; i<preferencias.length; i++){ 
                busqueda = busqueda + ' OR '; 
                busqueda = busqueda + " "+ preferencias[i].nombre;
            }            
            //consulta API Videos            
            const ans = await axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q='+busqueda+'&type=video&key=AIzaSyBmTFqiQAqSBiaNSiK73UrL61WYMIrmpeU');            
        
            //Guarda en redux storage
            dispatch(getVideos(ans.data.items))
            dispatch(loadVideos(false));
        } catch (error) {
            dispatch(loadVideos(false));

        }
    }
}

//funcion para busqueda personalizada
export function getBuscarAction(buscar){    
    return async(dispatch) => {
        //dispatch(loading({load:true, error:false}));
        try {
            //////busca videos
            //consulta Youtube          
            const ansyoutube = await axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q='+buscar+'&type=video&key=AIzaSyBmTFqiQAqSBiaNSiK73UrL61WYMIrmpeU');         
            
            //Guarda en redux storage
            dispatch(getVideos(ansyoutube.data.items))

            /////Busca Articulos
            dispatch(resetArticulos());
            var url = "https://en.wikipedia.org/w/api.php"; 
                var params = {
                    action: "query",
                    list: "search",
                    srsearch: buscar,
                    format: "json"
                };

                url = url + "?origin=*";
                Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

                ///////llama api de wikipedia
                fetch(url)
                .then(
                    function(response){
                        return response.json();
                    }
                )
                .then(function(response) {
                    for (var j=0; j<response.query.search.length; j++){
                        dispatch(getArticulos(response.query.search[j]));
                    }
                });

                ///////Busca Noticias
                //consulta API News
                const ans = await axios.get('https://newsapi.org/v2/everything?q=('+buscar+')&apiKey=d563a07ec373479ab97cb68f82aec890');
              
                //Guarda en redux storage
                dispatch(getNoticias(ans.data));  
                
            
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para traer de la bd me gustas
export function getMegustaAction(like){    
    return async(dispatch) => {
        //dispatch(loading({load:true, error:false}));
        try {         
            const token = localStorage.getItem('token');
            const tokenDecrypy = atob(token);
            //endpoint para cargar preferencias
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            const ans = await clienteAxios.get('preferidos');            
            
            //Guarda en redux storage
            dispatch(getMeGusta(ans.data));
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            return 0;
        }
    }
}

//funcion para agregar me gusta
export function agregaMegustaAction(like){    
    return async(dispatch) => {
        //dispatch(loading({load:true, error:false}));
        try {         
            const token = localStorage.getItem('token');
            const tokenDecrypy = atob(token);
            //endpoint para cargar preferencias
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            await clienteAxios.post('preferidos',like);            
            
            //Guarda en redux storage
            dispatch(agregaMeGusta(like));
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//funcion para traer los videos de Youtube API
export function eliminaMegustaAction(like){    
    return async(dispatch) => {
        //dispatch(loading({load:true, error:false}));
        try {         
            const token = localStorage.getItem('token');
            const tokenDecrypy = atob(token);
            //endpoint para cargar preferencias
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            await clienteAxios.post('preferidos/destroy',like);            
            
            //Guarda en redux storage
            dispatch(eliminaMeGusta(like));
        } catch (error) {
            //dispatch(loading({load:false, error:false}))
            //return 0;
        }
    }
}

//carga las noticias de la api
const getNoticias = noticias => ({
    type:GET_NOTICIAS,
    payload:noticias
});

//carga los articulos de la api
const getArticulos = articulos => ({
    type:GET_ARTICULOS,
    payload:articulos
});

//carga los videos de la api
const getVideos = videos => ({
    type:GET_VIDEOS,
    payload:videos
});

//reinicia busqueda articulos
const resetArticulos = () => ({
    type:RESET_ARTICULOS
});

//Agrega me gusta de la bd
const getMeGusta = like => ({
    type:GET_MEGUSTA,
    payload:like
});

//Agrega me gusta
const agregaMeGusta = like => ({
    type:AGREGA_MEGUSTA,
    payload:like
});

//Elimina me gusta
const eliminaMeGusta = like => ({
    type:ELIMINA_MEGUSTA,
    payload:like
});

//LOADINGS
const loadNoticias = load => ({
    type:LOADING_NOTICIAS,
    payload:load
});

const loadArticulos = load => ({
    type:LOADING_ARTICULOS,
    payload:load
});

const loadVideos = load => ({
    type:LOADING_VIDEOS,
    payload:load
});