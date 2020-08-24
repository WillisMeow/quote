import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import JobStatusDisplay from './JobStatusDisplay';
import jobStatusDisplay from './JobStatusDisplay';

const borderColor = '#bff0fd';
const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        flexWrap: 'wrap',
        flex: 1,
    },
    job: {
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        flexWrap: 'wrap',
        flex: 1,
        paddingTop: 5


    },
    description: {
        textAlign: 'left',
        paddingLeft: 8,
        paddingRight: 8,
        flexWrap: 'wrap',
        flex: 1,
        paddingTop: 5
    }
});

const reportTableRow = (props) => {

    let quotesDisplayArray = props.quotesDisplayArray;
    console.log('quotesDisplayArray')
    console.log(quotesDisplayArray)

    let tableRows = null;

    if (Array.isArray(quotesDisplayArray)) { // checking if array or object (i.e. filtered by client or not)
        tableRows = (
            quotesDisplayArray.map(job => {
                return (
                    <View key={job.key} style={styles.row}>
                        <View style={{width: '18%'}}>
                            <Text style={styles.job}>{job.data.client.company}</Text>
                        </View>
                        <View style={{width: '13%'}}>
                            <Text style={styles.job}>{job.data.reference.quoteReference}</Text>
                        </View>
                        <View style={{width: '13%'}}>
                            <Text style={styles.job}>{job.data.reference.clientReference}</Text>
                        </View>
                        <View style={{width: '13%'}}>
                            <Text style={styles.job}>{job.data.reference.quoteUnit}</Text>
                        </View>
                        <View style={{width: '5%'}}>
                            <Text style={styles.job}>{job.data.price}</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <Text style={styles.job}>{JobStatusDisplay('job', job.data.status.statusArray)}</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <Text style={styles.job}>{JobStatusDisplay('quote', job.data.status.statusArray)}</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <Text style={styles.job}>{JobStatusDisplay('invoice', job.data.status.statusArray)}</Text>
                        </View>
                    </View>
                )
            })
        )
    } else {
        let clientTitle = null;
        let clientRows = null;
        for (let client in quotesDisplayArray) {
            clientTitle = <Text>{client}</Text>
            clientRows = quotesDisplayArray[client].map((job) => {
                return (
                    <View style={styles.container}>
                        <View style={{width: '18%'}}>
                            <Text style={styles.job}>{job.data.client.company}</Text>
                        </View>
                        <View style={{width: '13%'}}>
                            <Text style={styles.job}>{job.data.reference.quoteReference}</Text>
                        </View>
                        <View style={{width: '13%'}}>
                            <Text style={styles.job}>{job.data.reference.clientReference}</Text>
                        </View>
                        <View style={{width: '13%'}}>
                            <Text style={styles.job}>{job.data.reference.quoteUnit}</Text>
                        </View>
                        <View style={{width: '5%'}}>
                            <Text style={styles.job}>{job.data.price}</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <Text style={styles.job}>{JobStatusDisplay('job', job.data.status.statusArray)}</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <Text style={styles.job}>{JobStatusDisplay('quote', job.data.status.statusArray)}</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <Text style={styles.job}>{JobStatusDisplay('invoice', job.data.status.statusArray)}</Text>
                        </View>
                    </View>
                )
            })
        }
        tableRows.push(clientTitle);
        tableRows.push(clientRows);
    }
    return (
        <>
            {tableRows}
        </>
    )
}

export default reportTableRow