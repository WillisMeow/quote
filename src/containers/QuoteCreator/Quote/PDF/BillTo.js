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
            <Text>{props.reduxState.client.clientForm.company.value}</Text>
            <Text>{props.reduxState.client.clientForm.companyAddress.value}</Text>
            <Text>{props.reduxState.client.clientForm.contactPhoneNumber.value}</Text>
            <Text>{props.reduxState.client.clientForm.contactEmailAddress.value}</Text>
        </View>
    )
}

export default billTo