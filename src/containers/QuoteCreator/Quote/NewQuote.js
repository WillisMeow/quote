import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import classes from './NewQuote.module.css'
import Button from '../../../components/UI/Button/Button';
import * as ActionCreators from '../../../store/actions/index';
import Jobs from './Jobs/Jobs';
import Job from './Jobs/Job/Job';

class NewQuote extends Component {
    state = {
        quoteForm: {
            jobId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            jobDetails: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job Details'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedQuoteForm = {
            ...this.state.quoteForm
        }
        const updatedFormElement = {
            ...updatedQuoteForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedQuoteForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedQuoteForm) {
            formIsValid = updatedQuoteForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({quoteForm : updatedQuoteForm, formIsValid : formIsValid})
    }
    

    addNewJobHandler = () => {
        let quoteFormCopy = {
            ...this.state.quoteForm
        }
        let jobElement = {
            key: quoteFormCopy.jobId.value + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100), // easy random key
            jobId: quoteFormCopy.jobId.value,
            jobDetails: quoteFormCopy.jobDetails.value
        }
        // create a job array in redux, and push the last job into it
        this.props.onAddNewJob(jobElement)
        for(let element in quoteFormCopy) {
            quoteFormCopy[element].value = ''; // empty the active input fields
            this.setState({quoteForm : quoteFormCopy})
        }  
    }

    deleteButtonHandler = (key) => {
        let jobsArray = this.props.jobsArray;
        let filteredJobsArray = this.props.jobsArray.filter(job => job.key !== key) // removing element from array using filter
        console.log(filteredJobsArray)
        this.props.onDeleteJob(filteredJobsArray);

    }

    render () {
        let jobs = []
        for (let job in this.props.jobsArray) {
            jobs.push({
                key: this.props.jobsArray[job].key,
                jobId: this.props.jobsArray[job].jobId,
                jobDetails: this.props.jobsArray[job].jobDetails
            })
            console.log(jobs)
        }
        let currentJobs = (
            <>
                {jobs.map((job) => {
                    return (
                        // display jobs in redux array above
                        <Job 
                            edit={this.editButtonHandler} 
                            delete={() => this.deleteButtonHandler(job.key)} 
                            key={job.key} 
                            name={job.jobId} 
                            details={job.jobDetails}> 
                        </Job>
                    )
                })}
            </>
        )


        let jobElementArray = [];
        for (let jobElement in this.state.quoteForm) {
            jobElementArray.push({
                id: jobElement,
                config: this.state.quoteForm[jobElement]
            })
        }
        let currentForm = (
            <>
                <form>
                    {jobElementArray.map((jobElement) => {
                        return (
                            <Input
                                key={jobElement.id}
                                elementType={jobElement.config.elementType}
                                elementConfig={jobElement.config.elementConfig}
                                value={jobElement.config}
                                invalid={!jobElement.config.valid} // required for all fields
                                shouldValidate={jobElement.config.validation} // required for all fields
                                touched={jobElement.config.touched} // only required for company field
                                changed={(event) => this.inputChangedHandler(event, jobElement.id)} // required for all fields
                                // valueType={this.props.clientForm.company.elementConfig.placeholder}
                            />

                        )
                    })}
                </form>
                <Button clicked={this.addNewJobHandler}>Add New</Button>
            </>            
        )

        return (
            <div className={classes.NewQuote}>
                <p>Hello NewQuote</p>
                {currentJobs}
                {currentForm}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobsArray: state.quote.jobs
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddNewJob: (jobData) => dispatch(ActionCreators.addNewJob(jobData)),
        onDeleteJob: (jobsArray) => dispatch(ActionCreators.deleteJob(jobsArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuote);