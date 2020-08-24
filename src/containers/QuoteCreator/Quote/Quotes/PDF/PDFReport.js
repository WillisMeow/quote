import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';

import logo from '../../../../../components/Assets/Images/Logo.png';
import ReportHeader from './ReportHeader';
import ReportDate from './ReportDate';
import ReportItemsTable from './ReportItemsTable';

const styles = StyleSheet.create({
    logo: {
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    headerView: {
        display: 'flex',
        flexDirection: 'row'
    }
})

const pDFReport = (props) => {
    return (
        <Document>
            <Page size='A4' orientation='landscape'>
                <Image style={styles.logo} src={logo} />
                <View style={styles.headerView}>
                    <ReportHeader />
                    <ReportDate />
                </View>
                <ReportItemsTable 
                    quotesDisplayArray={props.quotesDisplayArray}
                />
                {/* Quotes Table, includes: Title, quote lines */}
                {/* Summary tables if enabled */}
            </Page>
        </Document>
    )
}

export default pDFReport