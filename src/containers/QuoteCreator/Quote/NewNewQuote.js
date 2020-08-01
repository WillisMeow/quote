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
import PDFView from './PDF/PDFView';

class NewNewQuote extends Component {
    state = {
        quotesArray: [],
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
            status: {
                Quote: {
                    created: false,
                    sent: false,
                    accepted: false
                },
                Invoice: {
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
        console.log(this.props)
        if (this.props.location.pathname === '/newnewquote') { // if loading newnewquote.js by clicking on newnewquote in toolbar (or going straight to quotes after pdf opening on newnewquote.js)
            this.props.onInitClients() // used to load clients
            this.props.onResetQuote()  // used to reset quote redux
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

        if (this.props.editingStatus && this.props.location.pathname === "/editquote") { // loading into Quotes.js, going into view quote
            this.props.onInitClients()
        }
    }

    componentDidUpdate () {
        if (this.props.location.pathname === "/newnewquote" && this.props.quoteSubmitted && this.props.quotesFetched) { // pushing to PDF viewer if quotesubmitted && quotesfetches from /newnewquote
            this.props.history.replace('/pdfquote')
        }

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

        if (this.props.editingStatus && this.props.clientFormInitialized && this.state.quote.clients.clientForm.company.value === 'default') {
            let selectedQuote = this.props.quotesArray[this.props.quotesArray.findIndex(el => el.id === this.props.editingKey)];
            let jobsArray = []
            for (let job in selectedQuote.jobs) {
                jobsArray.push({
                    key: selectedQuote.jobs[job].key,
                    elementConfig: {
                        jobId: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Job Name'
                            },
                            value: selectedQuote.jobs[job].jobId,
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
                            value: selectedQuote.jobs[job].jobDetails,
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
                    Quote: {
                        ...this.state.quote.status.Quote,
                        created: selectedQuote.status.quote.created,
                        sent: selectedQuote.status.quote.sent,
                        accepted: selectedQuote.status.quote.accepted
                    },
                    Invoice: {
                        ...this.state.quote.status.Invoice,
                        created: selectedQuote.status.invoice.created,
                        sent: selectedQuote.status.invoice.sent,
                        paid: selectedQuote.status.invoice.paid
                    }
                },
                jobs: {
                    ...this.state.quote.jobs,
                    jobsArray: jobsArray
                }
            }
            this.setState({ quote : stateCopy })
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

    inputChangedHandler = (event, sectionIdentifier, inputIdentifier, key) => {
        if (sectionIdentifier === 'jobs') {
            let index = this.state.quote.jobs.jobsArray.findIndex(el => el.key === key)
            let quoteStateCopyTrial = {
                ...this.state.quote,
                jobs: {
                    ...this.state.quote.jobs,
                    jobsArray: [
                        ...this.state.quote.jobs.jobsArray,
                    ]
                }
            }
            quoteStateCopyTrial.jobs.jobsArray[index].elementConfig[inputIdentifier] = {
                ...quoteStateCopyTrial.jobs.jobsArray[index].elementConfig[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, quoteStateCopyTrial.jobs.jobsArray[index].elementConfig[inputIdentifier].validation),
                touched: true
            }
            return (
                this.setState({ quote : quoteStateCopyTrial})
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
            this.setState({ quote : stateStatusCopy })
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
            this.setState({ quote : stateClientsCopy })
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
            this.setState({ quote : stateSectionCopy })
        }

        /* let formIsValid = true;
        for (let inputIdentifier in updatedReferenceForm) {
            formIsValid = updatedReferenceForm[inputIdentifier].valid && formIsValid;
        } */

    }

    addNewJobHandler = () => {
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
            ...stateSectionCopy.jobsArray
        ]
        jobsArrayStateCopy.push(jobElement);
        stateSectionCopy.jobsArray = jobsArrayStateCopy;
        quoteStateCopy.jobs = stateSectionCopy;
        this.setState({ quote : quoteStateCopy})
    }   

    deleteJobHandler = (key) => {
        let quoteStateCopy = {
            ...this.state.quote
        }
        let jobsArrayCopy = quoteStateCopy.jobs.jobsArray;
        jobsArrayCopy = jobsArrayCopy.filter(el => el.key !== key);
        quoteStateCopy.jobs.jobsArray = jobsArrayCopy;
        this.setState({ quote : quoteStateCopy })
    }

    submitQuoteHandler = (quoteData) => {
        this.props.onSubmitQuote(quoteData) // submits quoteData to Firebase, and retrieves all quotes into redux
        /* this.props.history.replace('/pdfquote') */
    }

    SaveQuoteEditHandler = (quoteData, key) => {
        if (window.confirm("Are you sure you want to edit?")) {
            this.props.onSaveQuoteEdit(quoteData, key)
            if (window.confirm("Would you like to view Quote?")) {
                this.props.history.replace('/pdfquote')
            } else {
                this.props.history.replace('/quotes')
            }
        }
    }

    DeleteQuoteHandler = (quoteData, key) => {
        if (window.confirm("Are you sure you want to delete?")) {
            this.props.onDeleteQuote(quoteData, key)
            this.props.history.push('/quotes')
        }
    }

    render () {
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
        let quoteData = { //simplifying data to be stored in Firebase
                client: {
                    company: quoteStateCopy.clients.clientForm.company.value,
                    companyAddress: quoteStateCopy.clients.clientForm.companyAddress.value,
                    contactName: quoteStateCopy.clients.clientForm.contactName.value,
                    contactPhoneNumber: quoteStateCopy.clients.clientForm.contactPhoneNumber.value,
                    contactEmailAddress: quoteStateCopy.clients.clientForm.contactEmailAddress.value
                },
                reference: {
                    quoteUnit: quoteStateCopy.reference.quoteUnit.value,
                    quoteReference: quoteStateCopy.reference.quoteReference.value,
                    clientReference: quoteStateCopy.reference.clientReference.value,
                },
                date: quoteStateCopy.date,
                status: {
                    quote: {
                        created: quoteStateCopy.status.Quote.created,
                        sent: quoteStateCopy.status.Quote.sent,
                        accepted: quoteStateCopy.status.Quote.accepted
                    },
                    invoice: {
                        created: quoteStateCopy.status.Invoice.created,
                        sent: quoteStateCopy.status.Invoice.sent,
                        paid: quoteStateCopy.status.Invoice.paid
                    }
                },
                price: quoteStateCopy.price.price.value,
                jobs: jobsValueArray
            }

        return (
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
                        <JobsInput 
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
                        {this.props.editingKey ? <Button clicked={() =>this.DeleteQuoteHandler(quoteData, this.props.editingKey)}>Delete Quote</Button> : null}
                        <Button clicked={() => this.props.editingKey ? this.SaveQuoteEditHandler(quoteData, this.props.editingKey) : this.submitQuoteHandler(quoteData)}>{this.props.editingKey ? "Save Quote" : "Create Quote"}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quoteSubmitted: state.quote.quoteSubmitted,
        editingStatus: state.quote.editingKey !== null,
        editingKey: state.quote.editingKey,
        reduxStateQuote: state.quote,
        reduxStateClient: state.client,
        existingClientsLoaded: state.client.existingClientsLoaded,
        clientFormInitialized: state.client.clientFormInitialized,
        quotesFetched: state.quote.quotesFetched,
        quotesArray: state.quote.quotes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData)),
        onSaveQuoteEdit: (quoteData, key) => dispatch(actionCreators.saveQuoteEdit(quoteData, key)),
        onDeleteQuote: (quoteData, key) => dispatch(actionCreators.deleteQuote(quoteData, key)),
        onInitQuote: () => dispatch(actionCreators.initQuote()),
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onInitClients: () => dispatch(actionCreators.initClients()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNewQuote));