import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input'
import classes from './QuotePrice.module.css'
import * as actionCreators from '../../../store/actions/index';

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
            ...this.props.quotePrice
        }
        priceDataCopy.quotePrice = event.target.value;
        priceDataCopy.gstValue = (event.target.value * 0.15).toFixed(2);
        priceDataCopy.totalPrice = (event.target.value * 1.15).toFixed(2);

        this.setState({ priceForm : priceFormCopy })
        this.props.onUpdatePrice(priceDataCopy);
    }

    render () {
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
                    <p className={classes.PushLeft}>{this.props.quotePrice.gstValue}</p>
                </div>
                <div className={classes.PriceDisplayElement}>
                    <p>Total : $</p>
                    <p className={classes.PushLeft}>{this.props.quotePrice.totalPrice}</p>
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

const mapStateToProps = state => {
    return {
        quotePrice: state.quote.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePrice: (price) => dispatch(actionCreators.updatePrice(price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotePrice);