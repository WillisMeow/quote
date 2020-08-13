import React from 'react';

import Button from '../../../../components/UI/Button/Button';

const quotesFilterButtons = (props) => {
let buttons = (
    <div>
        <Button clicked={() => props.clientFilter('arrangeByClient')}>
            {props.clientFilterState ? 'Remove Filter' : 'Filter By Company'}
        </Button>
        <Button clicked={() => props.statusFilter('arrangeByStatus')}>
            {props.statusFilterState ? 'Remove Filter' : 'Filter By Status'}
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