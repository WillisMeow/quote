import React from 'react';

import Button from '../../../../components/UI/Button/Button';

const quotesFilterButtons = (props) => {
let buttons = (
    <div>
        <Button clicked={props.clientFilter}>
            Filter By Company
        </Button>
        <Button>
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