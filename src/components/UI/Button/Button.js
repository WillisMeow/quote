import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    return (
        <button
            disabled={props.disabled}
            className={[classes.Button, classes[props.btnType]].join(' ')}
            type={props.type ? props.type : "submit"}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    )
}

export default button;