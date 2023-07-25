import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {
  Card,
  Paragraph,
  Button,
  IconButton,
  Avatar,
  Title,
  Subheading,
} from 'react-native-paper'
import firebase from '../../../config/firebase'
import {
  BOTTOM_TAB_COLORS,
  DISPLAY_ALL_ADMINS,
  ROOT_COLLECT_NAME,
} from '../../../constants'
import { getRandomColor, getAvatarText } from '../../../utils'

export default ({ navigation }) => {
  const [temp, setTemp] = React.useState([])

  React.useEffect(() => {
    return firebase
      .firestore()
      .collection(ROOT_COLLECT_NAME)
      .doc(DISPLAY_ALL_ADMINS)
      .collection('products')
      .onSnapshot(nestedSnapShot => {
        let abc = []
        nestedSnapShot.forEach(doc => {
          abc.push({
            key: doc.id,
            ...doc.data(),
          })
        })
        setTemp(abc)
      })
  }, [])

  return (
    <>
      {temp.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={temp}
            renderItem={({ item }) => {
              return (
                <Card style={styles.cardStyle}>
                  {/* <Card.Title title={item.title} subtitle={item.price} /> */}
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
                          navigation.navigate('productdetails', { data: item })
                        }
                      />
                    )}
                  />
                  <Card.Cover
                    source={{ uri: item.url }}
                    style={styles.cardImage}
                  />
                  <Card.Content>
                    <Title>{item.title}</Title>
                    <Subheading>{item.price}</Subheading>
                    <Paragraph>{item.description.slice(0, 50)}...</Paragraph>
                  </Card.Content>
                </Card>
              )
            }}
          />
        </View>
      ) : (
        <View style={styles.screen}>
          <Text>No products yet</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(186, 186, 186, 0.4)',
  },
  cardStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardImage: {
    height: 225,
    width: 300,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 7,
  },
  onReadMoreClick: {
    marginTop: 10,
  },
})
