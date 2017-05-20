import {
    LOG_IN
} from './types';

import axios from './axios';

export const logIn = auth => {
    return (dispatch) => {
        axios.post('/login', auth )
            .then(response => {
                dispatch({type:LOG_IN, payload: response.data})
            })
            .catch( response => {
                console.log(response);
            });
    }
}