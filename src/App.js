import React from 'react';
import './components/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home'
import DashBoard from './components/dashboard/DashBoard'
import CrearPerfil from './components/perfil/CrearPerfil'
import CargarDatos from './components/auth/CargarDatos';
import './App.css'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <CargarDatos />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/crear_perfil" component={CrearPerfil} />
            <Route exact path="/dashboard" component={DashBoard} />
          </Switch>
      </Provider>
    </Router>
  );
}

export default App;
