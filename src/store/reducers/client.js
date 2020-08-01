import * as actionTypes from '../actions/actionType';

const initialState = {
    clients: [],
    existingClientsLoaded: false,
    clientFormInitialized: false,
    error: null,
    loading: false,
    formIsValid: false,
    clientForm: {
        company: {
            elementType: 'select',
            elementConfig: {
                options: []
            },
            value: 'default',
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
    }
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
        case actionTypes.START_FETCHING_CLIENTS:
            return {
                ...state,
                existingClientsLoaded: false,
                clientFormInitialized: false,
            }
        case actionTypes.FETCH_CLIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.SET_CLIENTS:
            return {
                ...state,
                clients: action.clients,
                error: false,
                existingClientsLoaded: true
            }
        case actionTypes.SET_CLIENT_COMPANY:
            return {
                ...state,
                clientFormInitialized: true,
                clientForm: {
                    ...state.clientForm,
                    company: {
                        ...state.clientForm.company,
                        value: 'default',
                        elementConfig: {
                            ...state.clientForm.company.elementConfig,
                            options: action.me
                        }
                    },
                    companyAddress: {
                        ...state.clientForm.companyAddress,
                        value: ''
                    },
                    contactName: {
                        ...state.clientForm.contactName,
                        value: ''
                    },
                    contactPhoneNumber: {
                        ...state.clientForm.contactPhoneNumber,
                        value: ''
                    },
                    contactEmailAddress: {
                        ...state.clientForm.contactEmailAddress,
                        value: ''
                    },
                }
            }
        case actionTypes.AMMEND_CLIENT:
            return {
                ...state,
                clientForm: action.updatedData
            }
        case actionTypes.SET_FORM_IS_VALID:
            return {
                ...state,
                formIsValid: action.formIsValid
            }
        case actionTypes.UPDATE_CLIENT_REDUX_FOR_EDITING:
            return {
                ...state,
                clientForm: action.state.client.clientForm
            }
        default:
            return state
    }
}

export default reducer;