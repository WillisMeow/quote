import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import classes from './NewQuote.module.css'
import Button from '../../../components/UI/Button/Button';
import * as ActionCreators from '../../../store/actions/index';

class NewQuote extends Component {
    state = {
        quotes: [],
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
        // create a job array in redux, and push the last job into it
        this.props.onAddNewJob(this.state.quoteForm)
        let quoteFormCopy = {
            ...this.state.quoteForm
        }
        for(let element in quoteFormCopy) {
            quoteFormCopy[element].value = ''
        }
        this.setState({quoteForm : quoteFormCopy})
        console.log(this.props.jobsArray)
        // display jobs in redux array above
        // empty the active input fields
    }

    render () {
        let quotes = this.props.jobsArray
        let existingJobs = (
            <div>
                {quotes.map((element) => {
                    return (
                        <>
                        <p>{element.jobId.value}</p>
                        <p>{element.jobDetails.value}</p>
                        </>
                    )
                })}
            </div>
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
                {existingJobs}
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
        onAddNewJob: (jobData) => dispatch(ActionCreators.addNewJob(jobData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuote);