import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  login,
  clearErrors,
  loadUser,
} from '../../../redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      ToastAndroid.show('Email or password is invalid!', ToastAndroid.LONG);
      dispatch(clearErrors());
      setPassword('');
      setLoginError(true);
    }
    if (isAuthenticated) {
      navigation.navigate('MainPage');
      ToastAndroid.show('Login successfully', ToastAndroid.LONG);
    }
  }, [isAuthenticated]);

  const signInHandler = () => {
    Keyboard.dismiss();

    dispatch(login(email, password));
  };

  if (loading) {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>SIGN IN</Text>
      <TextInput
        placeholder="EMAIL"
        placeholderTextColor="#999999"
        value={email}
        style={
          !loginError
            ? styles.inputField
            : [styles.inputField, { borderColor: 'red' }]
        }
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="PASSWORD"
        placeholderTextColor="#999999"
        value={password}
        style={
          !loginError
            ? styles.inputField
            : [styles.inputField, { borderColor: 'red' }]
        }
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={styles.signInButton} onPress={signInHandler}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up
          </Text>
        </Text>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.footerText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  Logo: {
    alignSelf: 'center',
    width: 150,
    height: 100,
  },
  Logo_separator: {
    height: 10,
    backgroundColor: '#E4000F',
    width: '100%',
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
    color: 'black',
    fontWeight: '600',
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

export default Login;
