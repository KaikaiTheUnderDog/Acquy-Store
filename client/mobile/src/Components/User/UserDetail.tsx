import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const UserProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: 'https://i.imgur.com/fRav6Vz.jpeg' }} // Replace with your profile image URI
                    style={styles.profileImage}
                />
                <Text style={styles.username}>USER001</Text>
            </View>
            <ScrollView style={styles.ScrollView_Container}>
                <View style={styles.infoContainer}>
                    {['Email', 'Ngày tạo', 'Info2', 'Info3'].map((info, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.infoText}>{info}</Text>
                            <Text style={styles.infoText}>{info}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>MY ORDER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>EDIT INFORMATION</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Signout_button}>
                    <Text style={styles.Signout_buttonText}>SIGN OUT</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    card: {
        backgroundColor: '#fff',
        width: 175,
        height: 175,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 3, // for Android shadow
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: '#c4c4c4', // A placeholder background color
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    ScrollView_Container: {
        width: '100%'
    },
    infoContainer: {
        width: '100%',
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    infoText: {
        fontSize: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
    },
    Signout_button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#E4000F',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 5,
    },
    Signout_buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF'
    },
});

export default UserProfileScreen;
