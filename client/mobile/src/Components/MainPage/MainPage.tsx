import { useState, useEffect, memo } from 'react';
import {
  Text,
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SmallProductCard from '../Products/SmallProductCard';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearErrors,
  getProducts,
} from '../../../redux/actions/productActions';
import BestSellers from '../Products/BestSellers';

const ProductList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showList, setShowList] = useState([]);

  const { products, error, productsFounded } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      dispatch(clearErrors());
    }

    dispatch(getProducts('', 1, [0, 9999999], '', 0));
  }, []);

  useEffect(() => {
    if (productsFounded || productsFounded > 0) {
      const newProducts = products.filter(
        (product) => !showList.find((item) => item._id === product._id)
      );

      setShowList([...showList, ...newProducts]);
    }
  }, [products]);

  const fetchMoreProducts = async () => {
    if (loadingMore || currentPage >= Math.ceil(productsFounded / 4)) {
      return;
    }

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    await dispatch(getProducts('', nextPage, [0, 9999999], '', 0));

    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <FlatList
      data={showList}
      renderItem={({ item }) => <SmallProductCard product={item} />}
      keyExtractor={(item) => item._id}
      onEndReached={fetchMoreProducts}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loadingMore ? <Text>Loading...</Text> : null}
      numColumns={2}
      contentContainerStyle={styles.flatListContentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const MainPage = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.bestSeller}>Best Seller</Text>
      <BestSellers />

      <Text style={styles.Title}>Our Products</Text>
      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1, // Cho phép phần nội dung mở rộng
  },
  Title: {
    paddingLeft: 35,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#191919',
  },
  navBar: {
    height: 60, // Đặt chiều cao cố định cho thanh điều hướng, điều chỉnh tùy ý
    justifyContent: 'center',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  flatListContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bestSeller: {
    marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 0,
    color: '#191919',
    fontSize: 21,
  },
  largeCard: {
    borderRadius: 10,
    margin: 25,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: '#E7625F',
    marginTop: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  productImage: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  buyNow: {
    color: 'white',
    marginTop: 8,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default MainPage;
