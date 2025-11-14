import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import StudentController from '../controllers/StudentController';

export default function StudentsListView({ navigation }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = StudentController.subscribeToStudents((updatedStudents) => {
      setStudents(updatedStudents);
    });

    return () => unsubscribe();
  }, []);

  const renderStudent = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentText}>
        {item.matricula}, {item.nombre}, {item.semestre}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practica_Firebase</Text>
      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('AddStudent')}
      >
        <Text style={styles.backButtonText}>VOLVER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C6BC0',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  studentItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  studentText: {
    fontSize: 16,
    color: '#333333',
  },
  backButton: {
    backgroundColor: '#E91E63',
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
