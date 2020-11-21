import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import HomeScreen from './home'
import FormScreen from './form'

export default () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="form" component={FormScreen} />
    </Stack.Navigator>
  )
}
