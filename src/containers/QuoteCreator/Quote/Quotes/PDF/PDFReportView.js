import React, { Component } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import * as actionCreators from '../../../../../store/actions/index';
import PDFReport from './PDFReport';

class PDFReportView extends Component {
    render () {
        let quotesDisplayArray = this.props.quotesDisplayArray;
        console.log('quotesDisplayArray')
        console.log(quotesDisplayArray)
        let totalPackage = null;

        if (!this.props.viewingPDF && this.props.quotesDisplayArray === null) {
            totalPackage = <Redirect to='/quotes' />
        } else {
            totalPackage = (
                <PDFViewer width='80%' height="1000px">
                    <PDFReport
                        quotesDisplayArray={quotesDisplayArray}
                        pdfFormat={this.props.pdfFormat}
                    />
                </PDFViewer>
            )
        }
        return (
            <div>
                {totalPackage}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        viewingPDF: state.report.viewingPDF,
        quotesDisplayArray: state.report.quotesDisplayArray
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onResetQuote: () => dispatch(actionCreators.resetQuote())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDFReportView))