import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    quotePriceContainer: {
        flexDirection: 'column',
        marginTop: 36,
        /* justifyContent: 'flex-end', */
        alignItems: 'flex-end',
        marginRight: 60,
        marginBottom: 50
    },
    label: {
        width: 60
    },
    priceElement: {
        flexDirection: 'row',
        width: '150px',
        justifyContent: 'space-between'
    }
});

const quotePrice = (props) => {  
    let price = props.quoteData.price;
    let gst = (price * 0.15 ).toFixed(2);
    let totalPrice = (price * 1.15).toFixed(2);
    return (
        <>
            <View style={styles.quotePriceContainer}>
                <View style={styles.priceElement}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.quoteData}>$ {price}</Text>
                </View>
                <View style={styles.priceElement}>
                    <Text style={styles.label}>GST:</Text>
                    <Text style={styles.quoteData}>$ {gst}</Text>
                </View>
                <View style={styles.priceElement}>
                    <Text style={styles.label}>Total Price:</Text>
                    <Text style={styles.quoteData}>$ {totalPrice}</Text>
                </View>
            </View>
        </>
    )
}

export default quotePrice