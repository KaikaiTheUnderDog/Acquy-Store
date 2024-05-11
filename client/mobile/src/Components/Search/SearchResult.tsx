import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';
import SmallProductCard from '../Products/SmallProductCard'; // Make sure to import SmallProductCard
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getProducts,
} from '../../../redux/actions/productActions';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Categories = [
  { label: 'All' },
  { label: 'Games' },
  { label: 'Accessories' },
  { label: 'Consoles' },
  { label: 'Merchandises' },
  { label: 'Alternatives' },
];

const stars = [
  { label: '>= 4 ⭐⭐⭐⭐', value: 4 },
  { label: '>= 3 ⭐⭐⭐', value: 3 },
  { label: '>= 2 ⭐⭐', value: 2 },
  { label: '>= 1 ⭐', value: 1 },
];

const SearchResult = () => {
  const dispatch = useDispatch();
  const { keyword } = useRoute().params;

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showList, setShowList] = useState([]);
  const [category, setCategory] = useState('');
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);
  const [price, setPrice] = useState([0, 1000]);
  const [isCateDropdownFocused, setIsCateDropdownFocused] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [isRatingsDropdownFocused, setIsRatingsDropdownFocused] =
    useState(false);

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
          product.name.toLowerCase().includes(keyword.toLowerCase())
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

    await dispatch(getProducts(keyword, nextPage, price, category, ratings));

    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  const filterProducts = () => {
    setShowList([]);
    setCurrentPage(0);
    dispatch(getProducts(keyword, 1, price, category, ratings));
    setFilterModalVisibility(false);
  };

  return (
    <View style={styles.content}>
      <Text style={[styles.Title, { marginBottom: 10, marginTop: 20 }]}>
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
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}
        onPress={() => setFilterModalVisibility(true)}
      >
        <Text style={[styles.Title, { color: 'red' }]}>Filter</Text>
        <Text style={[styles.Title, { paddingLeft: 5 }]}>🔻</Text>
        <Text
          style={{
            fontSize: 13,
            fontStyle: 'italic',
            alignSelf: 'center',
            marginLeft: 10,
          }}
        >
          (Press to filter result)
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={filterModalVisibility}
        onRequestClose={() => setFilterModalVisibility(false)}
        animationType="fade"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.filterLabel,
                { alignSelf: 'flex-start', marginBottom: 15 },
              ]}
            >
              Price
            </Text>
            <MultiSlider
              values={[0, 1000]}
              step={1}
              sliderLength={230}
              min={0}
              max={1000}
              enableLabel
              customLabel={(prop) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={[styles.sliderLabel, { flex: 2, marginLeft: 3 }]}
                  >
                    Min:{' '}
                    <Text style={{ color: 'red' }}>{prop.oneMarkerValue}</Text>
                  </Text>
                  <Text style={[styles.sliderLabel, { flex: 1 }]}>
                    Max:{' '}
                    <Text style={{ color: 'red' }}>{prop.twoMarkerValue}</Text>
                  </Text>
                </View>
              )}
              onValuesChangeFinish={(values) => {
                setPrice(values);
              }}
            />
            <Text style={[styles.filterLabel, { alignSelf: 'flex-start' }]}>
              Category
            </Text>
            <Dropdown
              data={Categories}
              value={category}
              style={styles.dropdown}
              onFocus={() => setIsCateDropdownFocused(true)}
              placeholder={!isCateDropdownFocused ? 'All' : '...'}
              onBlur={() => setIsCateDropdownFocused(false)}
              labelField="label"
              valueField="label"
              itemTextStyle={{ color: 'black', fontSize: 16 }}
              selectedTextStyle={{
                color: 'red',
                fontSize: 16,
                fontWeight: '600',
              }}
              onChange={(item) => {
                if (item.label === 'All') setCategory('');
                else setCategory(item.label);
                setIsCateDropdownFocused(false);
              }}
            />
            <Text style={[styles.filterLabel, { alignSelf: 'flex-start' }]}>
              Ratings
            </Text>
            <Dropdown
              data={stars}
              value={ratings}
              style={styles.dropdown}
              onFocus={() => setIsRatingsDropdownFocused(true)}
              placeholder={
                !isRatingsDropdownFocused
                  ? 'At least ... stars'
                  : 'At least ...'
              }
              onBlur={() => setIsRatingsDropdownFocused(false)}
              labelField="label"
              valueField="value"
              itemTextStyle={{ color: 'black', fontSize: 14 }}
              selectedTextStyle={{
                color: 'black',
                fontSize: 12,
                fontWeight: '600',
                alignContent: 'center',
                marginLeft: 25,
              }}
              onChange={(item) => {
                setRatings(item.value);
                setIsRatingsDropdownFocused(false);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                height: '12%',
                justifyContent: 'space-between',
              }}
            >
              <Pressable
                style={[styles.filterBtn, { marginRight: 15 }]}
                onPress={filterProducts}
              >
                <Text style={styles.filterBtnText}>Filter</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.filterBtn,
                  { backgroundColor: 'white', marginLeft: 15 },
                ]}
                onPress={() => setFilterModalVisibility(false)}
              >
                <Text style={[styles.filterBtnText, { color: 'red' }]}>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
  dropdown: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    fontSize: 10,
    marginBottom: 10,
    height: 40,
    color: 'black',
    fontWeight: '600',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    width: '80%',
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
  filterBtn: {
    width: '30%',
    height: '100%',
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
  filterLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  sliderLabel: {
    fontWeight: '500',
    fontSize: 13,
  },
});

export default SearchResult;
