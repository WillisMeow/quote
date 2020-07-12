import React from 'react';
import { Component } from 'react';

import classes from './NewNewQuote.module.css';
import Client from '../Client/Client';
import QuoteReference from '../Quote/QuoteReference';
import QuoteStatus from '../Quote/QuoteStatus'
import NewQuote from './NewQuote';
import JobsInput from './Jobs/JobsInput';

class NewNewQuote extends Component {
    render () {
        return (
            <div className={classes.Main}>
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
                </div>
            </div>
        )
    }
}

export default NewNewQuote;