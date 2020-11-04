import React from 'react'
import Header from '../ui/Header'
import Footer from '../ui/Footer'
import './home.styles.scss'

const Home = () => {
    return ( 
        <>   
            <div className='home'>
                <div className="container h-75">                    
                    <Header />
                    <div className="row h-100 justify-content-center align-items-center">                    
                        <div className='form-group w-100'>
                            <h1 className='text-center'>PLATAFORMA SEEKER</h1>
                            <input 
                                type="text"
                                placeholder="Poderosa plataforma web de busqueda de multiples fuentes, ajustada a tus necesidades"
                                class="form-control text-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
     );
}
 
export default Home;