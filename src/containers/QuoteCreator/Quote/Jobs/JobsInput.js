import React from 'react';

import Input from '../../../../components/UI/Input/Input';
import classes from './JobsInput.module.css'
import Button from '../../../../components/UI/Button/Button'

const jobsInput = (props) => {
    let jobsArray = []
    for (let el in props.quoteState.jobs[props.jobsState + 'JobsArray']) { // variable [props.jobsState = "JobsArray"] is used to toggle between Invoice and Quote Jobs Array
        jobsArray.push({
            key: props.quoteState.jobs[props.jobsState + 'JobsArray'][el].key,
            config: props.quoteState.jobs[props.jobsState + 'JobsArray'][el].elementConfig
        })
    }

    let currentForm1 = [];
    for (let formElement in props.quoteState.jobs.quoteForm) {
        currentForm1.push({
            id: formElement,
            config: props.quoteState.jobs.quoteForm[formElement]
        })
    }
    let currentJobs = [];
    for (let el in jobsArray) {
        let currentEl = jobsArray[el]
        let currentWorkingJob = []
        currentForm1.map((jobElement) => {
            return (
                currentWorkingJob.push(
                    <div key={jobElement.id} className={classes[jobElement.id]}>
                        <Input
                            autoFocus={jobElement.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                            key={jobElement.id}
                            elementType={jobElement.config.elementType}
                            elementConfig={jobElement.config.elementConfig}
                            value={currentEl.config[jobElement.id]}
                            invalid={!currentEl.config.valid}
                            shouldValidate={currentEl.config.validation}
                            touched={currentEl.config.touched}
                            changed={(event) => props.onChange(event, 'jobs', jobElement.id, currentEl.key)}
                            // valueType={this.props.clientForm.company.elementConfig.placeholder}
                        />
                    </div>
                )
            )
        })
        currentJobs.push(
            <div key={currentEl.key} className={classes.CurrentWorkingJob}>
                {currentWorkingJob}
                <Button clicked={() => props.deleteJob(currentEl.key)}>X</Button>
            </div>
        )
    }
    return (
        <div className={classes.JobFormUnit}>
            <div className={classes.ExistingJobElement}>
                {currentJobs}
            </div>
            <div className={classes.AddNewButton}>
                <Button clicked={props.addJob}>Add New Job</Button>
            </div>
        </div>
    )
}

export default jobsInput