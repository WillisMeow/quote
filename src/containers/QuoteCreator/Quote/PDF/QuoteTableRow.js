import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#bff0fd';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold'
    },
    job: {
        width: '30%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8
    },
    description: {
        width: '70%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8
    }
});

const quoteTableRow = (props) => {
    const rows = props.reduxState.quote.jobs.map(job => {
        return (
            <View style={styles.row} key={job.key}>
                <Text style={styles.job}>{job.elementConfig.jobId.value}</Text>
                <Text style={styles.description}>{job.elementConfig.jobDetails.value}</Text>
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