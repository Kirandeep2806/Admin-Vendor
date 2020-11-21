import React from 'react'
import { Appbar, Searchbar, Card, Avatar, IconButton } from 'react-native-paper'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {
  BOTTOM_TAB_COLORS,
  ROOT_COLLECT_NAME,
  USER_SUB_COLLECT,
} from '../../../constants'
import { getAvatarText, getRandomColor } from '../../../utils'
import firebase from '../../../config/firebase'

export default ({ navigation, route }) => {
  const [data, setData] = React.useState([])
  const [temp, setTemp] = React.useState([])
  const [queryState, setQueryState] = React.useState('')

  React.useState(() => {
    route?.params?.forEach(user => {
      firebase
        .firestore()
        .collection(`${ROOT_COLLECT_NAME}/${user.email}/${USER_SUB_COLLECT}`)
        .doc(user.email)
        .get()
        .then(res =>
          setData(prevState => [...prevState, { ...user, ...res.data() }])
        )
    })
  }, [])

  React.useEffect(() => {
    setTemp(_ => {
      const list = []
      data.forEach(item => {
        Array(item?.subject).forEach(sub => {
          if (String(sub).toLowerCase().includes(queryState.toLowerCase())) {
            list.push(item)
          }
        })
      })
      return list
    })
  }, [queryState])
  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[2] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Search Users" />
      </Appbar.Header>
      <View style={styles.screen}>
        <Searchbar
          placeholder="e.g. Maths"
          value={queryState}
          onChangeText={text => setQueryState(text)}
        />
        {temp.length > 0 ? (
          <View style={{ flex: 1, backgroundColor: '#eee' }}>
            <FlatList
              data={temp}
              renderItem={({ item }) => (
                <Card>
                  <Card.Title
                    title={item.name}
                    subtitle={item.email}
                    left={props => (
                      <Avatar.Text
                        {...props}
                        label={getAvatarText(item?.name)}
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
      </View>
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
