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
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{props.quoteData.clients.clientForm.company.value}</Text>
            <Text>{props.quoteData.clients.clientForm.companyAddress.value}</Text>
            <Text>{props.quoteData.clients.clientForm.contactPhoneNumber.value}</Text>
            <Text>{props.quoteData.clients.clientForm.company.contactEmailAddress}</Text>
        </View>
    )
}

export default billTo