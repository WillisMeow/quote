import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as ActionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';

class Quotes extends Component {
    state = {
        viewingQuote: false,
        selectedQuoteKey: null,
        propsLocationKey: null,
        quotesArray: []
    }

    componentDidMount () {
        this.props.onFetchQuotes();
        this.setState({ propsLocationKey : this.props.location.key })
    }
    componentDidUpdate () { // using props (given from react-router, accessed from this.props) to update state (to enable quotes to be rerendered)
        if (this.state.quotesArray !== this.props.quotes && this.props.quotesFetched) {
            this.setState({ quotesArray : this.props.quotes })
        }

        if (this.props.match.isExact && this.state.propsLocationKey !== this.props.location.key) {
            this.setState({ viewingQuote : false, selectedQuoteKey : null, propsLocationKey : this.props.location.key})
            this.props.onFetchQuotes()
        }
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
        let currentList = [];
        let quotesArray = [];
        for (let quote in this.props.quotes) {
            quotesArray.push({
                key: this.props.quotes[quote].id,
                data: this.props.quotes[quote]})
        }

        if (event.target.value !== "") {
            currentList = quotesArray;
            let matches = currentList.filter(value => {
                return (
                    value.data.client.company.toLowerCase().includes(event.target.value)
                )
            })
        }
    }
    
    render () {
        console.log(this.state)
        let search = (
            <div>
                <input type="text" onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
        let heading = <h2 className={classes.Heading}>Quotes</h2>
        
        let quotesArray = [];
        for (let quote in this.props.quotes) {
            quotesArray.push({
                key: this.props.quotes[quote].id,
                data: this.props.quotes[quote]})
        }
        let quotes = <Spinner />

        if(!this.props.loading && !this.state.viewingQuote && this.state.quotesArray === this.props.quotes) {
            quotes = quotesArray.map((quote) => {
                return (
                    <div key={quote.key} className={classes.Quote} onClick={() => this.viewQuoteHandler(quote)}>
                        <p className={classes.Element}>Client: {quote.data.client.company}</p>
                        <p className={classes.Element}>Reference: {quote.data.reference.quoteReference}</p>
                        <p className={classes.Element}>Client Reference: {quote.data.reference.clientReference}</p>
                        <p className={classes.Element}>Quote Unit: {quote.data.reference.quoteUnit}</p>
                    </div>
                )
            })
        }

        return (
            <div className={classes.Quotes}>
                {search}
                {heading}
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
        quotesFetched: state.quote.quotesFetched
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