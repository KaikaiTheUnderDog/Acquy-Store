import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SmallProductCard from '../Products/SmallProductCard'; // Make sure to import SmallProductCard
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getProducts,
} from '../../../redux/actions/productActions';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

const categories = ['Cate1', 'Cate2', 'Cate3', 'Cate4']; // Your category names

const SearchResult = () => {
  const dispatch = useDispatch();
  const { keyword } = useRoute().params;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showList, setShowList] = useState([]);

  const { products, error, productsFounded } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    setShowList([]);
    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
      dispatch(clearErrors(error));
    }
    dispatch(getProducts(keyword, 1, [1, 9999999], '', 0));
  }, [error, keyword]);

  useEffect(() => {
    if (productsFounded > 0) {
      const newProducts = products.filter(
        (product) =>
          !showList.find((item) => item._id === product._id) &&
          product.name.includes(keyword)
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

    await dispatch(getProducts(keyword, nextPage, [1, 9999999], '', 0));

    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.Title}>
        Result(s) for{' '}
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'italic',
          }}
        >
          "{keyword}"
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontStyle: 'italic',
          }}
        >
          {'      '}({productsFounded} found)
        </Text>
      </Text>
      <FlatList
        data={showList}
        renderItem={({ item }) => <SmallProductCard product={item} />}
        keyExtractor={(item) => item._id}
        onEndReached={fetchMoreProducts}
        onTouchEnd={fetchMoreProducts}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadingMore ? <Text>Loading...</Text> : null}
        numColumns={2}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
  },
  content: {
    flex: 1, // Cho phép phần nội dung mở rộng
  },
  Title: {
    paddingLeft: 35,
    fontWeight: 'bold',
    fontSize: 18,
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
});

export default SearchResult;
