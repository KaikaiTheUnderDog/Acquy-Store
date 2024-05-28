import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Categories = [
  { label: 'All' },
  { label: 'Games' },
  { label: 'Accessories' },
  { label: 'Consoles' },
  { label: 'Merchandises' },
  { label: 'Alternatives' },
];

const BottomNavigationBar = () => {
  const navigation = useNavigation(); // Initialize navigation

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    toggleMenu();
    // Navigate to search page with selected category
    navigation.navigate('Search', {  keyword: '', categories: category }); // Navigate to search page with selected category
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
        <Image source={{ uri: 'https://i.imgur.com/VYt500n.png' }} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Image source={{ uri: 'https://i.imgur.com/PXpeeFq.png' }} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMenu}>
        <Image source={{ uri: 'https://i.imgur.com/aGnAZQ5.png' }} style={styles.icon} />
      </TouchableOpacity>
      
      <Modal transparent={true} visible={menuVisible} onRequestClose={toggleMenu}>
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            {/* Menu items for each category */}
            {Categories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => handleCategorySelection(category.label)}>
                <Text style={styles.menuItem}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            {/* Cancel button */}
            <Pressable style={[styles.filterBtn, { backgroundColor: 'white', width: '50%' }]} onPress={toggleMenu}>
              <Text style={[styles.filterBtnText, { color: 'red' }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => {
        if (isAuthenticated) navigation.navigate('UserProfile');
        else navigation.navigate('Login');
      }}>
        <Image source={{ uri: 'https://i.imgur.com/ROsBLFe.png' }} style={styles.icon} />
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
  filterBtn: {
    width: '30%',
    height: '40%',
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  filterBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
  },
  icon: {
    width: 25,
    height: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  menu: {
    backgroundColor: 'white',
    width: '60%',
    height: '50%',
    margin: 40,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOpacity: 10,
    borderWidth: 3,
    borderColor: 'red',
    shadowRadius: 6,
    elevation: 10,
  },
  menuItem: {
    fontSize: 22,
    marginBottom: 10,
  },
});

export default BottomNavigationBar;
