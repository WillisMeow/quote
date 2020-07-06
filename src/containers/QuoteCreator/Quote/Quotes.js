import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import * as ActionCreators from '../../../store/actions/index';
import classes from './Quotes.module.css';

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
                let jobs = []
                for (let job in quote.jobs) {
                    jobs.push({
                        key: quote.jobs[job].key,
                        jobId: quote.jobs[job].jobId,
                        jobDetails: quote.jobs[job].jobDetails
                    })
                }
                return (
                    // TODO: Only show Quote Client, Quote Number, Quote unit
                    // TODO: add clickability, to lead to quote.
                    <div className={classes.Quote}>
                        <p>Client: {quote.client.company}</p>
                        {/* <p>Client: {quote.jobs}</p> */}
                        {jobs.map((job) => {
                            return (
                                <div>
                                    <p>Job Name: {job.jobId}</p>
                                    <p>Job Details: {job.jobDetails}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                )
            })
        }
        return (
            <div className={classes.Quotes}>
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