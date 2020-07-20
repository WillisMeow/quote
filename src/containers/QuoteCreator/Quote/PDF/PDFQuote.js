import React from 'react';
import { Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

import classes from './PDFQuote.module.css';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})

const pDFQuote = (props) => {
    console.log(props.reduxState)
    let reduxStateCopy = props.reduxState;
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.section}>
                        <Text>
                            {reduxStateCopy.quote.quoteReference.quoteReference.value}
                        </Text>
                        <Text>
                            {reduxStateCopy.quote.quoteReference.clientReference.value}
                        </Text>
                        <Text>
                            {reduxStateCopy.quote.quoteReference.quoteUnit.value}
                        </Text>
                </View>
                <View style={styles.section}>
                    <Text>
                        Section #2
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

export default pDFQuote;