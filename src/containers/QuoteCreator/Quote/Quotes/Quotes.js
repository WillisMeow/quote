import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../../../store/actions/index';
import classes from './Quotes.module.css';
import QuotesStatusFilter from './QuotesStatusFilter';
import QuotesFilterButtons from './QuotesFilterButtons';
import SearchBar from './SearchBar';

class Quotes extends Component {
    state = {
        viewingQuote: false,
        selectedQuoteKey: null,
        propsLocationKey: null,
        initialized: false,
        quotesArray: [],
        keyValueQuotesArray: [], // basically quotesArray, with a key (id) value added
        filteredQuotes: [], // this is the array used to display quotes
        searchTerm: '',
        statusFilterConditions: [],
        arrangeByClient: false,
        arrangeByStatus: false,
        filtered: true, // avoids premature rerendering (esp when changing between arrangeByClient)
        status: {
            job: {
                started: false,
                finished: false
            },
            quote: {
                created: false,
                sent: false,
                accepted: false
            },
            invoice: {
                created: false,
                sent: false,
                paid: false
            }
        },
        search: {
            searchBar: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Filter by Keyword...'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount () {
        this.setState({ propsLocationKey : this.props.location.key })
        
        if (!this.props.loading && this.props.editingKey === null) { // for clean initial loading of Quotes.js (via Toolbar)
            this.props.onResetQuote();
            this.props.onFetchQuotes(this.props.token, this.props.userId);
        }
    }
    componentDidUpdate () {
        if (this.props.quoteSubmitted) { // refetching updated quotes array after editing quote has been submitted or quote deleted
            this.props.onResetQuote();
            this.props.onFetchQuotes(this.props.token, this.props.userId);
        }
        
        if (this.state.quotesArray !== this.props.quotes && this.props.quotesFetched) {
            this.setState({ quotesArray : this.props.quotes })
        }

        if (this.props.match.isExact && this.state.propsLocationKey !== this.props.location.key) {
            this.setState({ viewingQuote : false, selectedQuoteKey : null, propsLocationKey : this.props.location.key})
            this.props.onFetchQuotes(this.props.token, this.props.userId);
        }

        if (this.props.quotesFetched && this.state.keyValueQuotesArray.length === 0 && this.state.initialized === false) { // initializes this.state.keyValueQuotesArray
            this.initQuotesHandler()
        }

    }

    initQuotesHandler = () => { // initializes key to each quote in quotesArray
        const newArrayOfObjects = [ // creating a deep copy of the array of objects
            ...this.props.quotes
        ].map(quote => ({
            ...quote,
            status: {
                ...quote.status
            }
        }))
        newArrayOfObjects.forEach((element) => { // populating status array
            let statusArray = [];
            for (let section in element.status) {
                for (let criteria in element.status[section]) {
                    if (element.status[section][criteria] === true ) {
                        statusArray.push(section + criteria)
                    }
                }
            }
            element.status.statusArray = statusArray
            element.status.statusHeirarchy = null
        });
        
        let quotesArray = [];
        for (let quote in newArrayOfObjects) {
            quotesArray.push({
                key: newArrayOfObjects[quote].id,
                data: newArrayOfObjects[quote]
            })
        }
        this.setState({ keyValueQuotesArray : quotesArray, filteredQuotes : quotesArray, initialized : true })
    }

    viewQuoteHandler = (quote) => {
        this.setState({ viewingQuote : true, selectedQuoteKey : quote.key })
        this.props.onSetEditingTrue(quote.key)
        this.props.history.push('/editquote')
    }

    returnToQuotesHandler = () => {
        this.setState({viewingQuote : false, selectedQuoteKey : null})
        this.props.onSetEditingFalse()
    }

    //----------FILTER HANDLER----------//
    // filterConditionsHandler --> filterMethodsHandler --> seperate change handlers
    filterConditionsHandler = (handlerId, event) => {
        // Below batch of if statements are used to set how the quotes are to be filtered
        if (handlerId === 'searchFilter') {
            let inputCopy = {
                ...this.state.search,
                searchBar: {
                    ...this.state.search.searchBar,
                    value: event.target.value
                }
            }
            this.setState({ searchTerm : event.target.value, filtered : false, search : inputCopy }, () => {
                this.filterMethodsHandler()
            })
        }
        if (handlerId === 'statusFilter') {
            let str = event.target.id.split(' ');
            let stateStatusCopy = {
                ...this.state.status,
                [str[0]]: {
                    ...this.state.status[str[0]],
                    [str[1]]: event.target.checked
                }
            }
            let trueCriteria = [];
            for (let section in stateStatusCopy) {
                for (let element in stateStatusCopy[section]) {
                    if (stateStatusCopy[section][element] === true) {
                        trueCriteria.push([section, element])
                    }
                }
            }
            this.setState({ statusFilterConditions : trueCriteria, status : stateStatusCopy, filtered : false }, () => {
                this.filterMethodsHandler()
            })
        }
        if (handlerId === 'arrangeByStatus') {
            this.setState((prevState) => ({
                arrangeByStatus : !prevState.arrangeByStatus, filtered : false
            }), () => {
                this.filterMethodsHandler()
            })
        }
        if (handlerId === 'arrangeByClient') {
            this.setState((prevState) => ({
                arrangeByClient : !prevState.arrangeByClient, filtered : false
            }), () => {
                this.filterMethodsHandler()
            })
        }
    }

    filterMethodsHandler = () => {
        let masterList = [
            ...this.state.keyValueQuotesArray
        ].map(quote => ({
            ...quote,
            data: {
                ...quote.data,
                status: {
                    ...quote.data.status
                }
            }
        }))
        console.log(masterList)
        let filteredQuotes = [];

        if (this.state.searchTerm !== '') {
            filteredQuotes = this.handleChange(masterList)
        }
        console.log(filteredQuotes)
        if (this.state.statusFilterConditions.length !== 0) {
            filteredQuotes = this.statusChangeHandler(masterList, filteredQuotes)
        }
        console.log(filteredQuotes)
        if (this.state.arrangeByStatus) {
            filteredQuotes = this.statusArrangeHandler(masterList, filteredQuotes)
        }
        console.log(filteredQuotes)
        if (this.state.arrangeByClient) {
            filteredQuotes = this.clientArrangeHandler(masterList, filteredQuotes)
        }
        if ((this.state.searchTerm === '' && this.state.statusFilterConditions.length === 0 && !this.state.arrangeByStatus && !this.state.arrangeByClient)) {
            console.log(masterList)
            filteredQuotes = masterList;
        }
        console.log(filteredQuotes)
        this.setState({ filteredQuotes : filteredQuotes, filtered : true })
    }

    handleChange = (masterList) => {
        let searchTerm = this.state.searchTerm
        let matches = [];
        matches = masterList.filter(quote => {
            return (
                quote.data.client.company.toLowerCase().includes(searchTerm) ||
                quote.data.reference.quoteUnit.toLowerCase().includes(searchTerm) ||
                quote.data.reference.quoteReference.toLowerCase().includes(searchTerm) ||
                quote.data.reference.clientReference.toLowerCase().includes(searchTerm)
            )
        })
        return matches
    }
    statusChangeHandler = (masterList, filteredQuotes) => {
        let trueCriteria = this.state.statusFilterConditions;
        console.log('trueCriteria')
        console.log(trueCriteria)
        let quotesList = filteredQuotes;
        if (this.state.searchTerm === '') {
            quotesList = masterList
        }
        let matches = [];
        for (let quote in quotesList) {
            let tempMatch = false;
            for (let criteria in trueCriteria) {
                if (quotesList[quote].data.status[trueCriteria[criteria][0]][trueCriteria[criteria][1]] === true) {
                    tempMatch = true;
                } else tempMatch = false;
            }
            if (tempMatch === true) {
                matches.push(quotesList[quote])
            }
        }
        return matches
    }
    statusArrangeHandler = (masterList, filteredQuotes) => {
        let quotesList = filteredQuotes;
        if (this.state.searchTerm === '' && this.state.statusFilterConditions.length === 0) {
            quotesList = masterList;
        }
        let matches = [];
        for (let quote in quotesList) {
            let quoteHierarchy = 0;
            if (quotesList[quote].data.status.statusArray.includes('jobstarted')) {
                quoteHierarchy = 1;
            }
            if (quotesList[quote].data.status.statusArray.includes('jobfinished')) {
                quoteHierarchy = 2;
            }
            if (quotesList[quote].data.status.statusArray.includes('invoicesent')) {
                quoteHierarchy = 3;
            }
            if (quotesList[quote].data.status.statusArray.includes('invoicepaid')) {
                quoteHierarchy = 4;
            }
            quotesList[quote].data.status.statusHeirarchy = quoteHierarchy;
            matches.push(quotesList[quote])
            matches.sort(function (quote1, quote2) {
                if(quote1.data.status.statusHeirarchy > quote2.data.status.statusHeirarchy) return -1;
                if(quote1.data.status.statusHeirarchy < quote2.data.status.statusHeirarchy) return 1;
            })
        }
        return matches
    }
    clientArrangeHandler = (masterList, filteredQuotes) => {
        let quotesList = filteredQuotes
        if (this.state.searchTerm === '' && this.state.statusFilterConditions.length === 0 && !this.state.arrangeByStatus) {
            quotesList = masterList;
        }
        quotesList.sort((a, b) => (a.data.client.company > b.data.client.company) ? 1 : -1 )
        const outputObj = quotesList.reduce((accum, obj) => {
            const id = obj.data.client.company;
            if (!accum[id]) accum[id] = [];
            accum[id].push(obj)
            return accum;
        }, []);
        let outputArray = [];
        for (let client in outputObj) {
            outputArray.push(outputObj[client])
        }
        let thisOne = {
            ...outputObj
        }
        for (let client in thisOne) {
            let clientInArrayCopy = [
                ...thisOne[client]
            ].map(quote => ({
                ...quote,
                data: {
                    ...quote.data,
                    status: {
                        ...quote.data.status
                    }
                }
            }))
        }
        return thisOne
    }    

    removeFilterHandler = () => {
        let inputCopy = {
            ...this.state.search,
            searchBar: {
                ...this.state.search.searchBar,
                value: ''
            }
        }
        this.setState({
            searchTerm : '',
            search : inputCopy,
            statusFilterConditions : [],
            arrangeByClient : false,
            arrangeByStatus : false,
            filtered : false
        }, () => {
            this.filterMethodsHandler()
        })
    }

    //----------STATUS DISPLAY----------//
    jobStatusDisplay = (identifier, statusArray) => {
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

    onDragEnd = (result, displayQuotesArray) => {
        const { destination, source, draggableId } = result;
        console.log(destination)
        console.log(source)
        console.log(draggableId)
        if (!destination) { // dropped outside of the Droppable context
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) { // dropped back into the same position
            return;
        }

        if (this.state.arrangeByClient) {
            let clientArray = this.state.filteredQuotes[destination.droppableId];
            let newTaskIdsByClient = Array.from(clientArray);
            newTaskIdsByClient.splice(source.index, 1);
            newTaskIdsByClient.splice(destination.index, 0, clientArray[source.index])

            let stateObjectCopy = {
                ...this.state.filteredQuotes,
                [destination.droppableId]: newTaskIdsByClient   
            }
            this.setState({ filteredQuotes : stateObjectCopy })

        } else {
            const newTaskIds = Array.from(this.state.filteredQuotes);
            newTaskIds.splice(source.index, 1); // from the index, we want to remove 1 item
            newTaskIds.splice(destination.index, 0, this.state.filteredQuotes[source.index]); // getting to the destination index, removing nothing, and adding in draggableId
            this.setState({ filteredQuotes : newTaskIds })
        }
    }

    render () {
        console.log('this.state')
        console.log(this.state)

        let searchBar = <SearchBar state={this.state} onChange={this.filterConditionsHandler} />

        let heading = <h2 className={classes.Heading}>Quotes</h2>

        let quotesHeader = (
            <ul className={classes.ListQuoteHeader}>
                <li className={classes.headerListItem}>
                    <p className={classes.listElement}>Client</p>
                    <p className={classes.listElement}>Reference</p>
                    <p className={classes.listElement}>Client Reference</p>
                    <p className={classes.listElement}>Quote Unit</p>
                    <p className={classes.listElement}>$</p>
                    <p className={classes.listElement}>Job</p>
                    <p className={classes.listElement}>Quote</p>
                    <p className={classes.listElementEnd}>Invoice</p>
                </li>
            </ul>
        )

        let quotes = <Spinner />
        
        let displayQuotesArray = this.state.filteredQuotes;
        console.log('displayQuotesArray')
        console.log(displayQuotesArray)

        if (this.state.filtered === true && this.props.quotesFetched) {
            if(this.state.arrangeByClient) {
                let tempQuotes = null;
                let tempQuotesArray = [];
    
                for (let client in displayQuotesArray) {
                    tempQuotes = (
                        <DragDropContext key={client} onDragEnd={(result) => this.onDragEnd(result, displayQuotesArray)}>
                            <Droppable droppableId={client}>
                                {(provided) => (
                                    <ul ref={provided.innerRef} {...provided.droppableProps} className={classes.list}>
                                        <li className={classes.FilteredClientName}>{client}</li>
                                        {displayQuotesArray[client].map((quote, index) => {
                                            return (
                                                <Draggable draggableId={quote.key} index={index} key={quote.key}>
                                                    {(provided) => (
                                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={quote.key} className={classes.listItem} onClick={() => this.viewQuoteHandler(quote)}>
                                                            <p className={classes.listElement}>{quote.data.client.company}</p>
                                                            <p className={classes.listElement}>{quote.data.reference.quoteReference}</p>
                                                            <p className={classes.listElement}>{quote.data.reference.clientReference}</p>
                                                            <p className={classes.listElement}>{quote.data.reference.quoteUnit}</p>
                                                            <p className={classes.listElement}>{quote.data.price}</p>
                                                            <p className={classes.listElement}>{this.jobStatusDisplay('job', quote.data.status.statusArray)}</p>
                                                            <p className={classes.listElement}>{this.jobStatusDisplay('quote', quote.data.status.statusArray)}</p>
                                                            <p className={classes.listElementEnd}>{this.jobStatusDisplay('invoice', quote.data.status.statusArray)}</p>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )
                    tempQuotesArray.push(tempQuotes)    
                }
                quotes = tempQuotesArray;
            } else {
                console.log(displayQuotesArray)
                quotes = (
                    <DragDropContext onDragEnd={(result) => this.onDragEnd(result, displayQuotesArray)}>
                        <Droppable droppableId='quotes'>
                            {(provided) => (
                                <ul ref={provided.innerRef} {...provided.droppableProps} className={classes.list}>
                                    {displayQuotesArray.map((quote, index) => {
                                        return (
                                            <Draggable draggableId={quote.key} index={index} key={quote.key}>
                                                {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={quote.key} className={classes.listItem} onClick={() => this.viewQuoteHandler(quote)}>
                                                        <p className={classes.listElement}>{quote.data.client.company}</p>
                                                        <p className={classes.listElement}>{quote.data.reference.quoteReference}</p>
                                                        <p className={classes.listElement}>{quote.data.reference.clientReference}</p>
                                                        <p className={classes.listElement}>{quote.data.reference.quoteUnit}</p>
                                                        <p className={classes.listElement}>{quote.data.price}</p>
                                                        <p className={classes.listElement}>{this.jobStatusDisplay('job', quote.data.status.statusArray)}</p>
                                                        <p className={classes.listElement}>{this.jobStatusDisplay('quote', quote.data.status.statusArray)}</p>
                                                        <p className={classes.listElementEnd}>{this.jobStatusDisplay('invoice', quote.data.status.statusArray)}</p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                )
            }
        }

        if (this.state.filteredQuotes.length === 0 && (this.state.searchFiltering || this.state.statusFiltering)) {
            quotes = (
                <div>
                    <h3>No Matches :(</h3>
                </div>
            )
        }

        return (
            <div className={classes.Quotes}>
                <div className={classes.Filters}>
                    {searchBar}
                    <QuotesStatusFilter 
                        status={this.state.status}
                        onStatusChange={this.filterConditionsHandler}
                    />
                    <QuotesFilterButtons 
                        filter={this.filterConditionsHandler}
                        clientFilterState={this.state.arrangeByClient}
                        statusFilterState={this.state.arrangeByStatus}
                        state={this.state}
                        removeFilter={this.removeFilterHandler}
                    />
                </div>
                {heading}
                {quotesHeader}
                {quotes}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.quote.quotes,
        loading: state.quote.loading,
        quotesArray: state.quote.quotes,
        quotesFetched: state.quote.quotesFetched,
        quoteSubmitted: state.quote.quoteSubmitted,
        editingKey: state.quote.editingKey,
        userId: state.auth.userId,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onFetchQuotes: (token, userId) => dispatch(actionCreators.fetchQuotes(token, userId)),
        onSetEditingTrue: (key) => dispatch(actionCreators.setEditingTrue(key)),
        onSetEditingFalse: () => dispatch(actionCreators.setEditingFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);