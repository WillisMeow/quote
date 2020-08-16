import React from 'react';

import classes from './CreateReportButton.module.css'
import Button from '../../../../components/UI/Button/Button';

const createReportButton = (props) => {

    let button = (
        <Button clicked={props.onChange}>Create PDF</Button>
    )

    return (
        <div className={classes.Button}>
            {button}
        </div>
    )
}

export default createReportButton