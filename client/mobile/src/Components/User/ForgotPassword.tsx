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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  forgotPassword,
} from '../../../redux/actions/userActions';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
      dispatch(clearErrors());
    }

    if (message) {
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  }, [dispatch, error, message]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    dispatch(forgotPassword(email));
  };

  if (loading) {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large"></ActivityIndicator>
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
        style={styles.inputField}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
          <Text style={styles.signInButtonText}>SEND EMAIL</Text>
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
    fontWeight: '600',
    color: 'black',
  },
  signInButton: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    padding: 16,
    width: 250,
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

export default ForgotPassword;
