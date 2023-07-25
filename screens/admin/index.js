import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons as Icon } from '@expo/vector-icons'
import { BOTTOM_TAB_COLORS } from '../../constants'

// Screens
import VenderProductsScreen from './home'
import VenderFormScreen from './venderForm'
import UserListScreen from './userList'
import UserPublishFormScreen from './userPublish'
import AdminProfile from './adminProfile'

export default () => {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="admin-home"
        component={VenderProductsScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: BOTTOM_TAB_COLORS[4],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="admin-vender-publish"
        component={VenderFormScreen}
        options={{
          tabBarLabel: 'Ask Products',
          tabBarColor: BOTTOM_TAB_COLORS[1],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-chatbubbles" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="admin-user-list"
        component={UserListScreen}
        options={{
          tabBarLabel: 'Users',
          tabBarColor: BOTTOM_TAB_COLORS[2],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-contacts" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="admin-user-publish"
        component={UserPublishFormScreen}
        options={{
          tabBarLabel: 'User Publish',
          tabBarColor: BOTTOM_TAB_COLORS[3],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-cloud-upload" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="admin-profile"
        component={AdminProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: BOTTOM_TAB_COLORS[0],
          tabBarIcon: ({ color }) => (
            <Icon name="ios-contact" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
