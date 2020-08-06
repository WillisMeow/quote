import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './NewNewQuote.module.css';
import Client from '../Client/Client';
import QuoteReference from '../Quote/QuoteReference';
import QuoteStatus from '../Quote/QuoteStatus'
import JobsInput from './Jobs/JobsInput';
import QuotePrice from './QuotePrice';
import Button from '../../../components/UI/Button/Button';
import * as actionCreators from '../../../store/actions/index';
import PopUp from './Popup';

class NewNewQuote extends Component {
    state = {
        currentQuoteData: [],
        quotesArray: [],
        jobsState: 'quote', // will dictate if added job goes into quotesJobsArray or InvoiceJobsArray
        viewPDF: false,
        creatingPDF: false,
        modalState: null,
        quote: {
            clients: {
                clientsArray: [],
                clientForm: {
                    company: {
                        elementType: 'select',
                        elementConfig: {
                            options: []
                        },
                        value: 'default',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    companyAddress: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Company Address'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    contactName: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Contact Person'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    contactPhoneNumber: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Contact Phone Number'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                    contactEmailAddress: {
                        elementType: 'input',
                        elementConfig: {
                            type: 'email',
                            placeholder: 'Contact Email Address'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid: false,
                        touched: false
                    },
                }
            },
            reference: {
                quoteUnit: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Quote Unit'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                quoteReference: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Quote Reference'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                clientReference: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Client Reference'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
            },
            date: null,
            invoiceDate: 'noInvoice',
            status: {
                job: {
                    started: false,
                    finished: false
                },
                quote: {
                    created: false,
                    sent: false,
                    accepted: false
                },
                invoice: {
                    created: false,
                    sent: false,
                    paid: false
                }
            },
            price: {
                price: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Price'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                }
            },
            jobs: {
                jobsArray: [],
                quoteJobsArray: [],
                invoiceJobsArray: [],
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
        }
    }

    componentDidMount () {
        if (this.props.location.pathname === '/newnewquote') { // clean load from New New Quote on Toolbar
            this.props.onResetQuote() // resets all the quote statuses in redux
            this.props.onInitClients(this.props.token, this.props.userId) // fetchnes list of clients from firebase, and loads them into redux
        }

        if (this.props.location.pathname !== '/newnewquote' && this.props.editingStatus) { // loading by clicking into edit quote via Quotes.js
            this.props.onInitClients(this.props.token, this.props.userId)
        }

        if (this.state.quote.date === null) { // if there is not quote date, setting to current date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            let quoteStateCopy = {
                ...this.state.quote,
                date: today
            }
            this.setState({ quote : quoteStateCopy })
        }
    }

    componentDidUpdate () {

        if (this.props.existingClientsLoaded && this.state.quote.clients.clientForm.company.elementConfig.options !== this.props.reduxStateClient.clients) { // only updating when the clients options within Input does not match the array in redux
            let quoteStateCopy = {
                ...this.state.quote
            }
            let clientSectionCopy = {
                ...quoteStateCopy.clients.clientForm.company.elementConfig
            }
            clientSectionCopy.options = this.props.reduxStateClient.clients;
            quoteStateCopy.clients.clientForm.company.elementConfig = clientSectionCopy;
            let clientsArrayCopy = {
                ...quoteStateCopy.clients.clientsArray
            }
            clientsArrayCopy = this.props.reduxStateClient.clients;
            quoteStateCopy.clients.clientsArray = clientsArrayCopy;
            this.setState({ quote : quoteStateCopy })
        }

        if ((this.props.quoteSubmitted && !this.props.quotesFetched)) { // after quote has been submitted, re-fetching updated quotes array from firebase into redux
            this.props.onFetchQuotes(this.props.token, this.props.userId)
        }

        if (this.props.editingStatus && this.props.existingClientsLoaded && this.props.clientFormInitialized && this.state.quote.clients.clientForm.company.value === 'default') { // ties into: loading by clicking into edit quote via Quotes.js
            let selectedQuote = this.props.quotesArray[this.props.quotesArray.findIndex(el => el.id === this.props.editingKey)];
            console.log(selectedQuote)
            /* quoteJobs: quoteJobsValueArray,
            invoiceJobs: invoiceJobsValueArray */
            let quoteJobsArray = [];
            let invoiceJobsArray = [];
                for (let job in selectedQuote.quoteJobs) {
                    quoteJobsArray.push({
                        key: selectedQuote.quoteJobs[job].key,
                        elementConfig: {
                            jobId: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'Job Name'
                                },
                                value: selectedQuote.quoteJobs[job].jobId,
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
                                value: selectedQuote.quoteJobs[job].jobDetails,
                                validation: {
                                    required: true
                                },
                                valid: false,
                                touched: false
                            }
                        }
                    })
                }
                for (let job in selectedQuote.invoiceJobs) {
                    invoiceJobsArray.push({
                        key: selectedQuote.invoiceJobs[job].key,
                        elementConfig: {
                            jobId: {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'Job Name'
                                },
                                value: selectedQuote.invoiceJobs[job].jobId,
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
                                value: selectedQuote.invoiceJobs[job].jobDetails,
                                validation: {
                                    required: true
                                },
                                valid: false,
                                touched: false
                            }
                        }
                    })
                }

            let stateCopy = {
                ...this.state.quote,
                clients: {
                    ...this.state.quote.clients,
                    clientForm: {
                        ...this.state.quote.clients.clientForm,
                        company: {
                            ...this.state.quote.clients.clientForm.company,
                            value: selectedQuote.client.company
                        },
                        companyAddress: {
                            ...this.state.quote.clients.clientForm.companyAddress,
                            value: selectedQuote.client.companyAddress
                        },
                        contactEmailAddress: {
                            ...this.state.quote.clients.clientForm.contactEmailAddress,
                            value: selectedQuote.client.contactEmailAddress
                        },
                        contactName: {
                            ...this.state.quote.clients.clientForm.contactName,
                            value: selectedQuote.client.contactName
                        },
                        contactPhoneNumber: {
                            ...this.state.quote.clients.clientForm.contactPhoneNumber,
                            value: selectedQuote.client.contactPhoneNumber
                        }
                    }
                },
                date: selectedQuote.date,
                invoiceDate: selectedQuote.invoiceDate,
                price: {
                    ...this.state.quote.price,
                    price: {
                        ...this.state.quote.price.price,
                        value: selectedQuote.price
                    }
                },
                reference: {
                    ...this.state.quote.reference,
                    quoteUnit: {
                        ...this.state.quote.reference.quoteUnit,
                        value: selectedQuote.reference.quoteUnit
                    },
                    quoteReference: {
                        ...this.state.quote.reference.quoteReference,
                        value: selectedQuote.reference.quoteReference
                    },
                    clientReference: {
                        ...this.state.quote.reference.clientReference,
                        value: selectedQuote.reference.clientReference
                    }
                },
                status: {
                    ...this.state.quote.status,
                    job: {
                        ...this.state.quote.status.job,
                        started: selectedQuote.status.job.started,
                        finished: selectedQuote.status.job.finished
                    },
                    quote: {
                        ...this.state.quote.status.quote,
                        created: selectedQuote.status.quote.created,
                        sent: selectedQuote.status.quote.sent,
                        accepted: selectedQuote.status.quote.accepted
                    },
                    invoice: {
                        ...this.state.quote.status.invoice,
                        created: selectedQuote.status.invoice.created,
                        sent: selectedQuote.status.invoice.sent,
                        paid: selectedQuote.status.invoice.paid
                    }
                },
                jobs: {
                    ...this.state.quote.jobs,
                    quoteJobsArray: quoteJobsArray,
                    invoiceJobsArray: invoiceJobsArray
                }
            }
            this.setState({ quote : stateCopy })
        }

        // below two if statements decide if user is navigated to pdf or not
        if (this.props.quoteSubmitted && this.props.quotesFetched && this.props.pdfFormat !== 'none') {
            this.props.history.replace('/pdfquote')
        }
        if (this.props.quoteSubmitted && this.props.quotesFetched && this.props.pdfFormat === 'none') {
            this.props.history.replace('/quotes')
        }

        /* if (this.props.location.pathname === "/newnewquote" && this.props.quoteSubmitted && this.props.quotesFetched) { // pushing to PDF viewer if quotesubmitted && quotesfetches from /newnewquote
            this.props.history.replace('/pdfquote')
        } */
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

    inputChangedHandler = (event, sectionIdentifier, inputIdentifier, key) => {
        if (sectionIdentifier === 'jobs') {
            let index = this.state.quote.jobs[this.state.jobsState + "JobsArray"].findIndex(el => el.key === key)
            let quoteStateCopyTrial = {
                ...this.state.quote,
                jobs: {
                    ...this.state.quote.jobs,
                    jobsArray: [
                        ...this.state.quote.jobs[this.state.jobsState + "JobsArray"],
                    ]
                }
            }
            quoteStateCopyTrial.jobs[this.state.jobsState + "JobsArray"][index].elementConfig[inputIdentifier] = {
                ...quoteStateCopyTrial.jobs[this.state.jobsState + "JobsArray"][index].elementConfig[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, quoteStateCopyTrial.jobs[this.state.jobsState + "JobsArray"][index].elementConfig[inputIdentifier].validation),
                touched: true
            }
            return (
                this.setState({ quote : quoteStateCopyTrial}, () => {
                    this.props.oncreateQuoteData(this.state.quote, this.props.userId)
                })
            )
        } else if (sectionIdentifier === 'status') {
            let str = event.target.id.split(' ');
            let stateStatusCopy = {
                ...this.state.quote,
                [sectionIdentifier]: {
                    ...this.state.quote[sectionIdentifier],
                    [str[0]]: {
                        ...this.state.quote[sectionIdentifier][str[0]],
                        [str[1]]: event.target.checked
                    }
                }
            }
            this.setState({ quote : stateStatusCopy }, () => {
                this.props.oncreateQuoteData(this.state.quote, this.props.userId)
            })
        } else if (sectionIdentifier === 'clients') {
            let stateClientsCopy = {
                ...this.state.quote,
                [sectionIdentifier]: {
                    ...this.state.quote[sectionIdentifier],
                    clientForm: {
                        ...this.state.quote[sectionIdentifier].clientForm,
                    }
                }
            }
            if (inputIdentifier === 'company') {
                let clientsArrayCopy = this.state.quote.clients.clientsArray;
                for (let element in clientsArrayCopy) {
                    if (clientsArrayCopy[element].client.company === event.target.value ) {
                        for (let formElement in stateClientsCopy[sectionIdentifier].clientForm) {
                            let eventTarget = clientsArrayCopy[element].client[formElement]
                            stateClientsCopy[sectionIdentifier].clientForm[formElement] = {
                                ...stateClientsCopy[sectionIdentifier].clientForm[formElement],
                                value: eventTarget,
                                valid: this.checkValidity(eventTarget, stateClientsCopy[sectionIdentifier].clientForm[formElement].validation),
                                touched: true
                            }
                        }
                    }
                }
            } else {
                stateClientsCopy[sectionIdentifier].clientForm[inputIdentifier] = {
                    ...stateClientsCopy[sectionIdentifier].clientForm[inputIdentifier],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, stateClientsCopy[sectionIdentifier].clientForm[inputIdentifier].validation)
                }
            }
            this.setState({ quote : stateClientsCopy }, () => {
                this.props.oncreateQuoteData(this.state.quote, this.props.userId)
            })
        } else {
            let stateSectionCopy = {
                ...this.state.quote,
                [sectionIdentifier]: {
                    ...this.state.quote[sectionIdentifier],
                    [inputIdentifier]: {
                        ...this.state.quote[sectionIdentifier][inputIdentifier],
                        value: event.target.value,
                        valid: this.checkValidity(event.target.value, this.state.quote[sectionIdentifier][inputIdentifier].validation),
                        touched: true
                    }
                }
            }
            // setState accepts a callback parameter. This way, this.props.oncreateQuoteData will only be run after state is updated
            this.setState({ quote : stateSectionCopy }, () => {
                this.props.oncreateQuoteData(this.state.quote, this.props.userId)
            })
        }
    }

    addNewJobHandler = () => {
        let jobsState = null;
        if (this.state.jobsState === 'quote') {
            jobsState = 'quote'
        } else if (this.state.jobsState === 'invoice') {
            jobsState = 'invoice'
        }
        console.log(jobsState + 'JobsArray')

        let quoteStateCopy = {
            ...this.state.quote
        }
        let stateSectionCopy = {
            ...quoteStateCopy.jobs
        }
        let jobFormCopy = {
            ...stateSectionCopy.quoteForm
        }
        let jobElement = {
            key: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100), // easy random key
            elementConfig: jobFormCopy
        }
        let jobsArrayStateCopy = [
            ...stateSectionCopy[jobsState + 'JobsArray']
        ]
        jobsArrayStateCopy.push(jobElement);
        stateSectionCopy[jobsState + 'JobsArray'] = jobsArrayStateCopy;
        quoteStateCopy.jobs = stateSectionCopy;
        this.setState({ quote : quoteStateCopy})
    }   

    deleteJobHandler = (key) => {
        let quoteStateCopy = {
            ...this.state.quote
        }
        let jobsArrayCopy = quoteStateCopy.jobs[this.state.jobsState + 'JobsArray'];
        jobsArrayCopy = jobsArrayCopy.filter(el => el.key !== key);
        quoteStateCopy.jobs[this.state.jobsState + 'JobsArray'] = jobsArrayCopy
        this.setState({ quote : quoteStateCopy })
    }

    submitQuoteHandler = (quoteData) => {
        this.props.onSubmitQuote(quoteData, this.props.token) // submits quoteData to Firebase, and retrieves all quotes into redux
    }

    SaveQuoteEditHandler = (quoteData, key, action) => {
        if (action === 'quote') {
            this.props.onPdfFormatChange(action)
            this.props.onSaveQuoteEdit(quoteData, key, this.props.token)
        } else if (action === 'invoice') {
            this.props.onPdfFormatChange(action)
            let quoteDataCopy = quoteData;
            if (this.state.quote.invoiceDate === 'noInvoice' /* this.props.pdfFormat === 'invoice' */) {
                // creating invoice date if not present (invoice date is created first time an invoice PDF is created for a certain quote)
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;
                quoteDataCopy = {
                    ...quoteData,
                    invoiceDate: today
                }
                let quoteStateCopy = {
                    ...this.state.quote,
                    invoiceDate: today
                }
                this.setState({ quote : quoteStateCopy })
            }
            this.props.onSaveQuoteEdit(quoteDataCopy, key, this.props.token)
        } else {
            this.props.onSaveQuoteEdit(quoteData, key, this.props.token)
            this.props.history.replace('/quotes')
        }
    }

    DeleteQuoteHandler = (quoteData, key) => {
        this.props.onDeleteQuote(quoteData, key)
        this.props.history.push('/quotes')
    }

    showModalHandler = (action, quoteData, key) => {
        // master actions, in charge of opening modal (modalOpen) and what gets displayed (modalState)
        if (action === 'masterPDF') {
            this.setState({ creatingPDF : true, modalState : 'pdf', modalOpen : true })
        }
        if (action === 'masterEdit') {
            this.setState({ modalState : 'saveEdit', modalOpen : true})
        }
        if (action === 'masterDelete') {
            this.setState({modalState : 'delete', modalOpen : true})
        }

        if (action === 'quote' || action === 'invoice' || action === 'saveEdit') {
            this.SaveQuoteEditHandler(quoteData, key, action)
        }
        if (action === 'delete') {
            this.DeleteQuoteHandler(quoteData, key)
        }
    }
    cancelModalHandler = () => {
        this.setState({ modalOpen : false, modalState : null, creatingPDF : false })
    }

    toggleJobsStateHandler = (jobsState) => {
        if (jobsState === 'quote') {
            this.setState({ jobsState : jobsState })
        } else if (jobsState === 'invoice') {
            this.setState({ jobsState : jobsState })
        }
    }

    render () {
        console.log('this.state')
        console.log(this.state)
        let quoteStateCopy = {
            ...this.state.quote
        }
        let jobsArrayCopy = quoteStateCopy.jobs.jobsArray
        let jobsValueArray = []
        for (let job in jobsArrayCopy) {
            jobsValueArray.push({
                key: jobsArrayCopy[job].key,
                jobId: jobsArrayCopy[job].elementConfig.jobId.value,
                jobDetails: jobsArrayCopy[job].elementConfig.jobDetails.value
            })
        }
        let quoteJobsValueArray = [];
        for (let job in quoteStateCopy.jobs.quoteJobsArray) {
            quoteJobsValueArray.push({
                key: quoteStateCopy.jobs.quoteJobsArray[job].key,
                jobId: quoteStateCopy.jobs.quoteJobsArray[job].elementConfig.jobId.value,
                jobDetails: quoteStateCopy.jobs.quoteJobsArray[job].elementConfig.jobDetails.value,
            })
        }
        let invoiceJobsValueArray = [];
        for (let job in quoteStateCopy.jobs.invoiceJobsArray) {
            invoiceJobsValueArray.push({
                key: quoteStateCopy.jobs.invoiceJobsArray[job].key,
                jobId: quoteStateCopy.jobs.invoiceJobsArray[job].elementConfig.jobId.value,
                jobDetails: quoteStateCopy.jobs.invoiceJobsArray[job].elementConfig.jobDetails.value,
            })
        }

        // Custom messaging for Create Quote and Invoice buttons based on current state
        let createQuoteButtonMessage = 'Create Quote';
        if (this.state.jobsState === 'quote' && this.state.quote.jobs.quoteJobsArray.length !== 0) {
            createQuoteButtonMessage = 'Quote Jobs'
        } else if (this.state.jobsState !== 'quote' && this.state.quote.jobs.quoteJobsArray.length !== 0) {
            createQuoteButtonMessage = 'View Quote'
        }
        let createInvoiceButtonMessage = "Create Invoice";
        if (this.state.jobsState === 'invoice' && this.state.quote.jobs.invoiceJobsArray.length !== 0) {
            createInvoiceButtonMessage = 'Invoice Jobs'
        } else if (this.state.jobsState !== 'invoice' && this.state.quote.jobs.invoiceJobsArray.length !== 0) {
            createInvoiceButtonMessage = 'View Invoice'
        }

        return (
            <>
            <div className={classes.Main}>
                <div className={classes.SideNav}>
                    <h4>Invoice Settings</h4>
                    <QuoteStatus 
                        quoteState={this.state.quote}
                        onStatusChange={this.inputChangedHandler}
                    />
                </div>
                <div className={classes.MainBody}>
                    <div className={classes.QuoteHeader}>
                        <div className={classes.HeaderElement}>
                            <Client 
                                quoteState={this.state.quote}
                                reduxStateClient={this.props.reduxStateClient}
                                onChange={this.inputChangedHandler}
                            />
                        </div>
                        <div className={classes.HeaderElement}>
                            <QuoteReference
                                quoteState={this.state.quote}
                                onChange={this.inputChangedHandler}
                            />
                        </div>
                    </div>
                    <div>
                        <Button clicked={() => this.toggleJobsStateHandler('quote')} >{createQuoteButtonMessage}</Button>
                        <Button clicked={() => this.toggleJobsStateHandler('invoice')}>{createInvoiceButtonMessage}</Button>
                    </div>
                    <div>
                        <JobsInput 
                            jobsState={this.state.jobsState}
                            quoteState={this.state.quote}
                            onChange={this.inputChangedHandler}
                            addJob={this.addNewJobHandler}
                            deleteJob={this.deleteJobHandler}
                        />
                    </div>
                    <div>
                        <QuotePrice 
                            quoteState={this.state.quote}
                            onChange={this.inputChangedHandler}
                        />
                    </div>
                    <div>
                        {this.props.editingKey ? <Button clicked={() =>this.showModalHandler('masterDelete', this.props.quoteData, this.props.editingKey)}>Delete Job</Button> : null}
                        <Button clicked={() => this.props.editingKey ? this.showModalHandler('masterEdit', this.props.quoteData, this.props.editingKey) : this.submitQuoteHandler(this.props.quoteData)}>{this.props.editingKey ? "Save Job" : "Create Job"}</Button>
                        {this.props.location.pathname !== '/newnewquote' && this.props.editingStatus ? <Button clicked={() => this.SaveQuoteEditHandler(this.props.quoteData, this.props.editingKey, this.state.jobsState)} >Create PDF</Button> : null}
                    </div>
                </div>
            </div>
            <PopUp 
                quoteData={this.props.quoteData}
                editingKey={this.props.editingKey}
                modalOpen={this.state.modalOpen}
                modalState={this.state.modalState}
                buttonClicked={this.showModalHandler}
                cancel={this.cancelModalHandler}
            />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        quoteSubmitted: state.quote.quoteSubmitted,
        editingStatus: state.quote.editingKey !== null,
        editingKey: state.quote.editingKey,
        reduxStateClient: state.client,
        existingClientsLoaded: state.client.existingClientsLoaded,
        clientFormInitialized: state.client.clientFormInitialized,
        quotesFetched: state.quote.quotesFetched,
        quotesArray: state.quote.quotes,
        pdfFormat: state.quote.pdfFormat,
        userId: state.auth.userId,
        token: state.auth.token,
        quoteData: state.quote.quoteData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitQuote: (quoteData, token) => dispatch(actionCreators.submitQuote(quoteData, token)),
        onFetchQuotes: (token, userId) => dispatch(actionCreators.fetchQuotes(token, userId)),
        onSaveQuoteEdit: (quoteData, key, token) => dispatch(actionCreators.saveQuoteEdit(quoteData, key, token)),
        onDeleteQuote: (quoteData, key) => dispatch(actionCreators.deleteQuote(quoteData, key)),
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onInitClients: (token, userId) => dispatch(actionCreators.initClients(token, userId)),
        onPdfFormatChange: (format) => dispatch(actionCreators.pdfFormatChange(format)),
        oncreateQuoteData: (quoteForm, userId) => dispatch(actionCreators.createQuoteData(quoteForm, userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNewQuote));