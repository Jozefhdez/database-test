import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import StudentController from '../controllers/StudentController';

export default function StudentsListView({ navigation }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStudents();
    loadLastUpdate();
  }, []);

  const loadStudents = async () => {
    const cached = await StudentController.loadFromCache();
    if (cached.length > 0) {
      setStudents(cached);
      setIsLoading(false);
    }

    const unsubscribe = StudentController.subscribeToStudents((updatedStudents) => {
      setStudents(updatedStudents);
      setIsLoading(false);
      setRefreshing(false);
      loadLastUpdate();
    });

    return () => unsubscribe();
  };

  const loadLastUpdate = async () => {
    const update = await StudentController.getLastUpdate();
    if (update !== 'Nunca') {
      const date = new Date(update);
      setLastUpdate(date.toLocaleString('es-MX', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    } else {
      setLastUpdate(update);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStudents();
  };

  const renderStudent = ({ item, index }) => (
    <View style={styles.studentItem}>
      <View style={styles.studentHeader}>
        <Text style={styles.studentNumber}>#{index + 1}</Text>
        <Text style={styles.studentSemester}>{item.semestre}</Text>
      </View>
      <Text style={styles.studentText}>{item.matricula}</Text>
      <Text style={styles.studentText}>{item.nombre}</Text>
      {item.dateRegister && (
        <Text style={styles.dateText}>
          Registrado: {new Date(item.dateRegister).toLocaleDateString('es-MX')}
        </Text>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No hay estudiantes registrados</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practica_Firebase</Text>
        <Text style={styles.subtitle}>Total: {students.length} estudiantes</Text>
        {lastUpdate && (
          <Text style={styles.updateText}>Actualizado: {lastUpdate}</Text>
        )}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={(item, index) => item.id ? `${item.id}-${item.timestamp}` : `student-${index}-${item.timestamp || Date.now()}`}
          style={styles.list}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#007AFF"
              colors={["#007AFF"]}
            />
          }
        />
      )}

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
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#86868B',
    fontWeight: '500',
    marginBottom: 4,
  },
  updateText: {
    fontSize: 13,
    color: '#86868B',
    fontWeight: '400',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  studentItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#E5F1FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  studentSemester: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  studentText: {
    fontSize: 17,
    color: '#1D1D1F',
    marginBottom: 6,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 13,
    color: '#86868B',
    marginTop: 8,
    fontWeight: '400',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
  },
  loadingText: {
    color: '#1D1D1F',
    marginTop: 16,
    fontSize: 17,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: '#86868B',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
