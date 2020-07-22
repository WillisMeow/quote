import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    quoteNoContainer: {
        flexDirection: 'column',
        marginTop: 36,
        /* justifyContent: 'flex-end', */
        alignItems: 'flex-end'
    },
    quoteDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    quoteData: {
        fontSize: 12,
        fontStyle: 'bold'
    },
    label: {
        width: 60
    },
    refElement: {
        flexDirection: 'row',
        width: '150px',
        justifyContent: 'space-between'
    }
});

const quoteNo = (props) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    
    return (
        <>
            <View style={styles.quoteNoContainer}>
                <View style={styles.refElement}>
                    <Text style={styles.label}>Quote Ref:</Text>
                    <Text style={styles.quoteData}>{props.reduxState.quote.quoteReference.quoteReference.value}</Text>
                </View>
                <View style={styles.refElement}>
                    <Text style={styles.label}>Client Ref:</Text>
                    <Text style={styles.quoteData}>{props.reduxState.quote.quoteReference.clientReference.value}</Text>
                </View>
                <View style={styles.refElement}>
                    <Text style={styles.label}>Quote Unit:</Text>
                    <Text style={styles.quoteData}>{props.reduxState.quote.quoteReference.quoteUnit.value}</Text>
                </View>
                <View style={styles.refElement}>
                    <Text style={styles.label}>Date:</Text>
                    <Text>{today}</Text>
                </View>
            </View>
        </>
    )
}

export default quoteNo