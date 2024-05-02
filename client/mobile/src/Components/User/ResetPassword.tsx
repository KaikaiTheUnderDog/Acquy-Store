import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const ResetPassword = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://i.imgur.com/n3dQYrr.png' }}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="PASSWORD"
        placeholderTextColor="#999999"
        style={styles.inputField}
        secureTextEntry
      />
      <TextInput
        placeholder="CONFIRM PASSWORD"
        placeholderTextColor="#999999"
        style={styles.inputField}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>CONFIRM</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.signUpText}>Sign in</Text>
        </Text>
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
    alignItems: 'center',
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

export default ResetPassword;
