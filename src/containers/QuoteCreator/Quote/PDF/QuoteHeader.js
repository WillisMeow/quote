import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        marginTop: 24
    },
    reportTitle: {
        color: '#61dafb',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});

const quoteHeader = (props) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Invoice</Text>
        </View>
    )
}

export default quoteHeader