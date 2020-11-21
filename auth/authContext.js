import React from 'react'
import firebase from '../config/firebase'
import { ROOT_COLLECT_NAME } from '../constants'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null)
  const [accountType, setAccountType] = React.useState(null)
  const [userData, setUserData] = React.useState(null)
  const [allUser, setAllUser] = React.useState([])
  // const [doc, setDoc] = React.useState(null)
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      if (user) {
        const unsub1 = firebase
          .firestore()
          .collection(ROOT_COLLECT_NAME)
          .onSnapshot(snap => {
            if (!snap.empty) {
              const temp = []
              snap.forEach(doc => {
                temp.push({
                  email: doc.data().email,
                  name: doc.data().name,
                  type: doc.data().accountType,
                })
              })
              setAllUser(temp)
            }
          })
        const unsub2 = firebase
          .firestore()
          .collection(ROOT_COLLECT_NAME)
          .doc(user.email)
          .onSnapshot(doc => {
            setAccountType(doc.exists ? doc.data().accountType : null)
            setUserData(doc.exists ? doc.data() : null)
          })
        // firebase
        //   .firestore()
        //   .collection(`${ROOT_COLLECT_NAME}/${user.email}/${USER_SUB_COLLECT}`)
        //   .onSnapshot(snapshot => snapshot.forEach(doc => setDoc(doc.data())))
        return () => {
          unsub1()
          unsub2()
        }
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ currentUser, type: accountType, userData, allUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
