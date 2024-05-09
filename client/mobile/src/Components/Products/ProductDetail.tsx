import React, { lazy, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsBuy,
  clearErrors,
  getProductDetails,
  newReview,
  TextInput,
} from '../../../redux/actions/productActions';
import { Dropdown } from 'react-native-element-dropdown';

const Tab = createMaterialTopTabNavigator();

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

  const { success } = useSelector((state) => state.newReview);

  useEffect(() => {
    if (success) {
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, []);

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

const review_Stats = [
  { rating: 5, count: 5 },
  { rating: 4, count: 5 },
  { rating: 3, count: 5 },
  { rating: 2, count: 5 },
  { rating: 1, count: 5 },
];

const stars = [
  { label: '5 ⭐⭐⭐⭐⭐', value: 5 },
  { label: '4 ⭐⭐⭐⭐', value: 4 },
  { label: '3 ⭐⭐⭐', value: 3 },
  { label: '2 ⭐⭐', value: 2 },
  { label: '1 ⭐', value: 1 },
];

const Reviews = () => {
  const { product } = useRoute().params;

  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [lastModified, setLastModified] = useState(new Date());
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  const { isBuy } = useSelector((state) => state.checkIsBuy);
  const { user } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.newReview);

  useEffect(() => {
    dispatch(checkIsBuy(product._id));

    if (isBuy)
      setReview(product.reviews.filter((rev) => rev.user === user._id));

    if (review) {
      setRating(review.rating);
      setComment(review.comment);
      setLastModified(review.reviewedAt);
    }

    /* const review_Stats = [
      {
        label: `5 (${product.reviews.valueDocument({ rating: 5 })})`,
        value: 5,
      },
      {
        label: `4 (${product.reviews.countDocument({ rating: 4 })})`,
        value: 4,
      },
      {
        label: `3 (${product.reviews.countDocument({ rating: 3 })})`,
        value: 3,
      },
      {
        label: `2 (${product.reviews.countDocument({ rating: 2 })})`,
        value: 2,
      },
      {
        label: `1 (${product.reviews.countDocument({ rating: 1 })})`,
        value: 1,
      },
    ]; */
  }, []);

  useEffect(() => {
    if (success) ToastAndroid.show('Thank you for submitting your review. 😘');
  }, [success]);

  const newReviewHandler = () => {
    dispatch(
      newReview({
        rating,
        comment,
        productId: product._id,
      })
    );
  };

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {isBuy && (
        <View style={styles.newReviewContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                width: '24%',
                marginLeft: 10,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Your rating:{' '}
            </Text>
            <Dropdown
              style={styles.ratingField}
              data={stars}
              value={rating}
              onFocus={() => setIsFocus(true)}
              placeholder={!isFocus ? 'Choose rating' : '...'}
              placeholderStyle={{
                color: '#999999',
                fontSize: 12,
                fontWeight: '600',
                marginLeft: 10,
              }}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setRating(item.value);
                setIsFocus(false);
              }}
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
            />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text
              style={{
                width: '24%',
                marginLeft: 10,
                fontSize: 13,
                fontWeight: '500',
                textAlignVertical: 'center',
              }}
            >
              Last modified:
            </Text>
            <Text
              style={{
                width: '30%',
                marginLeft: 10,
                fontSize: 13,
                fontWeight: '500',
                textAlignVertical: 'center',
              }}
            >
              {new Date(lastModified).toLocaleDateString('vi-VN')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                width: '24%',
                marginLeft: 10,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Comment:
            </Text>
            <TextInput
              style={styles.commentField}
              textAlignVertical="top"
              value={comment}
              onChangeText={(value) => setComment(value)}
              placeholder="Enter your comment here"
              placeholderTextColor="#999999"
            />
          </View>
          <TouchableOpacity style={styles.reviewBtn} onPress={newReviewHandler}>
            <Text style={styles.reviewText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      <Dropdown
        style={styles.inputField}
        data={stars}
        //value={paymentMethod}
        onFocus={() => setIsFilterFocused(true)}
        placeholder={!isFilterFocused ? 'Filter reviews by rating' : '...'}
        placeholderStyle={{
          color: '#999999',
          fontSize: 16,
          fontWeight: '600',
        }}
        onBlur={() => setIsFilterFocused(false)}
        onChange={(item) => {
          /* setPaymentMethod(item.value);
          setPaymentMethodError(false); */
          setIsFilterFocused(false);
        }}
        labelField="label"
        valueField="value"
        itemTextStyle={{ color: 'black', fontSize: 16 }}
        selectedTextStyle={{
          color: 'black',
          fontSize: 16,
          fontWeight: '600',
        }}
      />
      <View style={styles.container}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.review}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: review.userAvatar }} // Replace with your profile image URI
                style={styles.profileImage}
              />
              <Text style={styles.user}>{review.name}</Text>
              <Rating
                style={{ position: 'absolute', marginLeft: '70%' }}
                imageSize={20}
                readonly
                startingValue={review.rating}
              />
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
            <Text style={styles.date}>
              {review.reviewedAt || lastModified.toLocaleDateString('vi-vn')}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const ProductDetailsScreen = ({ id }) => {
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      //ToastAndroid.show(error.message, ToastAndroid.LONG);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]); // Include `id` as a dependency

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <Tab.Navigator
      style={{ marginBottom: 15, backgroundColor: '#f7f7f7' }}
      screenOptions={{ lazy: true }}
    >
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
      <Tab.Screen
        name="Reviews"
        component={Reviews}
        initialParams={{ product }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  newReviewContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 8,
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
  reviewBtn: {
    width: '20%',
    height: 35,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 14,
    elevation: 5,
  },
  reviewText: { fontSize: 12, fontWeight: '500', color: '#FFF' },
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
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    fontSize: 10,
    marginBottom: 10,
    height: 40,
    color: 'black',
    fontWeight: '600',
  },
  ratingField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 10,
    marginBottom: 10,
    height: 20,
    width: '40%',
    color: 'black',
    fontWeight: '600',
  },
  commentField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 10,
    marginBottom: 10,
    height: 80,
    width: '70%',
    color: 'black',
    fontWeight: '600',
    alignContent: 'flex-start',
    padding: 10,
  },
});

export default ProductDetailsScreen;
