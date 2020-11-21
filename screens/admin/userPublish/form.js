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
  ADMIN_USER_SUB_COLLECT,
} from '../../../constants'
import { AuthContext } from '../../../auth/authContext'
import { sendNotifcation } from '../../../utils'
import firebase from '../../../config/firebase'

export default ({ navigation, route }) => {
  const data = route?.params
  const { userData } = React.useContext(AuthContext)
  const [institute, setInstitute] = React.useState(data ? data.institute : '')
  const [jobTitle, setJobTitle] = React.useState(data ? data.jobTitle : '')
  const [jobDescription, setJobDescription] = React.useState(
    data ? data.jobDescription : ''
  )
  const [place, setPlace] = React.useState(data ? data.place : '')
  const [phone, setPhone] = React.useState(data ? data.phone : '')
  const [applicable, setApplicable] = React.useState(
    data ? data.applicable : false
  )
  // up state
  const [publishBegin, setPublishBegin] = React.useState(false)
  const [publishDone, setPublishDone] = React.useState(false)
  const [publishErr, setPublishErr] = React.useState(false)
  const getAllField = () => ({
    institute,
    jobTitle,
    jobDescription,
    place,
    phone,
    applicable,
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
          `${ROOT_COLLECT_NAME}/${userData.email}/${ADMIN_USER_SUB_COLLECT}`
        )
        .doc(data.key)
        .set(getAllField())
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
        `${ROOT_COLLECT_NAME}/${userData.email}/${ADMIN_USER_SUB_COLLECT}`
      )
      .add(getAllField())
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

  const notifyAllUsers = jobPostStatus => {
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
                jobPostStatus === 'new'
                  ? `New ${jobTitle} in ${institute} for ${jobDescription}`
                  : `Updated  ${jobTitle} in ${institute} for ${jobDescription}`,
                jobDescription,
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
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[3] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Publish Form" />
      </Appbar.Header>
      <View style={styles.screen}>
        <Headline style={styles.headline}>Publish Form</Headline>
        <View style={styles.form}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              label="Institute Name"
              placeholder="e.g. example engg. college. etc"
              value={institute}
              onChangeText={text => setInstitute(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Job Title"
              placeholder="e.g. Teacher example engg. college."
              value={jobTitle}
              onChangeText={text => setJobTitle(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Job Description"
              placeholder="e.g. CS Teacher for 9-5 classes"
              value={jobDescription}
              onChangeText={text => setJobDescription(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Place"
              placeholder="e.g. colony name, city, state, country"
              value={place}
              onChangeText={text => setPlace(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Contact Number"
              keyboardType="numeric"
              maxLength={10}
              placeholder="e.g. 1234567890"
              value={phone}
              onChangeText={text => setPhone(text)}
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
