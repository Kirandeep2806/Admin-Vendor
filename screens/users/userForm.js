import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Appbar,
  Button,
  Headline,
  RadioButton,
  TextInput,
  Caption,
} from 'react-native-paper'
import { getDocumentAsync } from 'expo-document-picker'
import firebase from '../../config/firebase'
import { List, CheckItem } from '../../components'
import { AuthContext } from '../../auth/authContext'
import {
  ROOT_PATH_STOREAGE,
  BOTTOM_TAB_COLORS,
  ROOT_COLLECT_NAME,
  USER_SUB_COLLECT,
} from '../../constants'

export default ({ navigation }) => {
  const { userData } = React.useContext(AuthContext)
  const [address, setAddress] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [medium, setMedium] = React.useState({
    english: false,
    hindi: false,
    others: false,
  })
  const [showMedium, setShowMedium] = React.useState(false)
  const [domine, setDomine] = React.useState('teaching')
  const [showDomine, setShowDomine] = React.useState(false)
  const [subject, setSubject] = React.useState({
    maths: false,
    physics: false,
    chemistry: false,
    others: false,
  })
  const [showSubject, setShowSubject] = React.useState(false)
  const [fileUploadBegin, setFileUploadBegin] = React.useState(false)
  const [fileUploadDone, setFileUploadDone] = React.useState(false)
  const [fileUploadError, setFileUploadError] = React.useState(false)
  const [fileName, setFileName] = React.useState('')

  const [saveBegin, setSaveBegin] = React.useState(false)
  const [saveDone, setSaveDone] = React.useState(false)
  const [saveError, setSaveError] = React.useState(false)

  const uploadResume = async () => {
    const data = await getDocumentAsync().catch(err =>
      console.log('FSELCET ERROR', err)
    )
    if (data.type === 'success') {
      setFileUploadBegin(true)
      setFileUploadDone(false)
      const blob = await (await fetch(data.uri)).blob()
      const pathRef = firebase
        .storage()
        .ref()
        .child(`${ROOT_PATH_STOREAGE}/${userData.email + data.name}`)
      const fileStatus = pathRef.put(blob)
      fileStatus.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {},
        err => {
          setFileUploadError(true)
          setFileUploadBegin(false)
          console.log('FUPLOAD ERR', err)
        },
        () => {
          setFileUploadDone(true)
          setFileUploadBegin(false)
          setFileName(userData.email + data.name)
        }
      )
    }
  }

  const getSelectedFields = dict => {
    const list = []
    Object.entries(dict).forEach(([key, value]) => {
      if (value) {
        list.push(key)
      }
    })
    return list
  }

  const getAllFields = () => ({
    address,
    description,
    fileName,
    medium: getSelectedFields(medium),
    domine,
    subject: getSelectedFields(subject),
  })

  const resetState = () => {
    setFileUploadBegin(false)
    setFileUploadDone(false)
    setFileUploadError(false)

    setAddress('')
    setDescription('')
    setDomine('teaching')
    setFileName('')
    setMedium({
      english: false,
      hindi: false,
      others: false,
    })
    setSubject({
      maths: false,
      physics: false,
      chemistry: false,
      others: false,
    })
  }

  const saveHandler = () => {
    setSaveBegin(true)
    setSaveDone(false)
    setSaveError(false)
    firebase
      .firestore()
      .collection(ROOT_COLLECT_NAME)
      .doc(userData.email)
      .collection(USER_SUB_COLLECT)
      .doc(userData.email)
      .set(getAllFields(), { merge: true })
      .then(() => {
        setSaveBegin(false)
        resetState()
        setSaveDone(true)
      })
      .catch(() => {
        setSaveBegin(false)
        setSaveError(true)
      })
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Form" />
        <Appbar.Action
          icon="account"
          onPress={() => navigation.navigate('users-profile')}
        />
      </Appbar.Header>
      <View style={styles.screen}>
        <Headline style={styles.title}>Profile Form</Headline>
        <View style={styles.formView}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              label="Address"
              value={address}
              placeholder="e.g. colony name, city, state, country"
              onChangeText={text => setAddress(text)}
            />
            <TextInput
              style={styles.textInput}
              label="Description"
              value={description}
              multiline
              placeholder="e.g. Flexible timings in 9:30 - 20:30"
              onChangeText={text => setDescription(text)}
            />
            <Button
              icon={
                fileUploadDone ? 'check' : fileUploadError ? 'close' : 'file'
              }
              mode={
                fileUploadDone || fileUploadError ? 'contained' : 'outlined'
              }
              loading={fileUploadBegin}
              color={
                fileUploadDone
                  ? BOTTOM_TAB_COLORS[4]
                  : fileUploadError
                  ? BOTTOM_TAB_COLORS[3]
                  : '#007AFF'
              }
              onPress={uploadResume}
            >
              {fileUploadBegin
                ? `Uploading...`
                : fileUploadDone
                ? 'Resume Uploaded'
                : fileUploadError
                ? 'unable to upload, try again later'
                : 'Upload Resume'}
            </Button>
            <List
              visible={showMedium}
              onPress={() => setShowMedium(prevValue => !prevValue)}
              label="Select Medium"
              color="#007AFF"
            >
              <CheckItem
                label="English"
                checked={medium.english}
                onPress={() =>
                  setMedium(prevState => ({
                    ...prevState,
                    english: !prevState.english,
                  }))
                }
              />
              <CheckItem
                label="Hindi"
                checked={medium.hindi}
                onPress={() =>
                  setMedium(prevState => ({
                    ...prevState,
                    hindi: !prevState.hindi,
                  }))
                }
              />
              <CheckItem
                label="Others"
                checked={medium.others}
                onPress={() =>
                  setMedium(prevState => ({
                    ...prevState,
                    others: !prevState.others,
                  }))
                }
              />
            </List>
            <List
              visible={showDomine}
              onPress={() => setShowDomine(prevValue => !prevValue)}
              label="Select Domine"
              color="#007AFF"
            >
              <RadioButton.Group
                value={domine}
                onValueChange={value => setDomine(value)}
              >
                <RadioButton.Item label="Teaching" value="teaching" />
                <RadioButton.Item label="Non-Teaching" value="noteaching" />
                <RadioButton.Item label="HM" value="hm" />
                <RadioButton.Item label="HOD" value="hod" />
                <RadioButton.Item label="Principal" value="principal" />
              </RadioButton.Group>
            </List>
            <List
              visible={showSubject}
              onPress={() => setShowSubject(prevValue => !prevValue)}
              label="Select Subjects"
              color="#007AFF"
            >
              <CheckItem
                label="Maths"
                checked={subject.maths}
                onPress={() =>
                  setSubject(prevState => ({
                    ...prevState,
                    maths: !prevState.maths,
                  }))
                }
              />
              <CheckItem
                label="Physics"
                checked={subject.physics}
                onPress={() =>
                  setSubject(prevState => ({
                    ...prevState,
                    physics: !prevState.physics,
                  }))
                }
              />
              <CheckItem
                label="Chemistry"
                checked={subject.chemistry}
                onPress={() =>
                  setSubject(prevState => ({
                    ...prevState,
                    chemistry: !prevState.chemistry,
                  }))
                }
              />
              <CheckItem
                label="Others"
                checked={subject.others}
                onPress={() =>
                  setSubject(prevState => ({
                    ...prevState,
                    others: !prevState.others,
                  }))
                }
              />
            </List>
            <Button
              style={styles.saveButton}
              color={
                saveDone
                  ? BOTTOM_TAB_COLORS[4]
                  : saveError
                  ? BOTTOM_TAB_COLORS[3]
                  : '#007AFF'
              }
              mode={saveDone || saveError ? 'contained' : 'outlined'}
              loading={saveBegin}
              icon={saveDone ? 'check' : saveError ? 'close' : 'content-save'}
              onPress={saveHandler}
            >
              {saveBegin
                ? 'Saving...'
                : saveDone
                ? 'Saved'
                : saveError
                ? 'Unable to save, try again later'
                : 'Save'}
            </Button>
            <Caption style={styles.warnText}>
              Warning: It is not recomended to update single field with other to
              be empty, that might cause data lost, Please fill the completed
              form carefully
            </Caption>
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
  title: {
    marginVertical: 20,
    textAlign: 'center',
  },
  formView: {
    padding: 30,
    paddingTop: 0,
    flex: 1,
  },
  textInput: {
    marginBottom: 10,
  },
  saveButton: {
    marginVertical: 10,
  },
  warnText: {
    marginVertical: 10,
    fontSize: 13,
  },
})
