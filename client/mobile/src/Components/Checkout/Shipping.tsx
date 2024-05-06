import React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  addShippingInfo,
  loadUser,
} from '../../../redux/actions/userActions';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { Country } from 'country-state-city';
import { useNavigation } from '@react-navigation/native';
import { ADD_SHIPPING_INFO_RESET } from '../../../redux/constants/userConstants';

let data = Country.getAllCountries();
data.map((option) => {
  return {
    ...option,
    label: option.name,
  };
});

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    receiver: '',
    phoneNo: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const [receiverError, setReceiverError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { error, loading, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      ToastAndroid.show(
        'New shipping info. has been added into your account.',
        ToastAndroid.LONG
      );

      navigation.goBack();

      dispatch({ type: ADD_SHIPPING_INFO_RESET });
    }
  }, [isUpdated]);

  const { receiver, phoneNo, address, city, country, postalCode } =
    shippingInfo;

  const submitHandler = () => {
    Keyboard.dismiss();
    setReceiverError(false);
    setPhoneNoError(false);
    setAddressError(false);
    setCityError(false);
    setCountryError(false);
    setPostalCodeError(false);

    if (shippingInfo.receiver === '' || shippingInfo.phoneNo === '') {
      ToastAndroid.show('Please fill the all fields', ToastAndroid.LONG);
      if (shippingInfo.receiver === '') {
        setReceiverError(true);
      }
      if (shippingInfo.phoneNo === '') {
        setPhoneNoError(true);
      }
      if (shippingInfo.address === '') {
        setAddressError(true);
      }
      if (shippingInfo.city === '') {
        setCityError(true);
      }
      if (shippingInfo.country === '') {
        setCountryError(true);
      }
      if (shippingInfo.postalCode === '') {
        setPostalCodeError(true);
      }
      return;
    }
    dispatch(
      addShippingInfo({
        receiver,
        phoneNo,
        country,
        city,
        address,
        postalCode,
      })
    );
  };

  const onChange = (name, value) => {
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  if (loading) {
    return (
      <View style={{ alignContent: 'center', flexDirection: 'column' }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraScrollHeight={300}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>SHIPPING INFO</Text>
        <TextInput
          placeholder="FULLNAME"
          placeholderTextColor="#999999"
          style={
            !receiverError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={receiver}
          onChangeText={(value) => onChange('receiver', value)}
        />
        <TextInput
          placeholder="PHONE NO."
          placeholderTextColor="#999999"
          style={
            !phoneNoError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={phoneNo}
          onChangeText={(value) => onChange('phoneNo', value)}
          keyboardType="number-pad"
        />
        <Dropdown
          style={
            !countryError
              ? [styles.inputField, isFocus && { borderColor: 'blue' }]
              : [styles.inputField, { borderColor: 'red' }]
          }
          data={data}
          value={country}
          onFocus={() => setIsFocus(true)}
          placeholder={!isFocus ? 'SELECT COUNTRY' : '...'}
          placeholderStyle={{
            color: '#999999',
            fontSize: 16,
            fontWeight: '600',
          }}
          searchPlaceholder="Search..."
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            onChange('country', item.name);
            setIsFocus(false);
          }}
          search
          labelField="name"
          valueField="name"
          itemTextStyle={{ color: 'black', fontSize: 16 }}
          selectedTextStyle={{
            color: 'black',
            fontSize: 16,
            fontWeight: '600',
          }}
        />
        <TextInput
          placeholder="CITY"
          placeholderTextColor="#999999"
          style={
            !cityError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={city}
          onChangeText={(value) => onChange('city', value)}
        />
        <TextInput
          placeholder="ADDRESS"
          placeholderTextColor="#999999"
          style={
            !addressError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={address}
          onChangeText={(value) => onChange('address', value)}
        />
        <TextInput
          placeholder="POSTAL CODE"
          placeholderTextColor="#999999"
          style={
            !postalCodeError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={postalCode}
          onChangeText={(value) => onChange('postalCode', value)}
          keyboardType="number-pad"
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={styles.signInButton} onPress={submitHandler}>
            <Text style={styles.signInButtonText}>ADD SHIPPING INFO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  backButton: {
    marginBottom: 20,
    width: 48,
    height: 48,
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 36,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 50,
    color: 'black',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    width: 250,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 8,
  },
  signUpText: {
    color: '#138B5F',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    width: '100%',
    marginVertical: 8,
  },
});

export default Shipping;
