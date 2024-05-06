import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const [birthday, setBirthday] = useState();
  const [avatar, setAvatar] = useState();
  const [userName, setUserName] = useState();

  const { user } = useSelector((state) => state.user);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditProfile;
