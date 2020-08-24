import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

import ReportTableHeader from './ReportTableHeader';
import ReportTableRow from './ReportTableRow';

const styles = StyleSheet.create({
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd'
    }
});

const reportItemsTable = (props) => {
    return (
        <View style={styles.tableContainer}>
            <ReportTableHeader />
            <ReportTableRow 
                quotesDisplayArray={props.quotesDisplayArray}
            />
            {/* How is the Clients Arranged Report going to be dealt with? */}
        </View>
    )
}

export default reportItemsTable