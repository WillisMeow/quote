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

    inputChangedHandler = (event, key, inputIdentifier) => {
        let jobsArrayStateCopy = [
            ...this.state.jobs
        ]
        let index = jobsArrayStateCopy.findIndex(el => el.key === key)
        const targetJobElement = {
            ...jobsArrayStateCopy[index]
        }
        const targetElementConfig = {
            ...targetJobElement.elementConfig[inputIdentifier]
        }

        targetElementConfig.value = event.target.value;
        targetElementConfig.valid = this.checkValidity(targetElementConfig.value, targetElementConfig.validation);
        targetElementConfig.touched = true;
        targetJobElement.elementConfig[inputIdentifier] = targetElementConfig;
        jobsArrayStateCopy[index] = targetJobElement;

        this.setState({jobs : jobsArrayStateCopy})
    }

    addNewJobHandler = () => {
        let quoteFormCopy = {
            ...this.state.quoteForm
        }

        let jobElement = {
            key: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100), // easy random key
            elementConfig: quoteFormCopy
        }
        this.setState(prevState => ({
            jobs : [...prevState.jobs, jobElement]
        }))

        // below to refocus on first input field
        const input = document.querySelector("input");
        input.focus()
    }

    deleteJobHandler = (key) => {
        let jobsArrayStateCopy = [
            ...this.state.jobs
        ]
/*         let index = jobsArrayStateCopy.findIndex(el => el.key === key);
        jobsArrayStateCopy.splice(index, 1);
        this.setState({ jobs : jobsArrayStateCopy}) */

        this.setState((prevState) => ({
            jobs: prevState.jobs.filter(el => el.key !== key)
        }))
    }

    render () {
        console.log(this.state.jobs)
        let jobsArray = []
        for (let el in this.state.jobs) {
            jobsArray.push({
                key: this.state.jobs[el].key,
                config: this.state.jobs[el].elementConfig
            })
            console.log(this.state.jobs[el])
            console.log(jobsArray)
        }

        let currentForm1 = [];
        for (let formElement in this.state.quoteForm) {
            currentForm1.push({
                id: formElement,
                config: this.state.quoteForm[formElement]
            })
        }
        let currentJobs = [];
        for (let el in jobsArray) {
            console.log(el)
            let currentEl = jobsArray[el]
            console.log(currentEl)
            let currentWorkingJob = []
            {currentForm1.map((jobElement) => {
                currentWorkingJob.push(
                    <div key={jobElement.id} className={classes[jobElement.id]}>
                        <Input
                            autoFocus={jobElement.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                            key={jobElement.id}
                            elementType={jobElement.config.elementType}
                            elementConfig={jobElement.config.elementConfig}
                            value={currentEl.config}
                            invalid={!currentEl.config.valid}
                            shouldValidate={currentEl.config.validation}
                            touched={currentEl.config.touched}
                            changed={(event) => this.inputChangedHandler(event,currentEl.key, jobElement.id)}
                            // valueType={this.props.clientForm.company.elementConfig.placeholder}
                        />
                    </div>
                )
            })}
            currentJobs.push(
                <div key={currentEl.key} className={classes.CurrentWorkingJob}>
                    {currentWorkingJob}
                    <Button clicked={() => this.deleteJobHandler(currentEl.key)}>X</Button>
                </div>
            )
            console.log(jobsArray)
        }


/*         let currentForm = [];
        for (let formElement in this.state.quoteForm) {
            currentForm.push({
                id: formElement,
                config: this.state.quoteForm[formElement]
            })
        }
        let jobForm = (
                <div className={classes.JobFormElement}>
                    {currentForm.map((jobElement) => {
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
        ) */
        return (
            <div className={classes.JobFormUnit}>
                <div className={classes.ExistingJobElement}>
                    {currentJobs}
                </div>
                {/* {jobForm} */}
                <div className={classes.AddNewButton}>
                    <Button clicked={this.addNewJobHandler}>Add New Job</Button>
                </div>
            </div>
        )
    }
}

export default JobsInput;