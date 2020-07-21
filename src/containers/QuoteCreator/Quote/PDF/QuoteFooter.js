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

const quoteFooter = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={[styles.reportTitle, {textTransform: 'null', marginBottom: 10}]}>Please direct payment to TP Painting XX-XXXX-XXXXXXX-XX</Text>
            <Text style={styles.reportTitle}>Thank you for your business.</Text>
        </View>
    )
}

export default quoteFooter