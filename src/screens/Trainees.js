import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TraineesInfo = () => {
  const trainees = [
    'Shubham Jain',
    'Shivam',
    'Kaif',
    'Ahtesham',
    'Sourav',
    'Gaurav',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainees Info</Text>
      {trainees.map((trainee, index) => (
        <Text
          key={index}
          style={
            trainee === 'Shubham Jain' ? styles.highlightedText : styles.text
          }>
          {trainee}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  highlightedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 5,
  },
});

export default TraineesInfo;
