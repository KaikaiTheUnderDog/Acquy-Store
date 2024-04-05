import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from 'react-native';

const backIcon = 'https://i.imgur.com/D1hWraX.png';
const ClockIcon = 'https://i.imgur.com/tEsFc7a.png';
const closeIcon = 'https://i.imgur.com/q3VRk3u.png';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.latestSearchesTitle}>Lastest searches</Text>

      <View style={styles.historyItem}>
        <Image source={{ uri: ClockIcon }} style={styles.icon} />
        <Text style={styles.historyText}> TEST PRODUCT 1</Text>
        <TouchableOpacity>
          <Image source={{ uri: closeIcon }} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.historyItem}>
        <Image source={{ uri: ClockIcon }} style={styles.icon} />
        <Text style={styles.historyText}> TEST PRODUCT 2</Text>
        <TouchableOpacity>
          <Image source={{ uri: closeIcon }} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4000F',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  latestSearchesTitle: {
    marginTop: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  historyItem: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  historyText: {
    flex: 1,
  },

  icon: {
    width: 24,
    height: 24,
  },
  // ... (các styles khác giữ nguyên)
});

export default SearchScreen;
