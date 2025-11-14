import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddStudentView from './views/AddStudentView';
import StudentsListView from './views/StudentsListView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="AddStudent"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddStudent" component={AddStudentView} />
        <Stack.Screen name="Students" component={StudentsListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
