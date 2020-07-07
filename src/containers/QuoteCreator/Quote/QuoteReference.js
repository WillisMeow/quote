import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import * as ActionCreators from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';

class QuoteReference extends Component {
    state = {
        referenceForm: {
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
            }
        },
        formIsValid: false
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
        const updatedReferenceForm = {
            ...this.state.referenceForm
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
        this.setState({referenceForm : updatedReferenceForm, formIsValid : formIsValid})
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElement in this.state.referenceForm) {
            formData[formElement] = this.state.referenceForm[formElement].value
        }
        console.log(formData)

        this.props.onSubmitReferenceForm(formData)
    }

    render () {
        let formElementArray = [];
        for (let formElement in this.state.referenceForm) {
            formElementArray.push({
                id: formElement,
                config: this.state.referenceForm[formElement]
            })
        }

        let form = (
                <form onSubmit={this.formSubmitHandler}>
                        {formElementArray.map((formElement) => {
                            return (
                                <Input
                                    autoFocus={formElement.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value= {formElement.config}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                    // valueType={this.props.clientForm.company.elementConfig.placeholder}
                                />
                            )
                        })}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>Continue</Button>
                    </form>
        )

        return (
            <div>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quoteReference: state.quote.quoteReference
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmitReferenceForm: (formData) => dispatch(ActionCreators.submitReferenceForm(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteReference);