import { ref, push, set, onValue, query, orderByChild } from 'firebase/database';
import { database } from '../config/firebase';

class StudentModel {
  constructor() {
    this.studentsRef = ref(database, 'students');
  }

  async create(studentData) {
    const newStudentRef = push(this.studentsRef);
    await set(newStudentRef, {
      matricula: studentData.matricula,
      nombre: studentData.nombre,
      semestre: studentData.semestre,
      timestamp: Date.now()
    });
    return newStudentRef.key;
  }

  subscribe(callback) {
    const studentsQuery = query(this.studentsRef, orderByChild('timestamp'));
    return onValue(studentsQuery, (snapshot) => {
      const students = [];
      snapshot.forEach((childSnapshot) => {
        students.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      callback(students);
    });
  }
}

export default new StudentModel();
