import React from 'react';

import classes from './Job.module.css';

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
                <button className = {classes.Buttons} onClick={props.edit}>Edit</button>
                <button className = {classes.Buttons} onClick={props.delete}>Delete</button>
            </div>
        </div>
    )
}

export default (job);