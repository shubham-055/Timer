import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = () => {
    if (taskText.trim()) {
      const newTasks = [...tasks, { id: Date.now().toString(), text: taskText, completed: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTaskText('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };



  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  
  const RenderItem = ({ item }) => {
    const swipeableRef = useRef(null);
    const rightSwipe = () => {
      return (
        <View style={styles.deleteSwipe}>
          <Icon name="trash" size={25} color="#fff" />
        </View>
      );
    };

    const leftSwipe = () => {
      return (
        <View style={styles.doneSwipe}>
          {item.completed ? (
            <FontAwesomeIcons name="square" size={30} color="#3cbdc9" />
          ) : (
            <FontAwesomeIcons name="check-square" size={30} color="#3cbdc9" />
          )}
        </View>
      );
    };

    const confirmDeleteTask = (taskId) => {
        Alert.alert(
          'Delete Task',
          'Are you sure you want to delete this task?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress:()=>swipeableRef.current?.close()
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => deleteTask(taskId),
            },
          ],
          { cancelable: true }
        );
      };
    

    return (
      <GestureHandlerRootView>
        <Swipeable
        ref={swipeableRef}
          renderRightActions={rightSwipe}
          renderLeftActions={leftSwipe}
          onSwipeableRightOpen={() => confirmDeleteTask(item.id)}
          onSwipeableLeftOpen={() => toggleTaskCompletion(item.id)}
          overshootFriction={2}
        >
          <View style={styles.taskContainer}>
            <Pressable style={styles.task} onPress={() => toggleTaskCompletion(item.id)}>
              {item.completed ? (
                <FontAwesomeIcons name="check-square" size={24} color="#3cbdc9" />
              ) : (
                <FontAwesomeIcons name="square" size={24} color="#3cbdc9" />
              )}
              <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>{item.text}</Text>
            </Pressable>
            <View style={styles.taskButtons}>
              <TouchableOpacity onPress={() => confirmDeleteTask(item.id)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Today's tasks</Text>
      <FlatList
        data={tasks}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={styles.inputWrapper}
      >
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10,width:'90%'}}>

       
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Add a task"
          />
        </View>
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Icon name="add" size={30} color="grey" />
          </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
    marginVertical: 16,
  },
  taskList: {
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  task: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    flex:1,
    fontSize: 16,
    marginLeft: 6,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:4
  },
  inputWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: height * 0.02,
    alignItems: 'center',
    paddingVertical: 8,
  },
  inputContainer: {
    height: 50,
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 16,
    // paddingVertical: 5,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    width:'100%'
  },
  addButton: {
    width: 60,
    height: 60,
    // marginRight: -10,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  deleteSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EF4B4B',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  doneSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 12,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
});

export default ToDoList;
