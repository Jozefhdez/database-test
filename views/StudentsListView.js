import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import StudentController from '../controllers/StudentController';

export default function StudentsListView() {
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
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  studentItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  studentText: {
    fontSize: 16,
    color: '#333',
  },
});
