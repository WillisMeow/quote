import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';
import QuotesStatusFilter from './QuotesStatusFilter';
import QuotesFilterButtons from './QuotesFilterButtons';

class Quotes extends Component {
    state = {
        viewingQuote: false,
        selectedQuoteKey: null,
        propsLocationKey: null,
        quotesArray: [],
        keyValueQuotesArray: [], // basically quotesArray, with a key (id) value added
        initialized: false,
        filteredQuotes: [], // keyValueQuotesArray filtered by user
        searchFiltering: false,
        statusFiltering: false,
        arrangeByClient: false,
        arrangeByStatus: false,
        status: {
            job: {
                started: false,
                finished: false
            },
            quote: {
                created: false,
                sent: false,
                accepted: false
            },
            invoice: {
                created: false,
                sent: false,
                paid: false
            }
        },
    }

    componentDidMount () {
        this.setState({ propsLocationKey : this.props.location.key })
        
        if (!this.props.loading && this.props.editingKey === null) { // for clean initial loading of Quotes.js (via Toolbar)
            this.props.onResetQuote();
            this.props.onFetchQuotes(this.props.token, this.props.userId);
        }
    }
    componentDidUpdate () {
        if (this.props.quoteSubmitted) { // refetching updated quotes array after editing quote has been submitted or quote deleted
            this.props.onResetQuote();
            this.props.onFetchQuotes(this.props.token, this.props.userId);
        }
        
        if (this.state.quotesArray !== this.props.quotes && this.props.quotesFetched) {
            this.setState({ quotesArray : this.props.quotes })
        }

        if (this.props.match.isExact && this.state.propsLocationKey !== this.props.location.key) {
            this.setState({ viewingQuote : false, selectedQuoteKey : null, propsLocationKey : this.props.location.key})
            this.props.onFetchQuotes(this.props.token, this.props.userId);
        }

        if (this.props.quotesFetched && this.state.keyValueQuotesArray.length === 0 && this.state.initialized === false) { // initializes this.state.keyValueQuotesArray
            this.initQuotesHandler()
        }

    }

    initQuotesHandler = () => { // initializes key to each quote in quotesArray
        const newArrayOfObjects = [ // creating a deep copy of the array of objects
            ...this.props.quotes
        ].map(quote => ({
            ...quote,
            status: {
                ...quote.status
            }
        }))
        newArrayOfObjects.forEach((element) => {
            let statusArray = [];
            for (let section in element.status) {
                for (let criteria in element.status[section]) {
                    if (element.status[section][criteria] === true ) {
                        statusArray.push(section + criteria)
                    }
                }
            }
            element.status.statusArray = statusArray
            element.status.statusHeirarchy = null
        });
        
        let quotesArray = [];
        for (let quote in newArrayOfObjects) {
            quotesArray.push({
                key: newArrayOfObjects[quote].id,
                data: newArrayOfObjects[quote]
            })
        }
        this.setState({ keyValueQuotesArray : quotesArray, initialized : true })
    }

    viewQuoteHandler = (quote) => {
        this.setState({ viewingQuote : true, selectedQuoteKey : quote.key })
        this.props.onSetEditingTrue(quote.key)
        this.props.history.push('/editquote')
    }

    returnToQuotesHandler = () => {
        this.setState({viewingQuote : false, selectedQuoteKey : null})
        this.props.onSetEditingFalse()
    }

    handleChange = (event) => {
        let currentList = [
            ...this.state.keyValueQuotesArray
        ]
        let matches = []
        if (event.target.value !== "") {
            matches = currentList.filter(value => {
                return (
                    value.data.client.company.toLowerCase().includes(event.target.value) ||
                    value.data.reference.quoteUnit.toLowerCase().includes(event.target.value) ||
                    value.data.reference.quoteReference.toLowerCase().includes(event.target.value) ||
                    value.data.reference.clientReference.toLowerCase().includes(event.target.value)
                )
            })
            this.setState({ searchFiltering : true})
        }
        if (event.target.value === '') this.setState({ searchFiltering : false })
        this.setState({ filteredQuotes : matches })
    }

    statusChangeHandler = (event) => {
        let str = event.target.id.split(' ');
        let stateStatusCopy = {
            ...this.state.status,
            [str[0]]: {
                ...this.state.status[str[0]],
                [str[1]]: event.target.checked
            }
        }
        let currentList = [
            ...this.state.keyValueQuotesArray
        ]
        let matches = [];
        let trueCriteria = [];
        for (let section in stateStatusCopy) {
            for (let element in stateStatusCopy[section]) {
                if (stateStatusCopy[section][element] === true) {
                    trueCriteria.push([section, element])
                }
            }
        }

        for (let quote in currentList) { // looping through each quote in array
            let tempMatch = false; // will be false, if not all criteria in trueCriteria matches the quote
            for (let criteria in trueCriteria) { // looping through each criteria in trueCriteria array
                if (currentList[quote].data.status[trueCriteria[criteria][0]][trueCriteria[criteria][1]] === true) {
                    tempMatch = true
                } else tempMatch = false
            }
            if (tempMatch === true) {
                matches.push(currentList[quote])
            }
        }
        if (trueCriteria.length === 0) this.setState({ statusFiltering : false})
        if (trueCriteria.length !== 0) this.setState({ statusFiltering : true })
        this.setState({ status : stateStatusCopy, filteredQuotes : matches })
    }
    clientFilterHandler = () => {
        if (!this.state.arrangeByClient) {
            let keyValueQuotesArrayCopy = [
                ...this.state.keyValueQuotesArray
            ]
            keyValueQuotesArrayCopy.sort((a, b) => (a.data.client.company > b.data.client.company) ? 1 : -1)
            console.log(keyValueQuotesArrayCopy)
            const outputObj = keyValueQuotesArrayCopy.reduce((accum, obj) => { // creating array of quotes from each client
                const id = obj.data.client.company;
                if (!accum[id]) accum[id] = [];
                accum[id].push(obj);
                return accum;
            }, [])
            console.log(outputObj)
            let outputArray = [];
            for (let client in outputObj) {
                console.log(client)
                console.log(outputObj[client])
                outputArray.push(outputObj[client])
            }
            console.log(outputArray)


            let thisOne = {
                ...outputObj
            }
            for (let client in thisOne) {
                let clientInArrayCopy = [
                    ...thisOne[client]
                ].map(quote => ({
                    ...quote,
                    data: {
                        ...quote.data,
                        status: {
                            ...quote.data.status
                        }
                    }
                }))
            }
            console.log(thisOne)


            this.setState({ arrangeByClient : true , keyValueQuotesArray : thisOne })
        }
        if (this.state.arrangeByClient) {
            this.initQuotesHandler()
            this.setState({ arrangeByClient : false }, () => {
                console.log('resetting from arrangeByClient')
            })
        }
    }

    statusFilterHandler = () => {
        if (!this.state.arrangeByStatus && this.state.arrangeByClient) {
            let keyValueQuotesArrayCopy = {
                ...this.state.keyValueQuotesArray
            }
            console.log(keyValueQuotesArrayCopy)
            for (let client in keyValueQuotesArrayCopy) {
                console.log(keyValueQuotesArrayCopy[client])
                let clientInArrayCopy = [
                    ...keyValueQuotesArrayCopy[client],
                ].map(quote => ({
                    ...quote,
                    data: {
                        ...quote.data,
                        status: {
                            ...quote.data.status
                        }
                    }
                }))
                console.log(keyValueQuotesArrayCopy[client])
                console.log(clientInArrayCopy)
                for (let quote in keyValueQuotesArrayCopy[client]) {
                    let quoteHierarchy = 0;
                    if (this.state.keyValueQuotesArray[client][quote].data.status.statusArray.includes('jobstarted')) {
                        quoteHierarchy = 1;
                    }
                    if (this.state.keyValueQuotesArray[client][quote].data.status.statusArray.includes('jobfinished')) {
                        quoteHierarchy = 2;
                    }
                    if (this.state.keyValueQuotesArray[client][quote].data.status.statusArray.includes('invoicesent')) {
                        quoteHierarchy = 3;
                    }
                    if (this.state.keyValueQuotesArray[client][quote].data.status.statusArray.includes('invoicepaid')) {
                        quoteHierarchy = 4;
                    }
                    /* clientInArrayCopy[quote].data.status.statusHeirarchy = quoteHierarchy; */
                    keyValueQuotesArrayCopy[client][quote].data.status.statusHeirarchy = quoteHierarchy;
                }
                keyValueQuotesArrayCopy[client].sort(function (quote1, quote2) {
                    if(quote1.data.status.statusHeirarchy > quote2.data.status.statusHeirarchy) return -1;
                    if(quote1.data.status.statusHeirarchy < quote2.data.status.statusHeirarchy) return 1;
                })
            }
            console.log(keyValueQuotesArrayCopy)
            this.setState({ arrangeByStatus : true , keyValueQuotesArray : keyValueQuotesArrayCopy }, () => {
                console.log(this.state)
            })
        }

        if (!this.state.arrangeByStatus && !this.state.arrangeByClient) {
            let stateCopy = [
                ...this.state.keyValueQuotesArray
            ].map(quote => ({
                ...quote,
                data:{
                    ...quote.data,
                    status: {
                        ...quote.data.status
                    }
                }
            }))
            for (let quote in this.state.keyValueQuotesArray) {
                let quoteHierarchy = 0;
                if (this.state.keyValueQuotesArray[quote].data.status.statusArray.includes('jobstarted')) {
                    quoteHierarchy = 1;
                }
                if (this.state.keyValueQuotesArray[quote].data.status.statusArray.includes('jobfinished')) {
                    quoteHierarchy = 2;
                }
                if (this.state.keyValueQuotesArray[quote].data.status.statusArray.includes('invoicesent')) {
                    quoteHierarchy = 3;
                }
                if (this.state.keyValueQuotesArray[quote].data.status.statusArray.includes('invoicepaid')) {
                    quoteHierarchy = 4;
                }
                stateCopy[quote].data.status.statusHeirarchy = quoteHierarchy
            }
            stateCopy.sort(function (quote1, quote2) {
                if(quote1.data.status.statusHeirarchy > quote2.data.status.statusHeirarchy) return -1;
                if(quote1.data.status.statusHeirarchy < quote2.data.status.statusHeirarchy) return 1;
            })
            this.setState({ arrangeByStatus : true , keyValueQuotesArray : stateCopy }, () => {
                console.log(this.state)
            })
        } /* else this.setState({ arrangeByStatus : false}, ()  => {
            this.initQuotesHandler()
        }) */
        if (this.state.arrangeByStatus) {
            this.initQuotesHandler()
            this.setState({ arrangeByStatus : false }, () => {
                console.log('resetting from arrangeByStatus')
            })
        }
    }
    
    render () {
        console.log('this.state')
        console.log(this.state)
        console.log('this.props.quotes')
        console.log(this.props.quotes)
        let search = (
            <div>
                <input type="text" onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
        let heading = <h2 className={classes.Heading}>Quotes</h2>

        let quotesHeader = (
            <ul className={classes.ListQuoteHeader}>
                <li className={classes.headerListItem}>
                    <p className={classes.listElement}>Client</p>
                    <p className={classes.listElement}>Reference</p>
                    <p className={classes.listElement}>Client Reference</p>
                    <p className={classes.listElement}>Quote Unit</p>
                    <p className={classes.listElementEnd}>$</p>
                </li>
            </ul>
        )

        let quotes = <Spinner />
        
        // switching between filteredQuotes and keyValueQuotesArray depending on filtering state
        let displayQuotesArray = this.state.filteredQuotes;
        if(this.state.filteredQuotes.length === 0 && !(this.state.searchFiltering || this.state.statusFiltering)) {
            displayQuotesArray = this.state.keyValueQuotesArray
        }
        console.log(displayQuotesArray)

        if(this.state.arrangeByClient) {
            displayQuotesArray = this.state.keyValueQuotesArray
            console.log('displayQuotesArray')
            console.log(displayQuotesArray)
            let tempQuotes = null;
            let tempQuotesArray = [];

            for (let client in displayQuotesArray) {
                console.log(displayQuotesArray[client])
                tempQuotes = (
                    <ul className={classes.list}>
                        <li className={classes.FilteredClientName}>{client}</li>
                        {displayQuotesArray[client].map((quote) => {
                            return (
                                <li className={classes.listItem} onClick={() => this.viewQuoteHandler(quote)}>
                                    <p className={classes.listElement}>{quote.data.client.company}</p>
                                    <p className={classes.listElement}>{quote.data.reference.quoteReference}</p>
                                    <p className={classes.listElement}>{quote.data.reference.clientReference}</p>
                                    <p className={classes.listElement}>{quote.data.reference.quoteUnit}</p>
                                    <p className={classes.listElementEnd}>{quote.data.price}</p>
                                </li>
                            )
                        })}
                    </ul>
                )
                tempQuotesArray.push(tempQuotes)
                
            }
            quotes = tempQuotesArray;
            if(this.state.arrangeByStatus) {
                
            }
        }

        if(!this.props.loading && !this.state.viewingQuote && this.state.quotesArray === this.props.quotes && !this.state.arrangeByClient) {
            quotes = <ul className={classes.list}>
                {displayQuotesArray.map((quote) => {
                    return (
                        <li key={quote.key} className={classes.listItem} onClick={() => this.viewQuoteHandler(quote)}>
                            <p className={classes.listElement}>{quote.data.client.company}</p>
                            <p className={classes.listElement}>{quote.data.reference.quoteReference}</p>
                            <p className={classes.listElement}>{quote.data.reference.clientReference}</p>
                            <p className={classes.listElement}>{quote.data.reference.quoteUnit}</p>
                            <p className={classes.listElementEnd}>{quote.data.price}</p>
                        </li>
                    )
                })}
            </ul>
        }

        if (this.state.filteredQuotes.length === 0 && (this.state.searchFiltering || this.state.statusFiltering)) {
            quotes = (
                <div>
                    <h3>No Matches :(</h3>
                </div>
            )
        }

        return (
            <div className={classes.Quotes}>
                {search}
                <QuotesStatusFilter 
                    status={this.state.status}
                    onStatusChange={this.statusChangeHandler}
                />
                <QuotesFilterButtons 
                    clientFilter={this.clientFilterHandler}
                    clientFilterState={this.state.arrangeByClient}
                    statusFilter={this.statusFilterHandler}
                    statusFilterState={this.state.arrangeByStatus}
                />
                {heading}
                {quotesHeader}
                {quotes}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.quote.quotes,
        loading: state.quote.loading,
        quotesArray: state.quote.quotes,
        quotesFetched: state.quote.quotesFetched,
        quoteSubmitted: state.quote.quoteSubmitted,
        editingKey: state.quote.editingKey,
        userId: state.auth.userId,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onFetchQuotes: (token, userId) => dispatch(actionCreators.fetchQuotes(token, userId)),
        onSetEditingTrue: (key) => dispatch(actionCreators.setEditingTrue(key)),
        onSetEditingFalse: () => dispatch(actionCreators.setEditingFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);