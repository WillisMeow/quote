import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as ActionCreators from '../../../store/actions/index';

class Quotes extends Component {
    componentDidMount () {
        this.props.onFetchQuotes()
    }
    render () {
        let quotesArray = [];
        for (let quote in this.props.quotes) {
            quotesArray.push(this.props.quotes[quote])
        }
        console.log(quotesArray)
        let quotes = <Spinner />

        if(!this.props.loading) {
            quotes = quotesArray.map((quote) => {
                return (
                    <div>
                        <p>{quote.id}</p>   
                        <p>{quote.client.company}</p>  
                    </div>
                )
            })
        }
        return (
            <div>
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