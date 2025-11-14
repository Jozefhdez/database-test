import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import StudentController from '../controllers/StudentController';

export default function AddStudentView({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [semestre, setSemestre] = useState('');

  const handleSubmit = async () => {
    if (!matricula || !nombre || !semestre) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }
    
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
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>GRABAR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.viewButton} 
        onPress={() => navigation.navigate('Students')}
      >
        <Text style={styles.viewButtonText}>VER REGISTROS</Text>
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
    marginBottom: 40,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
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
  viewButton: {
    backgroundColor: '#E91E63',
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
