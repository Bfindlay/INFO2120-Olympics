
const INITIAL_STATE = {
    accommodation: null, 
    country_code: null, 
    family_name: null, 
    given_names: null, 
    member_id: null, 
    title: null,
    signed: false,
}
import { hashHistory } from 'react-router';
export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case 'LOG_IN': {
            const { accomodation, country_code, family_name, given_names, member_id, title } = action.payload.data;
            hashHistory.push('/Details');
            return { ...state, signed: true, 
                    accomodation:accomodation, 
                    country_code: country_code, 
                    family_name: family_name, 
                    given_names: given_names, member_id: member_id, 
                    title: title 
                 }
        }
        case 'MEMBER_DETAILS' : {
            const { place_name } = action.payload.data;
            console.log('place name', place_name);
            return { ...state, accommodation: place_name };
        }
        case 'LOG_OUT': {
            hashHistory.push('/');
            return { ...state, member_id: null, name: null, type: null, signed: false}
        }
        default:
            return {... state }
    }
    
}