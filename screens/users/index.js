import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Ionicons as Icon } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { BOTTOM_TAB_COLORS } from '../../constants'

// screens
import UserHomeScreen from './userHome'
import UserFormScreen from './userForm'
import UserProfileScreen from './userProfile'

export default function UsersView() {
  const Tab = createMaterialBottomTabNavigator()

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="users-home"
          component={UserHomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: BOTTOM_TAB_COLORS[0],
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="users-form"
          component={UserFormScreen}
          options={{
            tabBarLabel: 'Form',
            tabBarColor: BOTTOM_TAB_COLORS[1],
            tabBarIcon: ({ color }) => (
              <Icon name="ios-clipboard" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="users-profile"
          component={UserProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: BOTTOM_TAB_COLORS[2],
            tabBarIcon: ({ color }) => (
              <Icon name="ios-contact" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </>
  )
}
