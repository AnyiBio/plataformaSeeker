import React,{ useState } from 'react'
import  {InputGroup,FormControl}  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBuscarAction } from '../../actions/dashboardActions'

//redux
import { useDispatch } from 'react-redux'
const Busqueda = () => {

    //redux
    const dispatch = useDispatch();

    //state
    const [busqueda,setBusqueda] = useState('');

    const change = e => {        
        setBusqueda(e.target.value);
    }

    const buscar = () => {
        console.log('click');
        dispatch(getBuscarAction(busqueda));
    }
    return (     
        <div className="busqueda">
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon="arrow-alt-circle-down" /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    size="lg"
                    placeholder="Escribe aqui tu busqueda"
                    value={busqueda}
                    onChange={change}
                />
                <button className='btn btn-primary' onClick={buscar}>Buscar</button>
            </InputGroup>
        </div>   
     );
}
 
export default Busqueda;