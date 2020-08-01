import React from 'react';
import { View, Text, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'column',
        marginTop: 12,
    },
    reportTitle: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
})

const quoteFooter = (props) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={[styles.reportTitle, {textTransform: 'null', marginBottom: 10}]}>{props.pdfFormat === 'quote' ? null : 'Please direct payment to TP Painting XX-XXXX-XXXXXXX-XX'}</Text>
            <Text style={styles.reportTitle}>{props.pdfFormat === 'quote' ? 'Please review and advise acceptance of the above Quote' : 'Thank you for your business'}</Text>
        </View>
    )
}

export default quoteFooter