import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [inputTime, setInputTime] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);


  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && time > 0) {
      timer = setInterval(() => {
        console.log('Time');
        
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if(isRunning) Alert.alert("Times UP!")
      setIsRunning(false);
      setIsPaused(false);
      setHasStarted(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, time]);

  const startTimer = () => {
    if (parseInt(inputTime) > 0) {
      setTime(parseInt(inputTime));
      setIsRunning(true);
      setIsPaused(false);
      setHasStarted(true); 
    }
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    setHasStarted(false);
  };

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Timer</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter time in seconds"
        value={inputTime}
        onChangeText={setInputTime}
      />
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
      <TouchableOpacity
          onPress={startTimer}
          style={[styles.button, {backgroundColor: hasStarted ? 'grey' : '#35b533'}]}
          disabled={hasStarted} 
        ><Text style={styles.btntext}>Start</Text></TouchableOpacity>
        <TouchableOpacity onPress={pauseTimer} style={[styles.button, {backgroundColor: isPaused ? '#5775c9' : '#e04857'}]}><Text style={styles.btntext}>{isPaused ? 'Resume' : 'Stop'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={[styles.button, {backgroundColor: '#f5bc42'}]}><Text style={styles.btntext}>Reset</Text></TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginVertical: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    borderRadius:10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    marginVertical:20
  },
  button:{
    height:45,
    flex:0.33,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginHorizontal:5
  },
  btntext:{
    fontSize:20,
    color:'white',
    fontWeight:'600'
  }
});

export default App;
