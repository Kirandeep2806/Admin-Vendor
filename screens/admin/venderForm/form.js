import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {
  Appbar,
  TextInput,
  Headline,
  Button,
  Checkbox,
  Text,
} from 'react-native-paper'
import {
  BOTTOM_TAB_COLORS,
  ROOT_COLLECT_NAME,
  ADMIN_VENDOR_SUB_COLLECT,
} from '../../../constants'
import { AuthContext } from '../../../auth/authContext'
import { sendNotifcation } from '../../../utils'
import firebase from '../../../config/firebase'

export default ({ navigation, route }) => {
  const data = route?.params
  const { userData } = React.useContext(AuthContext)
  const [institute, setInstitute] = React.useState(data ? data.institutionName : '')
  const [productName, setProductName] = React.useState(data ? data.productName : '')
  const [place, setPlace] = React.useState(data ? data.place : '')
  const [applicable, setApplicable] = React.useState(
    data ? data.status : false
  )
  // up state
  const [publishBegin, setPublishBegin] = React.useState(false)
  const [publishDone, setPublishDone] = React.useState(false)
  const [publishErr, setPublishErr] = React.useState(false)
  const getAllField = () => ({
    email: userData.email,
    institutionName: institute,
    place,
    productName,
    status: applicable,
    vendorEmail: [],
  })

  const updateFields = () => ({
    email: userData.email,
    institutionName: institute,
    place,
    productName,
    status: applicable,
  })

  const publishHandler = () => {
    setPublishBegin(true)
    if (data) {
      notifyAllUsers('old')
    } else {
      notifyAllUsers('new')
    }
    if (data) {
      firebase
        .firestore()
        .collection(
          `${ROOT_COLLECT_NAME}/${userData.email}/${ADMIN_VENDOR_SUB_COLLECT}`
        )
        .doc(data.key)
        .update(updateFields())
        .then(() => {
          setPublishBegin(false)
          setPublishDone(true)
        })
        .catch(err => {
          console.log(err)
          setPublishBegin(false)
          setPublishErr(true)
        })
      return
    }
    firebase
      .firestore()
      .collection(
        `${ROOT_COLLECT_NAME}/${userData.email}/${ADMIN_VENDOR_SUB_COLLECT}`
      )
      .doc(`${productName}_${userData.email}`).set(getAllField())
      .then(() => {
        setPublishBegin(false)
        setPublishDone(true)
      })
      .catch(err => {
        console.log(err)
        setPublishBegin(false)
        setPublishErr(true)
      })
  }

  const notifyAllUsers = productPostStatus => {
    if (applicable === true) {
      firebase
        .firestore()
        .collection(ROOT_COLLECT_NAME)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().accountType === 'user') {
              sendNotifcation(
                doc.data().pushToken,
                productPostStatus === 'new'
                  ? `New ${productName} in ${institute} for ${institute}`
                  : `Updated  ${productName} in ${institute} for ${institute}`,
                `At ${place}`,
                {
                  name: userData.name,
                  email: userData.email,
                  ...getAllField(),
                }
              )
            }
          })
        })
    }
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[1] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Publish Form" />
      </Appbar.Header>
      <View style={styles.screen}>
        <Headline style={styles.headline}>Publish Form</Headline>
        <View style={styles.form}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              label="Product Name"
              placeholder="e.g. Bench, PC..."
              value={productName}
              onChangeText={text => setProductName(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Institute Name"
              placeholder="e.g. Example engg. college."
              value={institute}
              onChangeText={text => setInstitute(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Place"
              placeholder="e.g. Colony name, city, state, country"
              value={place}
              onChangeText={text => setPlace(text)}
            />
            <TouchableOpacity
              style={styles.checkContainer}
              onPress={() => setApplicable(preVal => !preVal)}
            >
              <Checkbox status={applicable ? 'checked' : 'unchecked'} />
              <Text>Public</Text>
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
              <Button
                onPress={publishHandler}
                icon={
                  publishDone
                    ? 'cloud-check'
                    : publishErr
                      ? 'cloud-alert'
                      : 'cloud-upload'
                }
                loading={publishBegin}
                mode={publishDone || publishErr ? 'contained' : 'outlined'}
                color={
                  publishDone ? BOTTOM_TAB_COLORS[4] : BOTTOM_TAB_COLORS[3]
                }
              >
                {publishBegin
                  ? 'Publishing...'
                  : publishDone
                    ? 'Published'
                    : publishErr
                      ? 'Published Fail, try later'
                      : 'Publish'}
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headline: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    marginHorizontal: 20,
  },
  textInput: {
    marginVertical: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    marginBottom: 70,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
