import * as actionTypes from '../actions/actionType';

const initialState = {
    quoteData: null,
    quotes: [],
    loading: false,
    error: false,
    errorMessage: null,
    quoteSubmitted: false,
    quotesFetched: false,
    editingKey: null,
    pdfFormat: 'none'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RESET_QUOTE:
            return {
                ...state,
                loading: false,
                error: false,
                quoteSubmitted: false,
                quotesFetched: false,
                editingKey: null,
                pdfFormat: 'none'
            }
        case actionTypes.SUBMIT_QUOTE_START:
            return {
                ...state,
                error: false,
                loading: true,
                quoteSubmitted: false,
                quotesFetched: false
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
                errorMessage: action.error,
                loading: false,
                quoteSubmitted: false
            }
        case actionTypes.DELETE_QUOTE_START:
            return {
                ...state,
                error: false,
                loading: true,
                quotesFetched: false
            }
        case actionTypes.DELETE_QUOTE_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false
            }
        case actionTypes.DELETE_QUOTE_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.FETCH_QUOTES_START:
            return {
                ...state,
                error: false,
                loading: true,
                quotesFetched: false,
            }
        case actionTypes.FETCH_QUOTES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                quotes: action.fetchedQuotes,
                quotesFetched: true
            }
        case actionTypes.FETCH_QUOTES_FAILED:
            return {
                ...state,
                error: true,
                loading: false,
                quotesFetched: false
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
        case actionTypes.PDF_FORMAT_CHANGE:
            return {
                ...state,
                pdfFormat: action.format
            }
        case actionTypes.UPDATE_REDUX_STATE:
            return {
                ...state,
                [action.id]: action.state
            }
        case actionTypes.CREATE_QUOTEDATA:
            let quoteForm = action.quoteForm;
            let quoteData = {
                userId: null,
                client: {},
                reference: {},
                status: {
                    job: {},
                    invoice: {},
                    quote: {}
                },
                price: 0,
                quoteJobsArray: [],
                invoiceJobsArray: []
            };
            quoteData.userId = action.userId;
            quoteData.client['clientsArray'] = quoteForm.clients.clientsArray;
            for (let el in quoteForm.clients.clientForm) {
                quoteData.client[el] = quoteForm.clients.clientForm[el].value
            }
            for (let el in quoteForm.reference) {
                quoteData.reference[el] = quoteForm.reference[el].value
            }
            quoteData.date = quoteForm.date;
            quoteData.invoiceDate = quoteForm.invoiceDate;
            for (let sect in quoteForm.status) {
                for (let el in quoteForm.status[sect]) {
                    quoteData.status[sect][el] = quoteForm.status[sect][el]
                }
            }
            quoteData.price = quoteForm.price.price.value;
            quoteData.quoteJobsArray = quoteForm.jobs.quoteJobsArray;
            quoteData.invoiceJobsArray = quoteForm.jobs.invoiceJobsArray;
            console.log(quoteData)
            return {
                ...state,
                quoteData: quoteData
            }
        default:
            return state;
    }
}

export default reducer;