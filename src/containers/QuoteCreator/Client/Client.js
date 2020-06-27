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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedClientForm = {
            ...this.props.clientForm
        }
        const updatedFormElement = {
            ...updatedClientForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedClientForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedClientForm) {
            formIsValid = updatedClientForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({newClientForm : updatedClientForm, formIsValid : formIsValid})
        console.log(this.props.clientForm)
    }

    companyInputChangedHandler = () => {
        const clientFormCopy = {
            ...this.props.clientForm
        }

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

        if (this.props.clients) {
            form = (
                <form>
                    {clientFormArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}

                            value={formElement.config}
                            invalid={!formElement.config.valid} // required for all fields
                            shouldValidate={formElement.config.validation} // required for all fields
                            touched={formElement.config.touched} // only required for company field
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} // required for all fields
                            valueType={this.props.clientForm.company.elementConfig.placeholder}
                        />
                    ))}
                    <Button>
                        <p>CREATE QUOTE</p>
                    </Button>
                    <Button>
                        <p>ADD NEW CLIENT</p>
                    </Button>
                </form>
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
        clients: state.clients,
        clientForm: state.clientForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitClients: () => dispatch(actionCreators.initClients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);