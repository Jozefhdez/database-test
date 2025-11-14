import StudentModel from '../models/StudentModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

class StudentController {
  constructor() {
    this.cachedStudents = [];
    this.logger = this.createLogger();
  }

  createLogger() {
    return {
      info: (message, data) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
      },
      error: (message, error) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
      },
      success: (message, data) => {
        console.log(`[SUCCESS] ${new Date().toISOString()} - ${message}`, data || '');
      }
    };
  }

  async addStudent(matricula, nombre, semestre) {
    try {
      if (!matricula || !nombre || !semestre) {
        throw new Error('Todos los campos son requeridos');
      }

      if (semestre.length > 2) {
        throw new Error('El semestre debe ser máximo 2 caracteres');
      }

      this.logger.info('Creating student', { matricula, nombre, semestre });
      
      const studentId = await StudentModel.create({
        matricula,
        nombre,
        semestre
      });

      this.logger.success('Student created', { id: studentId });
      
      await this.cacheStudent({ id: studentId, matricula, nombre, semestre });
      
      return studentId;
    } catch (error) {
      this.logger.error('Error creating student', error);
      throw error;
    }
  }

  subscribeToStudents(callback) {
    this.logger.info('Subscribing to students');
    
    return StudentModel.subscribe(async (students) => {
      this.cachedStudents = students;
      await this.saveToCache(students);
      callback(students);
    });
  }

  async loadFromCache() {
    try {
      const cached = await AsyncStorage.getItem('students_cache');
      if (cached) {
        this.cachedStudents = JSON.parse(cached);
        this.logger.info('Loaded from cache', { count: this.cachedStudents.length });
        return this.cachedStudents;
      }
      return [];
    } catch (error) {
      this.logger.error('Error loading cache', error);
      return [];
    }
  }

  async saveToCache(students) {
    try {
      await AsyncStorage.setItem('students_cache', JSON.stringify(students));
      await AsyncStorage.setItem('last_update', new Date().toISOString());
    } catch (error) {
      this.logger.error('Error saving cache', error);
    }
  }

  async cacheStudent(student) {
    try {
      const cached = await this.loadFromCache();
      cached.unshift(student);
      await this.saveToCache(cached);
    } catch (error) {
      this.logger.error('Error caching student', error);
    }
  }

  async getLastUpdate() {
    try {
      const lastUpdate = await AsyncStorage.getItem('last_update');
      return lastUpdate || 'Nunca';
    } catch (error) {
      return 'Nunca';
    }
  }

  subscribeToConnection(callback) {
    return StudentModel.subscribeToConnection(callback);
  }

  async registerUser(userId) {
    try {
      await StudentModel.registerUser(userId);
      this.logger.info('User registered', { userId });
    } catch (error) {
      this.logger.error('Error registering user', error);
    }
  }

  subscribeToActiveUsers(callback) {
    return StudentModel.subscribeToActiveUsers(callback);
  }
}

export default new StudentController();
