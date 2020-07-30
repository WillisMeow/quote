import * as actionTypes from './actionType';
import axios from 'axios';


export const resetQuote = () => {
    return {
        type: actionTypes.RESET_QUOTE
    }
}

export const initQuote = () => {
    return {
        type: actionTypes.INIT_QUOTE
    }
}

//--------------------SUBMIT QUOTE--------------------//

export const submitQuoteStart = () => {
    return {
        type: actionTypes.SUBMIT_QUOTE_START
    };
};
export const submitQuoteSuccess = () => {
    return {
        type: actionTypes.SUBMIT_QUOTE_SUCCESS
    };
};
export const submitQuoteFail = (error) => {
    return {
        type: actionTypes.SUBMIT_QUOTE_FAIL,
        error: error
    };
};
export const submitQuote = (quoteData) => {
    return dispatch => {
        dispatch(submitQuoteStart())
        axios.post('https://react-quote-willis.firebaseio.com/quotes.json', quoteData)
        .then(response => {
            console.log(response)
            dispatch(submitQuoteSuccess())
        })
        .catch(error => {
            dispatch(submitQuoteFail(error))
        })
    }
}

//--------------------FETCH QUOTES--------------------//

export const fetchQuotesStart = () => {
    return {
        type: actionTypes.FETCH_QUOTES_START
    }
}
export const fetchQuotesSuccess = (fetchedQuotes) => {
    return {
        type: actionTypes.FETCH_QUOTES_SUCCESS,
        fetchedQuotes: fetchedQuotes
    }
}
export const fetchQuotesFailed = () => {
    return {
        type: actionTypes.FETCH_QUOTES_FAILED
    }
}
export const fetchQuotes = () => {
    return dispatch => {
        dispatch(fetchQuotesStart())
        axios.get('https://react-quote-willis.firebaseio.com/quotes.json')
        .then(response => {
            const fetchedQuotes = []
            for(let key in response.data) {
                fetchedQuotes.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchQuotesSuccess(fetchedQuotes))
        })
        .catch(error => {
            dispatch(fetchQuotesFailed())
        })
    }
}

//--------------------EDIT QUOTE--------------------//

export const setEditingTrue = (key) => {
    return {
        type: actionTypes.SET_EDITING_TRUE,
        key: key
    }
}
export const setEditingFalse = () => {
    return {
        type: actionTypes.SET_EDITING_FALSE
    }
}
export const saveQuoteEdit = (quoteData, key) => { // updating existing quote within firebase
    return dispatch => {
        dispatch(submitQuoteStart())
        axios.put('https://react-quote-willis.firebaseio.com/quotes/' + key + '.json', quoteData)
        .then(response => {
            console.log(response)
            dispatch(submitQuoteSuccess())
        })
        .catch(error => {
            dispatch(submitQuoteFail(error))
        })
    }
}

export const deleteQuoteStart = () => {
    return {
        type: actionTypes.DELETE_QUOTE_START
    }
}
export const deleteQuoteSuccess = () => {
    return {
        type: actionTypes.DELETE_QUOTE_SUCCESS
    }
}
export const deleteQuoteFail = () => {
    return {
        type: actionTypes.DELETE_QUOTE_FAIL
    }
}
export const deleteQuote = (quoteData, key) => {
    return dispatch => {
        dispatch(deleteQuoteStart())
        axios.delete('https://react-quote-willis.firebaseio.com/quotes/' + key + '.json', quoteData)
        .then(response => {
            dispatch(deleteQuoteSuccess())
            dispatch(fetchQuotes())
        })
        .catch(error => {
            dispatch(deleteQuoteFail())
        })
    }
}


//--------------------TRIAL ALL IN ONE STATE UPDATE--------------------//

export const updateReduxState = (state, id) => {
    return {
        type: actionTypes.UPDATE_REDUX_STATE,
        state: state,
        id: id
    }
}
