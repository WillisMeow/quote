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
    
    return (
        <>
            <View style={styles.quoteNoContainer}>
                <View style={styles.refElement}>
                    <Text style={styles.label}>{props.pdfFormat === 'quote' ? 'Quote Ref:' : 'Invoice Ref:'}</Text>
                    <Text style={styles.quoteData}>{props.quoteData.reference.quoteReference}</Text>
                </View>
                <View style={styles.refElement}>
                    <Text style={styles.label}>Client Ref:</Text>
                    <Text style={styles.quoteData}>{props.quoteData.reference.clientReference}</Text>
                </View>
                <View style={styles.refElement}>
                    <Text style={styles.label}>{props.pdfFormat === 'quote' ? 'Quote Unit:' : 'Invoice Unit:'}</Text>
                    <Text style={styles.quoteData}>{props.quoteData.reference.quoteUnit}</Text>
                </View>
                <View style={styles.refElement}>
                    <Text style={styles.label}>{props.pdfFormat === 'quote' ? 'Quote Date' : 'Invoice Date'}</Text>
                    <Text>{props.pdfFormat === 'quote' ? props.quoteData.date : props.quoteData.invoiceDate}</Text>
                </View>
            </View>
        </>
    )
}

export default quoteNo