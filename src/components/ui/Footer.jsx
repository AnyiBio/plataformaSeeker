import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return ( 
        <>
            <div className="footer">
                <div className="container h-100">
                    <div className="row w-100 h-100 justify-content-center align-items-center text-center">
                        <div className="col-4">
                            <h3>Noticias</h3>
                            <h1 className='my-2'><FontAwesomeIcon icon="apple-alt" /></h1>
                            <h6>Mas de 30.000 noticias a tu disposicion e informacion al dia</h6>
                        </div>
                        <div className="col-4">
                            <h3>Videos</h3>
                            <h1 className='my-2'><FontAwesomeIcon icon="rocket" /></h1>
                            <h6>Miles de videos relacionados con tus intereses y todo lo que puedas buscar</h6>
                        </div>
                        <div className="col-4">
                            <h3>Artículos</h3>
                            <h1 className='my-2'><FontAwesomeIcon icon="cogs" /></h1>
                            <h6>Millones de articulos desde cuales podras tener informacion detallada para tus busquedas</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Footer;