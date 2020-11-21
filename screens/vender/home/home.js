import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Appbar, Card, Paragraph } from 'react-native-paper'
import { BOTTOM_TAB_COLORS, VENDOR_SUB_COLLECT, ROOT_COLLECT_NAME } from '../../../constants'
import firebase from "../../../config/firebase"
import { AuthContext } from '../../../auth/authContext'

export default ({ navigation }) => {

  const [products, setProducts] = React.useState([])
  const { currentUser } = React.useContext(AuthContext)

  React.useEffect(() => {
    firebase
      .firestore()
      .collection(ROOT_COLLECT_NAME)
      .doc(currentUser.email)
      .collection(VENDOR_SUB_COLLECT)
      .onSnapshot((snapShot) => {
        const abc = []
        snapShot.forEach((doc) => {
          abc.push({
            key: doc.id, ...doc.data(),
          })
        })
        setProducts(abc)
      })
  }, [])

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[3] }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Home" />
      </Appbar.Header>
      {
        products.length > 0 ?
          <View style={styles.container}>
            <FlatList data={products} renderItem={({ item }) => {
              return <Card style={styles.cardStyle}>
                <Card.Title title={item.title} subtitle={item.price} />
                <Card.Cover source={{ uri: item.url }} style={styles.cardImage} />
                <Card.Content>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
              </Card>
            }}
            />
          </View>
          :
          <View style={styles.screen}>
            <Text>No products yet</Text>
          </View>
      }
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
    backgroundColor: 'rgba(186, 186, 186, 0.4)'
  },
  cardStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardImage: {
    height: 225,
    width: 300,
    alignSelf: 'center',
    marginVertical: 15
  }
})