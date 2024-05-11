import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants';
import { loadUser, updateProfile } from '../../../redux/actions/userActions';

const genderData = [
  {
    label: '♂️ Male',
    value: 'Male',
  },
  {
    label: '♀️ Female',
    value: 'Female',
  },
  {
    label: '🏳️‍🌈 Other',
    value: 'Other',
  },
];

const EditProfile = () => {
  const dispatch = useDispatch();

  const [birthday, setBirthday] = useState(new Date());
  const [avatar, setAvatar] = useState('');
  const [userName, setUserName] = useState();
  const [gender, setGender] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasBirthday, setHasBirthday] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState();

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, loading } = useSelector((state) => state.user);

  const initInfo = () => {
    if (user) {
      setUserName(user.userName);

      if (user.gender) {
        setGender(user.gender);
      }
      if (user.dob) {
        setHasBirthday(true);
        setBirthday(new Date(user.dob));
      }
    }
  };

  useEffect(() => {
    setAvatar(user.avatar.url);

    initInfo();
  }, []);

  useEffect(() => {
    initInfo();

    if (isUpdated) {
      dispatch(loadUser());

      ToastAndroid.show(
        'You profile has been updated successfully.',
        ToastAndroid.LONG
      );

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [user, isUpdated]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const submitHandler = () => {
    dispatch(
      updateProfile({
        userName,
        birthday,
        gender,
        uploadedAvatar,
      })
    );
    console.log(avatar);
    console.log(uploadedAvatar);
  };

  const handleChooseAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 175,
      maxHeight: 175,
      includeBase64: true,
    });

    if (result.assets) {
      setAvatar(result.assets[0].uri);
      const imageBase64 = `data:${result.assets[0].type};base64,${result.assets[0].base64}`;

      setUploadedAvatar(imageBase64);
      console.log(avatar);
      console.log(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraScrollHeight={300}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.card}>
          <Image source={{ uri: avatar }} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={handleChooseAvatar}
          >
            <Text style={{ fontSize: 15 }}>✏️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.inputField}
          value={userName}
          onChangeText={() => setUserName(userName)}
        />
        <Text style={styles.label}>Gender</Text>
        <Dropdown
          style={styles.inputField}
          data={genderData}
          value={gender}
          onFocus={() => setIsFocus(true)}
          placeholder={!isFocus && !gender ? 'Select gender' : '...'}
          placeholderStyle={{
            color: '#999999',
            fontSize: 18,
            fontWeight: '600',
          }}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setGender(item.value);
            setIsFocus(false);
          }}
          labelField="label"
          valueField="value"
          itemTextStyle={{ color: 'black', fontSize: 16 }}
          selectedTextStyle={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.inputField}
          value={
            hasBirthday ? birthday && birthday.toLocaleDateString('vi-VN') : ''
          }
          onFocus={() => {
            setOpen(true);
          }}
          placeholder="Select birthday"
          placeholderTextColor="#999999"
        ></TextInput>
        <DatePicker
          modal
          open={open}
          date={birthday}
          mode="date"
          onConfirm={(date) => {
            setOpen(false);

            setBirthday(date);
            setHasBirthday(true);
            Keyboard.dismiss();
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={styles.signInButton} onPress={submitHandler}>
            <Text style={styles.signInButtonText}>Save</Text>
          </TouchableOpacity>
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
  card: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  editIcon: {
    position: 'absolute',
    right: 95,
    top: 70,
    padding: 6,
    borderRadius: 15,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 5,
    backgroundColor: '#c4c4c4', // A placeholder background color
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
    fontSize: 18,
    marginBottom: 20,
    height: 50,
    color: 'black',
    fontWeight: '600',
  },
  label: { marginLeft: 5, marginBottom: 5, fontWeight: 'bold' },
  signInButton: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    width: 100,
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

export default EditProfile;
