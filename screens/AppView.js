import React, { useContext } from 'react'
import { AuthContext } from '../auth/authContext'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from './drawerContent'
// Screens
import AuthScreen from './AuthScreen'
import UsersScreen from './users'
import VenderScreen from './vender'
import AdminScreen from './admin'

export default function () {
  const { currentUser, type } = useContext(AuthContext)
  const Drawer = createDrawerNavigator()
  let Screen = AuthScreen
  if (currentUser) {
    if (type === 'user') {
      Screen = UsersScreen
    } else if (type === 'vender') {
      Screen = VenderScreen
    } else if (type === 'admin') {
      console.log('admin')
      Screen = AdminScreen
    }
  }
  if (Screen === AuthScreen) {
    return <AuthScreen />
  }
  return (
    <Drawer.Navigator
      screenOptions={{ header: () => null }}
      drawerContent={props => <DrawerContent {...props} _user={type} />}
    >
      <Drawer.Screen name="Home" component={Screen} />
    </Drawer.Navigator>
  )
}
