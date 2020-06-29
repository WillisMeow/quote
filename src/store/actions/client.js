import * as actionTypes from './actionType';
import axios from 'axios';

/* --------------------ADDING NEW CLIENTS-------------------- */

export const addClientStart = () => {
    return {
        type: actionTypes.ADD_CLIENT_START
    };
};
export const addClientSuccess = (clientData) => {
    return {
        type: actionTypes.ADD_CLIENT_SUCCESS,
        clientData: clientData
    };
};
export const addClientFail = (error) => {
    return {
        type: actionTypes.ADD_CLIENT_FAIL,
        error: error
    };
};
export const addClient = (clientData) => {
    return dispatch => {
        dispatch(addClientStart())
        axios.post('https://react-quote-willis.firebaseio.com/clients.json', clientData)
        .then(response => {
            console.log(response.data)
            dispatch(addClientSuccess(clientData))
        })
        .catch(error => {
            console.log(error)
            dispatch(addClientFail(error))
        })
    }
}

/* --------------------INIT CLIENTS-------------------- */

export const setClients = (clients) => { // setting all clients from firebase
    return {
        type: actionTypes.SET_CLIENTS,
        clients: clients
    }
}
export const fetchClientsFailed = (error) => { // fetching clients fail
    return {
        type: actionTypes.FETCH_CLIENTS_FAILED,
        error: error
    }
}
export const setClientCompany = (fetchedClients) => { // setting intial values for client data.
    console.log(fetchedClients)
    let me = []
    for (let el in fetchedClients) {
        me.push(fetchedClients[el])
    }
    let initialValue = null;
    if (me.length > 0) {
        initialValue = me[0];
        console.log(me[0])

    }
    return {
        type: actionTypes.SET_CLIENT_COMPANY,
        me: me
        /* company: {
                elementType: 'select',
                elementConfig: {
                    options: me
                },
                value: 'default',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, */
    }
}
export const initClients = () => {
    return dispatch => {
        axios.get('https://react-quote-willis.firebaseio.com/clients.json')
        .then(response => {
            const fetchedClients = [];
            for (let key in response.data) {
                fetchedClients.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(setClients(fetchedClients))
            dispatch(setClientCompany(fetchedClients))
        })
        .catch(error => {
            dispatch(fetchClientsFailed(error))
        })
    }
}

export const initialAmmendClient = (updatedData) => { // initially updating only the value in Redux State
    return {
        type: actionTypes.INITIAL_AMMEND_CLIENT,
        updatedData: updatedData
    }
}

export const ammendClient = (updatedData) => { // updating the clientForm in Redux State
    return {
        type: actionTypes.AMMEND_CLIENT,
        updatedData: updatedData
    }
}

export const setFormIsValid = (formIsValid) => {
    return {
        type: actionTypes.SET_FORM_IS_VALID,
        formIsValid: formIsValid
    }
}


export const onSelectionMade = (valid, identifier) => {
    return {
        type: actionTypes.ON_SELECTION_MADE,
        valid: valid,
        formElementId: identifier
    }
}