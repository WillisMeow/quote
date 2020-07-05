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
        this.props.onResetQuote()
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
        let clientsArrayCopy = this.props.clients
        // updating the redux state
        
        for (let element in clientsArrayCopy) {
            if (clientsArrayCopy[element].client.company === event.target.value) {
                for (let formElement in this.props.clientForm) {
                    let eventTarget = clientsArrayCopy[element].client[formElement]
                    let clientFormElement = {
                        ...clientFormCopy[formElement],
                        value: eventTarget,
                        valid: this.checkValidity(eventTarget, clientFormCopy[formElement].validation)
                    }
                    clientFormCopy[formElement] = clientFormElement
                }
            }
        }

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
        console.log(formData)
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
                    <form>
                        {clientFormArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}

                                value={formElement.config}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.companyInputChangedHandler(event, formElement.id)}
                                // valueType={this.props.clientForm.company.elementConfig.placeholder}
                            />
                        ))}
                        <Button 
                            btnType="Success" 
                            disabled={!this.props.formIsValid} 
                            clicked={this.formSubmitHandler}
                        >
                            <p>CREATE QUOTE</p>
                        </Button>
                    </form>
                        {/* <Button>
                            <p>CREATE NEW CLIENT</p>
                        </Button> */}
                </>
        )}

        return (
            <div className = {classes.ClientData}>
                <h2>Select a Client</h2>
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
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onInitClients: () => dispatch(actionCreators.initClients()),
        onAmmendClient: (updatedData) => dispatch(actionCreators.ammendClient(updatedData)),
        onSetFormIsValid: (formIsValid) => dispatch(actionCreators.setFormIsValid(formIsValid)),
        onSubmitQuote: (quoteData) => dispatch(actionCreators.submitQuote(quoteData)),
        onSelectionMade: (valid, identifier) => dispatch(actionCreators.onSelectionMade(valid, identifier))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Client));