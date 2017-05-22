import {
    LOG_IN
} from './types';

import axios from 'axios';
import jwt from 'jwt-decode';

export const logIn = auth => {
    return (dispatch) => {
        axios.post('/api/login', { auth })
            .then(response => {
                const{ token } = response.data;
                let decoded = jwt(token); 
                dispatch({type: LOG_IN, payload: decoded})
            })
            .catch( response => {
                console.log('error', response);
            });
    }
}