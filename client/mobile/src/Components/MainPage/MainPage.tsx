import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../Header/Header';
import {
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
} from 'react-native';
import LargeProductCard from '../Products/LargeProductCard';
import SmallProductCard from '../Products/SmallProductCard';
import BottomNavigationBar from '../Header/Navibar';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearErrors,
  getProducts,
} from '../../../redux/actions/productActions';

const MainPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showList, setShowList] = useState([]);

  const { products, error, productsFounded } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      //ToastAndroid.show(error.message, ToastAndroid.LONG);
      dispatch(clearErrors(error));
    }

    dispatch(getProducts('', 1, [1, 9999999], '', 0));
  }, [error]);

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

    await dispatch(getProducts('', nextPage, [1, 9999999], '', 0));

    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <View style={styles.content}>
      <View>
        <LargeProductCard></LargeProductCard>
      </View>
      <Text style={styles.Title}>Our Products</Text>
      <FlatList
        data={showList}
        renderItem={({ item }) => <SmallProductCard product={item} />}
        keyExtractor={(item) => item._id}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadingMore ? <Text>Loading...</Text> : null}
        numColumns={2}
        contentContainerStyle={styles.flatListContentContainer}
      />
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

export default MainPage;
