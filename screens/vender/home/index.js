import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './home'

export default () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
