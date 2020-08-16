import * as actionTypes from './actionType';

export const resetReport = () => {
    return {
        type: actionTypes.RESET_REPORT
    }
}

export const createReport = (quotesDisplayArray) => {
    return {
        type: actionTypes.CREATE_REPORT,
        quotesDisplayArray: quotesDisplayArray
    }
}