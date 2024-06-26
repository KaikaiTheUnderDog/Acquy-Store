import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
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
import { loadUser, logout } from '../../../redux/actions/userActions';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { user, loading } = useSelector((state) => state.auth);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(loadUser());
    }
  }, [isFocused]);

  useEffect(() => {
    if (user)
      setData([
        { title: 'Email', info: user.email },
        {
          title: 'Gender',
          info: !user.gender
            ? ''
            : user.gender === 'Male'
            ? '♂️  Male'
            : user.gender === 'Female'
            ? '♀️  Female'
            : '🏳️‍🌈  Other',
        },
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
          info: user.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : '',
        },
      ]);
  }, [user]);

  if (!user || loading)
    return <ActivityIndicator size={'large'}></ActivityIndicator>;

  const logoutHandler = () => {
    navigation.navigate('MainPage');
    dispatch(logout());

    ToastAndroid.show('Logged out successfully', ToastAndroid.LONG);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: user.avatar.url }} style={styles.profileImage} />
        <Text style={styles.username}>{user.userName}</Text>
      </View>

      <ScrollView
        style={styles.ScrollView_Container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoContainer}>
          {data.map((info, index) => (
            <View
              key={index}
              style={
                info.title === 'Birthday'
                  ? [styles.infoRow, { borderBottomWidth: 0 }]
                  : [styles.infoRow, { borderBottomWidth: 1 }]
              }
            >
              <Text style={styles.title}>{info.title}</Text>
              {info.title === 'Verified' ? (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                >
                  <Image
                    style={styles.icon}
                    source={
                      info.info === true
                        ? require('../../assets/check.png')
                        : require('../../assets/cross.png')
                    }
                  />
                  {info.info === false && (
                    <TouchableOpacity
                      style={styles.sendMailBtn}
                      onPress={() => navigation.navigate('VerifyAccount')}
                    >
                      <Text style={styles.sendMailBtnText}>
                        Press here to verify
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <Text style={styles.info}>{info.info}</Text>
              )}
            </View>
          ))}
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OrderScreen')}
          >
            <Text style={styles.buttonText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.buttonText}>Edit Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
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
    marginRight: 15,
  },
  sendMailBtn: {
    width: '60%',
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  sendMailBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'orange',
    textDecorationLine: 'underline',
  },
  card: {
    width: '60%',
    height: 175,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 5,
    backgroundColor: '#c4c4c4', // A placeholder background color
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  ScrollView_Container: {
    width: '100%',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 15,
  },
  info: {
    color: '#333',
    fontSize: 15,
    marginRight: 15,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'right',
  },
  button: {
    width: '90%',
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
    color: 'black',
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
