import React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  clearErrors,
  loadUser,
} from '../../../redux/actions/userActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  navigation: any;
};

const Signup = ({ navigation }: Props) => {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });
  const [passwordError, setPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('MainPage');
      dispatch(loadUser());
    }

    if (error) {
      let message = '';

      if (error.includes('Please enter a valid email')) {
        setEmailError(true);
        message = 'Please enter a valid email';
      }
      if (error.includes('Your password must be at least 6 characters long')) {
        setPasswordError(true);
        message +=
          message !== ''
            ? '\nYour password must be at least 6 characters long'
            : 'Your password must be at least 6 characters long';
      }

      ToastAndroid.show(message, ToastAndroid.LONG);

      dispatch(clearErrors());
    }
  }, [error, isAuthenticated, loading]);

  const { userName, email, password, confirmedPassword } = user;

  const submitHandler = () => {
    Keyboard.dismiss();
    setPasswordError(false);
    setEmailError(false);
    setUserNameError(false);

    if (user.userName === '' || user.email === '') {
      ToastAndroid.show('Please fill the all fields', ToastAndroid.LONG);
      if (user.userName === '') {
        setUserNameError(true);
      }
      if (user.email === '') {
        setEmailError(true);
        return;
      }

      if (user.password !== user.confirmedPassword) {
        ToastAndroid.show('Password does not match', ToastAndroid.LONG);
        onChange('password', '');
        onChange('confirmedPassword', '');
        return;
      }
    }

    const avatar =
      'https://res.cloudinary.com/dx77ngsh6/image/upload/v1700659080/images/default_avatar.jpg';

    https: dispatch(register({ userName, email, password, avatar }));
  };

  const onChange = (name, value) => {
    setUser({ ...user, [name]: value });
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
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          placeholder="USERNAME"
          placeholderTextColor="#999999"
          style={
            !userNameError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={userName}
          onChangeText={(value) => onChange('userName', value)}
        />
        <TextInput
          placeholder="EMAIL"
          placeholderTextColor="#999999"
          style={
            !emailError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={email}
          onChangeText={(value) => onChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="PASSWORD"
          placeholderTextColor="#999999"
          style={
            !passwordError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={password}
          onChangeText={(value) => onChange('password', value)}
          secureTextEntry
        />
        <TextInput
          placeholder="CONFIRM PASSWORD"
          placeholderTextColor="#999999"
          style={
            !passwordError
              ? styles.inputField
              : [styles.inputField, { borderColor: 'red' }]
          }
          value={confirmedPassword}
          onChangeText={(value) => onChange('confirmedPassword', value)}
          secureTextEntry
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={styles.signInButton} onPress={submitHandler}>
            <Text style={styles.signInButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              Sign in
            </Text>
          </Text>
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
    fontWeight: '600',
    color: 'black',
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

export default Signup;
