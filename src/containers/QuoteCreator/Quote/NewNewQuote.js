import React from 'react';
import { Component } from 'react';
import classes from './NewNewQuote.module.css';

class NewNewQuote extends Component {
    render () {
        return (
            <div>
                <div className={classes.SideNav}>
                    <h4>Invoice Settings</h4>
                </div>
                <div className={classes.MainBody}>
                    <h4>Main Invoice Body</h4>
                </div>
            </div>
        )
    }
}

export default NewNewQuote;