import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import classes from './ListItem.module.css';
import JobStatusDisplay from '../../../../components/HelperFunctions/JobStatusDisplay';

const listItem = (props) => {
    let quote = props.quote;
    let index = props.index

    return (
        <Draggable draggableId={quote.key} index={index} key={quote.key}>
            {(provided) => (
                <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={quote.key} className={classes.listItem} onClick={() => props.viewQuoteHandler(quote)}>
                    <p className={classes.listElement}>{quote.data.client.company}</p>
                    <p className={classes.listElement}>{quote.data.reference.quoteReference}</p>
                    <p className={classes.listElement}>{quote.data.reference.clientReference}</p>
                    <p className={classes.listElement}>{quote.data.reference.quoteUnit}</p>
                    <p className={classes.listElement}>{quote.data.price}</p>
                    <p className={classes.listElement}>{JobStatusDisplay('job', quote.data.status.statusArray)}</p>
                    <p className={classes.listElement}>{JobStatusDisplay('quote', quote.data.status.statusArray)}</p>
                    <p className={classes.listElementEnd}>{JobStatusDisplay('invoice', quote.data.status.statusArray)}</p>
                </li>
            )}
        </Draggable>
    )
}

export default listItem