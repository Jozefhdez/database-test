import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import StudentController from '../controllers/StudentController';

export default function AddStudentView({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [semestre, setSemestre] = useState('');

  const handleSubmit = async () => {
    await StudentController.addStudent(matricula, nombre, semestre);
    Alert.alert('Éxito', 'Estudiante agregado correctamente');
    setMatricula('');
    setNombre('');
    setSemestre('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practica_Firebase</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>GRABAR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Students')}
      >
        <Text style={styles.fabText}>📧</Text>
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
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#BDBDBD',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 24,
  },
});
