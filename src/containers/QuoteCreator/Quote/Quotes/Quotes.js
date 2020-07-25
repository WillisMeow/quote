import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as ActionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';
import NewNewQuote from '../NewNewQuote';
import { Route } from 'react-router';

class Quotes extends Component {
    state = {
        viewingQuote: false,
        selectedQuoteKey: null,
        propsLocationKey: null
    }

    componentDidMount () {
        console.log(this.props)
        this.props.onFetchQuotes()
        this.setState({ propsLocationKey : this.props.location.key })
    }
    componentDidUpdate () { // using props (given from react-router, accessed from this.props) to update state (to enable quotes to be rerendered)
        if (this.props.match.isExact && this.state.propsLocationKey !== this.props.location.key) {
            this.setState({ viewingQuote : false, selectedQuoteKey : null, propsLocationKey : this.props.location.key})
        }
    }

    viewQuoteHandler = (quote) => {
        console.log(quote.key)
        this.setState({ viewingQuote : true, selectedQuoteKey : quote.key })
        console.log(this.state)
        this.props.onSetEditingTrue(quote.key)
        this.props.history.push(this.props.match.path + '/newnewquote')
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
        console.log(this.state)
        console.log(this.props)
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
        console.log(quotesArray)
        let quotes = <Spinner />

        if(!this.props.loading && !this.state.viewingQuote) {
            quotes = quotesArray.map((quote) => {
                return (
                    <div key={quote.key} className={classes.Quote} onClick={() => this.viewQuoteHandler(quote)}>
                        <p className={classes.Element}>Client: {quote.data.clients.clientForm.company.value}</p>
                        <p className={classes.Element}>Reference: {quote.data.reference.quoteReference.value}</p>
                        <p className={classes.Element}>Client Reference: {quote.data.reference.clientReference.value}</p>
                        <p className={classes.Element}>Quote Unit: {quote.data.reference.quoteUnit.value}</p>
                    </div>
                )
            })
        }

        if (!this.props.loading && this.state.viewingQuote) {
            search = null;
            heading = null;
            quotes =
            <Route 
                path={this.props.match.path + '/newnewquote'}
                component={NewNewQuote}
            />
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