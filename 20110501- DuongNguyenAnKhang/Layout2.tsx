import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Layout2 () {
  return (
    <View style={styles.container}>
        <Header />
       
    </View>
);
}

export function Header() {
  return (
      <View style={styles.header}>
          <Text style={styles.headerText}>TRANG CHỦ CỦA APP</Text>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      width: "100%",
      height: "15%",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000', // Change the color to DodgerBlue
      borderBottomWidth: 5, // Add a border at the bottom
      borderBottomColor: '#fefefe', // Make the border white
  },
  headerText: {
      color: '#fff', // Change the text color to white
      fontSize: 24, // Increase the font size
      fontWeight: 'bold', // Make the text bold
  },

});
