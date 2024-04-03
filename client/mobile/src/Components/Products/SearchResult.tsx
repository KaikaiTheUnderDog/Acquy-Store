import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SmallProductCard from './SmallProductCard'; // Make sure to import SmallProductCard

const categories = ['Cate1', 'Cate2', 'Cate3', 'Cate4']; // Your category names

const SearchResult = () => {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  return (
    <View style={{ flex: 1 }}>
      {/* Category Tabs */}
      {/*<View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryTab,
              currentCategory === category && styles.categoryTabActive
            ]}
            onPress={() => setCurrentCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
          </View>*/}

      {/* Product Grid */}
      <Text style={styles.latestSearchesTitle}>Searched for: "Test Product"</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
        <SmallProductCard></SmallProductCard>
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
});

export default SearchResult;
