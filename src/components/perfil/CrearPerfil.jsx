import React,{useState,useEffect} from 'react'
import Preferencia from './Preferencia'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { getPreferenciasAction,setPreferenciasAction } from '../../actions/perfilActions'

const CrearPerfil = ({history}) => {

    //state
    const [error,setError] = useState(false);

    //protege vista
    const token = useSelector(state => state.auth.token);
    const perfil = useSelector(state => state.auth.perfil);
    const preferencias = useSelector(state => state.perfil.preferencias);

    //redux
    const dispatch = useDispatch();  
    //perfiles de bd para escoger  
    const perfiles = useSelector(state => state.perfil.perfiles);
    //preferencias que el usuario ha digitado para enviar a la bd
    const categorias = useSelector(state => state.perfil.categorias);

    //effect para traer los perfiles de la bd
    useEffect(() => {
        if(!token){
            history.push('/login');
        }
        else if(perfil === 1){
            history.push('/dashboard') 
        }else{
            dispatch(getPreferenciasAction());
        }
    },[]);


    //funcion para enviar las preferencias del usuario a la bd 
    const envioPreferencias = async () => {

        //funcion para comprobar si se ha elegdo una categoria de cada una
        const unico = [];
        for (let index = 0; index < categorias.length; index++) {
            if(unico.indexOf(categorias[index].categoria) > -1){

            }else{
                unico.push(categorias[index].categoria);
            }            
        }
        if(unico.length === perfiles.length){
           await dispatch(setPreferenciasAction(preferencias));
            history.push('/dashboard');
        }else{
            setError(true);
        }
        
        //dispatch(loginTokenAction()); 
        //  

    }

    return ( 
        <div className='container'>
            {perfiles.map(perfil => (
                <div>
                    <h1 className='text-center'>{perfil.categoria.nombre}</h1>
                    {perfil.preferencias.map(preferencia => (
                        <Preferencia 
                           preferencia={preferencia}
                           key={preferencia.id}
                           categoria={perfil.categoria.nombre}
                        />                        
                    ))}
                </div>
            ))}
            {error 
                ? <div class="alert alert-danger text-center" role="alert">
                        <p>Tienes que elegir al menos una categoria de cada una</p>
                    </div>
                : ''
            }
            <button className='btn btn-primary btn-block my-3' onClick={envioPreferencias}>Enviar</button>
        </div>
     );
}
 
export default CrearPerfil;