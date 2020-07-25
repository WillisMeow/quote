import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

import QuoteTableHeader from './QuoteTableHeader';
import QuoteTableRow from './QuoteTableRow';

const styles = StyleSheet.create({
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd'
    },
});

const quoteItemsTable = (props) => {
    return (
        <View style={styles.tableContainer}>
            <QuoteTableHeader />
            <QuoteTableRow 
                quoteData={props.quoteData}
            />
        </View>
    )
}

export default quoteItemsTable