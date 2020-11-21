import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { AuthContext } from "../../../auth/authContext";
import { Card, Paragraph, Button } from 'react-native-paper'
import firebase from "../../../config/firebase"
import { BOTTOM_TAB_COLORS, ADMIN_VENDOR_SUB_COLLECT, VENDOR_SUB_COLLECT, ROOT_COLLECT_NAME } from '../../../constants'

export default ({ navigation }) => {

  const [temp, setTemp] = React.useState([])
  const { currentUser } = React.useContext(AuthContext)

  React.useEffect(() => {
    const getDatas = firebase.firestore().collection(ROOT_COLLECT_NAME).doc(currentUser.email).collection(ADMIN_VENDOR_SUB_COLLECT).onSnapshot((nestedSnapShot) => {
      let abc = []
      nestedSnapShot.forEach((nestedDoc) => {
        if (nestedDoc.data().vendorEmail && nestedDoc.data().vendorEmail.length > 0) {
          nestedDoc.data().vendorEmail.forEach((mail) => {
            firebase.firestore().collection(ROOT_COLLECT_NAME)
              .doc(mail)
              .collection(VENDOR_SUB_COLLECT)
              .doc(`${nestedDoc.data().productName}_${currentUser.email}`)
              .get()
              .then((doc) => {
                abc.push({
                  key: `${nestedDoc.data().productName}_${currentUser.email}`,
                  ...doc.data()
                })
                setTemp(abc)
              }).catch((e) => {
                console.log("Error occured : ", e)
              })
          })
        }
      })
    })
    return getDatas
  }, [])


  return (
    <>
      {
        temp.length > 0 ?
          <View style={styles.container}>
            <FlatList data={temp} renderItem={({ item }) => {
              return <Card style={styles.cardStyle}>
                <Card.Title title={item.title} subtitle={item.price} />
                <Card.Cover source={{ uri: item.url }} style={styles.cardImage} />
                <Card.Content>
                  <Paragraph>{item.description.slice(0, 50)}...</Paragraph>
                  <Button
                    mode="outlined"
                    color={BOTTOM_TAB_COLORS[4]}
                    style={styles.onReadMoreClick}
                    onPress={() => navigation.navigate("productdetails", {"data": item})}
                  >Read more...</Button>
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
  },
  onReadMoreClick: {
    marginTop: 10,
  }
})