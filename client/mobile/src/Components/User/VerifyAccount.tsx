import { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {
  clearErrors,
  loadUser,
  sendOtp,
  verifyEmail,
} from '../../../redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';
import {
  SEND_OTP_RESET,
  VERIFY_RESET,
} from '../../../redux/constants/userConstants';

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user, loading, mailSent, success, error } = useSelector(
    (state) => state.auth
  );

  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');
  const [digit5, setDigit5] = useState('');
  const [digit6, setDigit6] = useState('');

  const [counter, setCounter] = useState(0);

  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const digit3Ref = useRef(null);
  const digit4Ref = useRef(null);
  const digit5Ref = useRef(null);
  const digit6Ref = useRef(null);

  useEffect(() => {
    let interval = null;
    if (counter > 0) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    if (error) {
      Alert.alert(error);

      setDigit1('');
      setDigit2('');
      setDigit3('');
      setDigit4('');
      setDigit5('');
      setDigit6('');

      dispatch(clearErrors());
    }
  }, [error]);

  useEffect(() => {
    if (mailSent) {
      ToastAndroid.show(
        'OTP has been sent to your email. Please check inbox or spam.',
        ToastAndroid.LONG
      );

      setCounter(60);

      dispatch({ type: SEND_OTP_RESET });
    }
  }, [mailSent]);

  useEffect(() => {
    if (success) {
      ToastAndroid.show('Your account has been verified', ToastAndroid.LONG);
      navigation.navigate('UserProfile');
      dispatch({ type: VERIFY_RESET });
    }
  }, [success]);

  const verify = (text) => {
    const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${text}`;

    dispatch(verifyEmail(otp));
  };

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <View style={styles.OTPInputContainer}>
      <Text style={styles.title}>VERIFY ACCOUNT</Text>
      <Text style={styles.otpTitle}>OTP</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          ref={digit1Ref}
          style={styles.otpDigit}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setDigit1(text);
            text && digit2Ref.current.focus();
          }}
        />
        <TextInput
          ref={digit2Ref}
          style={styles.otpDigit}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setDigit2(text);
            text && digit3Ref.current.focus();
          }}
        />
        <TextInput
          ref={digit3Ref}
          style={styles.otpDigit}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setDigit3(text);
            text && digit4Ref.current.focus();
          }}
        />
        <TextInput
          ref={digit4Ref}
          style={styles.otpDigit}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setDigit4(text);
            text && digit5Ref.current.focus();
          }}
        />
        <TextInput
          ref={digit5Ref}
          style={styles.otpDigit}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setDigit5(text);
            text && digit6Ref.current.focus();
          }}
        />
        <TextInput
          ref={digit6Ref}
          style={styles.otpDigit}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setDigit6(text);
            if (text) verify(text);
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ color: 'black', fontWeight: '500' }}>
          Don't see the mail?{' '}
        </Text>
        <TouchableOpacity
          disabled={counter > 0}
          onPress={() => dispatch(sendOtp({ email: user.email }))}
        >
          <Text
            style={
              counter > 0 ? [styles.text, { color: '#ff7f7f' }] : styles.text
            }
          >
            {counter > 0 ? `Send OTP (${counter}s)` : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  otpTitle: {
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  OTPInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  otpDigit: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderColor: '#89CFF0',
    borderWidth: 3,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  text: {
    textDecorationLine: 'underline',
    color: 'red',
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    height: 40,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default VerifyAccount;
