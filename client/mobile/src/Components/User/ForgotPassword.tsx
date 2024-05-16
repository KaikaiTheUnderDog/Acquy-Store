import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  forgotPassword,
  resetPassword,
  verifyResetPasswordOtp,
} from '../../../redux/actions/userActions';
import { FORGOT_PASSWORD_RESET } from '../../../redux/constants/userConstants';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(false);

  const [counter, setCounter] = useState(0);

  const { error, mailSent, loading, success, resetSuccess } = useSelector(
    (state) => state.forgotPassword
  );

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
    if (mailSent) {
      ToastAndroid.show(
        'Reset Password OTP has been sent to your email. Please check inbox or spam.',
        ToastAndroid.LONG
      );

      dispatch({ type: FORGOT_PASSWORD_RESET });

      setCounter(60);
    }
  }, [mailSent]);

  useEffect(() => {
    if (success === true) {
      setEmailError(false);
      setOtpError(false);

      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [success]);

  useEffect(() => {
    if (resetSuccess === true) {
      navigation.navigate('Login');
      ToastAndroid.show('Password has been reset.', ToastAndroid.LONG);
    }
  }, [resetSuccess]);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
      setEmailError(true);

      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (email === '') {
      setEmailError(true);
      return;
    }
    if (otp === '') {
      setEmailError(true);
      return;
    }

    dispatch(verifyResetPasswordOtp(otp));
  };

  const resetPasswordHandler = () => {
    if (password == '') {
      setPasswordError(true);
      return;
    }

    if (confirmPassword == '') {
      setConfirmPasswordError(true);
      return;
    }

    if (confirmPassword !== password) {
      setPasswordError(true);
      setConfirmPasswordError(true);

      return;
    }

    dispatch(resetPassword({ email, password }));
  };

  if (loading) {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  if (success === true) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          placeholder="PASSWORD"
          placeholderTextColor="#999999"
          style={
            !passwordError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="CONFIRM PASSWORD"
          placeholderTextColor="#999999"
          style={
            !confirmPasswordError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.signInButton}
          onPress={resetPasswordHandler}
        >
          <Text style={styles.signInButtonText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="EMAIL"
        placeholderTextColor="#999999"
        value={email}
        style={
          !emailError
            ? styles.inputField
            : [styles.inputField, { borderColor: 'red' }]
        }
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          placeholder="OTP"
          placeholderTextColor="#999999"
          value={otp}
          style={
            !otpError
              ? [
                  styles.inputField,
                  { fontSize: 15, width: '30%', marginRight: 20 },
                ]
              : [
                  styles.inputField,
                  { width: '30%', marginRight: 20, borderColor: 'red' },
                ]
          }
          onChangeText={(value) => setOtp(value)}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'black', fontWeight: '500' }}>
            Don't see the mail?{'     '}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            disabled={counter > 0}
            onPress={() => dispatch(forgotPassword(email))}
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
          <Text style={styles.signInButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
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
  text: {
    textDecorationLine: 'underline',
    color: 'red',
    fontWeight: 'bold',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    fontWeight: '600',
    color: 'black',
    justifyContent: 'center',
  },
  signInButton: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    padding: 16,
    width: 250,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
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

export default ForgotPassword;
