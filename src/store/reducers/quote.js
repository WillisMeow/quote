import * as actionTypes from '../actions/actionType';

const initialState = {
    quotes: [],
    loading: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUBMIT_QUOTE_START:
            return {
                ...state,
                error: false,
                loading: true
            }
        case actionTypes.SUBMIT_QUOTE_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                quotes: state.quotes.concat(action.quotes)
            }
        case actionTypes.SUBMIT_QUOTE_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;