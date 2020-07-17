import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './QuoteStatus.module.css';
import * as actionCreators from '../../../store/actions/index';

const quoteStatus = (props) => {
    let QuoteStateArray = [];
    for (let element in props.reduxState.status) {
        QuoteStateArray.push(element)
    }
    let component = (
        QuoteStateArray.map((el) => {
            let elState = props.reduxState.status[el]
            let elStateArray = []
            for (let element in elState) {
                elStateArray.push(element)
            }
            console.log(elState)
            console.log(elStateArray)
            let checkBoxes = elStateArray.map((elem) => {
                return (
                    <div key={elem}>
                        <input type="checkbox" id={String(el) + ' ' + String(elem)} name={String(el) + String(elem)} onClick={(event) => props.onStatusChange(event, 'status')} defaultChecked={props.reduxState.status[el][elem]}/>
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