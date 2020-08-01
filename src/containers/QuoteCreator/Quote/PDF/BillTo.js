import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 0,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});

const billTo = (props) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.billTo}>{props.pdfFormat === 'quote' ? 'Addressed To:' : 'Bill To:'}</Text>
            <Text>{props.quoteData.client.company}</Text>
            <Text>{props.quoteData.client.companyAddress}</Text>
            <Text>{props.quoteData.client.contactPhoneNumber}</Text>
            <Text>{props.quoteData.client.contactEmailAddress}</Text>
        </View>
    )
}

export default billTo