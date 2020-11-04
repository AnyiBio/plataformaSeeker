import {
    LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT
} from '../types';
import clienteAxios from '../components/config/axios';
//autenticacion
export function loginAuthAction(usuario){    
    return async(dispatch) => {
        dispatch(loading({load:true, error:false}));
        try {
            //endpoint login
            const ans = await clienteAxios.post('login',usuario);

            //encrypt token y guarda localstorage
            const tokenCrypt = btoa(ans.data.token);
            ans.data.token = tokenCrypt;
            localStorage.setItem('token',ans.data.token);
            //Guarda en redux storage
            dispatch(loginSuccess(ans.data))
            
        } catch (error) {
           dispatch(loading({load:false, error:'Invalid Login'}));
        }
    }
}

export function loginTokenAction(){
    return async(dispatch) => {
        
        try {
            console.log('faillll');

            const token = localStorage.getItem('token');
            //decrypt token
            const tokenDecrypy = atob(token);
            //llama endpoint login con token
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            const ans = await clienteAxios.get('tokenlogin');

            //Guarda en redux storage
            ans.data.token = token;
            dispatch(loginSuccess(ans.data))
            
        } catch (error) {
            dispatch(loginFail());
        }
    }
}

export function logOutAction(sense){
    
    return async(dispatch,getState) => {
        try {            
            //obtiene token para decrypt y eliminar
            const { token } = getState().auth;
            const tokenDecrypy = atob(token);
            clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenDecrypy;
            clienteAxios.post('logout');            
            dispatch(loginOut());
            localStorage.removeItem('token');
        } catch (error) {
            
        }
    } 
}

export function registrarAuthAction(usuario){    
    return async(dispatch) => {
        dispatch(loading({load:true, error:false}));
        try {

            //endpoint registrar
            await clienteAxios.post('registrar',usuario);

            //Guarda en redux storage
            dispatch(loading({load:false, error:false}))
            
            return 1;
        } catch (error) {
            dispatch(loading({load:false, error:false}))
            return 0;
        }
    }
}

//Loading
const loading = loading => ({
    type:LOADING,
    payload:loading
});


//intenta loguear
const loginSuccess = usuarioDB => ({
    type:LOGIN_SUCCESS,
    payload:usuarioDB
});

//intenta loguear
const loginFail = () => ({
    type:LOGIN_FAIL
})

//logOut
const loginOut = () => ({
    type:LOG_OUT
});
