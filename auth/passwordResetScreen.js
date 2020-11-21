import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput, HelperText, Snackbar } from 'react-native-paper'
import { sendForgetPasswordEmail } from '.'
import { VALID_MAIL_REGEX } from '../constants'

export default function ({ navigation }) {
  const [email, setEmail] = React.useState('')
  const [showMessage, setShowMessage] = React.useState(false)
  const emailHasError = () => !VALID_MAIL_REGEX.test(email.toLowerCase())
  const passResetHandler = () => {
    sendForgetPasswordEmail(email)
      .then(() => setShowMessage(true))
      .catch(err => alert(err.message))
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.loginText}>Password Reset</Text>
      <TextInput
        style={styles.textInput}
        label="Registered Email"
        value={email}
        placeholder="e.g. example@example.com"
        onChangeText={text => setEmail(text)}
      />
      <HelperText type="error" visible={emailHasError() && email}>
        Email address is invalid!
      </HelperText>
      <Button
        mode="contained"
        onPress={passResetHandler}
        disabled={emailHasError()}
        style={styles.button}
      >
        Send Reset Email
      </Button>
      <Button onPress={() => navigation.goBack()} style={styles.button}>
        Go Back
      </Button>
      {/* snacker */}

      <Snackbar visible={showMessage} onDismiss={() => navigation.goBack()}>
        The Reset password email have been sent!
      </Snackbar>
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
  button: {
    marginTop: 10,
  },
})
