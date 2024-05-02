import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  updatePassword,
} from '../../../redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';
import { UPDATE_PASSWORD_RESET } from '../../../redux/constants/userConstants';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmCurrentPasswordError, setConfirmCurrentPasswordError] =
    useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      setCurrentPasswordError(true);

      ToastAndroid.show(error, ToastAndroid.LONG);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      ToastAndroid.show(
        'Password has been changed successfully',
        ToastAndroid.LONG
      );

      navigation.navigate('UserProfile');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [error, isUpdated]);

  const submitHandler = () => {
    setConfirmCurrentPasswordError(false);

    if (password !== confirmPassword) {
      ToastAndroid.show(
        'Password and confirm password does not match',
        ToastAndroid.LONG
      );
      setConfirmCurrentPasswordError(true);

      return;
    }

    dispatch(updatePassword({ currentPassword, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        placeholder="CURRENT PASSWORD"
        placeholderTextColor="#999999"
        style={
          !currentPasswordError
            ? styles.inputField
            : [styles.inputField, { borderColor: 'red' }]
        }
        secureTextEntry
        value={currentPassword}
        onChangeText={(value) => setCurrentPassword(value)}
      />
      <TextInput
        placeholder="PASSWORD"
        placeholderTextColor="#999999"
        style={
          !confirmCurrentPasswordError
            ? styles.inputField
            : [styles.inputField, { borderColor: 'red' }]
        }
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        placeholder="CONFIRM PASSWORD"
        placeholderTextColor="#999999"
        style={
          !confirmCurrentPasswordError
            ? styles.inputField
            : [styles.inputField, { borderColor: 'red' }]
        }
        secureTextEntry
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={styles.signInButton} onPress={submitHandler}>
          <Text style={styles.signInButtonText}>CONFIRM</Text>
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

export default ChangePassword;
