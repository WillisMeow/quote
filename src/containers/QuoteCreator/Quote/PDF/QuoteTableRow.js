import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#bff0fd';
const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        /* height: 24, */
        fontStyle: 'bold',
        flexGrow: 1,
        flexWrap: 'wrap',
        flex: 1,
    },
    job: {
        /* width: '30%', */
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        flexWrap: 'wrap',
        flex: 1,
        /* marginTop: 5, */
        paddingTop: 5


    },
    description: {
        /* width: '70%', */
        /* borderRightColor: borderColor,
        borderRightWidth: 1, */
        textAlign: 'left',
        paddingLeft: 8,
        paddingRight: 8,
        flexWrap: 'wrap',
        flex: 1,
        /* marginTop: 5, */
        paddingTop: 5
    }
});

const quoteTableRow = (props) => {
    const rows = props.quoteData.jobs.jobsArray.map(job => {
        return (
            <View style={styles.row} key={job.key}>
            <View style={{width: '30%'}}>
                <Text style={styles.job}>{job.elementConfig.jobId.value}</Text>
            </View>
            <View style={{width: '70%'}}>
                <Text style={styles.description}>{job.elementConfig.jobDetails.value}</Text>
            </View>
            </View>
        )
    })
    return (
        <>
        {rows}
        </>
    )
}

export default quoteTableRow