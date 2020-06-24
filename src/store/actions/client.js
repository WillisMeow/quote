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
        type: actionTypes.ADD_CLIENT_SUCCESS
    };
};
export const addClientFail = (error) => {
    return {
        type: actionTypes.ADD_CLIENT_FAIL
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
        .catch(error =>
            dispatch(addClientFail(error)))
    }
}

/* --------------------INIT CLIENTS-------------------- */

export const setClients = (clients) => {
    return {
        type: actionTypes.SET_CLIENTS,
        clients: clients
    }
}
export const fetchClientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_CLIENTS_FAILED,
        error: error
    }
}
export const setClientCompany = (fetchedClients) => {
    let me = []
    me = fetchedClients.map((el) => {
        me.push(el)    
    })
    return {
        type: actionTypes.SET_CLIENT_COMPANY,
        companyData: {
            elementType: 'select',
            elementConfig: {
                options: me
            },
            value: 'summerset karaka',
            validation: {},
            valid: true
        }
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