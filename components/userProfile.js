import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
// import { WebView, FileDownload } from 'react-native-webview'
import PDFReader from 'rn-pdf-reader-js'
import {
  ROOT_COLLECT_NAME,
  USER_SUB_COLLECT,
  ROOT_PATH_STOREAGE,
} from '../constants'
import Profile from './profile'
import ProfileItem from './profileItem'
import firebase from '../config/firebase'
import { getRandomColor } from '../utils'

export default ({ data, nav }) => {
  const [moreData, setMoreData] = React.useState('')
  const [reumeUrl, setRsumeUrl] = React.useState('')
  const [showResume, setShowResume] = React.useState(false)
  const [noMoreData, setNoMoreData] = React.useState(false)
  const [noResume, setNoResume] = React.useState(false)

  React.useEffect(() => {
    if (data.accountType !== 'user') {
      return
    }
    return firebase
      .firestore()
      .collection(`${ROOT_COLLECT_NAME}/${data?.email}/${USER_SUB_COLLECT}`)
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          setNoMoreData(true)
          setNoResume(true)
          return
        }
        snapshot.forEach(doc => {
          setMoreData({ key: doc.id, ...doc.data() })
          if (!doc.data().fileName) {
            setNoResume(true)
            console.log('seted')
            return
          }
          firebase
            .storage()
            .ref(`${ROOT_PATH_STOREAGE}/${doc.data().fileName}`)
            .getDownloadURL()
            .then(url => setRsumeUrl(url))
            .catch(err => setNoResume(true))
        })
      })
  }, [])
  console.log('Resume URL', reumeUrl)
  return (
    <>
      <View style={styles.screen}>
        <Profile
          user={data}
          backgroundColor={data?.backgroundColor}
          color={data?.color}
        >
          {moreData ? (
            <>
              {moreData.medium.length > 0 ? (
                <ProfileItem
                  title="Medium and Languages"
                  value={Array(moreData.medium).join(', ')}
                />
              ) : null}
              {moreData.subject.length > 0 ? (
                <ProfileItem
                  title="Subjects"
                  value={Array(moreData.subject).join(', ')}
                />
              ) : null}
              {moreData.domine ? (
                <ProfileItem title="Domine" value={moreData.domine} />
              ) : null}
              {moreData.address ? (
                <ProfileItem title="Address" value={moreData.address} />
              ) : null}
              {moreData.description ? (
                <ProfileItem title="Description" value={moreData.description} />
              ) : null}
              {reumeUrl ? (
                <View style={styles.resume}>
                  <Button
                    icon="file"
                    mode="contained"
                    color={data?.actColor ? data?.actColor : getRandomColor()}
                    // onPress={() => setShowResume(prevVal => !prevVal)}
                    onPress={() => nav(reumeUrl)}
                  >
                    View Resume
                  </Button>
                  {/* {console.log(showResume)} */}
                  {/* {showResume ? (
                    <PDFReader
                      style={{ flex: 1 }}
                      withPinchZoom={true}
                      source={{ uri: reumeUrl }}
                    />
                  ) : null} */}
                  {/* {showResume ? <WebView source={{ uri: reumeUrl }} /> : null} */}
                </View>
              ) : noResume ? null : (
                <ActivityIndicator
                  size="large"
                  color={data?.actColor ? data?.actColor : getRandomColor()}
                />
              )}
            </>
          ) : noMoreData || moreData ? null : (
            <ActivityIndicator
              size="large"
              // color={getRandomColor()}
              color={data?.actColor ? data?.actColor : getRandomColor()}
            />
          )}
        </Profile>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resume: {
    marginVertical: 15,
    marginBottom: 50,
  },
})
