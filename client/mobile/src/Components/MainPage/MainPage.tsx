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

import { getProducts } from '../../../redux/actions/productActions';

const MainPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showList, setShowList] = useState([]);

  const { products, error, totalProduct } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }

    getProducts('', 1, [1, 9999999], '', 0)(dispatch);
  }, [error]);

  useEffect(() => {
    if (products.length > 0) {
      const newProducts = products.filter(
        (product) => !showList.find((item) => item._id === product._id)
      );

      setShowList([...showList, ...newProducts]);
    }
  }, [products]);

  const fetchMoreProducts = async () => {
    if (loadingMore || currentPage >= Math.ceil(totalProduct / 4)) {
      return;
    }

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    await getProducts('', nextPage, [1, 9999999], '', 0)(dispatch);

    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <View style={styles.content}>
      <View>
        <LargeProductCard></LargeProductCard>
      </View>
      <FlatList
        data={showList}
        renderItem={({ item }) => <SmallProductCard product={item} />}
        keyExtractor={(item) => item._id}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={1}
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
