import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    setData([
      { title: 'Email', info: user.email },
      {
        title: 'Joined At',
        info: new Date(user.createdAt).toLocaleDateString('vi-VN'),
      },
      {
        title: 'Verified',
        info: user.isVerified,
      },
      {
        title: 'Birthday',
        info: user.dob,
      },
    ]);
  }, []);

  if (!user)
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );

  const logoutHandler = () => {
    navigation.navigate('MainPage');
    dispatch(logout());

    ToastAndroid.show('Logged out successfully', ToastAndroid.LONG);
  };

  if (loading) {
    console.log('profile is loading');

    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          // TODO: Chèn ảnh thật vào
          source={{ uri: 'https://i.imgur.com/fRav6Vz.jpeg' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.userName}</Text>
      </View>
      <ScrollView
        style={styles.ScrollView_Container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoContainer}>
          {data.map((info, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.title}>{info.title}</Text>
              {info.title === 'Verified' ? (
                <Image
                  style={styles.icon}
                  source={
                    info.info === true
                      ? require('../../assets/check.png')
                      : require('../../assets/cross.png')
                  }
                />
              ) : (
                <Text style={styles.info}>{info.info}</Text>
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MY ORDER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>EDIT INFORMATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.Signout_button} onPress={logoutHandler}>
          <Text style={styles.Signout_buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Đặt background là hoàn toàn trong suốt
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    width: 175,
    height: 175,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3, // for Android shadow
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#c4c4c4', // A placeholder background color
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ScrollView_Container: {
    width: '100%',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  info: {
    color: '#333',
    fontSize: 19,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'right',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  Signout_button: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    padding: 16,
    width: 250,
    alignItems: 'center',
    marginTop: 20,
    //marginBottom: 20,
  },
  Signout_buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default UserProfileScreen;
