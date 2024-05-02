import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import SmallProductCard from './OrderDetail_ItemCard';

const OrderDetail = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.orderId}>Order ID: 10</Text>
                <Text style={styles.status}>Status: Shipped</Text>
                <Text style={styles.orderDate}>Order Date: 12/4/2024</Text>
                <Text style={styles.shippingDate}>Shipping Date: 14/4/2024</Text>
                <Text style={styles.shippingFee}>Shipping Fee: 10$</Text>
                <Text style={styles.total}>Total Price: 669$</Text>
            </View>
            <View>
                <ScrollView>
                    <SmallProductCard></SmallProductCard>
                    <SmallProductCard></SmallProductCard>
                    <SmallProductCard></SmallProductCard>
                    <SmallProductCard></SmallProductCard>
                    <SmallProductCard></SmallProductCard>
                    <SmallProductCard></SmallProductCard>
                    <SmallProductCard></SmallProductCard>
                </ScrollView>
            </View>

            

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    orderId: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderDate: {
        fontSize: 16,
        marginBottom: 10,
    },
    shippingDate: {
        fontSize: 16,
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        marginBottom: 10,
        color: 'green',
    },
    item: {
        marginBottom: 10,
    },
    itemName: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 16,
        color: 'green',
    },
    itemQuantity: {
        fontSize: 16,
        color: 'gray',
    },
    shippingFee: {
        fontSize: 16,
       
    },
    total: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
});

export default OrderDetail;
