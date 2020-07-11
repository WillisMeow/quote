import React, { Component } from 'react';
import classes from './QuoteStatus.module.css'

class QuoteStatus extends Component {
    state = {
        Status: {
            Quote: {
                created: false,
                sent: false,
                accepted: false
            },
            Invoice: {
                created: false,
                sent: false,
                paid: false
            }
        }
    }

    ClickHandler = (event) => { // toggle between false and true on checkbox status

        if (event.target.checked) {
            let str = event.target.id.split(' ')
            let stateCopy = {
                ...this.state.Status
            }
            let stateElementCopy = {
                ...this.state.Status[str[0]]
            }
            stateElementCopy[str[1]] = true;
            stateCopy[str[0]] = stateElementCopy
            this.setState({ Status : stateCopy})
            console.log(stateCopy)
        } else {
            let str = event.target.id.split(' ')
            let stateCopy = {
                ...this.state.Status
            }
            let stateElementCopy = {
                ...this.state.Status[str[0]]
            }
            stateElementCopy[str[1]] = false;
            stateCopy[str[0]] = stateElementCopy
            this.setState({ Status : stateCopy})
            console.log(stateCopy)
        }
    }

    render () {
        let QuoteStateArray = [];
        for (let element in this.state.Status) {
            QuoteStateArray.push(element)
        }

        let component = (
            QuoteStateArray.map((el) => {
                let elState = this.state.Status[el]
                let elStateArray = []
                for (let element in elState) {
                    elStateArray.push(element)
                }
                console.log(elStateArray)
                let checkBoxes = elStateArray.map((elem) => {
                    return (
                        <div key={elem}>
                            <input type="checkbox" id={String(el) + ' ' + String(elem)} name={String(el) + String(elem)} onClick={(event) => this.ClickHandler(event)} />
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
}

export default QuoteStatus