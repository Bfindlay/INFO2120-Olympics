import {
    LOG_IN,
    LOG_OUT,
    MEMBER_DETAILS,
    PLACES,
    BOOKINGS
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
                       axios.post(`/api/bookings/${decoded.data.member_id}`, {token : cookie.load('token')})
                        .then( res => {
                            console.log('details', response);
                            dispatch({type: MEMBER_DETAILS, payload: response});
                            dispatch({ type: BOOKINGS, payload: res });
                            dispatch({type: LOG_IN, payload: decoded});
                        })
                        .catch( err => {
                            console.log(err);
                        })
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
               dispatch({ type: MEMBER_DETAILS, payload: response });
            })
            .catch( err => {
                console.log(err);
            })
    }
}
export const reloadUser = user => {
    return {type: LOG_IN, payload: user};
}

export const searchJourney = search => {
    const { member_id } = cookie.load('member').data;
    const { token } = cookie.load('token');
    const { from, to, date } = search;
    return(dispatch) => {
        axios.post(`/api/journey/${member_id}/${from.place_id}/${to.place_id}/${date}`, {token: token})
            .then(response => {
                
            })
            .catch(err => console.log(err));
    }
}

export const getPlaces = () => {
    return(dispatch) => {
        axios.get('/api/places')
            .then( res => {
                 return dispatch({type: PLACES, payload: res.data });
            })
            .catch(err => console.log(err));
    }
}

export const getBookings = member_id => {
    const { token } = cookie.load('token');
    return(dispatch) => {
        axios.post(`/api/bookings/${member_id}`, {token: token})
            .then( res => dispatch({type: BOOKINGS, payload: res}))
            .catch(err => console.log(err))
    }
}
export const logOut = () => {
    cookie.remove('member');
    cookie.remove('token');
    return { type: LOG_OUT, payload: true };
}