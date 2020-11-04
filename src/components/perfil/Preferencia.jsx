import React,{useState} from 'react';
import { InputGroup } from 'react-bootstrap';

//redux
import { agregaPreferenciaAction,
        eliminaPreferenciaAction,
        agregarCategoriaAction,
        eliminaCategoriaAction } from '../../actions/perfilActions';
import { useDispatch,useSelector } from 'react-redux';

const Preferencia = ({preferencia,categoria}) => {

    //state local
    const [check,setCheck] = useState(0);

    //redux
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.perfil.categorias);

    //functions    
    const clickPreferencia =  id => {
        setCheck(!check);

        //inserta o elimina preferencia en el store de redux 
        if(check){            
            dispatch(eliminaPreferenciaAction(id));
            dispatch(eliminaCategoriaAction({'id':id,'categoria':categoria})); 
        }else{
            //agrega la categoria si no existe en categorias
            dispatch(agregarCategoriaAction({'id':id,'categoria':categoria})); 
            dispatch(agregaPreferenciaAction(id));                     
        }
    }

    return ( 
        <> 
            <InputGroup className="mb-1">
                <InputGroup.Prepend>
                <InputGroup.Checkbox onClick={() => clickPreferencia(preferencia.id)} aria-label="Checkbox for following text input" />
                </InputGroup.Prepend>
                <InputGroup.Text className='form-control'>{preferencia.nombre}</InputGroup.Text>
            </InputGroup>
        </>
     );
}
 
export default Preferencia;