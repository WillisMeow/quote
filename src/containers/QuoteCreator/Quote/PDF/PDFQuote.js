import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';

import logo from '../../../../components/Assets/Images/Logo.png';
import QuoteHeader from './QuoteHeader';
import QuoteNo from './QuoteNo';
import BillTo from './BillTo';
import QuoteItemsTable from './QuoteItemsTable';
import QuotePrice from './QuotePrice';
import QuoteFooter from './QuoteFooter';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    logo: {
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    secondaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footer: {
        position: 'absolute',
        bottom: 75,
        left: 0,
        right: 0,
        /* margin: 'auto' */
    }
})

const pDFQuote = (props) => {
    let quoteData = props.quoteData;
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <Image style={styles.logo} src={logo}  />
                <QuoteHeader />
                <View style={styles.secondaryHeader}>
                    <BillTo
                        quoteData={quoteData}
                    />
                    <QuoteNo
                        quoteData={quoteData}
                    />
                </View>
                <QuoteItemsTable 
                    quoteData={quoteData}
                />
                <View style={styles.footer}>
                    <QuotePrice
                        quoteData={quoteData}
                    />
                    <QuoteFooter/>
                </View>
            </Page>
        </Document>
    )
}

export default pDFQuote;