import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BottomNavigationBar = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainPage');
        }}
      >
        <Image
          source={{ uri: 'https://i.imgur.com/VYt500n.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={{ uri: 'https://i.imgur.com/PXpeeFq.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          source={{ uri: 'https://i.imgur.com/aGnAZQ5.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Image
          source={{ uri: 'https://i.imgur.com/ROsBLFe.png' }}
          style={styles.icon}
        />
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
  icon: {
    width: 25,
    height: 25,
  },
});

export default BottomNavigationBar;