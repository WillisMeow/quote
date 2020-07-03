import React from 'react';

import classes from './Job.module.css';
import Button from '../../../../../components/UI/Button/Button';

const job = (props) => {
    return (
        <div className = {classes.Job}>
            <div className = {classes.Text}>
                <h4>Job</h4>
                <p className = {classes.Text}>{props.name}</p>
                <h4>Details</h4>
                <p className = {classes.Text}>{props.details}</p>
            </div>
            <div className = {classes.Buttons}>
{/*                 <Button clicked={props.edit}>Edit</Button>
                <Button btnType= "Danger" clicked={props.delete}>Delete</Button> */}
                <button className = {classes.Buttons} onClick={props.edit}>Edit</button>
                <button className = {classes.Buttons} onClick={props.delete}>Delete</button>
            </div>
        </div>
    )
}

export default (job);