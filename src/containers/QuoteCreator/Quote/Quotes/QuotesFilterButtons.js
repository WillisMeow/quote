import React from 'react';

import Button from '../../../../components/UI/Button/Button';

const quotesFilterButtons = (props) => {
let buttons = (
    <div>
        <Button clicked={props.clientFilter}>
            {props.clientFilterState ? 'Remove Filter' : 'Filter By Company'}
        </Button>
        <Button clicked={props.statusFilter}>
            Filter By Status
        </Button>
    </div>
)
return (
    <div>
        {buttons}
    </div>
)
}

export default quotesFilterButtons