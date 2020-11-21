import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Appbar } from 'react-native-paper'
import { AuthContext } from '../../auth/authContext'
import { ROOT_PATH_STOREAGE } from '../../constants'
import firebase from '../../config/firebase'
import { WebView } from 'react-native-webview'
// import { documentDirectory, downloadAsync } from 'expo-file-system'
import { Profile, ProfileItem } from '../../components'

export default ({ navigation }) => {
  const { doc, userData } = React.useContext(AuthContext)
  // const [downBegin, setDownBegin] = React.useState(false)
  // const [downDone, setDownDone] = React.useState(false)
  // const [downErr, setDownErr] = React.useState(false)
  const [reumeUrl, setRsumeUrl] = React.useState('')
  const [showResume, setShowResume] = React.useState(false)

  React.useEffect(() => {
    const file = doc.fileName
    firebase
      .storage()
      .ref(`${ROOT_PATH_STOREAGE}/${file}`)
      .getDownloadURL()
      .then(url => {
        setRsumeUrl(url)
        console.log(url)
      })
      .catch(err => {
        console.log('FDOWN ERR', err)
      })
  }, [])

  // const downloadHandler = async () => {
  //   const dist = documentDirectory
  //   console.log(dist)
  //   setDownBegin(true)
  //   setDownDone(false)
  //   setDownErr(false)
  //   if (!reumeUrl) {
  //     setDownBegin(false)
  //     setDownErr(true)
  //   }
  //   downloadAsync(reumeUrl, dist)
  //     .then(res => {
  //       console.log(res)
  //       setDownBegin(false)
  //       setDownDone(true)
  //     })
  //     .catch(err => {
  //       alert(err.message)
  //       setDownBegin(false)
  //       setDownErr(true)
  //     })
  // }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={styles.screen}>
        <Profile user={userData}>
          <ProfileItem
            title="Medium and Languages"
            value={Array(doc.medium).join(', ')}
          />
          <ProfileItem title="Subjects" value={Array(doc.subject).join(', ')} />
          <ProfileItem title="Domine" value={doc.domine} />
          <ProfileItem title="Address" value={doc.address} />
          <ProfileItem title="Description" value={doc.description} />
          <View style={styles.resume}>
            {/* <Button
              color={
                downDone
                  ? BOTTOM_TAB_COLORS[4]
                  : downErr
                  ? BOTTOM_TAB_COLORS[3]
                  : '#007AFF'
              }
              loading={downBegin}
              icon={downDone ? 'check' : downErr ? 'close' : 'file'}
              mode={downDone || downErr ? 'contained' : 'outlined'}
              onPress={downloadHandler}
            >
              {downBegin
                ? 'Downloading...'
                : downDone
                ? 'Downloaded'
                : downErr
                ? 'Download fail, try later'
                : 'Download Resume'}
            </Button> */}
            <Button
              icon="file"
              mode="contained"
              color="#007AFF"
              onPress={() => setShowResume(val => true)}
            >
              Download Resume
            </Button>
            {showResume && <WebView source={{ uri: reumeUrl }} />}
          </View>
        </Profile>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    marginVertical: 10,
  },
  resume: {
    marginVertical: 15,
    marginBottom: 50,
  },
})
