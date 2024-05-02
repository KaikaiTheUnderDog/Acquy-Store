import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getProductDetails,
} from '../../../redux/actions/productActions';

const Tab = createMaterialTopTabNavigator();

// Dummy components for each tab
const Overview = () => {
  const { product } = useRoute().params;
  const [mainImage, setMainImage] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0].url);
      const secondary = product.images.slice(1).map((image) => image.url);
      setSecondaryImages(secondary);
    }
  }, [product]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        {product && product.images && product.images.length > 0 ? (
          <Image
            source={{
              uri: mainImage,
            }}
            style={styles.mainImage}
          />
        ) : (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
      </TouchableOpacity>
      <View style={styles.thumbnailContainer}>
        {secondaryImages.length > 0 ? (
          secondaryImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.thumbnailTouchable}
              onPress={() => {
                const altSecondaryImages = secondaryImages;

                const index = altSecondaryImages.indexOf(image);
                altSecondaryImages[index] = mainImage;
                setMainImage(image);
                setSecondaryImages(altSecondaryImages);
              }}
            >
              <Image source={{ uri: image }} style={styles.thumbnail} />
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
      </View>
      <Text style={styles.Name}>{product.name}</Text>
      <Text style={styles.reviewTxt}>({product.numOfReviews} reviews)</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const Specification = () => {
  const { product } = useRoute().params;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (product)
      setData([
        { title: 'Product', info: product.name },
        { title: 'Price', info: `$ ${product.price}` },
        { title: 'Category', info: product.category },
        { title: 'Sold', info: product.sold },
        {
          title: 'Released Date',
          info: new Date(product.createdAt).toLocaleDateString('vi-VN'),
        },
      ]);
  }, [product]);

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.info}>{item.info}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const reviews = [
  {
    user: 'User 1',
    rating: 5,
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.    ',
    date: '1/1/1979',
  },
  { user: 'User 2', rating: 4, comment: 'Very good.', date: '1/1/1979' },
  { user: 'User 3', rating: 3, comment: 'Average.', date: '1/1/1979' },
  { user: 'User 4', rating: 2, comment: 'Not satisfied.', date: '1/1/1979' },
];

const review_Stats = [
  { rating: 5, count: 5 },
  { rating: 4, count: 5 },
  { rating: 3, count: 5 },
  { rating: 2, count: 5 },
  { rating: 1, count: 5 },
];

const Reviews = () => (
  <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={styles.reviewStats}>
        {review_Stats.map((review, index) => (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
          >
            <Text style={styles.comment}>{review.count} reviews</Text>
            <Rating imageSize={20} readonly startingValue={review.rating} />
          </View>
        ))}
      </View>
      {reviews.map((review, index) => (
        <View key={index} style={styles.review}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://i.imgur.com/fRav6Vz.jpeg' }} // Replace with your profile image URI
              style={styles.profileImage}
            />
            <Text style={styles.user}>{review.user}</Text>
            <Rating
              style={{ position: 'absolute', marginLeft: '70%' }}
              imageSize={20}
              readonly
              startingValue={review.rating}
            />
          </View>
          <Text style={styles.comment}>{review.comment}</Text>
          <Text style={styles.date}>{review.date}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

const ProductDetailsScreen = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      //ToastAndroid.show(error.message, ToastAndroid.LONG);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]); // Include `id` as a dependency

  /* const addToCart = () => {
    addItemToCart(id, quantity)(dispatch);
    alert.success('Item Added to Cart');
  }; */

  /* const increaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }; */

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <Tab.Navigator style={{ marginBottom: 15, backgroundColor: '#f7f7f7' }}>
      <Tab.Screen
        name="Overview"
        component={Overview}
        initialParams={{ product }}
      />
      <Tab.Screen
        name="Specification"
        component={Specification}
        initialParams={{ product }}
      />
      <Tab.Screen name="Reviews" component={Reviews} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 20,
    padding: 5,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  info: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'right',
  },
  mainImage: {
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    width: '90%',
    height: 230,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  thumbnailTouchable: {
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'black', // or 'transparent' to hide border
    borderRadius: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  description: {
    padding: 10,
    fontSize: 16,
    textAlign: 'justify',
  },
  // Style for the tab content container
  tabContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  Buy_BTN: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  Buy_Txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  review: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 15,
  },
  rating: {
    color: '#333',
  },
  comment: {
    color: '#333',
    fontSize: 20,
  },
  date: {
    color: '#333',
    fontSize: 12,
    marginLeft: '85%',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#c4c4c4', // A placeholder background color
  },
  reviewStats: {
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  Name: {
    fontWeight: 'bold',
    fontSize: 28,
    paddingLeft: 10,
    paddingTop: 10,
    color: 'black',
    width: '90%',
  },
  reviewTxt: {
    fontSize: 14,
    paddingLeft: 20,
    marginTop: 5,
    color: '#138B5F',
  },
});

export default ProductDetailsScreen;
