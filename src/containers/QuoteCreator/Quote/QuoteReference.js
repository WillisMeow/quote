import React from 'react';

import Input from '../../../components/UI/Input/Input';
import classes from './QuoteReference.module.css';

const quoteReference = (props) => {
    let formElementArray = [];
    for (let formElement in props.quoteState.reference) {
        formElementArray.push({
            id: formElement,
            config: props.quoteState.reference[formElement]
        })
    }

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
                        changed={(event) => props.onChange(event, 'reference', formElement.id)}
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

export default quoteReference
