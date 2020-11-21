import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './home'
import InfoScreen from './info'
import SearchScreen from './search'
import ImageUploadScreen from './imageupload'
import ImageUpdateScreen from './updateimage'

export default () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="info" component={InfoScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="imageupload" component={ImageUploadScreen} />
      <Stack.Screen name="updateimage" component={ImageUpdateScreen} />
    </Stack.Navigator>
  )
}
