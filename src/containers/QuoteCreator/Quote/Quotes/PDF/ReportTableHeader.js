import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        flexWrap: 'wrap',
        flex: 1,
    },
    job: {
        borderRightColor: borderColor,
        borderRightWidth: 1,
        flexWrap: 'wrap',
        flex: 1,
        alignContent: 'flex-start',
        paddingTop: 5,
    },
    description: {
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
        paddingTop: 5
    }
});

const reportTableHeader = () => {
    return (
        <View style={styles.container}>
            <View style={{width: '18%'}}>
                <Text style={styles.job}>Client</Text>
            </View>
            <View style={{width: '13%'}}>
                <Text style={styles.job}>Reference</Text>
            </View>
            <View style={{width: '13%'}}>
                <Text style={styles.job}>Client Ref</Text>
            </View>
            <View style={{width: '13%'}}>
                <Text style={styles.job}>Job Unit</Text>
            </View>
            <View style={{width: '5%'}}>
                <Text style={styles.job}>$</Text>
            </View>
            <View style={{width: '10%'}}>
                <Text style={styles.job}>Job Status</Text>
            </View>
            <View style={{width: '10%'}}>
                <Text style={styles.job}>Quote Status</Text>
            </View>
            <View style={{width: '10%'}}>
                <Text style={styles.job}>Invoice Status</Text>
            </View>
        </View>
    )
}

export default reportTableHeader