import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import * as ActionCreators from '../../../store/actions/index';
import classes from './QuoteReference.module.css';

class QuoteReference extends Component {
    state = {
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

    // keeping this.setState for now, as it is used to render the correct form in the app
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedReferenceForm = {
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
        this.props.onReferenceUpdate(updatedReferenceForm)
    }

    render () {
        let formElementArray = [];
        for (let formElement in this.props.quoteReference) {
            formElementArray.push({
                id: formElement,
                config: this.props.quoteReference[formElement]
            })
        }
        console.log(this.props.quoteReference)
        console.log(formElementArray)

        let form = (
                <form>
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
                </form>
        )

        return (
            <div className={classes.QuoteReference}>
                <h2>Quote Reference</h2>
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
        onReferenceUpdate: (identifier, value) => dispatch(ActionCreators.referenceUpdate(identifier, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteReference);