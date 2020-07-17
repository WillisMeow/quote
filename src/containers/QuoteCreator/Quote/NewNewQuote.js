import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import classes from './NewNewQuote.module.css';
import Client from '../Client/Client';
import QuoteReference from '../Quote/QuoteReference';
import QuoteStatus from '../Quote/QuoteStatus'
import JobsInput from './Jobs/JobsInput';
import QuotePrice from './QuotePrice';
import Button from '../../../components/UI/Button/Button';
import * as actionCreators from '../../../store/actions/index';

class NewNewQuote extends Component {
    /* componentDidMount () {
        this.props.onInitQuote()
    } */

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

    inputChangedHandler = (event, sectionIdentifier, inputIdentifier, key) => {
        const reduxStateCopy = {
            ...this.props.reduxStateQuote
        }
        let stateSectionCopy = null
        if (sectionIdentifier === 'jobs') {
            stateSectionCopy = [
                ...reduxStateCopy[sectionIdentifier]
            ]
            let index = stateSectionCopy.findIndex(el => el.key === key)
            const stateElementCopy = {
                ...stateSectionCopy[index]
            }
            const targetElementConfig = {
                ...stateElementCopy.elementConfig[inputIdentifier]
            }
            targetElementConfig.value = event.target.value;
            targetElementConfig.valid = this.checkValidity(targetElementConfig.value, targetElementConfig.validation);
            targetElementConfig.touched = true;
            stateElementCopy.elementConfig[inputIdentifier] = targetElementConfig;
            stateSectionCopy[index] = stateElementCopy;
        } else if (sectionIdentifier === 'status') {
            let str = event.target.id.split(' ');
            stateSectionCopy = {
                ...reduxStateCopy[sectionIdentifier]
            }
            const stateElementCopy = {
                ...stateSectionCopy[str[0]]
            }
            if (event.target.checked) {
                stateElementCopy[str[1]] = true;
            } else {
                stateElementCopy[str[1]] = false;
            }
            stateSectionCopy[str[0]] = stateElementCopy
        } else {
            stateSectionCopy = {
                ...reduxStateCopy[sectionIdentifier]
            }
            const stateElementCopy = {
                ...stateSectionCopy[inputIdentifier]
            }
            stateElementCopy.value = event.target.value;
            stateElementCopy.valid = this.checkValidity(stateElementCopy.value, stateElementCopy.validation)
            stateElementCopy.touched = true;
            stateSectionCopy[inputIdentifier] = stateElementCopy;
            reduxStateCopy[sectionIdentifier] = stateSectionCopy;
        }
        this.props.onUpdateReduxState(stateSectionCopy, sectionIdentifier)


       /*  const updatedReferenceForm = {
            ...this.props.quoteReference
        }
        const updatedFormElement = {
            ...updatedReferenceForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedReferenceForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedReferenceForm) {
            formIsValid = updatedReferenceForm[inputIdentifier].valid && formIsValid;
        }
        this.props.onReferenceUpdate(updatedReferenceForm) */
    }

    addNewJobHandler = () => {
        let quoteFormCopy = {
            ...this.props.reduxStateQuote.quoteForm
        }
        let jobElement = {
            key: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100), // easy random key
            elementConfig: quoteFormCopy
        }

        this.props.onAddNewJob(jobElement)

        // below to refocus on first input field
        const input = document.querySelector("input");
        input.focus()
    }

    deleteJobHandler = (key) => {
        let jobsArray = this.props.reduxStateQuote.jobs
        jobsArray = jobsArray.filter(el => el.key !== key)

        this.props.onDeleteJob(jobsArray)
    }
    
    render () {
        console.log(this.props.reduxStateQuote)
        let quoteData = {
            client: this.props.clientForm,
            reference: this.props.quoteReference,
            status: this.props.status,
            jobs: this.props.jobsArray,
            price: this.props.price
        }


        let quoteSubmittedRedirect = null
        if (this.props.quoteSubmitted) {
            quoteSubmittedRedirect = <Redirect to="/" />
        }

        return (
            <div className={classes.Main}>
            {quoteSubmittedRedirect}
                <div className={classes.SideNav}>
                    <h4>Invoice Settings</h4>
                    <QuoteStatus 
                        reduxState={this.props.reduxStateQuote}
                        onStatusChange={this.inputChangedHandler}
                    />
                </div>
                <div className={classes.MainBody}>
                    <h4>Main Invoice Body</h4>
                    <div className={classes.QuoteHeader}>
                        <div className={classes.HeaderElement}>
                            <Client />
                        </div>
                        <div className={classes.HeaderElement}>
                            <QuoteReference
                                reduxState={this.props.reduxStateQuote}
                                onChange={this.inputChangedHandler}
                            />
                        </div>
                    </div>
                    <div>
                        <JobsInput 
                            reduxState={this.props.reduxStateQuote}
                            onChange={this.inputChangedHandler}
                            addJob={this.addNewJobHandler}
                            deleteJob={this.deleteJobHandler}
                        />
                    </div>
                    <div>
                        <QuotePrice 
                            reduxState={this.props.reduxStateQuote}
                            onChange={this.inputChangedHandler}
                        />
                    </div>
                    <div>
                        <Button clicked={() => this.props.onSubmitQuote(quoteData)}>Create Quote</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        clientForm: state.client.clientForm,
        quoteReference: state.quote.quoteReference,
        status: state.quote.status,
        jobsArray: state.quote.jobs,
        price: state.quote.price,
        quoteSubmitted: state.quote.quoteSubmitted,
        quotesArray: state.quote.quotes,
        editingStatus: state.quote.editingKey !== null,
        editingKey: state.quote.editingKey,
        reduxStateQuote: state.quote,
        reduxStateClient: state.client
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData)),
        onInitQuote: () => dispatch(actionCreators.initQuote()),
        onUpdateReduxState: (state, id) => dispatch(actionCreators.updateReduxState(state, id)),
        onAddNewJob: (jobElement) => dispatch(actionCreators.addNewJob(jobElement)),
        onDeleteJob: (jobsArray) => dispatch(actionCreators.deleteJob(jobsArray))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNewQuote));