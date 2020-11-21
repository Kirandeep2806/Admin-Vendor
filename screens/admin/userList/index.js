import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import HomeScreen from './home'
import SearchScreen from './search'
import UserScreen from './userDetail'
import PDFView from './pdfView'

export default () => {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
        <Stack.Screen name="user-data" component={UserScreen} />
        <Stack.Screen name="pdf-view" component={PDFView} />
      </Stack.Navigator>
    </>
  )
}
