import React, { Component } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { connect } from 'react-redux';

import PDFQuote from './PDFQuote';

class pDFView extends Component {
    render () {
        console.log(this.props.reduxState)
        return (
            <div>
            
                <PDFViewer width='80%' height="1000px">
                    <PDFQuote 
                        reduxState={this.props.reduxState}
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
    }
}

export default connect(mapStateToProps)(pDFView)