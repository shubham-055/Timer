import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

class CTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTime: '',
      time: 0,
      isRunning: false,
      isPaused: false,
      hasStarted: false,
    };
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && !this.state.isPaused && this.state.time > 0) {
      if (this.timer === null) {
        this.timer = setInterval(() => {
          console.log('Time');
          this.setState((prevState) => ({ time: prevState.time - 1 }));
        }, 1000);
      }
    } else if (this.state.time === 0 && prevState.time !== 0) {
      if (this.state.isRunning) Alert.alert("Times UP!");
      this.setState({ isRunning: false, isPaused: false, hasStarted: false });
      clearInterval(this.timer);
      this.timer = null;
    } else if (!this.state.isRunning || this.state.isPaused) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (parseInt(this.state.inputTime) > 0) {
      this.setState({
        time: parseInt(this.state.inputTime),
        isRunning: true,
        isPaused: false,
        hasStarted: true,
      });
    }
  };

  pauseTimer = () => {
    this.setState((prevState) => ({ isPaused: !prevState.isPaused }));
  };

  resetTimer = () => {
    this.setState({
      isRunning: false,
      isPaused: false,
      time: 0,
      hasStarted: false,
    });
    clearInterval(this.timer);
    this.timer = null;
  };

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  render() {
    const { inputTime, time, isRunning, isPaused, hasStarted } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Timer</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter time in seconds"
          value={inputTime}
          onChangeText={(text) => this.setState({ inputTime: text })}
        />
        <Text style={styles.timerText}>{this.formatTime(time)}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={this.startTimer}
            style={[styles.button, { backgroundColor: hasStarted ? 'grey' : '#35b533' }]}
            disabled={hasStarted}
          >
            <Text style={styles.btntext}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.pauseTimer}
            style={[styles.button, { backgroundColor: isPaused ? '#5775c9' : '#e04857' }]}
          >
            <Text style={styles.btntext}>{isPaused ? 'Resume' : 'Stop'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.resetTimer}
            style={[styles.button, { backgroundColor: '#f5bc42' }]}
          >
            <Text style={styles.btntext}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
    borderRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    marginVertical: 20,
  },
  button: {
    height: 45,
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  btntext: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});

export default CTimer;
