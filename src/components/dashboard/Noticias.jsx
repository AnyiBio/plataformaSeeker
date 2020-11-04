import React,{ useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getNoticiasAction } from '../../actions/dashboardActions'
import Noticia from './Noticia'
import './dashboard.styles.scss'

//redux
import { useDispatch,useSelector } from 'react-redux';



const Noticias = () => {

    const dispatch = useDispatch();
    const noticias = useSelector(state => state.dash.noticias);
    const loadNoticias = useSelector(state => state.dash.loadNoticias);
    const noticiasTotal = useSelector(state => state.dash.noticiasTotal);
    const preferencias = useSelector(state => state.perfil.preferencias);

    useEffect(() => {
        //trae las noticias de las preferencias del usuario
        dispatch(getNoticiasAction(preferencias)); 
    }, [preferencias])

    return ( 
        <div className='noticias'>
            <div className='dasboard-header row head-noticia'>
                <h2 className='icon-noticia'><FontAwesomeIcon icon="newspaper" /></h2>
                <h3>Noticias</h3>
            </div>
            <div className="noticias-iconos row m-0 ">
                <div className="col-1 iconos-noticias p-0 justify-content-cente"/>
                <div className="col-11 p-0">
                    {loadNoticias
                        ?   <div className='row justify-content-center align-items-center'>                                
                                <Spinner className='mt-5' size="lg" animation="border" role="status">
                                </Spinner>
                            </div>  
                        :                      
                        <div className="noticia pl-4 pt-3">
                            <h4>{noticiasTotal} Resultados relacionados</h4>
                            <hr />
                            <div className='pr-3'>
                                {noticias.map((noticia,index) => (
                                    <Noticia 
                                        key={index}
                                        noticia={noticia}
                                    />
                                ))}                            
                            </div>
                        </div> 
                    }
                </div>
            </div>
        </div> 
     );
}
 
export default Noticias;