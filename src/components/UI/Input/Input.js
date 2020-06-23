import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    
    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
                />; // using ...props to cater for any number of different attributes being passed down when the component is called
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
                />;
            break;
        case ('select'):
            inputElement = (<select 
                className={inputClasses.join(' ')}
                value={props.value} 
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            break
        default:
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
                />;
    }

    let validationError = null;
    if (props.invalid && props.touched) { // Including an error message displayed to the user
        validationError = <p>Please enter a valid value for {props.valueType}</p>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {validationError}
            {inputElement}
        </div>
    )
}

export default input;