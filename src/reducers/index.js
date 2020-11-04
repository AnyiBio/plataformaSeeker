import { combineReducers } from 'redux';
import authReducer from './authReducer';
import perfilReducer from './perfilReducer';
import dashboardReducer from './dashboardReducer';

export default combineReducers({
    auth:authReducer,
    perfil:perfilReducer,
    dash:dashboardReducer
});
