import React from 'react'
import { Appbar } from 'react-native-paper'
import { AuthContext } from '../../../auth/authContext'
import { UserProfile } from '../../../components'

export default ({ navigation }) => (
  <>
    <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Profile" />
    </Appbar.Header>
    <UserProfile
      data={{
        ...React.useContext(AuthContext).userData,
        backgroundColor: '#007AFF',
        actColor: '#007AFF',
      }}
      nav={url => navigation.navigate('pdf-view', { url })}
    />
  </>
)
