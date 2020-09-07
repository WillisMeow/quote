import React from 'react';

import classes from './QuotesStatusFilter.module.css';

const quotesStatusFilter = (props) => {
    let QuoteStateArray = [];
    for (let element in props.status) {
        QuoteStateArray.push(element)
    }
    let component = (
        QuoteStateArray.map((el) => {
            let elState = props.status[el]
            let elStateArray = []
            for (let element in elState) {
                elStateArray.push(element)
            }
            let checkBoxes = elStateArray.map((elem) => {
                return (
                    <div key={elem}>
                        <input type="checkbox" id={String(el) + ' ' + String(elem)} name={String(el) + String(elem)} onChange={(event) => props.onStatusChange('statusFilter', event)} checked={elState[elem]}/>
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

export default quotesStatusFilter