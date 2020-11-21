import React from 'react'
import { Appbar } from 'react-native-paper'
import { UserProfile } from '../../../components'
import { BOTTOM_TAB_COLORS } from '../../../constants'

export default ({ navigation, route }) => {
  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[2] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="User Detail" />
      </Appbar.Header>
      <UserProfile
        nav={url => navigation.navigate('pdf-view', { url })}
        data={route?.params}
      />
    </>
  )
}
