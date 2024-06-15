import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
        <Icon name="home-outline" size={25} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Icon name="cart-outline" size={25} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
        <Icon name="heart-outline" size={25} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (isAuthenticated) navigation.navigate('UserProfile');
          else navigation.navigate('Login');
        }}
      >
        <Icon name="person-outline" size={25} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default BottomNavigationBar;
