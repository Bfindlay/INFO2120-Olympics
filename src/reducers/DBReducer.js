
const INITIAL_STATE = {
    accommodation: null, 
    country_code: null, 
    family_name: null, 
    given_names: null, 
    member_id: null, 
    title: null,
    type: null,
    signed: false,
    bookings: [],
    places: [],
    journeys: []
}
import { hashHistory } from 'react-router';
import cookie from 'react-cookie';
export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case 'LOG_IN': {
            const {  country_code, family_name, given_names, member_id, title, type } = action.payload.data;
            let accommodation = cookie.load('accommodation');
            let bookings = cookie.load('bookings');
            hashHistory.push('/Details');
            return { ...state, signed: true, 
                    accommodation: accommodation, 
                    country_code: country_code, 
                    family_name: family_name, 
                    given_names: given_names, member_id: member_id, 
                    title: title,
                    type: type,
                    bookings: bookings
                 }
        }
        case 'MEMBER_DETAILS' : {
            const { place_name } = action.payload.data;
            cookie.save('accommodation', place_name, {path: '/', maxAge: 600 })
            return { ...state, accommodation: place_name };
        }
        case 'PLACES' : {
            return { ...state, places: action.payload };
        }
        case 'SET_JOURNEYS' : {
            return { ...state, journeys: action.payload};
        }
        case 'LOG_OUT': {
            hashHistory.push('/');
            return { ...state, member_id: null, name: null, type: null, signed: false}
        }
        case 'BOOKINGS' : {
            cookie.save('bookings', action.payload, {path: '/', maxAge: 600 })
            return { ...state, bookings: action.payload };
        }
        default:
            return {... state }
    }
    
}