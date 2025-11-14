import StudentModel from '../models/StudentModel';

class StudentController {
  async addStudent(matricula, nombre, semestre) {
    if (!matricula || !nombre || !semestre) {
      throw new Error('Todos los campos son requeridos');
    }
    
    return await StudentModel.create({
      matricula,
      nombre,
      semestre
    });
  }

  subscribeToStudents(callback) {
    return StudentModel.subscribe(callback);
  }
}

export default new StudentController();
