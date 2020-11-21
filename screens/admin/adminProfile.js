import React from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

import { AuthContext } from '../../auth/authContext'
import { Profile } from '../../components'
import { BOTTOM_TAB_COLORS } from '../../constants'

export default ({ navigation }) => {
  const { userData } = React.useContext(AuthContext)
  return (
    <>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[0] }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Profile user={userData} backgroundColor={BOTTOM_TAB_COLORS[0]} />
      </View>
    </>
  )
}
