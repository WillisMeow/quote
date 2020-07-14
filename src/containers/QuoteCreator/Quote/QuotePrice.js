import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input'
import classes from './QuotePrice.module.css'

class QuotePrice extends Component {
    state = {
        priceForm: {
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
        priceData: {
            quotePrice: 0,
            gstValue: 0,
            totalPrice: 0
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

    inputChangedHandler = (event, inputIdentifier) => {
        let priceFormCopy = {
            ...this.state.priceForm
        }
        let formElementCopy = {
            ...priceFormCopy[inputIdentifier]
        }
        formElementCopy.value = event.target.value;
        formElementCopy.valid = this.checkValidity(formElementCopy.value, formElementCopy.validation);
        formElementCopy.touched = true;

        priceFormCopy[inputIdentifier] = formElementCopy;

        let priceDataCopy = {
            ...this.state.priceData
        }
        priceDataCopy.quotePrice = event.target.value;
        priceDataCopy.gstValue = event.target.value * 0.15;
        priceDataCopy.totalPrice = (event.target.value * 1.15).toFixed(2);

        this.setState({ priceForm : priceFormCopy, priceData : priceDataCopy})
    }

    render () {
        console.log(this.state)
        let priceArray = [];
        for (let el in this.state.priceForm) {
            priceArray.push({
                id: el,
                config: this.state.priceForm[el]
            })
        }
        let priceForm = (
            <div>
                {priceArray.map((el) => {
                    return (
                        <div className={classes.PriceInput}>
                            <Input
                                autoFocus={el.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                                key={el.id}
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config}
                                invalid={!el.config.valid}
                                shouldValidate={el.config.validation}
                                touched={el.config.touched}
                                changed={(event) => this.inputChangedHandler(event, el.id)}
                                // valueType={this.props.clientForm.company.elementConfig.placeholder}
                            />
                        </div>
                    )
                })}
            </div>
        )

        let priceDisplay = (
            <div className={classes.PriceDisplayUnit}>
                <div className={classes.PriceDisplayElement}>
                    <p>Price : $</p>
                    <p>{priceForm}</p>
                </div>
                <div className={classes.PriceDisplayElement}>
                    <p>GST : $</p>
                    <p className={classes.PushLeft}>{this.state.priceData.gstValue}</p>
                </div>
                <div className={classes.PriceDisplayElement}>
                    <p>Total : $</p>
                    <p className={classes.PushLeft}>{this.state.priceData.totalPrice}</p>
                </div>
            </div>
        )

        return (
            <div className={classes.PriceUnit}>
            {/* {priceForm} */}
            {priceDisplay}
            </div>
        )
    }
}

export default QuotePrice;