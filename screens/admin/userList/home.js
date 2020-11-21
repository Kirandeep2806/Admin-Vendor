import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Appbar, Card, Avatar, IconButton } from 'react-native-paper'
import { BOTTOM_TAB_COLORS, ROOT_COLLECT_NAME } from '../../../constants'
import { getAvatarText, getRandomColor } from '../../../utils'
import firebase from '../../../config/firebase'

export default ({ navigation }) => {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    return firebase
      .firestore()
      .collection(ROOT_COLLECT_NAME)
      .onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => {
          if (doc.data().accountType === 'user') {
            temp.push({
              key: doc.id,
              ...doc.data(),
            })
          }
        })
        setData(temp)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <>
        <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[2] }}>
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Users" />
        </Appbar.Header>
        <View style={styles.noResultScreen}>
          <ActivityIndicator size="large" color={BOTTOM_TAB_COLORS[2]} />
        </View>
      </>
    )
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[2] }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Users" />
        <Appbar.Action
          icon="account-search"
          onPress={() => navigation.navigate('search', data)}
        />
      </Appbar.Header>
      {data.length > 0 ? (
        <View style={{ flex: 1, backgroundColor: '#eee' }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
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
                      onPress={() =>
                        navigation.navigate('user-data', {
                          ...item,
                          backgroundColor: BOTTOM_TAB_COLORS[2],
                          color: '#222',
                          actColor: BOTTOM_TAB_COLORS[2],
                        })
                      }
                    />
                  )}
                />
              </Card>
            )}
          />
        </View>
      ) : (
        <View style={styles.screen}>
          <View style={styles.noResultScreen}>
            <Text style={styles.noResultText}>No Users</Text>
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noResultScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  noResultText: {
    color: '#888',
  },
})
