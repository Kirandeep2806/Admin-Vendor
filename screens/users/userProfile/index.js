import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import UserProfile from './userProfile'
import PDFView from './pdfView'

export default () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="home" component={UserProfile} />
      <Stack.Screen name="pdf-view" component={PDFView} />
    </Stack.Navigator>
  )
}
