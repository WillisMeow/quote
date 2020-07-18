import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as ActionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';
import ViewQuote from './ViewQuote/ViewQuote';
import NewNewQuote from '../NewNewQuote';

class Quotes extends Component {
    state = {
        viewingQuote: false,
        selectedQuoteKey: null
    }

    componentDidMount () {
        this.props.onFetchQuotes()
    }

    viewQuoteHandler = (quote) => {
        console.log(quote.key)
        this.setState({ viewingQuote : true, selectedQuoteKey : quote.key })
        console.log(this.state)
        this.props.onSetEditingTrue(quote.key)
    }

    returnToQuotesHandler = () => {
        this.setState({viewingQuote : false, selectedQuoteKey : null})
        this.props.onSetEditingFalse()
    }

    handleChange = (event) => {
        let currentList = [];
        let quotesArray = [];
        for (let quote in this.props.quotes) {
            quotesArray.push({
                key: this.props.quotes[quote].id,
                data: this.props.quotes[quote]})
        }

        if (event.target.value !== "") {
            currentList = quotesArray
            console.log(currentList)

            let matches = currentList.filter(value => {
                return (
                    value.data.client.company.toLowerCase().includes(event.target.value)
                )
            })
            console.log(matches)
        }
    }
    
    render () {
        let quotesArray = [];
        for (let quote in this.props.quotes) {
            quotesArray.push({
                key: this.props.quotes[quote].id,
                data: this.props.quotes[quote]})
        }
        console.log(quotesArray)
        let quotes = <Spinner />

        if(!this.props.loading && !this.state.viewingQuote) {
            quotes = quotesArray.map((quote) => {
                return (
                    <div key={quote.key} className={classes.Quote} onClick={() => this.viewQuoteHandler(quote)}>
                        <p className={classes.Element}>Client: {quote.data.client.clientForm.company.value}</p>
                        <p className={classes.Element}>Reference: {quote.data.quote.quoteReference.quoteReference.value}</p>
                        <p className={classes.Element}>Client Reference: {quote.data.quote.quoteReference.clientReference.value}</p>
                        <p className={classes.Element}>Quote Unit: {quote.data.quote.quoteReference.quoteUnit.value}</p>
                    </div>
                )
            })
        }

        if (!this.props.loading && this.state.viewingQuote) {
            /* quotes = <ViewQuote 
                        quote={quotesArray[quotesArray.findIndex(quote => quote.key === this.state.selectedQuoteKey)]}
                        clicked={this.returnToQuotesHandler}  
            />            */
            quotes = <NewNewQuote />
        }

        return (
            <div className={classes.Quotes}>
                <div>
                    <input type="text" onChange={this.handleChange} placeholder="Search..." />
                </div>
            <h2 className={classes.Heading}>Quotes</h2>
                {quotes}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.quote.quotes,
        loading: state.quote.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchQuotes: () => dispatch(ActionCreators.fetchQuotes()),
        onSetEditingTrue: (key) => dispatch(ActionCreators.setEditingTrue(key)),
        onSetEditingFalse: () => dispatch(ActionCreators.setEditingFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);