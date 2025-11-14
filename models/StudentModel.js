import { ref, push, set, onValue, onDisconnect } from 'firebase/database';
import { database } from '../config/firebase';

class StudentModel {
  constructor() {
    this.studentsRef = ref(database, 'students');
    this.connectedRef = ref(database, '.info/connected');
    this.activeUsersRef = ref(database, 'activeUsers');
  }

  async create(studentData) {
    const newStudentRef = push(this.studentsRef);
    const studentId = newStudentRef.key;
    
    const student = {
      id: studentId,
      matricula: studentData.matricula,
      nombre: studentData.nombre,
      semestre: studentData.semestre.toUpperCase(),
      dateRegister: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    await set(newStudentRef, student);
    return studentId;
  }

  subscribe(callback) {
    return onValue(this.studentsRef, (snapshot) => {
      const students = [];
      snapshot.forEach((childSnapshot) => {
        students.push(childSnapshot.val());
      });
      callback(students.reverse());
    }, (error) => {
      console.error('Error fetching students:', error);
      callback([]);
    });
  }

  subscribeToConnection(callback) {
    return onValue(this.connectedRef, (snapshot) => {
      callback(snapshot.val() === true);
    });
  }

  async registerUser(userId) {
    try {
      const userRef = ref(database, `activeUsers/${userId}`);
      await set(userRef, {
        connectedAt: new Date().toISOString(),
        timestamp: Date.now()
      });
      
      const disconnectRef = onDisconnect(userRef);
      await disconnectRef.remove();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  subscribeToActiveUsers(callback) {
    return onValue(this.activeUsersRef, (snapshot) => {
      try {
        const count = snapshot.exists() ? snapshot.size : 0;
        callback(count);
      } catch (error) {
        console.error('Error counting users:', error);
        callback(0);
      }
    }, (error) => {
      console.error('Error subscribing to active users:', error);
      callback(0);
    });
  }
}

export default new StudentModel();
