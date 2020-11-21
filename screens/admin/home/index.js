import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TopNavScreen from "./topnav"
import ProductDetailsScreen from "./productdetails"

export default () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="home" component={TopNavScreen} />
      <Stack.Screen name="productdetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  )
}
