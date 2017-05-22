
import {} from '../actions/types';
const INITIAL_STATE = {
    member_id: null,
    name: null,
    type: null,
    signed: false
}
export default (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case 'LOG_IN': {
            const { id, name, type } = action.payload.data;
            return { ...state, signed: true, member_id: id, name: name, type: type }
        }
        default:
            return {... state }
    }
    
}