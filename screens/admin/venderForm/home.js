import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Appbar,
  Text,
  Card,
  Paragraph,
  IconButton,
  Colors,
} from 'react-native-paper'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  BOTTOM_TAB_COLORS,
  ROOT_COLLECT_NAME,
  ADMIN_VENDOR_SUB_COLLECT,
} from '../../../constants'
import { AuthContext } from '../../../auth/authContext'
import { limit } from '../../../utils'
import firebase from '../../../config/firebase'

export default ({ navigation }) => {
  const { userData } = React.useContext(AuthContext)
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    return firebase
      .firestore()
      .collection(
        `${ROOT_COLLECT_NAME}/${userData.email}/${ADMIN_VENDOR_SUB_COLLECT}`
      )
      .onSnapshot(snapshot => {
        const temp = []
        snapshot.forEach(doc => temp.push({ key: doc.id, ...doc.data() }))
        setData(temp)
        setIsLoading(false)
      })
  }, [])

  const deleteHandler = key => {
    Alert.alert('Delete Publish', 'Do you want to delete?', [
      {
        text: 'dismiss',
        style: 'cancel',
      },
      {
        text: 'sure',
        onPress: () => {
          firebase
            .firestore()
            .collection(
              `${ROOT_COLLECT_NAME}/${userData.email}/${ADMIN_VENDOR_SUB_COLLECT}`
            )
            .doc(key)
            .delete()
        },
        style: 'destructive',
      },
    ])
  }

  if (isLoading) {
    return (
      <>
        <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[1] }}>
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
          <Appbar.Content title="Publish" />
          <Appbar.Action
            icon="account"
            onPress={() => navigation.navigate('admin-profile')}
          />
        </Appbar.Header>
        <View style={styles.noResultContainer}>
          <ActivityIndicator size="large" color={BOTTOM_TAB_COLORS[1]} />
        </View>
      </>
    )
  }

  return (
    <>
      <StatusBar style="light" />
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[1] }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Publish" />
        <Appbar.Action
          icon="account"
          onPress={() => navigation.navigate('admin-profile')}
        />
      </Appbar.Header>
      <View style={styles.screen}>
        {/* Floating add button */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('form')}
        >
          <MaterialCommunityIcons name="plus" style={styles.buttonIcon} />
        </TouchableOpacity>
        {/* Screen */}
        {data.length > 0 ? (
          <View style={styles.listWrapper}>
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return (
                  <Card
                    elevation={3}
                    style={[
                      { marginVertical: 3 },
                      item.status ? {} : { backgroundColor: '#eee' },
                    ]}
                  >
                    <Card.Title
                      title={item.productName}
                      titleStyle={
                        item.status
                          ? {}
                          : {
                              textDecorationLine: 'line-through',
                              color: '#888',
                            }
                      }
                      right={props => (
                        <View style={{ flexDirection: 'row' }}>
                          <IconButton
                            color={Colors.purple400}
                            {...props}
                            icon="pencil-circle"
                            onPress={() => navigation.navigate('form', item)}
                          />
                          <IconButton
                            color={Colors.red400}
                            {...props}
                            icon="delete-circle"
                            onPress={() => deleteHandler(item.key)}
                          />
                        </View>
                      )}
                    />
                    <Card.Content>
                      <Paragraph
                        style={
                          item.status
                            ? {}
                            : {
                                textDecorationLine: 'line-through',
                                color: '#999',
                              }
                        }
                      >
                        {limit(item.institutionName, 70)}
                      </Paragraph>
                      <Text
                        style={
                          item.status
                            ? {}
                            : {
                                color: '#999',
                              }
                        }
                      >
                        {/* ... */}
                      </Text>
                    </Card.Content>
                    <Card.Content>
                      <Paragraph
                        style={
                          item.status
                            ? {}
                            : {
                                textDecorationLine: 'line-through',
                                color: '#999',
                              }
                        }
                      >
                        {limit(item.place, 70)}
                      </Paragraph>
                      <Text
                        style={
                          item.status
                            ? {}
                            : {
                                color: '#999',
                              }
                        }
                      >
                        {/* ... */}
                      </Text>
                    </Card.Content>
                  </Card>
                )
              }}
            />
          </View>
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No Publishes</Text>
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
  buttonContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    elevation: 4,
    zIndex: 2,
    backgroundColor: BOTTOM_TAB_COLORS[1],
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 30,
  },
  noResultContainer: {
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    color: '#777',
  },
  listWrapper: {
    flex: 1,
    padding: 10,
    paddingVertical: 15,
    paddingBottom: 0,
    backgroundColor: '#ddd',
  },
})
