import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  login,
  clearErrors,
  loadUser,
} from '../../../redux/actions/userActions';

type Props = {
  navigation: any;
};

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      ToastAndroid.show('Email and password not matching!', ToastAndroid.LONG);
      clearErrors(error)(dispatch);
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
      navigation.navigate('MainPage');
      ToastAndroid.show('Login successful!', ToastAndroid.LONG);
    }
  }, [isAuthenticated, error]);

  const signInHandler = (e) => {
    e.preventDefault();
    login(email, password)(dispatch);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>
      <TextInput
        placeholder="EMAIL"
        value={email}
        style={styles.inputField}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="PASSWORD"
        value={password}
        style={styles.inputField}
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
        <Text style={styles.footerText}>Forgot your password?</Text>
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
