import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import OrderItem from './OrderItem';

const backIcon = "https://i.imgur.com/D1hWraX.png";
const categories = ['Cate1', 'Cate2', 'Cate3', 'Cate4']; // Your category names

const Order = () => {
    const [currentCategory, setCurrentCategory] = useState(categories[0]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.productGrid}>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    categoryTabActive: {
        borderBottomWidth: 3,
        borderBottomColor: 'red',
    },
    categoryText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 24
    },
    latestSearchesTitle: {
        marginTop: 20,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    backButton: {
        width: 48,
        height: 48,
      },
    Cart_BTN: {
        width: '40%',
        paddingTop: 15,

        paddingBottom: 15,
        borderRadius: 15,
        backgroundColor: 'orange',
        alignItems: 'center',
        elevation: 5,
        marginLeft: 10
    },
    Buy_Txt: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF'
    },
});

export default Order;
