import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Client.module.css';
import { withRouter } from 'react-router-dom';

class Client extends Component {
    componentDidMount () {
        this.props.onInitClients()
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    // experimenting with updating all fields when inputIdentifier === 'company'
    companyInputChangedHandler = (event, inputIdentifier) => { // input change handler for redux client form
        const clientFormCopy = {
            ...this.props.clientForm
        }
        let clientFormElement = null;

    if (inputIdentifier === 'company') {
        let clientFormElementCompany = null;
        let clientFormElementCompanyAddress = null;
        let clientFormElementContactPerson = null;
        let clientFormElementContactEmailAddress = null;
        let clientFormElementContactPhoneNumber = null;

        let clientsArrayCopy = this.props.clients
        let eventTargetCompany = null
        let eventTargetCompanyAddress = null
        let eventTargetContactPerson = null
        let eventTargetContactEmailAddress = null
        let eventTargetContactPhoneNumber = null
        for (let element in clientsArrayCopy) {
            if (clientsArrayCopy[element].client.company === event.target.value) {
                eventTargetCompany = clientsArrayCopy[element].client.company
                eventTargetCompanyAddress = clientsArrayCopy[element].client.companyAddress
                eventTargetContactPerson = clientsArrayCopy[element].client.contactName
                eventTargetContactEmailAddress = clientsArrayCopy[element].client.contactEmailAddress
                eventTargetContactPhoneNumber = clientsArrayCopy[element].client.contactPhoneNumber
            }}
        // updating the redux state
        
        clientFormElementCompany = {
            ...clientFormCopy['company'],
            value: eventTargetCompany,
            valid: this.checkValidity(eventTargetCompany, clientFormCopy['company'].validation)
        }
        clientFormElementCompanyAddress = {
            ...clientFormCopy['companyAddress'],
            value: eventTargetCompanyAddress,
            valid: this.checkValidity(eventTargetCompanyAddress, clientFormCopy['companyAddress'].validation)
        }
        clientFormElementContactPerson = {
            ...clientFormCopy['contactName'],
            value: eventTargetContactPerson,
            valid: this.checkValidity(eventTargetContactPerson, clientFormCopy['contactName'].validation)
        }
        clientFormElementContactEmailAddress = {
            ...clientFormCopy['contactEmailAddress'],
            value: eventTargetContactEmailAddress,
            valid: this.checkValidity(eventTargetContactEmailAddress, clientFormCopy['contactEmailAddress'].validation)
        }
        clientFormElementContactPhoneNumber = {
            ...clientFormCopy['contactPhoneNumber'],
            value: eventTargetContactPhoneNumber,
            valid: this.checkValidity(eventTargetContactPhoneNumber, clientFormCopy['contactPhoneNumber'].validation)
        
        }
        clientFormCopy['company'] = clientFormElementCompany
        clientFormCopy['companyAddress'] = clientFormElementCompanyAddress
        clientFormCopy['contactName'] = clientFormElementContactPerson
        clientFormCopy['contactEmailAddress'] = clientFormElementContactEmailAddress
        clientFormCopy['contactPhoneNumber'] = clientFormElementContactPhoneNumber

        clientFormElement = {
            ...clientFormCopy[inputIdentifier]
        }
    } else {
        clientFormElement = {
            ...clientFormCopy[inputIdentifier]
        }
        clientFormElement.value = event.target.value;
        clientFormElement.valid = this.checkValidity(clientFormElement.value, clientFormElement.validation)

    }
    clientFormCopy[inputIdentifier] = clientFormElement;
    this.props.onInitialAmmendClient(clientFormCopy)
    clientFormElement.touched = true;
    clientFormCopy[inputIdentifier] = clientFormElement;
    let formIsValid = true;
    for (let inputIdentifier in clientFormCopy) {
        formIsValid = clientFormCopy[inputIdentifier].valid && formIsValid
    }
    this.props.onSetFormIsValid(formIsValid)
    this.props.onAmmendClient(clientFormCopy)
}

    formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.props.clientForm) {
            formData[formElementIdentifier] = this.props.clientForm[formElementIdentifier].value
        }
        const clientData = {
            client: formData
        }
        this.props.onSubmitQuote(clientData);
    }

    quoteContinueHandler = () => {
        this.props.history.push("/newquote");
    }

    render () {

        let clientFormArray = [];
        for (let key in this.props.clientForm) {
            clientFormArray.push({
                id: key,
                config: this.props.clientForm[key]
            })
        }

        let form = <Spinner />

        if (this.props.clientsLoaded) {
            form = (
                <>
                    <form onSubmit={this.formSubmitHandler}>
                        {clientFormArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}

                                value={formElement.config}
                                invalid={!formElement.config.valid} // required for all fields
                                shouldValidate={formElement.config.validation} // required for all fields
                                touched={formElement.config.touched} // only required for company field
                                changed={(event) => this.companyInputChangedHandler(event, formElement.id)} // required for all fields
                                // valueType={this.props.clientForm.company.elementConfig.placeholder}
                            />
                        ))}
                        <Button btnType="Success" disabled={!this.props.formIsValid}>
                            <p>CREATE QUOTE</p>
                        </Button>
                    </form>
                        <Button>
                            <p>ADD NEW CLIENT</p>
                        </Button>
                        <Button clicked={this.quoteContinueHandler}>GO TO CREATE QUOTE BODY</Button>
                </>
        )}

        return (
            <div className = {classes.ClientData}>
                <p>Display Input Fields for Client Details</p>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        clientsLoaded: state.client.clients.length !== 0,
        clients: state.client.clients,
        clientForm: state.client.clientForm,
        formIsValid: state.client.formIsValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitClients: () => dispatch(actionCreators.initClients()),
        onAmmendClient: (updatedData) => dispatch(actionCreators.ammendClient(updatedData)),
        onInitialAmmendClient: (updatedData) => dispatch(actionCreators.initialAmmendClient(updatedData)),
        onSetFormIsValid: (formIsValid) => dispatch(actionCreators.setFormIsValid(formIsValid)),
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData)),
        onSelectionMade: (valid, identifier) => dispatch(actionCreators.onSelectionMade(valid, identifier))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Client));