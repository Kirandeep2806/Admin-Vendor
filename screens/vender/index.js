import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons as Icon } from '@expo/vector-icons'
import { BOTTOM_TAB_COLORS } from '../../constants'

// Screens
import HomeScreen from './home'
import AdminPostScreen from './adminPosts'
import PublishScreen from './publish'
import VenderProfileScreen from './venderProfile'

export default () => {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="vender-home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: BOTTOM_TAB_COLORS[3],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="vender-admin-publish"
        component={AdminPostScreen}
        options={{
          tabBarLabel: 'Admin Posts',
          tabBarColor: BOTTOM_TAB_COLORS[4],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-chatbubbles" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="vender-publish"
        component={PublishScreen}
        options={{
          tabBarLabel: 'Publish',
          tabBarColor: BOTTOM_TAB_COLORS[0],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-cloud-upload" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="vender-profile"
        component={VenderProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: BOTTOM_TAB_COLORS[1],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-contact" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
