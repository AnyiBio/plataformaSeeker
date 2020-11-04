import React,{ useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { agregaMegustaAction,eliminaMegustaAction } from '../../actions/dashboardActions'

//redux
import { useDispatch,useSelector } from 'react-redux';

const Articulo = ({articulo}) => {

    //formatea snippet
    const {title,snippet} = articulo
    var regex = /(<([^>]+)>)/ig
,   snippetFinal = snippet.replace(regex, "");

    //redux
    const dispatch = useDispatch();
    const megustas = useSelector(state => state.dash.megusta);

    //state
    const [liked,setLiked] = useState(false);

    //funcion al dar click en me gusta
    const meGusta = titulo => {
        //si ya le dio me gusta, se elimina, de lo contrario se agrega a la bd
        if(liked){
            dispatch(eliminaMegustaAction({'proviene' : 'Articulo', 'nombre': titulo}));            
        }else{
            dispatch(agregaMegustaAction({'proviene' : 'Articulo', 'nombre': titulo}));
        }
    }

    useEffect(() => {
        //observa si la noticia esta en el array
        if(megustas){
            megustas.map(function(e) { return e.nombre; }).indexOf(title) > -1 ? setLiked(true) : setLiked(false);
        }
    }, [megustas])
    return ( 
        <div className='articulo'>
            <h5 className='px-2 pt-1'>{title}</h5>
            <p className='px-2 pt-1'>{snippetFinal}</p>
            <div>
                <span onClick={() => meGusta(title)} class="like-btn" className={liked ? 'like-active like-btn' : 'like-btn'}></span>
            </div>
            <hr />
        </div>
     );
}
 
export default Articulo;