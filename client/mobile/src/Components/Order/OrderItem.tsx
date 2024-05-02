import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderItem = () => {
    return (
        <TouchableOpacity style={styles.largeCard}>
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: -40 }}>
                <Image source={{ uri: "https://th.bing.com/th/id/R.135d78ab4d85851d750d411f81e2594e?rik=FSeh7zRPieD8YA&pid=ImgRaw&r=0" }} style={styles.productImage} />
                <Text style={styles.productName}>ORDER ID123456</Text>
            </View >
            <View>
                <Text style={styles.Status}>Shipped</Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    largeCard: {
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30,
        height: 120,
        width: "100%",
        alignSelf: 'center',
        backgroundColor: '#FFF',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        elevation: 5, // for Android shadow
    },
    productName: {
        flex: 1,
        fontSize: 22,
        marginTop:20,
        fontWeight: 'bold',
    },
    productImage: {
        marginTop: 5,
        width: 80,
        height: 80,
        marginRight: 20,
        marginLeft: 60,
        resizeMode: 'contain',
    },
    Status: {
        position: 'absolute',
        bottom: -5,
        left: 85,
        color: 'green',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default OrderItem;
