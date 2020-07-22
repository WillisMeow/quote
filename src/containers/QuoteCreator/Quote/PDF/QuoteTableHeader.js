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
        /* height: 24, */
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        flexWrap: 'wrap',
        flex: 1,
    },
    job: {
        /* width: '30%', */
        borderRightColor: borderColor,
        borderRightWidth: 1,
        flexWrap: 'wrap',
        flex: 1,
        alignContent: 'flex-start',
        /* marginTop: 5, */
        paddingTop: 5
    },
    description: {
        /* width: '70%', */
        /* borderRightColor: borderColor,
        borderRightWidth: 1, */
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
        /* marginTop: 5, */
        paddingTop: 5
    }
});

const quoteTableHeader = () => {
    return (
        <View style={styles.container}>
        <View style={{width: '30%'}}>
            <Text style={styles.job}>Job</Text>
        </View>
        <View style={{width: '70%'}}>
            <Text style={styles.description}>Description</Text>
        </View>
        </View>
    )
}

export default quoteTableHeader