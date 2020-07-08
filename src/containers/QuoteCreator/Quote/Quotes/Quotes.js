import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as ActionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';
import ViewQuote from './ViewQuote/ViewQuote';

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
    }

    returnToQuotesHandler = () => {
        this.setState({viewingQuote : false, selectedQuoteKey : null})
    }

    handleChange = (event) => {
        let currentList = [];
        let newList = []

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
                        <p className={classes.Element}>Client: {quote.data.client.company}</p>
                        <p className={classes.Element}>Reference: {quote.data.reference.quoteReference}</p>
                        <p className={classes.Element}>Quote Unit: {quote.data.reference.quoteUnit}</p>
                    </div>
                )
            })
        }

        if (!this.props.loading && this.state.viewingQuote) {
            quotes = <ViewQuote 
                        quote={quotesArray[quotesArray.findIndex(quote => quote.key === this.state.selectedQuoteKey)]}
                        clicked={this.returnToQuotesHandler} 
            />
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
        onFetchQuotes: () => dispatch(ActionCreators.fetchQuotes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);