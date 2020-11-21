import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// components
import HomeScreen from './home'
import SearchScreen from './search'
import InfoForJob from './info'

export default () => {
  const Home = createStackNavigator()
  return (
    <Home.Navigator screenOptions={{ header: () => null }}>
      <Home.Screen name="home" component={HomeScreen} />
      <Home.Screen name="search" component={SearchScreen} />
      <Home.Screen name="info" component={InfoForJob} />
    </Home.Navigator>
  )
}
