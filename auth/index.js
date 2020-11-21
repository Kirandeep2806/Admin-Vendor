import auth from '../config/firebase'

export const Auth = auth.auth()

export const SignIn = (email, password) =>
  new Promise((resolve, reject) => {
    Auth.signInWithEmailAndPassword(email, password).then(resolve).catch(reject)
  })
export const SignUp = (email, password) =>
  new Promise((resolve, reject) => {
    Auth.createUserWithEmailAndPassword(email, password)
      .then(resolve)
      .catch(reject)
  })
export const SignOut = () =>
  new Promise((resolve, reject) => {
    Auth.signOut().then(resolve).catch(reject)
  })

export const sendForgetPasswordEmail = email =>
  new Promise((resolve, reject) => {
    Auth.sendPasswordResetEmail(email).then(resolve).catch(reject)
  })
