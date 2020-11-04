import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch,useSelector } from 'react-redux';
import { agregaMegustaAction,eliminaMegustaAction } from '../../actions/dashboardActions'

const Noticia = ({noticia}) => {

    //destructuring    
    const { title,description,url,urlToImage} = noticia;
    //redux
    const dispatch = useDispatch();
    const megustas = useSelector(state => state.dash.megusta);

    //state
    const [liked,setLiked] = useState(false);

    useEffect(() => {
        //observa si la noticia esta en el array
        if(megustas){
            megustas.map(function(e) { return e.nombre; }).indexOf(title) > -1 ? setLiked(true) : setLiked(false);
        }
    }, [megustas])

    const meGusta = titulo => {
        //si ya le dio me gusta, se elimina, de lo contrario se agrega a la bd
        if(liked){
            dispatch(eliminaMegustaAction({'proviene' : 'Noticia', 'nombre': titulo}));            
        }else{
            dispatch(agregaMegustaAction({'proviene' : 'Noticia', 'nombre': titulo}));
        }
    }

    return ( 
        <>
            <div className="row">
                <div className="col-8">
                    <h4><strong>{title}</strong></h4>
                    <p>{description.substring(0,140)}...</p>
                </div>
                <div className="col-4 ">
                    <img class="img-fluid mt-3" src={urlToImage} alt=""/>
                </div>
            </div>
            <a href={url} target="_blank">Leer más</a>
            <div className="separador d-flex justify-content-between">
                <div>
                    <span onClick={() => meGusta(title)} class="like-btn" className={liked ? 'like-active like-btn' : 'like-btn'}></span>
                </div>
                <div className='row'>                    
                    <h5 style={{color:'red'}} className='mr-4 mt-2'><FontAwesomeIcon icon="thermometer-three-quarters"/></h5>
                    <h5 style={{color:'grey'}}  className='mr-4 mt-2'><FontAwesomeIcon icon="eye" /></h5>           
                </div> 
            </div>
        </>
     );
}
 
export default Noticia;