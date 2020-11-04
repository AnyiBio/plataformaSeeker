import React,{useState} from 'react'
import { Form,Button,Spinner } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import './auth.styles.scss';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
//action de redux
import { registrarAuthAction } from '../../actions/authActions';

const Register = ({history}) => {

    //redux variables
    const loading = useSelector(state => state.auth.loading);

    //states del componente
    const [usuario, setUsuario] = useState({
        nombres:'',
        apellidos:'',
        sexo:'',
        fnacimiento:'',
        celular:'',
        email:'',
        password:''
    });

    const [localError,setLocalError] = useState('');

    //destructuring
    const {nombres,apellidos,sexo,fnacimiento,celular,email,password} = usuario;

    //utiliza useDispatch para la nueva funcion
    const dispatch = useDispatch();

    
    //submit del usuario
   const  submitRegister = async e =>{
        e.preventDefault();

        //validar        
        //inicia variables de valdiacion
        var error = false;

        //proceso para la verificacion de la mayoria de edad
        let fecha1 = new Date(fnacimiento);
        let fecha2 = new Date()

        let resta = fecha2.getTime() - fecha1.getTime()

        if(Math.round(resta/ (1000*60*60*24)) < 6575){
            error = true;
            setLocalError('Debes ser mayor de edad');
        }
        
        //errores
        if(error){
            return;
        }else{
            //registrar
            var  respuesta  = await dispatch(registrarAuthAction(usuario));

            if(respuesta){
                Swal.fire({
                    title: 'Buen Trabajo',
                    text: 'Tus datos han sido Guardados Correctamente',
                    icon: 'success',
                    confirmButtonText: 'Bien'
                }).then((result) => {
                    history.push('/login');                
                })
            }else{
                setLocalError('Tu registro no se ha podido insertar');
            }

        }   
        
        
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
                            <h4 className='mb-4'>Registrate</h4>
                            <Form onSubmit={submitRegister}>
                                {/** Nombres */}
                                <Form.Group>
                                    <Form.Label className='form-label'>Nombres</Form.Label>
                                    <Form.Control 
                                        className='form-control-sm'
                                        type="text" 
                                        name='nombres'
                                        value={nombres}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                {/** Apellidos */}
                                <Form.Group>
                                    <Form.Label className='form-label'>Apellidos</Form.Label>
                                    <Form.Control 
                                        className='form-control-sm'
                                        type="text" 
                                        name='apellidos'
                                        value={apellidos}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                {/** Sexo */}
                                <Form.Group>
                                    <Form.Label className='form-label'>Sexo</Form.Label>
                                    <Form.Control 
                                        className='form-control-sm'
                                        type="text" 
                                        name='sexo'
                                        value={sexo}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                {/** Fecha de Nacimiento */}
                                <Form.Group>
                                    <Form.Label className='form-label'>Fecha de nacimiento</Form.Label>
                                    <Form.Control 
                                        className='form-control-sm'
                                        type="date" 
                                        name='fnacimiento'
                                        value={fnacimiento}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                {/** Celular */}
                                <Form.Group>
                                    <Form.Label className='form-label'>Celular</Form.Label>
                                    <Form.Control 
                                        className='form-control-sm'
                                        type="number" 
                                        name='celular'
                                        value={celular}
                                        onChange={onChange}
                                        pattern="[0-9]{10}"
                                        step="1"
                                        required
                                    />
                                </Form.Group>
                                {/** Email */}
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className='form-label'>Usuario o email</Form.Label>
                                        <Form.Control 
                                            className='form-control-sm'
                                            type="text" 
                                            name='email'
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                    </Form.Group>
                                {/** Contraseña */}
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label className='form-label'>Contraseña</Form.Label>
                                        <Form.Control 
                                            className='form-control-sm'
                                            type="password" 
                                            name='password'
                                            value={password}
                                            onChange={onChange}
                                            required
                                        />
                                </Form.Group>
                                <Button disabled={loading} className='btn-block' variant="primary" type="submit">
                                    REGISTRATE GRATIS {loading
                                        ?   <Spinner size="sm" animation="border" role="status">
                                            </Spinner> 
                                        :  '' 
                                    }
                                </Button>  
                                {localError 
                                    ? <div class="alert alert-danger mt-2 text-center" role="alert">
                                            {localError}
                                        </div>
                                    : ''
                                }                               
                            </Form>
                            <label className='form-label'>
                                Ya tienes una cuenta? 
                                <Link  to={'/login'}>Iniciar Sesión</Link> 
                            </label>                            
                        </div>{/**Cierre del div de 5 columnas para el formulario */}                    
                    </div>{/**Cierre del div principal de 7 columnas para dividir la pantalla en dos */}
                </div>{/**Cierre del row principal */} 
            </div>
        </>
     );
}
 
export default Register;