import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './QuoteStatus.module.css';
import * as actionCreators from '../../../store/actions/index';

class QuoteStatus extends Component {
    
    ClickHandler = (event) => { // toggle between false and true on checkbox status
        let str = event.target.id.split(' ');
        let quoteStatusCopy = {
            ...this.props.quoteStatus
        }
        let statusElementCopy = {
            ...quoteStatusCopy[str[0]]
        }

        if (event.target.checked) {
            statusElementCopy[str[1]] = true;            
        } else {
            statusElementCopy[str[1]] = false;
        }

        quoteStatusCopy[str[0]] = statusElementCopy;
        this.props.updateStatus(quoteStatusCopy)
    }

    render () {
        let QuoteStateArray = [];
        for (let element in this.props.quoteStatus) {
            QuoteStateArray.push(element)
        }

        let component = (
            QuoteStateArray.map((el) => {
                let elState = this.props.quoteStatus[el]
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

const mapStateToProps = state => {
    return {
        quoteStatus: state.quote.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStatus: (status) => dispatch(actionCreators.updateStatus(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteStatus)