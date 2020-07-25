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
        /* this.props.onInitQuote() */

        if (window.location.pathname === '/newnewquote') {
            // set redux prop "editing Key" to null
            // fetch clients from redux
            this.props.onInitClients() // used to load clients
            this.props.onResetQuote()  // used to reset quote redux
        }

        if (this.props.editingStatus && window.location.pathname === '/quotes') { // window.location.pathname used to id if NewNewQuote was loaded from quotes.js or not
            // setstate quote with correct quote from redux quotes
            let quoteStateCopy = {
                ...this.state.quote
            }
            quoteStateCopy = this.props.reduxStateQuote.quotes[this.props.reduxStateQuote.quotes.findIndex(el => el.id === this.props.editingKey)];
            this.setState({ quote : quoteStateCopy })
        }
    }

    componentDidUpdate () {
        if (this.props.existingClientsLoaded && this.state.quote.clients.clientForm.company.elementConfig.options !== this.props.reduxStateClient.clients) { // only updating when the clients options within Input does not match the array in redux
            console.log('componentDidUpdate')
            let quoteStateCopy = {
                ...this.state.quote
            }
            console.log(quoteStateCopy)
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
        const quoteStateCopy = {
            ...this.state.quote
        }
        let stateSectionCopy = null
        if (sectionIdentifier === 'jobs') {
            stateSectionCopy = [
                ...quoteStateCopy[sectionIdentifier].jobsArray
            ]
            let index = stateSectionCopy.findIndex(el => el.key === key)
            const selectedElementCopy = {
                ...stateSectionCopy[index]
            }
            const targetElementConfig = {
                ...selectedElementCopy.elementConfig[inputIdentifier],
            }
            targetElementConfig.value = event.target.value;
            targetElementConfig.valid = this.checkValidity(targetElementConfig.value, targetElementConfig.validation);
            targetElementConfig.touched = true;

            selectedElementCopy.elementConfig[inputIdentifier] = targetElementConfig;
            stateSectionCopy[index] = selectedElementCopy;
            quoteStateCopy[sectionIdentifier].jobsArray = stateSectionCopy;
            this.setState({ quote : quoteStateCopy })
        } else if (sectionIdentifier === 'status') {
            let str = event.target.id.split(' ');
            stateSectionCopy = {
                ...quoteStateCopy[sectionIdentifier]
            };
            const selectedElementCopy = {
                ...stateSectionCopy[str[0]]
            }
            if (event.target.checked) {
                selectedElementCopy[str[1]] = true
            } else {
                selectedElementCopy[str[1]] = false
            }
            stateSectionCopy[str[0]] = selectedElementCopy;
            quoteStateCopy[sectionIdentifier] = stateSectionCopy;
            this.setState({ quote : quoteStateCopy})
        } else if (sectionIdentifier === 'clients') {
            stateSectionCopy = {
                ...quoteStateCopy[sectionIdentifier]
            }
            const clientFormCopy = {
                ...stateSectionCopy.clientForm
            }
    
            if (inputIdentifier === 'company') {
                let clientsArrayCopy = stateSectionCopy.clientsArray
                for (let element in clientsArrayCopy) {
                    if (clientsArrayCopy[element].client.company === event.target.value) {
                        for (let formElement in clientFormCopy) {
                            let eventTarget = clientsArrayCopy[element].client[formElement]
                            let clientFormElement = {
                                ...clientFormCopy[formElement],
                                value: eventTarget,
                                valid: this.checkValidity(eventTarget, clientFormCopy[formElement].validation),
                                touched: true
                            }
                            clientFormCopy[formElement] = clientFormElement
                        }
                    }
                }
                stateSectionCopy.clientForm = clientFormCopy;
                quoteStateCopy[sectionIdentifier] = stateSectionCopy;
                this.setState({ quote : quoteStateCopy})
            } else {
                let clientFormElement = {
                    ...clientFormCopy[inputIdentifier]
                }
                clientFormElement.value = event.target.value;
                clientFormElement.valid = this.checkValidity(clientFormElement.value, clientFormElement.valid)
                clientFormCopy[inputIdentifier] = clientFormElement;
                stateSectionCopy.clientForm = clientFormCopy;
                quoteStateCopy[sectionIdentifier] = stateSectionCopy;
                this.setState({ quote : quoteStateCopy })
            }
        } else {
            stateSectionCopy = {
                ...quoteStateCopy[sectionIdentifier]
            }
            let clientFormElement = {
                ...stateSectionCopy[inputIdentifier]
            }
            clientFormElement.value = event.target.value;
            clientFormElement.valid = this.checkValidity(clientFormElement.value, clientFormElement.validation);
            clientFormElement.touched = true;
            stateSectionCopy[inputIdentifier] = clientFormElement;
            quoteStateCopy[sectionIdentifier] = stateSectionCopy
            this.setState({ quote : quoteStateCopy })
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
            key: Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100), // easy random key
            elementConfig: jobFormCopy
        }
        stateSectionCopy.jobsArray.push(jobElement);
        quoteStateCopy.jobs = stateSectionCopy;
        this.setState({ quote : quoteStateCopy })
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
        this.props.onSubmitQuote(quoteData)
        /* this.props.history.replace('/quotes'); */
    }

    SaveQuoteEditHandler = (quoteData, key) => {
        if (window.confirm("Are you sure you want to edit?")) {
            this.props.onSaveQuoteEdit(quoteData, key)
            console.log(quoteData)
            console.log(key)
        }
    }

    DeleteQuoteHandler = (quoteData, key) => {
        if (window.confirm("Are you sure you want to delete?")) { // confirmation popup (window.confirm will return true or false)
            this.props.onDeleteQuote(quoteData, key)
        }
    }

    render () {
        console.log(this.state)
        let quoteData = {
            ...this.state.quote
        }

        let quoteSubmittedRedirect = null
        if (this.props.quoteSubmitted) {
            quoteSubmittedRedirect = <Redirect to="/pdfquote" />
            /* this.props.history.replace('/newnewquote'); */
        }

        return (
            <div className={classes.Main}>
                {quoteSubmittedRedirect}
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
        existingClientsLoaded: state.client.existingClientsLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData)),
        onSaveQuoteEdit: (quoteData, key) => dispatch(actionCreators.saveQuoteEdit(quoteData, key)),
        onDeleteQuote: (quoteData, key) => dispatch(actionCreators.deleteQuote(quoteData, key)),
        onInitQuote: () => dispatch(actionCreators.initQuote()),
        onUpdateReduxState: (state, id) => dispatch(actionCreators.updateReduxState(state, id)),
        onAddNewJob: (jobElement) => dispatch(actionCreators.addNewJob(jobElement)),
        onDeleteJob: (jobsArray) => dispatch(actionCreators.deleteJob(jobsArray)),
        onUpdateQuoteReduxforEditing: (key, state) => dispatch(actionCreators.updateQuoteReduxforEditing(key, state)),
        onUpdateClientReduxForEditing: (key, state) => dispatch(actionCreators.updateClientReduxForEditing(key, state)),
        onAmmendClient: (updatedData) => dispatch(actionCreators.ammendClient(updatedData)),
        onSetFormIsValid: (formIsValid) => dispatch(actionCreators.setFormIsValid(formIsValid)),
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onInitClients: () => dispatch(actionCreators.initClients()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNewQuote));