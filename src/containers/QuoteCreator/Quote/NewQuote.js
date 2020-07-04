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
        },
        editingJob: false,
        editingKey: null
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

    editInputChangedHandler = (event, inputIdentifier, key) => {
        let jobToEdit = this.props.jobsArray[this.props.jobsArray.findIndex(element => element.key === key)]
        console.log(jobToEdit)

        let currentEditingJob = this.props.jobsArray[this.props.jobsArray.findIndex(job => job.key === this.state.editingKey)] // finding the correct job element within the jobsArray array using the key value
        let currentEditingValue = {
            ...currentEditingJob[inputIdentifier]
        }
        currentEditingValue = event.target.value;
        currentEditingJob[inputIdentifier] = currentEditingValue;
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

    editExistingJobHandler = () => {
        console.log(this.state)
        let index = this.props.jobsArray.findIndex(job => job.key === this.state.editingKey)
        let quoteFormCopy = {
            ...this.state.quoteForm
        }
        let jobElement = {
            key: this.state.editingKey,
            jobId: quoteFormCopy.jobId.value,
            jobDetails: quoteFormCopy.jobDetails.value
        }
        this.props.onEditJob(index, jobElement)
        for(let element in quoteFormCopy) {
            quoteFormCopy[element].value = '';
            this.setState({quoteForm : quoteFormCopy})
        }  
        this.setState({editingJob : false})
    }

    editButtonHandler = (key) => {
        this.setState({editingJob : true, editingKey : key})

        let currentEditingJob = this.props.jobsArray[this.props.jobsArray.findIndex(job => job.key === key)]
        let quoteFormCopy = {
            ...this.state.quoteForm
        }
        for (let element in quoteFormCopy) {
            let quoteElementCopy = {
                ...quoteFormCopy[element]
            }
            quoteElementCopy.value = currentEditingJob[element]
            quoteElementCopy.valid = 'true'
            quoteFormCopy[element] = quoteElementCopy
        }
        this.setState({quoteForm : quoteFormCopy})
    }

    deleteButtonHandler = (key) => {
        let filteredJobsArray = this.props.jobsArray.filter(job => job.key !== key) // removing element from array using filter
        this.props.onDeleteJob(filteredJobsArray);
    }

    quoteSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.props.clientForm) {
            formData[formElementIdentifier] = this.props.clientForm[formElementIdentifier].value
        }
        let quoteData = {
            client: formData,
            jobs: this.props.jobsArray
        }
        this.props.onSubmitQuote(quoteData)
    }

    render () {
        console.log(this.props.jobsArray)
        let jobs = [];
        for (let job in this.props.jobsArray) {
            jobs.push({
                key: this.props.jobsArray[job].key,
                jobId: this.props.jobsArray[job].jobId,
                jobDetails: this.props.jobsArray[job].jobDetails
            })
        }
        let currentJobs = (
            <>
                {jobs.map((job) => {
                    return (
                        <Job 
                            edit={() => this.editButtonHandler(job.key)} 
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
                <form onSubmit={this.quoteSubmitHandler}>
                    {jobElementArray.map((jobElement) => {
                        return (
                            <Input
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

                        )
                    })}
                    <Button btnType="Success">Create Quote</Button>
                </form>
                <Button clicked={this.state.editingJob ? this.editExistingJobHandler : this.addNewJobHandler}>{this.state.editingJob ? 'Edit Job' : 'Add New'}</Button>
            </>            
        )


        return (
            <div className={classes.NewQuote}>
                {currentJobs}
                {currentForm}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobsArray: state.quote.jobs,
        clientForm: state.client.clientForm,
        client: state.quote.client
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddNewJob: (jobData) => dispatch(ActionCreators.addNewJob(jobData)),
        onDeleteJob: (jobsArray) => dispatch(ActionCreators.deleteJob(jobsArray)),
        onEditJob: (index, jobElement) => dispatch(ActionCreators.editJob(index, jobElement)),
        onSubmitQuote: (quoteData) => dispatch(ActionCreators.submitQuote(quoteData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuote);