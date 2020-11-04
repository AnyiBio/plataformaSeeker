import React,{useState, useEffect} from 'react'
import { Form,Button,Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './auth.styles.scss';
import { Link } from 'react-router-dom';
//action de redux
import { loginAuthAction } from '../../actions/authActions';

const Login = ({history}) => {

    //redux variables
    const loading = useSelector(state => state.auth.loading);
    const token = useSelector(state => state.auth.token);
    const error = useSelector(state => state.auth.error);
    const perfil = useSelector(state => state.auth.perfil);

    useEffect(() => {
        if(token){
            perfil > 0 ? history.push('/dashboard') : history.push('/crear_perfil');
        }
    },[token]);

    //state del componente
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });



    //destructuring
    const {email, password} = usuario;

    //utiliza useDispatch para la nueva funcion
    const dispatch = useDispatch();
    
    //submit del usuario
   const submitLogin = async e =>{
       
        e.preventDefault();


        //login
       await dispatch(loginAuthAction(usuario));
    };
    
    //funcion para cuando cambia el state
    const onChange = e =>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    };

    return (
        <>  
            <div className="login">
                <div className="w-100 h-100 row  align-items-center">
                    {/** Imagen de fondo */}
                    <div className="col-5 imagen h-100"/>

                    {/** Formulario de Login */}
                    <div className="col-7 row">
                        <div className="col-5 pl-5">
                            <h4 className='mb-4'>Iniciar Sesión</h4>
                            <Form onSubmit={submitLogin} autoComplete="off">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className='form-label'>Usuario o email</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name='email'
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                    </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label className='form-label'>Contraseña</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name='password'
                                            value={password}
                                            onChange={onChange}
                                            required
                                        />
                                </Form.Group>
                                <Button disabled={loading} className='btn-block' variant="primary" type="submit">
                                    Iniciar Sesion {loading
                                        ?   <Spinner size="sm" animation="border" role="status">
                                            </Spinner> 
                                        :  '' 
                                    }
                                </Button> 
                                {error 
                                    ? <div class="alert alert-danger mt-2 text-center" role="alert">
                                            {error}
                                        </div>
                                    : ''
                                }                                                              
                            </Form>
                            <Link  to={'/'}>Has olvidado tu contraseña?</Link>
                                <br />
                            <Link to={'/register'}>Registrate ahora Gratis</Link>
                        </div>
                    
                    </div>
                </div>
            </div>
        </>
        
     );
}
 
export default Login;