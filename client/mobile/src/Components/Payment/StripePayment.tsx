import { useNavigation, useRoute } from '@react-navigation/native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { apiURL } from '../../../redux/apiURL';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../redux/actions/orderActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StripePayment = () => {
  const { order, paymentData } = useRoute().params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { confirmPayment, loading } = useConfirmPayment();
  const { user } = useSelector((state) => state.auth);

  const [clientSecret, setClientSecret] = useState('');

  const init = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `${apiURL}/payment/process`,
      paymentData,
      config
    );

    setClientSecret(res.data.client_secret);
  };

  useEffect(() => {
    init();
  }, []);

  const submitHandler = async () => {
    const billingDetails = { name: user.userName, email: user.email };

    const result = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: { billingDetails },
    });

    if (result.error) {
      ToastAndroid.show(
        'Network error. Please wait a few minutes',
        ToastAndroid.LONG
      );
    } else if (result.paymentIntent.status === 'Succeeded') {
      order.paymentInfo = {
        id: result.paymentIntent.id,
        status: result.paymentIntent.status,
      };

      dispatch(createOrder(order));
      navigation.navigate('PaymentSuccess');

      dispatch({ type: 'CLEAR_CART' });
    } else ToastAndroid.show('Lỗi lồn', ToastAndroid.LONG);
  };

  if (loading) {
    return <ActivityIndicator size={'large'}></ActivityIndicator>;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Card Info
      </Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: 'XXXX XXXX XXXX XXXX',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderWidth: 2,
          borderColor: '#007500',
          borderRadius: 10,
        }}
        style={{
          width: '100%',
          height: 50,
          marginBottom: 40,
        }}
      />
      <TouchableOpacity style={styles.btn} onPress={submitHandler}>
        <Text style={styles.btnText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    marginBottom: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '90%',
  },
  btn: {
    width: '50%',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 50,
    borderRadius: 15,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    marginBottom: 10,
    height: 40,
    color: 'black',
    width: '80%',
    textAlign: 'center',
  },
});
export default StripePayment;
