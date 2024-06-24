import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ContactScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Go to Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
});

export default ContactScreen;
