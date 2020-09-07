import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';

import logo from '../../../../../components/Assets/Images/Logo.png';
import ReportHeader from './ReportHeader';
import ReportDate from './ReportDate';
import ReportItemsTable from './ReportItemsTable';

const styles = StyleSheet.create({
    page: {
        boxSizing: 'borderBox',
        overFlow: 'auto',
        width: '100%',
    },
    logo: {
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    headerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const pDFReport = (props) => {
    return (
        <Document>
            <Page debug size='A4' orientation='landscape' style={styles.page, {padding: '20px'}}>
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