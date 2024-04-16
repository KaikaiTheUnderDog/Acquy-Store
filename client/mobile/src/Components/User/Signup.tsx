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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  clearErrors,
  loadUser,
} from '../../../redux/actions/userActions';
import { ScrollView } from 'react-native-gesture-handler';
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
  const dispatch = useDispatch();

  const { error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('MainPage');
      dispatch(loadUser());
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
      dispatch(clearErrors());
    }
  }, [error, isAuthenticated]);

  const { userName, email, password, confirmedPassword } = user;

  const submitHandler = () => {
    Keyboard.dismiss();

    if (
      user.userName === '' ||
      user.password === '' ||
      user.email === '' ||
      user.confirmedPassword === ''
    ) {
      ToastAndroid.show('Please fill the all fields', ToastAndroid.LONG);
      return;
    }

    if (user.password !== user.confirmedPassword) {
      ToastAndroid.show('Password does not match', ToastAndroid.LONG);
      return;
    }

    dispatch(register({ userName, email, password }));
  };

  const onChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraScrollHeight={300}
      enableOnAndroid={true}
    >
      <ScrollView>
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          placeholder="USERNAME"
          style={styles.inputField}
          value={userName}
          onChangeText={(value) => onChange('userName', value)}
        />
        <TextInput
          placeholder="EMAIL"
          style={styles.inputField}
          value={email}
          onChangeText={(value) => onChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="PASSWORD"
          style={styles.inputField}
          value={password}
          onChangeText={(value) => onChange('password', value)}
          secureTextEntry
        />
        <TextInput
          placeholder="CONFIRM PASSWORD"
          style={styles.inputField}
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
