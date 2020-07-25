import React from 'react';

import classes from './QuoteStatus.module.css';

const quoteStatus = (props) => {
    let QuoteStateArray = [];
    for (let element in props.quoteState.status) {
        QuoteStateArray.push(element)
    }
    let component = (
        QuoteStateArray.map((el) => {
            let elState = props.quoteState.status[el]
            let elStateArray = []
            for (let element in elState) {
                elStateArray.push(element)
            }
            let checkBoxes = elStateArray.map((elem) => {
                return (
                    <div key={elem}>
                        <input type="checkbox" id={String(el) + ' ' + String(elem)} name={String(el) + String(elem)} onChange={(event) => props.onStatusChange(event, 'status')} checked={elState[elem]}/>
                        <label htmlFor={String(el) + String(elem)}>{elem}</label>
                    </div>
                )
            })
            return (
                <div key={el} className={classes.Unit}>
                    <div className={classes.TitleElement}>
                        {el}
                    </div>
                    <div className={classes.CheckBoxElement}>
                        {checkBoxes}
                    </div>
                </div>
            )
        })
    )

    return (
        <div>
            {component}
        </div>
    )
}

export default quoteStatus