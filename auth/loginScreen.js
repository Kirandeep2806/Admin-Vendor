import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Text, Button, Colors, HelperText } from 'react-native-paper'
import { VALID_MAIL_REGEX, VALID_PASSWORD_REGEX } from '../constants'
import firebase from '../config/firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [didEmailTouched, setDidEmailTouched] = React.useState(false)
  const [didPasswordTouched, setDidPasswordTouched] = React.useState(false)
  const emailHasError = () => !VALID_MAIL_REGEX.test(email.toLowerCase())
  const passwordHasError = () => !VALID_PASSWORD_REGEX.test(password)
  const loginHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Success')
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        placeholder="e.g. example@example.com"
        onChangeText={text => setEmail(text)}
        onBlur={() => setDidEmailTouched(true)}
      />
      <HelperText type="error" visible={emailHasError() && didEmailTouched}>
        Email address is invalid!
      </HelperText>
      <TextInput
        style={styles.textInput}
        label="Password"
        placeholder="e.g. ••••••••"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        onBlur={() => setDidPasswordTouched(true)}
      />
      <HelperText
        type="error"
        visible={passwordHasError() && didPasswordTouched}
      >
        Password should have Min 8 characters, at least 1 letter, 1 number & 1
        special character
      </HelperText>

      <Button
        icon="login"
        style={styles.loginButton}
        mode="contained"
        loading={false}
        onPress={loginHandler}
      >
        Login
      </Button>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate('reset-screen')}
      >
        <Text style={[styles.link, styles.forgetPass]}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate('register-screen')}
      >
        <Text style={styles.link}>Don't have account? Create One!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: '40%',
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 30,
  },
  textInput: {
    marginVertical: 10,
  },
  loginButton: {
    marginVertical: 20,
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#555',
    fontSize: 15,
  },
  forgetPass: {
    paddingBottom: 20,
    color: Colors.purple900,
  },
})

export default LoginScreen
