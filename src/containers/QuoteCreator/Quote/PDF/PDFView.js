import React, { Component } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import PDFQuote from './PDFQuote';

class pDFView extends Component {
    render () {
        let quoteData = null;
        if (this.props.editingKey !== null) {
            quoteData = this.props.quotesArray[this.props.quotesArray.findIndex(el => el.id === this.props.editingKey)]
        } else {
            quoteData = this.props.quotesArray[(this.props.quotesArray.length - 1)]
        }
        console.log(quoteData)
        console.log(this.props.pdfFormat)
        console.log(this.props.quotesArray)

        let totalPackage = null;
        if (this.props.quotesArray.length === 0) { // so that when /pdfquote is loaded with no quotes loaded, does not error up
            totalPackage = <Redirect to="/newnewquote" />
        } else {
            totalPackage = (
                <PDFViewer width='80%' height="1000px">
                    <PDFQuote 
                        quoteData={quoteData}
                        pdfFormat={this.props.pdfFormat}
                    />
                </PDFViewer>
            )
        }

        return (
            <div>
                {totalPackage}
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
        pdfFormat: state.quote.pdfFormat
    }
}

export default withRouter(connect(mapStateToProps)(pDFView))