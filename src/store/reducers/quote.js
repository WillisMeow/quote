import * as actionTypes from '../actions/actionType';

const initialState = {
    quotes: [],
    jobs: [],
    quoteReference: {
        quoteUnit: null,
        quoteReference: null,
        clientReference: null
    },
    status: {
        Quote: {
            created: false,
            sent: false,
            accepted: false
        },
        Invoice: {
            created: false,
            sent: false,
            paid: false
        }
    },
    price: {
        quotePrice: 0,
        gstValue: 0,
        totalPrice: 0
    },
    loading: false,
    error: false,
    quoteSubmitted: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RESET_QUOTE:
            return {
                ...state,
                loading: false,
                error: false,
                quoteSubmitted: false
            }
        case actionTypes.INIT_QUOTE:
            return {
                ...state,
                loading: false,
                error: false,
                jobs: [],
                quoteReference: []
            }
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
                quoteSubmitted: true
            }
        case actionTypes.SUBMIT_QUOTE_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.FETCH_QUOTES_START:
            return {
                ...state,
                error: false,
                loading: true
            }
        case actionTypes.FETCH_QUOTES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                quotes: action.fetchedQuotes
            }
        case actionTypes.FETCH_QUOTES_FAILED:
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
                loading: false,
                jobs: action.jobs
            }
        case actionTypes.EDIT_JOB:
            return {
                ...state,
                error: false,
                loading: false,
                jobs: action.jobs
            }
        case actionTypes.UPDATE_STATUS:
            return {
                ...state,
                status: action.status
            }
        case actionTypes.REFERENCE_UPDATE:
            return {
                ...state,
                quoteReference: {
                    ...state.quoteReference,
                    [action.identifier]: action.value
                }
            }
        case actionTypes.UPDATE_PRICE:
            return {
                ...state,
                price: action.price
            }
        default:
            return state;
    }
}

export default reducer;