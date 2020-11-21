import React from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Appbar, Avatar, Paragraph, Title, Button } from 'react-native-paper'
import { ProfileItem } from '../../../components'
import { getAvatarText, getRandomColor } from '../../../utils'
import { BOTTOM_TAB_COLORS, VENDOR_SUB_COLLECT, ROOT_COLLECT_NAME } from '../../../constants'
import { AuthContext } from '../../../auth/authContext'
import firebase from '../../../config/firebase'

export default ({ navigation, route }) => {
  const [pageRender, setPageRender] = React.useState(true)
  const [alreadyUploaded, setAlreadyUploaded] = React.useState(false)
  const [passOnUploadData, setPassOnUploadData] = React.useState()
  const data = route?.params
  const { userData } = React.useContext(AuthContext)
  React.useEffect(() => {
    firebase
      .firestore()
      .collection(ROOT_COLLECT_NAME)
      .doc(userData.email)
      .collection(VENDOR_SUB_COLLECT)
      .doc(data.key)
      .get()
      .then((doc) => {
        setPageRender(false)
        if (doc.exists) {
          setAlreadyUploaded(true)
          setPassOnUploadData(doc.data())
        }
      }).catch((e) => console.log("Error occured while checking the key : ", e))
  }, [])

  if (pageRender)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={BOTTOM_TAB_COLORS[4]} size="large" />
      </View>
    )

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[4] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Info" />
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
            <Title>{'Posted by ' + data?.name}</Title>
            <Paragraph>{data?.email}</Paragraph>
          </View>
          <ProfileItem title="Product Name" value={data?.productName} />
          <ProfileItem title="Institution Name" value={data?.institutionName} />
          <ProfileItem title="Place" value={data?.place} />
          {alreadyUploaded ?
            <Button
              style={styles.saveButton}
              color='#940456'
              mode='outlined'
              onPress={() => navigation.navigate("updateimage", { "data": passOnUploadData, "productData": data })}
            >Update Product Info</Button>
            :
            <Button
              style={styles.saveButton}
              color='#007AFF'
              mode='outlined'
              onPress={() => navigation.navigate("imageupload", { "data": data })}
            >Upload Product</Button>
          }
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
  saveButton: {
    marginVertical: 10,
  },
})
