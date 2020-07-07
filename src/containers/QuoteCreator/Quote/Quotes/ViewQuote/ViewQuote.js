import React from 'react';

import classes from './ViewQuote.module.css';
import Button from '../../../../../components/UI/Button/Button'

const viewQuote = (props) => {
    let quote = props.quote
    console.log(quote)
    let jobsArray = [];
    for (let job in quote.data.jobs) {
        jobsArray.push({
            key: quote.data.jobs[job].key,
            jobId: quote.data.jobs[job].jobId,
            jobDetails: quote.data.jobs[job].jobDetails
        })
    }
    let jobs = (
        jobsArray.map((job) => {
            return (
                <div className={classes.Job}>
                    <p className={classes.JobElement}>Job: {job.jobId}</p>
                    <p className={classes.JobElement}>Detail: {job.jobDetails}</p>
                </div>
            )
        })
    )
    return (
        <div>
            <p className={classes.QuoteElement}>Client: {quote.data.client.company}</p>
            <p className={classes.QuoteElement}>Reference: {quote.data.reference.quoteReference}</p>
            <p className={classes.QuoteElement}>Unit: {quote.data.reference.quoteUnit}</p>
            <p className={classes.QuoteElement}>Jobs:</p>
            {jobs}
            <div className={classes.Button}>
                <Button clicked={props.clicked}>Return To Quotes</Button>
            </div>
        </div>
    )
}

export default viewQuote