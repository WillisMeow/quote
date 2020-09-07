 const jobStatusDisplay = (identifier, statusArray) => {
    let displayMessage = null;
    if (identifier === 'job') {
        if (statusArray.includes('jobfinished')) {
            displayMessage = 'Completed'
        } else if (statusArray.includes('jobstarted')) {
            displayMessage = 'In Progress'
        } else displayMessage = 'Not Started' 
    }
    if (identifier === 'quote') {
        if (statusArray.includes('quoteaccepted')) {
            displayMessage = 'Accepted'
        } else if (statusArray.includes('quotesent')) {
            displayMessage = 'Sent'
        } else if (statusArray.includes('quotecreated')) {
            displayMessage = 'Created'
        } else displayMessage = 'Not Created'
    }
    if (identifier === 'invoice') {
        if (statusArray.includes('invoicepaid')) {
            displayMessage = 'Paid'
        } else if (statusArray.includes('invoicesent')) {
            displayMessage = 'Sent'
        } else if (statusArray.includes('invoicecreated')) {
            displayMessage = 'Created'
        } else displayMessage = 'Not Created'
    }
    return displayMessage
}

export default jobStatusDisplay