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
    editingKey: null
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
        case actionTypes.REFERENCE_UPDATE:
            return {
                ...state,
                quoteReference: action.referenceForm
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
        case actionTypes.UPDATE_PRICE:
            return {
                ...state,
                price: action.price
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
        case actionTypes.UPDATE_QUOTE_REDUX_FOR_EDITING:
            return {
                ...action.state
            }
        default:
            return state;
    }
}

export default reducer;