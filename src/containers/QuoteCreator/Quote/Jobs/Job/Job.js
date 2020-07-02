import React from 'react';

import classes from './Job.module.css';
import Button from '../../../../../components/UI/Button/Button';

const job = (props) => {
    return (
        <div className = {classes.Job}>
            <p className = {classes.Text}>{props.name}</p>
            <p className = {classes.Text}>{props.details}</p>
            <Button className = {classes.Buttons} clicked={props.edit}>Edit</Button>
            <Button className = {classes.Buttons} btnType= "Danger" clicked={props.delete}>Delete</Button>
        </div>
    )
}

export default (job);