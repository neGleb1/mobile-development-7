import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

export default function App(){
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Save" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTodo(item.id)}>
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  todoItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  todoText: {
    fontSize: 16,
  },
});
