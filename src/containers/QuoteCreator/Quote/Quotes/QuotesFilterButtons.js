import React from 'react';

import Button from '../../../../components/UI/Button/Button';
import classes from './QuotesFilterButtons.module.css';

const quotesFilterButtons = (props) => {
    let state = props.state;
    let currentlyFiltering = (state.searchTerm !== '' || state.statusFilterConditions.length !== 0 || state.arrangeByClient === true || state.arrangeByStatus === true);
    let buttons = (
        <div className={classes.Buttons}>
            <Button clicked={() => props.filter('arrangeByClient')}>
                {props.clientFilterState ? 'Remove Filter' : 'Filter By Company'}
            </Button>
            <Button clicked={() => props.filter('arrangeByStatus')}>
                {props.statusFilterState ? 'Remove Filter' : 'Filter By Status'}
            </Button>
            {currentlyFiltering ? <Button clicked={props.removeFilter}>Remove All Filters</Button> : null }
        </div>
    )
    return (
        <div>
            {buttons}
        </div>
)
}

export default quotesFilterButtons