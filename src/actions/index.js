import {
    LOG_IN,
    LOG_OUT,
    MEMBER_DETAILS
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
                axios.post(`api/details/${decoded.data.member_id}`, {token: token})
                    .then(response => {
                        console.log('return was ', decoded);
                        console.log('details 1', response);
                        dispatch({type: MEMBER_DETAILS, payload: response})
                        dispatch({type: LOG_IN, payload: decoded});
                    }).catch( err => console.log(err));
            })
            .catch( response => {
                console.log('error', response);
            });
    }
}

export const memberDetails = id => {
    return(dispatch) => {
        axios.post(`/api/details/${id}`, {token : cookie.load('token')})
            .then( response => {
                console.log('details', response);
                return dispatch({ type: MEMBER_DETAILS, payload: response });
            })
            .catch( err => {
                console.log(err);
            })
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