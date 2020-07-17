import React from 'react';
import { connect } from 'react-redux';

import classes from './ViewQuote.module.css';
import Button from '../../../../../components/UI/Button/Button'

const viewQuote = (props) => {
    let quote = props.quote
    console.log(quote)
    let jobsArray = [];
    for (let job in quote.data.jobs) {
        jobsArray.push({
            key: quote.data.jobs[job].key,
            jobId: quote.data.jobs[job].elementConfig.jobId,
            jobDetails: quote.data.jobs[job].elementConfig.jobDetails
        })

    }
    let jobs = (
        jobsArray.map((job) => {
            return (
                <div key={job.key} className={classes.Job}>
                    <p className={classes.JobElement}>Job: {job.jobId.value}</p>
                    <p className={classes.JobElement}>Detail: {job.jobDetails.value}</p>
                </div>
            )
        })
    )
    return (
        <div>
            <p className={classes.Element}>Client: {quote.data.client.company.value}</p>
            <p className={classes.Element}>Reference: {quote.data.reference.quoteReference.value}</p>
            <p className={classes.Element}>Client Reference: {quote.data.reference.clientReference.value}</p>
            <p className={classes.Element}>Quote Unit: {quote.data.reference.quoteUnit.value}</p>
            <p className={classes.QuoteElement}>Jobs:</p>
            {jobs}
            <div className={classes.Button}>
                <Button clicked={props.clicked}>Return To Quotes</Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(viewQuote)