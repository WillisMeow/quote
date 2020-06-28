import * as actionTypes from '../actions/actionType';

const initialState = {
    clients: [],
    error: null,
    loading: false,
    clientForm: {
        company: {
            elementType: '',
            elementConfig: {
                options: []
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        companyAddress: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Company Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        contactName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Contact Person'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        contactPhoneNumber: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Contact Phone Number'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        contactEmailAddress: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Contact Email Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    },
    formIsValid: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_CLIENT_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                clients: state.clients.concat(action.clientData)
            }
        case actionTypes.ADD_CLIENT_FAIL:
            return {
                ...state,
                error: true
            }
        case actionTypes.SET_CLIENTS:
            return {
                ...state,
                clients: action.clients,
                error: false
            }
        case actionTypes.FETCH_CLIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.SET_CLIENT_COMPANY:
            return {
                ...state,
                /* clientForm: action.clientForm */
                clientForm: {
                    ...state.clientForm,
                    company: action.company
                }
            }
        case actionTypes.AMMEND_CLIENT:
            return {
                ...state,
                clientForm: action.updatedData
            }
        default:
            return state
    }
}

export default reducer;