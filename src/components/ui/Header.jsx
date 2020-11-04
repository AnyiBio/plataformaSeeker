import React from 'react'
import  {Navbar,Nav}  from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ui.styles.scss';

const Header = () => {
    return ( 
        <div>
            <Navbar expand="lg">                                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Link class="nav-link" to={'/'}><Navbar.Brand className='seek'>SEEKER</Navbar.Brand></Link>
                    </Nav>
                    <Link to={'/login'}><button className='btn btn-primary'>ACCEDER</button></Link>                    
                </Navbar.Collapse>
            </Navbar>
        </div>
     );
}
 
export default Header;