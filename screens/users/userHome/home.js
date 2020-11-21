import React from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import {
  Appbar,
  Avatar,
  Card,
  Text,
  IconButton,
  Title,
  Paragraph,
} from 'react-native-paper'
import firebase from '../../../config/firebase'
import { ADMIN_USER_SUB_COLLECT, ROOT_COLLECT_NAME } from '../../../constants'
import { AuthContext } from '../../../auth/authContext'
import { getAvatarText, getRandomColor } from '../../../utils'
import * as Notifications from 'expo-notifications'

// -- config for push notification
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    }
  },
})

export default ({ navigation }) => {
  const [data, setData] = React.useState([])
  const temp = []
  const [isLoading, setIsLoading] = React.useState(true)
  const allAdmin = React.useContext(AuthContext).allUser.filter(
    item => item.type === 'admin'
  )

  React.useEffect(() => {
    allAdmin.forEach(item => {
      firebase
        .firestore()
        .collection(
          `${ROOT_COLLECT_NAME}/${item.email}/${ADMIN_USER_SUB_COLLECT}`
        )
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              if (doc.data().applicable) {
                temp.push({ key: doc.id, ...item, ...doc.data() })
              }
            })
          }
          setData(temp)
        })
    })
    setIsLoading(false)
  }, [])

  // --on notification pessed
  React.useEffect(() => {
    return Notifications.addNotificationResponseReceivedListener(response => {
      // console.log('FROM EXTERN NOTIFICATION', response)
      // console.log(
      //   'FROM EXTERN NOTIFICATION sp',
      //   response?.notification?.request?.content?.data
      // )

      // console.log('from here', response?.notification?.request?.content)

      navigation.navigate('info', {
        ...response?.notification?.request?.content?.data,
      })
    }).remove
  }, [])
  // ends

  if (isLoading) {
    return (
      <>
        <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Home" />
          <Appbar.Action
            icon="account"
            onPress={() => navigation.navigate('users-profile')}
          />
        </Appbar.Header>
        <View style={styles.noResultContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </>
    )
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('search', data)}
        />
        <Appbar.Action
          icon="account"
          onPress={() => navigation.navigate('users-profile')}
        />
      </Appbar.Header>
      <View style={styles.screen}>
        {data.length > 0 ? (
          <View style={styles.screen}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <Card>
                    <Card.Title
                      title={item.name}
                      subtitle={item.email}
                      left={props => (
                        <Avatar.Text
                          {...props}
                          label={getAvatarText(item.name)}
                          backgroundColor={getRandomColor()}
                        />
                      )}
                      right={props => (
                        <IconButton
                          {...props}
                          icon="more"
                          color="#999"
                          onPress={() => navigation.navigate('info', item)}
                        />
                      )}
                    />
                    <Card.Content>
                      <Title>{item.jobTitle}</Title>
                      <Paragraph>{item.jobDescription}</Paragraph>
                    </Card.Content>
                  </Card>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No Posts</Text>
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    color: '#888',
  },
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
})
