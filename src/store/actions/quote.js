import * as actionTypes from './actionType';
import axios from 'axios';

export const submitQuoteStart = () => {
    return {
        type: actionTypes.SUBMIT_QUOTE_START
    };
};

export const submitQuoteSuccess = (quotes) => {
    return {
        type: actionTypes.SUBMIT_QUOTE_SUCCESS,
        quotes: quotes
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
            dispatch(submitQuoteSuccess(quoteData))
        })
        .catch(error => {
            dispatch(submitQuoteFail(error))
        })
    }
}

//--------------------ADDING JOBS--------------------//

export const addNewJob = (jobData) => { // adds current job to jobs array
    return {
        type: actionTypes.ADD_NEW_JOB,
        jobData: jobData
    }
}

export const deleteJob = (jobsArray) => {
    return {
        type: actionTypes.DELETE_JOB,
        jobs: jobsArray
    }
}