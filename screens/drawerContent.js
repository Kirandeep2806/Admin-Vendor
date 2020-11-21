import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title, Caption, Drawer } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { MaterialCommunityIcons, Ionicons as Icon } from '@expo/vector-icons'
import { SignOut } from '../auth'
import { AuthContext } from '../auth/authContext'
import { UserAvatar } from '../components'
import { BOTTOM_TAB_COLORS } from '../constants'

const DrawerContent = props => {
  const { userData } = React.useContext(AuthContext)
  if (!userData) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.avatarContainer}>
          <View style={{ alignItems: 'center' }}>
            <UserAvatar
              text={userData.name}
              size={150}
              backgroundColor={
                props._user === 'user' ? BOTTOM_TAB_COLORS[0] : ''
              }
            />
            <Title>{userData.name}</Title>
            <Caption>{userData.email}</Caption>
          </View>
        </View>
        {(function () {
          if (props._user === 'user') {
            return (
              <>
                <DrawerItem
                  label="Home"
                  onPress={() => props.navigation.navigate('users-home')}
                  icon={() => <Icon name="ios-home" size={26} color="#999" />}
                />
                <DrawerItem
                  label="Form"
                  onPress={() => props.navigation.navigate('users-form')}
                  icon={() => (
                    <Icon name="md-clipboard" size={26} color="#999" />
                  )}
                />
                <DrawerItem
                  label="Profile"
                  onPress={() => props.navigation.navigate('users-profile')}
                  icon={() => (
                    <Icon name="ios-contact" size={26} color="#999" />
                  )}
                />
              </>
            )
          } else if (props._user === 'vender') {
            return (
              <>
                <DrawerItem
                  label="Home"
                  onPress={() => props.navigation.navigate('vender-home')}
                  icon={() => <Icon name="ios-home" size={26} color="#999" />}
                />
                <DrawerItem
                  label="Admin Posts"
                  onPress={() =>
                    props.navigation.navigate('vender-admin-publish')
                  }
                  icon={() => (
                    <Icon name="ios-chatbubbles" size={26} color="#999" />
                  )}
                />
                <DrawerItem
                  label="Publish"
                  onPress={() => props.navigation.navigate('vender-publish')}
                  icon={() => (
                    <Icon name="ios-cloud-upload" size={26} color="#999" />
                  )}
                />
                <DrawerItem
                  label="Profile"
                  onPress={() => props.navigation.navigate('vender-profile')}
                  icon={() => (
                    <Icon name="ios-contact" size={26} color="#999" />
                  )}
                />
              </>
            )
          } else if (props._user === 'admin') {
            return (
              <>
                <DrawerItem
                  label="Vender Products"
                  onPress={() => props.navigation.navigate('admin-home')}
                  icon={() => <Icon name="ios-home" size={26} color="#999" />}
                />
                <DrawerItem
                  label="Ask Products"
                  onPress={() =>
                    props.navigation.navigate('admin-vender-publish')
                  }
                  icon={() => (
                    <Icon name="ios-chatbubbles" size={26} color="#999" />
                  )}
                />
                <DrawerItem
                  label="Users"
                  onPress={() => props.navigation.navigate('admin-user-list')}
                  icon={() => (
                    <Icon name="ios-contacts" size={26} color="#999" />
                  )}
                />
                <DrawerItem
                  label="Users Publish"
                  onPress={() =>
                    props.navigation.navigate('admin-user-publish')
                  }
                  icon={() => (
                    <Icon name="ios-cloud-upload" size={26} color="#999" />
                  )}
                />
                <DrawerItem
                  label="Profile"
                  onPress={() => props.navigation.navigate('admin-profile')}
                  icon={() => (
                    <Icon name="ios-contact" size={26} color="#999" />
                  )}
                />
              </>
            )
          }
        })()}
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomSection}>
        <DrawerItem
          label="Sign out"
          onPress={() => SignOut()}
          icon={() => (
            <MaterialCommunityIcons name="exit-to-app" color="#999" size={26} />
          )}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
})

export default DrawerContent
