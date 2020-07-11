import React from 'react';
import { Component } from 'react';

class JobsInput extends Component {
    state = {
        quoteForm: {
            jobId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            jobDetails: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Job Details'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        editingJob: false,
        editingKey: null,
        jobs: [] // array of quoteForm's for each job line
    }

    render () {
        return (

        )
    }
}

export default JobsInput;