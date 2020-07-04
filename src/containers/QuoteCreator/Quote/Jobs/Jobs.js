import React, { Component } from 'react';
import { connect } from 'react-redux';
import Job from './Job/Job';

class Jobs extends Component {

    editButtonHandler = () => {

    }

    render() {
        let jobs = []
        for (let job in this.props.jobsArray) {
            jobs.push({
                jobId: this.props.jobsArray[job].jobId,
                jobDetails: this.props.jobsArray[job].jobDetails
            })
            console.log(jobs)
        }
        let currentJobs = (
            <>
                {jobs.map((job) => {
                    return (
                        <Job edit={this.editButtonHandler} delete={this.deleteButtonHandler} name={job.jobId} details={job.jobDetails}> 
                        </Job>
                    )
                })}
            </>
        )
        return(
            <div>
                {currentJobs}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobsArray: state.quote.jobs
    }
}

export default connect(mapStateToProps)(Jobs);