import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStudentView from './views/AddStudentView';
import StudentsListView from './views/StudentsListView';
import StudentController from './controllers/StudentController';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const userId = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    StudentController.registerUser(userId);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AddStudent" component={AddStudentView} />
        <Stack.Screen name="Students" component={StudentsListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
