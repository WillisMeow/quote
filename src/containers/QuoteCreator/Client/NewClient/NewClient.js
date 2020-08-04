import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import * as actionCreators from '../../../../store/actions/index';
import classes from './NewClient.module.css';

class NewClient extends Component {
    state = {
        newClientForm: {
            company: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Name'
                },
                value: '',
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
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.newClientForm) {
            formData[formElementIdentifier] = this.state.newClientForm[formElementIdentifier].value
        }
        const clientData = {
            userId: this.props.userId,
            client: formData
        }
        this.props.onAddNewClient(clientData, this.props.token);
        this.props.history.push("/");
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
        const updatedNewClientForm = {
            ...this.state.newClientForm
        }
        const updatedFormElement = {
            ...updatedNewClientForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedNewClientForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedNewClientForm) {
            formIsValid = updatedNewClientForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({newClientForm : updatedNewClientForm, formIsValid : formIsValid})
        console.log(this.state.newClientForm)
    }

    
    render () {
        console.log(this.props.token)
        let newClientFormArray = [];
        for (let key in this.state.newClientForm) {
            newClientFormArray.push({
                id: key,
                config: this.state.newClientForm[key]
            })
        }
        let form = (
            <form onSubmit={this.formSubmitHandler}> {/* // TODO: add redux state and dispatch actions. Here, post using axios, to firebase */}
                {newClientFormArray.map((formElement) => {
                    return (
                        <Input
                            autoFocus={formElement.id === "company" ? true : false}
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            valueType={this.state.newClientForm.company.elementConfig.placeholder}
                        />
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    <p>Create New Client</p>
                </Button>
            </form>
            

        )
        return (
            <div className = {classes.NewClient}>
                <h2>Enter Client Details</h2>
                {form}
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddNewClient: (clientData, token) => dispatch(actionCreators.addClient(clientData, token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewClient));