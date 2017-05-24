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
                cookie.save('token', token, {path: '/', maxAge: 600 });
                cookie.save('member', decoded, {path: '/', maxAge: 600 } );
                dispatch({type: LOG_IN, payload: decoded});
            })
            .catch( response => {
                console.log('error', response);
            });
    }
}

export const searchJourney = data => {
    const { to, from, date } = data;
    const { member_id } = cookie.load('member').data;
    const token = cookie.load('token');
    return (dispatch) => {
        axios.post(`/api/journey/${member_id}/${from}/${to}/${date}`, { token })
            .then(response => {
                console.log('success', response);
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