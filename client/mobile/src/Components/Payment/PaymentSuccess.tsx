import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PaymentSuccess = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignContent: 'center',
        paddingTop: 200,
      }}
    >
      <Image
        style={{ width: 80, height: 80, alignSelf: 'center', marginBottom: 10 }}
        source={require('../../assets/check.png')}
      />
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          alignSelf: 'center',
          textAlign: 'center',
          fontWeight: '450',
          color: 'black',
        }}
      >
        Ordered successfully. {'\n'} Your order is pending.
      </Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('MainPage')}
        >
          <Text style={styles.signInButtonText}>Back to Main Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    width: 200,
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
});

export default PaymentSuccess;
