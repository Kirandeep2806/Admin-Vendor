import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Title, Caption } from 'react-native-paper'
import Avatar from './avatar'
import ProfileItem from './profileItem'

export default ({ user, children, backgroundColor, color }) => (
  <ScrollView style={styles.screen}>
    <View style={styles.avatar}>
      <Avatar
        size={150}
        text={user.name}
        backgroundColor={backgroundColor}
        color={color}
      />
    </View>
    <Title style={styles.centerText}>{user.name}</Title>
    <Caption style={styles.centerText}>{user.email}</Caption>
    <View style={styles.data}>
      <ProfileItem title="User Name" value={user.name} />
      <ProfileItem title="Email" value={user.email} />
      <ProfileItem title="Account Type" value={user.accountType} />
      <ProfileItem title="Gender" value={user.gender} />
      <ProfileItem title="Contact" value={user.phone} />
      <ProfileItem
        title="Date of Birth"
        value={user.dateOfBirth.toDate().toDateString()}
      />
      {children && children}
    </View>
  </ScrollView>
)

const styles = StyleSheet.create({
  screen: {
    // alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
  },
  avatar: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  data: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
})
