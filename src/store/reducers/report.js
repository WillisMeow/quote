import * as actionTypes from '../actions/actionType';

const initialState = {
    viewingPDF: false,
    quotesDisplayArray: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.RESET_REPORT:
            return {
                ...state,
                viewingPDF: false,
                quotesDisplayArray: null
            }
        case actionTypes.CREATE_REPORT:
            return {
                ...state,
                viewingPDF: true,
                quotesDisplayArray: action.quotesDisplayArray
            }
        default:
            return state
    }
}

export default reducer;