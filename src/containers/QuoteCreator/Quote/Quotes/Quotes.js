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
        keyValueQuotesArray: [],
        status: {
            Quote: {
                created: false,
                sent: false,
                accepted: false
            },
            Invoice: {
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
            this.props.onFetchQuotes();
        }
    }
    componentDidUpdate () {
        if (this.props.quoteSubmitted) { // refetching updated quotes array after editing quote has been submitted or quote deleted
            this.props.onResetQuote();
            this.props.onFetchQuotes();
        }
        
        if (this.state.quotesArray !== this.props.quotes && this.props.quotesFetched) {
            this.setState({ quotesArray : this.props.quotes })
        }

        if (this.props.match.isExact && this.state.propsLocationKey !== this.props.location.key) {
            this.setState({ viewingQuote : false, selectedQuoteKey : null, propsLocationKey : this.props.location.key})
            this.props.onFetchQuotes()
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

        if (event.target.value !== "") {
            matches = currentList.filter(value => {
                return (
                    value.data.client.company.toLowerCase().includes(event.target.value) ||
                    value.data.reference.quoteUnit.toLowerCase().includes(event.target.value) ||
                    value.data.reference.quoteReference.toLowerCase().includes(event.target.value) ||
                    value.data.reference.clientReference.toLowerCase().includes(event.target.value)
                )
            })
        }
        this.setState({ keyValueQuotesArray : matches})
    }

    statusChangeHandler = (event) => {
        let str = event.target.id.split(' ');
        console.log(str)
        console.log(event.target.checked)
        let stateStatusCopy = {
            ...this.state.status,
            [str[0]]: {
                ...this.state.status[str[0]],
                [str[1]]: event.target.checked
            }
        }
        console.log(stateStatusCopy)
        this.setState({ status : stateStatusCopy })
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

        if(!this.props.loading && !this.state.viewingQuote && this.state.quotesArray === this.props.quotes) {
            quotes = this.state.keyValueQuotesArray.map((quote) => {
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
        editingKey: state.quote.editingKey
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onFetchQuotes: () => dispatch(actionCreators.fetchQuotes()),
        onSetEditingTrue: (key) => dispatch(actionCreators.setEditingTrue(key)),
        onSetEditingFalse: () => dispatch(actionCreators.setEditingFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);