import React from 'react';

import Input from '../../../components/UI/Input/Input'
import classes from './QuotePrice.module.css'

const quotePrice = (props) => {
    let priceArray = [];
    for (let el in props.quoteState.price) {
        priceArray.push({
            id: el,
            config: props.quoteState.price[el]
        })
    }
    let priceForm = (
        <div>
            {priceArray.map((el) => {
                return (
                    <div key={el.id} className={classes.PriceInput}>
                        <Input
                            autoFocus={el.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            value={el.config}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validation}
                            touched={el.config.touched}
                            changed={(event) => props.onChange(event, 'price', el.id)}
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
                <div>{priceForm}</div>
            </div>
            <div className={classes.PriceDisplayElement}>
                <p>GST : $</p>
                <p className={classes.PushLeft}>{(props.quoteState.price.price.value * 0.15).toFixed(2)}</p>
            </div>
            <div className={classes.PriceDisplayElement}>
                <p>Total : $</p>
                <p className={classes.PushLeft}>{(props.quoteState.price.price.value * 1.15).toFixed(2)}</p>
            </div>
        </div>
    )
    return (
        <div className={classes.PriceUnit}>
            {priceDisplay}
        </div>
    )
}

export default quotePrice