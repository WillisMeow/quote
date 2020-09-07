import * as actionTypes from './actionType';
import axios from 'axios';


export const resetQuote = () => {
    return {
        type: actionTypes.RESET_QUOTE
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
export const submitQuote = (quoteData, token) => {
    return dispatch => {
        dispatch(submitQuoteStart())
        axios.post('https://react-quote-willis.firebaseio.com/quotes.json?auth=' + token, quoteData)
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
export const fetchQuotes = (token, userId) => {
    return dispatch => {
        dispatch(fetchQuotesStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://react-quote-willis.firebaseio.com/quotes.json' + queryParams)
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
export const saveQuoteEdit = (quoteData, key, token) => { // updating existing quote within firebase
    return dispatch => {
        dispatch(submitQuoteStart())
        console.log(quoteData)
        axios.put('https://react-quote-willis.firebaseio.com/quotes/' + key + '.json?auth=' + token, quoteData)
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
export const deleteQuote = (quoteData, key, token, userId) => {
    return dispatch => {
        dispatch(deleteQuoteStart())
        axios.delete('https://react-quote-willis.firebaseio.com/quotes/' + key + '.json?auth=' + token, quoteData)
        .then(response => {
            dispatch(deleteQuoteSuccess())
            dispatch(fetchQuotes(token, userId))
        })
        .catch(error => {
            dispatch(deleteQuoteFail())
        })
    }
}

export const pdfFormatChange = (format) => {
    return {
        type: actionTypes.PDF_FORMAT_CHANGE,
        format: format
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


//--------------------WORKING ON QUOTEDATA--------------------//

export const createQuoteData = (quoteForm, userId) => {
    return {
        type: actionTypes.CREATE_QUOTEDATA,
        quoteForm: quoteForm,
        userId: userId
    }
}

//--------------------SAVING CUSTOM JOB ORDER--------------------//

export const saveJobOrderStart = () => {
    return {
        type: actionTypes.SAVE_JOB_ORDER_START
    }
}
export const saveJobOrderSuccess = () => {
    return {
        type: actionTypes.SAVE_JOB_ORDER_SUCCESS
    }
}
export const saveJobOrderFail = (error)  => {
    return {
        type: actionTypes.SAVE_JOB_ORDER_FAIL,
        error: error
    }
}
export const saveJobOrder = (jobOrder) => {
    return dispatch => {
        dispatch(saveJobOrderStart())
        axios.put('https://react-quote-willis.firebaseio.com/customJobOrder.json', jobOrder)
        .then(response => {
            dispatch(saveJobOrderSuccess())
        })
        .catch(error => {
            dispatch(saveJobOrderFail(error))
        })
    }
}


export const fetchJobOrderStart = () => {
    return {
        type: actionTypes.FETCH_JOB_ORDER_START
    }
}
export const fetchJobOrderSuccess = (jobOrder) => {
    return {
        type: actionTypes.FETCH_JOB_ORDER_SUCCESS,
        jobOrder: jobOrder
    }
}
export const fetchJobOrderFail = (error)  => {
    return {
        type: actionTypes.FETCH_JOB_ORDER_FAIL,
        error: error
    }
}
export const fetchJobOrder = () => {
    return dispatch => {
        dispatch(fetchJobOrderStart())
        axios.get('https://react-quote-willis.firebaseio.com/customJobOrder.json')
        .then(response => {
            dispatch(fetchJobOrderSuccess(response.data))
        })
        .catch(error => {
            dispatch(fetchJobOrderFail(error))
        })
    }
}
