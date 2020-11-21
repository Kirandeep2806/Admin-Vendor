import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { AuthProvider } from './auth/authContext'
import { NavigationContainer } from '@react-navigation/native'
import AppView from './screens/AppView'

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
    },
  }
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <AppView />
          <StatusBar style="light" />
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
