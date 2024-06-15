import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getFavoriteProducts } from '../../../redux/actions/userActions';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { favoriteProducts, loading } = useSelector(
    (state) => state.favoriteProducts
  );

  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Products</Text>
      <ScrollView
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      >
        {favoriteProducts && favoriteProducts.length > 0 ? (
          favoriteProducts.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.largeCard}
              onPress={() => navigation.navigate('Product', { id: item._id })}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: item.images[0].url }}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>
                  {item.name.length > 34
                    ? `${item.name.substring(0, 34)}...`
                    : item.name}
                </Text>
                <Text
                  style={[
                    styles.productInfo,
                    { marginBottom: 5, fontWeight: '400', color: 'black' },
                  ]}
                >
                  Price: ${item.price}
                </Text>
                <Text
                  style={[styles.productInfo, { color: 'grey', fontSize: 9 }]}
                >
                  Stock: {item.stock}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>No favorite products found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 30,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  largeCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productImageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  productDetails: {
    marginTop: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productInfo: {
    fontSize: 12,
    color: 'grey',
  },
  noFavoritesText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
