import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Appbar, Avatar, Paragraph, Title } from 'react-native-paper'
import { ProfileItem } from '../../../components'
import { getAvatarText, getRandomColor } from '../../../utils'

export default ({ navigation, route }) => {
  const data = route?.params

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Job Info" />
      </Appbar.Header>
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.autherInfo}>
            <Avatar.Text
              label={getAvatarText(data?.name)}
              size={150}
              style={{ marginBottom: 10 }}
              backgroundColor={getRandomColor()}
            />
            <Title>{'posted by ' + data?.name}</Title>
            <Paragraph>{data?.email}</Paragraph>
          </View>
          <ProfileItem title="Job Title" value={data?.jobTitle} />
          <ProfileItem title="Job Description" value={data?.jobDescription} />
          <ProfileItem title="Place" value={data?.place} />
          <ProfileItem title="Contact number" value={data?.phone} />
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  autherInfo: {
    paddingTop: 10,
    alignItems: 'center',
  },
})
