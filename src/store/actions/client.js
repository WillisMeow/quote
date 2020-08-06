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
export const addClient = (clientData, token) => {
    return dispatch => {
        dispatch(addClientStart())
        axios.post('https://react-quote-willis.firebaseio.com/clients.json?auth=' + token, clientData)
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
export const startFetchingClients = () => {
    return {
        type: actionTypes.START_FETCHING_CLIENTS
    }
}

export const fetchClientsFailed = (error) => { // fetching clients fail
    return {
        type: actionTypes.FETCH_CLIENTS_FAILED,
        error: error
    }
}
export const setClients = (clients) => { // setting all clients from firebase
    return {
        type: actionTypes.SET_CLIENTS,
        clients: clients
    }
}
export const setClientCompany = (fetchedClients) => { // setting intial values for client data.
    let me = []
    for (let el in fetchedClients) {
        me.push(fetchedClients[el])
    }
    return {
        type: actionTypes.SET_CLIENT_COMPANY,
        me: me
    }
}
export const initClients = (token, userId) => { // use of token & userId ensures only clients created by user is shown
    return dispatch => {
        dispatch(startFetchingClients())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; // auth="token" enables access to authenticated parts of firebase database. second part of queryParams is firebase specific syntax, allowing us to filter by the nominated value within a nominated field (rules need to be set up within firebase for this to work (".indexOn": ["userId"]))
        axios.get('https://react-quote-willis.firebaseio.com/clients.json' + queryParams)
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

//--------------------UPDATE STATUS FOR EDITING--------------------//

export const updateClientReduxForEditing = (key, state) => {
    return {
        type: actionTypes.UPDATE_CLIENT_REDUX_FOR_EDITING,
        key: key,
        state: state
    }
}