import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer'

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    job: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '70%',
        borderRightColor: borderColor,
        borderRightWidth: 1
    }
});

const quoteTableHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.job}>Job</Text>
            <Text style={styles.description}>Description</Text>
        </View>
    )
}

export default quoteTableHeader