import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../auth/loginScreen'
import RegisterScreen from '../auth/registerScreen'
import PasswordResetScreen from '../auth/passwordResetScreen'

export default function () {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="login-screen"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <AuthStack.Screen
        name="register-screen"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
      <AuthStack.Screen
        name="reset-screen"
        component={PasswordResetScreen}
        options={{ header: () => null }}
      />
    </AuthStack.Navigator>
  )
}
