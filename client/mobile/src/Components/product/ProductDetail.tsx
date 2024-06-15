import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ToastAndroid,
  TextInput,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Rating } from 'react-native-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavoriteProduct,
  checkIsBuy,
  clearErrors,
  getProductDetails,
  newReview,
  removeFavoriteProduct,
} from '../../../redux/actions/productActions';
import { Dropdown } from 'react-native-element-dropdown';
import {
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_RESET,
  NEW_REVIEW_RESET,
} from '../../../redux/constants/productConstants';
import Icon from 'react-native-vector-icons/Ionicons';
import { loadUser } from '../../../redux/actions/userActions';

const Tab = createMaterialTopTabNavigator();

const Overview = () => {
  const { product } = useRoute().params;
  const [mainImage, setMainImage] = useState('');
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.productDetails);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0].url);
      const secondary = product.images.slice(1).map((image) => image.url);
      setSecondaryImages(secondary);
    }

    if (
      user &&
      user.favoriteProducts &&
      user.favoriteProducts.length > 0 &&
      user.favoriteProducts.includes(product._id)
    ) {
      setIsFavorited(true);
    } else setIsFavorited(false);
  }, [product, user]);

  useEffect(() => {
    if (success) {
      dispatch({ type: ADD_FAVORITE_RESET });
      dispatch(loadUser());
    }
  }, [success]);

  const toggleFavorite = () => {
    if (user) {
      if (user.favoriteProducts) {
        if (user.favoriteProducts.includes(product._id)) {
          dispatch(removeFavoriteProduct(product._id));
          setIsFavorited(false);
        } else {
          dispatch(addFavoriteProduct(product._id));
          setIsFavorited(true);
        }

        ToastAndroid.show(
          isFavorited ? 'Removed from favorites' : 'Added to favorites',
          ToastAndroid.SHORT
        );
      }
    } else {
      navigation.navigate('Login');
    }
  };

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.ratingsTxt}> {product.ratings} ⭐</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
          <Text style={styles.reviewTxt}>({product.numOfReviews} reviews)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={{ marginLeft: 20, alignContent: 'center' }}
        >
          <Icon name="heart" size={30} color={isFavorited ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>
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

const stars = [
  { label: '⭐⭐⭐⭐⭐', value: 5 },
  { label: '⭐⭐⭐⭐', value: 4 },
  { label: '⭐⭐⭐', value: 3 },
  { label: '⭐⭐', value: 2 },
  { label: '⭐', value: 1 },
];

const Reviews = () => {
  const { product, loading } = useSelector((state) => state.productDetails);

  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [lastModified, setLastModified] = useState(new Date());
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const { isBuy } = useSelector((state) => state.checkIsBuy);
  const { user } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.newReview);

  useEffect(() => {
    setFilterOptions([
      {
        label: `(${
          product.reviews.filter((review) => review.rating === 5).length
        }) ⭐⭐⭐⭐⭐`,
        value: 5,
      },
      {
        label: `(${
          product.reviews.filter((review) => review.rating === 4).length
        }) ⭐⭐⭐⭐`,
        value: 4,
      },
      {
        label: `(${
          product.reviews.filter((review) => review.rating === 3).length
        }) ⭐⭐⭐`,
        value: 3,
      },
      {
        label: `(${
          product.reviews.filter((review) => review.rating === 2).length
        }) ⭐⭐`,
        value: 2,
      },
      {
        label: `(${
          product.reviews.filter((review) => review.rating === 1).length
        }) ⭐`,
        value: 1,
      },
    ]);
  }, []);

  useEffect(() => {
    if (product.reviews)
      setReviews(
        product.reviews.sort((a, b) => {
          return new Date(b.reviewedAt) - new Date(a.reviewedAt);
        })
      );

    dispatch(checkIsBuy(product._id));

    if (
      isBuy &&
      product.reviews.length > 0 &&
      product.reviews.filter((rev) => rev.user === user._id).length > 0
    ) {
      setReview(product.reviews.filter((rev) => rev.user === user._id));
    }

    if (review) {
      setRating(review.rating);
      setComment(review.comment);
      setLastModified(review.reviewedAt);
    }
  }, [product.reviews]);

  useEffect(() => {
    if (success) {
      ToastAndroid.show(
        'Thank you for submitting your review. 😘',
        ToastAndroid.LONG
      );
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [success]);

  const newReviewHandler = () => {
    dispatch(
      newReview({
        rating,
        comment,
        productId: product._id,
        name: user.userName,
      })
    );
  };

  const filterReviews = (value) => {
    setReviews(product.reviews.filter((review) => review.rating === value));
  };

  if (loading) {
    return <ActivityIndicator size="large"></ActivityIndicator>;
  }

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
              //value={rating}
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
              defaultValue={review && review.comment}
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
        data={filterOptions}
        onFocus={() => setIsFilterFocused(true)}
        placeholder={!isFilterFocused ? 'Filter reviews by rating' : '...'}
        placeholderStyle={{
          color: '#999999',
          fontSize: 16,
          fontWeight: '600',
        }}
        onBlur={() => setIsFilterFocused(false)}
        onChange={(item) => {
          filterReviews(item.value);
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
        {reviews &&
          reviews.map((review, index) => (
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
                {new Date(review.reviewedAt).toLocaleDateString('vi-vn') ||
                  lastModified.toLocaleDateString('vi-vn')}
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

  const { success } = useSelector((state) => state.newReview);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [success]);

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
    marginTop: 5,
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
    height: 200,
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
    borderColor: 'black',
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
    fontSize: 17,
    paddingLeft: 15,
    color: 'red',
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
    width: 40,
    height: 40,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#c4c4c4',
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
    marginTop: 5,
    color: '#138B5F',
    paddingLeft: 5,
  },
  ratingsTxt: {
    fontSize: 14,
    paddingLeft: 20,
    marginTop: 5,
    color: 'black',
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
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});

export default ProductDetailsScreen;
