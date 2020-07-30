import * as actionTypes from '../actions/actionType';

const initialState = {
    quotes: [],
    quoteForm: {
        jobId: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Job Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        jobDetails: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Job Details'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    jobs: [],
    quoteReference: {
        quoteUnit: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Quote Unit'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        quoteReference: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Quote Reference'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        clientReference: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Client Reference'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
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
        price: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Price'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    loading: false,
    error: false,
    quoteSubmitted: false,
    quotesFetched: false,
    editingKey: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RESET_QUOTE:
            return {
                ...state,
                loading: false,
                error: false,
                quoteSubmitted: false,
                quotesFetched: false,
                editingKey: null,
            }
        case actionTypes.INIT_QUOTE:
            let stateCopy = {
                ...state
            }
            let referenceCopy = {
                ...stateCopy.quoteReference
            }
            for (let el in referenceCopy) {
                referenceCopy[el].value = ''
            }
            return {
                ...state,
                loading: false,
                error: false,
                jobs: [],
                quoteReference: referenceCopy,
                status: {
                    ...state.status,
                    Quote: {
                        ...state.status.Quote,
                        created: false,
                        sent: false,
                        accepted: false
                    },
                    Invoice: {
                        ...state.status.Invoice,
                        created: false,
                        sent: false,
                        paid: false
                    }
                },
                price: {
                    ...state.price,
                    price: {
                        ...state.price.price,
                        value: ''
                    }
                }
            }
        case actionTypes.SUBMIT_QUOTE_START:
            return {
                ...state,
                error: false,
                loading: true,
                quoteSubmitted: false,
                quotesFetched: false
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
                loading: false,
                quoteSubmitted: false
            }
        case actionTypes.DELETE_QUOTE_START:
            return {
                ...state,
                error: false,
                loading: true,
                quotesFetched: false
            }
        case actionTypes.DELETE_QUOTE_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false
            }
        case actionTypes.DELETE_QUOTE_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.FETCH_QUOTES_START:
            return {
                ...state,
                error: false,
                loading: true,
                quotesFetched: false,
                /* editingKey: null, */
                /* quoteSubmitted: false */
            }
        case actionTypes.FETCH_QUOTES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                quotes: action.fetchedQuotes,
                quotesFetched: true
            }
        case actionTypes.FETCH_QUOTES_FAILED:
            return {
                ...state,
                error: true,
                loading: false,
                quotesFetched: false
            }
        case actionTypes.SET_EDITING_TRUE:
            return {
                ...state,
                editingKey: action.key
            }
        case actionTypes.SET_EDITING_FALSE:
            return {
                ...state,
                editingKey: null
            }
        case actionTypes.UPDATE_REDUX_STATE:
            return {
                ...state,
                [action.id]: action.state
            }
        default:
            return state;
    }
}

export default reducer;