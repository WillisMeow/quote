import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';
import QuotesStatusFilter from './QuotesStatusFilter';

class Quotes extends Component {
    state = {
        viewingQuote: false,
        selectedQuoteKey: null,
        propsLocationKey: null,
        quotesArray: [],
        keyValueQuotesArray: [], // basically quotesArray, with a key (id) value added
        filteredQuotes: [], // keyValueQuotesArray filtered by user
        searchFiltering: false,
        statusFiltering: false,
        status: {
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

        if (this.props.quotesFetched && this.state.keyValueQuotesArray.length === 0) { // initializes this.state.keyValueQuotesArray
            this.initQuotesHandler()
        }

    }

    initQuotesHandler = () => { // initializes key to each quote in quotesArray
        let quotesArray = [];
        for (let quote in this.props.quotes) {
            quotesArray.push({
                key: this.props.quotes[quote].id,
                data: this.props.quotes[quote]
            })
        }
        this.setState({ keyValueQuotesArray : quotesArray })
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
        console.log(event.target.value)
        if (event.target.value !== "") {
            matches = currentList.filter(value => {
                return (
                    value.data.client.company.toLowerCase().includes(event.target.value) ||
                    value.data.reference.quoteUnit.toLowerCase().includes(event.target.value) ||
                    value.data.reference.quoteReference.toLowerCase().includes(event.target.value) ||
                    value.data.reference.clientReference.toLowerCase().includes(event.target.value)
                )
            })
            console.log(matches)
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
            console.log('tempMatch')
            console.log(tempMatch)
            if (tempMatch === true) {
                matches.push(currentList[quote])
            }
        }
        console.log('Matches array')
        console.log(matches)
        if (trueCriteria.length === 0) this.setState({ statusFiltering : false})
        if (trueCriteria.length !== 0) this.setState({ statusFiltering : true })
        this.setState({ status : stateStatusCopy, filteredQuotes : matches })
    }
    statusFilterHandler = () => {
        
    }
    
    render () {
        console.log(this.state)
        let search = (
            <div>
                <input type="text" onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
        let heading = <h2 className={classes.Heading}>Quotes</h2>
        
        let quotesHeader = (
            <div className={classes.QuoteHeader}>
                <p className={classes.Element}>Client</p>
                <p className={classes.Element}>Reference</p>
                <p className={classes.Element}>Client Reference</p>
                <p className={classes.Element}>Quote Unit</p>
                <p className={classes.Element}>$</p>
            </div>
        )

        let quotes = <Spinner />
        
        // switching between filteredQuotes and keyValueQuotesArray depending on filtering state
        let displayQuotesArray = this.state.filteredQuotes;
        if(this.state.filteredQuotes.length === 0 && !(this.state.searchFiltering || this.state.statusFiltering)) {
            displayQuotesArray = this.state.keyValueQuotesArray
        }

        if(!this.props.loading && !this.state.viewingQuote && this.state.quotesArray === this.props.quotes) {
            quotes = displayQuotesArray.map((quote) => {
                return (
                    <div key={quote.key} className={classes.Quote} onClick={() => this.viewQuoteHandler(quote)}>
                        <p className={classes.Element}>{quote.data.client.company}</p>
                        <p className={classes.Element}>{quote.data.reference.quoteReference}</p>
                        <p className={classes.Element}>{quote.data.reference.clientReference}</p>
                        <p className={classes.Element}>{quote.data.reference.quoteUnit}</p>
                        <p className={classes.Element}>{quote.data.price}</p>
                    </div>
                )
            })
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