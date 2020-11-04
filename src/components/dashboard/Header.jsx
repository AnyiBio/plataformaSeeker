import React from 'react'
import  {Navbar,Nav,Form,NavDropdown}  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOutAction } from '../../actions/authActions'
import './dashboard.styles.scss'

//redux
import { useDispatch, useSelector } from 'react-redux';

const DashHeader = () => {
    
    //redux
    const dispatch = useDispatch();
    const nombres = useSelector(state => state.auth.nombres);
    const apellidos = useSelector(state => state.auth.apellidos);

    //cierra sesion
    const cerrarSesion = () => {
        dispatch(logOutAction());
    }

    return ( 
        <Navbar className='navbar-dark' bg="dark" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ml-4">
                <Nav.Link className='link' href="#home"><FontAwesomeIcon icon="align-justify" /></Nav.Link>
                </Nav>
                <Form inline>
                <Nav>
                    <Nav.Link href="#"><FontAwesomeIcon icon="bell" /></Nav.Link>
                    <Nav.Link href="#"><FontAwesomeIcon icon="user-circle" /></Nav.Link>                    
                    <NavDropdown className='link' className='mr-4' title={nombres+' '+apellidos} id="basic-nav-dropdown">
                        <NavDropdown.Item  href="#"><FontAwesomeIcon icon="user" /> Mi Perfil</NavDropdown.Item>
                        <NavDropdown.Item  onClick={cerrarSesion}><FontAwesomeIcon icon="sign-out-alt" /> Cerrar Sesion</NavDropdown.Item>
                    </NavDropdown>
                </Nav>                
                </Form>
            </Navbar.Collapse>
        </Navbar>
     );
}
 
export default DashHeader;