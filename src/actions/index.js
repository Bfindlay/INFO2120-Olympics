import {
    LOG_IN,
    LOG_OUT
} from './types';

import axios from 'axios';
import jwt from 'jwt-decode';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';
export const logIn = auth => {
    return (dispatch) => {
        axios.post('/api/login', { auth })
            .then(response => {
                const{ token } = response.data;
                let decoded = jwt(token);
                console.log('decoded', decoded);
                cookie.save('token', token, {path: '/', maxAge: 600 });
                cookie.save('member', decoded, {path: '/', maxAge: 600 } );
                hashHistory.push('/Details');
                dispatch({type: LOG_IN, payload: decoded});
            })
            .catch( response => {
                console.log('error', response);
            });
    }
}

export const reloadUser = user => {
    console.log(user);
    return {type: LOG_IN, payload: user};
}

export const logOut = () => {
    cookie.remove('member');
    cookie.remove('token');
    return { type: LOG_OUT, payload: true };
}