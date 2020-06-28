import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Client extends Component {
    componentDidMount () {
        this.props.onInitClients()
        this.props.clientForm.companyAddress.value = 'Hello'
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

    companyInputChangedHandler = (event, inputIdentifier) => { // input change handler for redux client form
        const clientFormCopy = {
            ...this.props.clientForm
        }
        const clientFormElement = {
            ...clientFormCopy[inputIdentifier]
        }
        clientFormElement.value = event.target.value;
        console.log(clientFormElement.value)
        clientFormElement.valid = this.checkValidity(clientFormElement.value, clientFormElement.validation);
        clientFormElement.touched = true;
        clientFormCopy[inputIdentifier] = clientFormElement;
        let formIsValid = true;
        for (let inputIdentifier in clientFormCopy) {
            formIsValid = clientFormCopy[inputIdentifier].valid && formIsValid
        }

        this.props.onAmmendClient(clientFormCopy)
        console.log(clientFormCopy)
    }

    // experimenting with updating all fields when inputIdentifier === 'company'
    companyInputChangedHandler = (event, inputIdentifier) => { // input change handler for redux client form
        const clientFormCopy = {
            ...this.props.clientForm
        }
        let clientFormElement = null;

        
        if (inputIdentifier === 'company') {
            let clientFormElementCompanyAddress = null;
            let clientFormElementContactPerson = null;
            let clientFormElementContactEmailAddress = null;
            let clientFormElementContactPhoneNumber = null;

            let clientsArrayCopy = this.props.clients
            let eventTargetCompanyAddress = null
            let eventTargetContactPerson = null
            let eventTargetContactEmailAddress = null
            let eventTargetContactPhoneNumber = null
            for (let element in clientsArrayCopy) {
                if (clientsArrayCopy[element].client.company === event.target.value) {
                    console.log(clientsArrayCopy[element].client.companyAddress) //accessing the companyAddress of the event.target.value
                    eventTargetCompanyAddress = clientsArrayCopy[element].client.companyAddress
                    eventTargetContactPerson = clientsArrayCopy[element].client.contactName
                    eventTargetContactEmailAddress = clientsArrayCopy[element].client.contactEmailAddress
                    eventTargetContactPhoneNumber = clientsArrayCopy[element].client.contactPhoneNumber
                }}
            // updating the redux state
            clientFormElement = {
                ...clientFormCopy[inputIdentifier]
            }
            clientFormElementCompanyAddress = {
                ...clientFormCopy['companyAddress'],
                value: eventTargetCompanyAddress
            }
            console.log(clientFormElementCompanyAddress)
            clientFormElementContactPerson = {
                ...clientFormCopy['contactName'],
                value: eventTargetContactPerson
            }
            clientFormElementContactEmailAddress = {
                ...clientFormCopy['contactEmailAddress'],
                value: eventTargetContactEmailAddress
            }
            clientFormElementContactPhoneNumber = {
                ...clientFormCopy['contactPhoneNumber'],
                value: eventTargetContactPhoneNumber
            }
            clientFormCopy['companyAddress'] = clientFormElementCompanyAddress
            clientFormCopy['contactName'] = clientFormElementContactPerson
            clientFormCopy['contactEmailAddress'] = clientFormElementContactEmailAddress
            clientFormCopy['contactPhoneNumber'] = clientFormElementContactPhoneNumber

        } else {
            clientFormElement = {
                ...clientFormCopy[inputIdentifier]
            }
        }
        clientFormElement.value = event.target.value;
        clientFormElement.valid = this.checkValidity(clientFormElement.value, clientFormElement.validation);
        clientFormElement.touched = true;
        clientFormCopy[inputIdentifier] = clientFormElement;
        let formIsValid = true;
        for (let inputIdentifier in clientFormCopy) {
            formIsValid = clientFormCopy[inputIdentifier].valid && formIsValid
        }

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
                                valueType={this.props.clientForm.company.elementConfig.placeholder}
                            />
                        ))}
                        <Button>
                            <p>CREATE QUOTE</p>
                        </Button>
                    </form>
                        <Button>
                            <p>ADD NEW CLIENT</p>
                        </Button>
                </>
        )}

        return (
            <div>
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
        clientForm: state.client.clientForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitClients: () => dispatch(actionCreators.initClients()),
        onAmmendClient: (updatedData) => dispatch(actionCreators.ammendClient(updatedData)),
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);