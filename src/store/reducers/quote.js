import * as actionTypes from '../actions/actionType';

const initialState = {
    quotes: [],
    jobs: [],
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
        case actionTypes.ADD_NEW_JOB:
            return {
                ...state,
                error: false,
                loading: false,
                jobs: state.jobs.concat(action.jobData)
            }
        case actionTypes.DELETE_JOB:
            return {
                ...state,
                error: false,
                loading: false.concat,
                jobs: action.jobs
            }
        default:
            return state;
    }
}

export default reducer;