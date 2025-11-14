import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import StudentController from '../controllers/StudentController';

export default function AddStudentView({ navigation }) {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [semestre, setSemestre] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [activeUsers, setActiveUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribeConnection = StudentController.subscribeToConnection((connected) => {
      setIsConnected(connected);
    });

    const unsubscribeUsers = StudentController.subscribeToActiveUsers((count) => {
      setActiveUsers(count);
    });

    return () => {
      unsubscribeConnection();
      unsubscribeUsers();
    };
  }, []);

  const handleSubmit = async () => {
    if (!matricula || !nombre || !semestre) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    if (semestre.length > 2) {
      Alert.alert('Error', 'El semestre debe ser máximo 2 caracteres');
      return;
    }

    if (!isConnected) {
      Alert.alert('Sin conexión', 'No hay conexión a internet');
      return;
    }

    setIsLoading(true);

    try {
      await StudentController.addStudent(matricula, nombre, semestre);
      Alert.alert('Éxito', 'Estudiante agregado correctamente');
      setMatricula('');
      setNombre('');
      setSemestre('');
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo agregar el estudiante');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practica_Firebase</Text>
        <View style={styles.statusBar}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
            <Text style={styles.statusText}>{isConnected ? 'Conectado' : 'Sin conexión'}</Text>
          </View>
          <Text style={styles.statusText}>{activeUsers} usuarios</Text>
        </View>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        editable={!isLoading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Semestre (max 2 caracteres)"
        value={semestre}
        onChangeText={setSemestre}
        maxLength={2}
        editable={!isLoading}
      />
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'GRABANDO...' : 'GRABAR'}</Text>
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
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 34,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    padding: 12,
    borderRadius: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#1D1D1F',
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginHorizontal: 20,
    marginTop: 16,
    fontSize: 17,
    color: '#000000',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  viewButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
