import React, { Component } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { connect } from 'react-redux';

import PDFQuote from './PDFQuote';
import * as actionCreators from '../../../../store/actions/index';

class pDFView extends Component {

    componentDidMount () {
        /* this.props.onResetQuote() */
    }

    render () {
        let quoteData = null;
        if (this.props.editingKey !== null) {
            quoteData = this.props.quotesArray[this.props.quotesArray.findIndex(el => el.id === this.props.editingKey)]
        } else {
            quoteData = this.props.quotesArray[(this.props.quotesArray.length - 1)]
        }
        console.log(quoteData)
        console.log(this.props.quotesArray)
        return (
            <div>
            
                <PDFViewer width='80%' height="1000px">
                    <PDFQuote 
                        quoteData={quoteData}
                    />
                </PDFViewer>
                {/* <div>
                    <PDFDownloadLink document={<PDFQuote />} fileName="example.pdf">Download PDF</PDFDownloadLink>
                </div> */}
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        reduxState: state,
        editingKey: state.quote.editingKey,
        quotesArray: state.quote.quotes,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onResetQuote: () => dispatch(actionCreators.resetQuote()),
        onFetchQuotes: () => dispatch(actionCreators.fetchQuotes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pDFView)