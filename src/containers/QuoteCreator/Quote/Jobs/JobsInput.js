import React from 'react';
import { Component } from 'react';
import { connect} from 'react-redux';

import Input from '../../../../components/UI/Input/Input';
import classes from './JobsInput.module.css'
import Button from '../../../../components/UI/Button/Button'
import * as actionCreators from '../../../../store/actions/index';

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
            ...this.props.jobsArray
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

        this.props.onEditJob(jobsArrayStateCopy)
    }

    addNewJobHandler = () => {
        let quoteFormCopy = {
            ...this.state.quoteForm
        }

        let jobElement = {
            key: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100), // easy random key
            elementConfig: quoteFormCopy
        }
        /* this.setState(prevState => ({
            jobs : [...prevState.jobs, jobElement]
        })) */
        this.props.onAddNewJob(jobElement)

        // below to refocus on first input field
        const input = document.querySelector("input");
        input.focus()
    }

    deleteJobHandler = (key) => {
        let jobsArray = this.props.jobsArray
        jobsArray = jobsArray.filter(el => el.key !== key)

        this.props.onDeleteJob(jobsArray)
    }

    render () {
        let jobsArray = []
        for (let el in this.props.jobsArray) {
            jobsArray.push({
                key: this.props.jobsArray[el].key,
                config: this.props.jobsArray[el].elementConfig
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
        for (let el in jobsArray) {
            let currentEl = jobsArray[el]
            let currentWorkingJob = []
            currentForm1.map((jobElement) => {
                return (
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
                )
            })
            currentJobs.push(
                <div key={currentEl.key} className={classes.CurrentWorkingJob}>
                    {currentWorkingJob}
                    <Button clicked={() => this.deleteJobHandler(currentEl.key)}>X</Button>
                </div>
            )
        }

        return (
            <div className={classes.JobFormUnit}>
                <div className={classes.ExistingJobElement}>
                    {currentJobs}
                </div>
                <div className={classes.AddNewButton}>
                    <Button clicked={this.addNewJobHandler}>Add New Job</Button>
                </div>
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
        onAddNewJob: (jobData) => dispatch(actionCreators.addNewJob(jobData)),
        onDeleteJob: (jobsArray) => dispatch(actionCreators.deleteJob(jobsArray)),
        onEditJob: (jobsArray) => dispatch(actionCreators.editJob(jobsArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsInput);