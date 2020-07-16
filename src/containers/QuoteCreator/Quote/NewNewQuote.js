import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import classes from './NewNewQuote.module.css';
import Client from '../Client/Client';
import QuoteReference from '../Quote/QuoteReference';
import QuoteStatus from '../Quote/QuoteStatus'
import JobsInput from './Jobs/JobsInput';
import QuotePrice from './QuotePrice';
import Button from '../../../components/UI/Button/Button';
import * as actionCreators from '../../../store/actions/index';

class NewNewQuote extends Component {
    componentDidMount () {
        this.props.onInitQuote()
    }
    
    render () {
        let quoteData = {
            reference: this.props.quoteReference,
            status: this.props.status,
            jobs: this.props.jobsArray,
            price: this.props.price
        }

        let quoteSubmittedRedirect = null
        if (this.props.quoteSubmitted) {
            quoteSubmittedRedirect = <Redirect to="/" />
        }

        return (
            <div className={classes.Main}>
            {quoteSubmittedRedirect}
                <div className={classes.SideNav}>
                    <h4>Invoice Settings</h4>
                    <QuoteStatus />
                </div>
                <div className={classes.MainBody}>
                    <h4>Main Invoice Body</h4>
                    <div className={classes.QuoteHeader}>
                        <div className={classes.HeaderElement}>
                            <Client />
                        </div>
                        <div className={classes.HeaderElement}>
                            <QuoteReference />
                        </div>
                    </div>
                    <div>
                        <JobsInput />
                    </div>
                    <div>
                        <QuotePrice />
                    </div>
                    <div>
                        <Button clicked={() => this.props.onSubmitQuote(quoteData)}>Create Quote</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quoteReference: state.quote.quoteReference,
        status: state.quote.status,
        jobsArray: state.quote.jobs,
        price: state.quote.price,
        quoteSubmitted: state.quote.quoteSubmitted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData)),
        onInitQuote: () => dispatch(actionCreators.initQuote())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNewQuote));