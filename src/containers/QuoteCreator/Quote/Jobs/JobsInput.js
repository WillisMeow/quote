import React from 'react';
import { Component } from 'react';

import Input from '../../../../components/UI/Input/Input';
import classes from './JobsInput.module.css'
import Button from '../../../../components/UI/Button/Button'

class JobsInput extends Component {
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
        },
        formIsValid: false,
        editingJob: false,
        editingKey: null,
        jobs: [] // array of quoteForm's for each job line
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
        let elementConfig = {
            jobId: quoteFormCopy.jobId.value,
            jobDetails: quoteFormCopy.jobDetails.value
        }
        let jobElement = {
            key: quoteFormCopy.jobId.value + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100), // easy random key
            elementConfig: elementConfig
        }
        this.setState(prevState => ({
            jobs : [...prevState.jobs, this.state.quoteForm]
        }))
        console.log(jobElement)
        console.log(this.state.jobs)

        // below to refocus on first input field
        const input = document.querySelector("input");
        input.focus()
    }

    render () {
        let jobsArray = []
        for (let el in this.state.jobs) {
            jobsArray.push({
                key: this.state.jobs[el].key,
                config: this.state.jobs[el].elementConfig
            })
        }

        let currentForm1 = [];
        for (let formElement in this.state.quoteForm) {
            currentForm1.push({
                id: formElement,
                config: this.state.quoteForm[formElement]
            })
        }

        let currentJobs = [];
        for (let el in this.state.jobs) {
            let currentEl = this.state.jobs[el]
            {currentForm1.map((jobElement) => {
                console.log(jobElement)
                console.log(currentEl)
                console.log(currentEl[jobElement.id])
                currentJobs.push(
                    <div className={classes[jobElement.id]}>
                        <Input
                            autoFocus={jobElement.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                            key={jobElement.id}
                            elementType={jobElement.config.elementType}
                            elementConfig={jobElement.config.elementConfig}
                            value={currentEl[jobElement.id]}
                            invalid={!jobElement.config.valid}
                            shouldValidate={jobElement.config.validation}
                            touched={jobElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, jobElement.id)}
                            // valueType={this.props.clientForm.company.elementConfig.placeholder}
                        />
                    </div>
                )
            })}
            console.log(jobsArray[el])
        }


        let currentForm = [];
        for (let formElement in this.state.quoteForm) {
            currentForm.push({
                id: formElement,
                config: this.state.quoteForm[formElement]
            })
        }
        let jobForm = (
                <div className={classes.JobFormElement}>
                    {currentForm.map((jobElement) => {
                        console.log(jobElement.config)
                        return (
                            <div className={classes[jobElement.id]}>
                                <Input
                                    autoFocus={jobElement.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                                    key={jobElement.id}
                                    elementType={jobElement.config.elementType}
                                    elementConfig={jobElement.config.elementConfig}
                                    value= {jobElement.config}
                                    invalid={!jobElement.config.valid}
                                    shouldValidate={jobElement.config.validation}
                                    touched={jobElement.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, jobElement.id)}
                                    // valueType={this.props.clientForm.company.elementConfig.placeholder}
                                />
                            </div>
                        )
                    })}
                    
                </div>
        )
        return (
            <div className={classes.JobFormUnit}>
                {currentJobs}
                {jobForm}
                <div className={classes.AddNewButton}>
                    <Button clicked={this.addNewJobHandler}>Add New Job</Button>
                </div>
            </div>
        )
    }
}

export default JobsInput;