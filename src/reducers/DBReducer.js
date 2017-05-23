
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
        case 'LOG_OUT': {
            console.log('logout');
            return { ...state, member_id: null, name: null, type: null, signed: false}
        }
        default:
            return {... state }
    }
    
}