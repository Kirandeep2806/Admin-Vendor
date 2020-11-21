import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native'
import {
  TextInput,
  Text,
  Button,
  Colors,
  RadioButton,
} from 'react-native-paper'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { SignUp } from '.'
import firebase from '../config/firebase'
import { ROOT_COLLECT_NAME } from '../constants'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [date, setDate] = React.useState(new Date())
  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [gender, setGender] = React.useState('male')
  const [showGender, setShowGender] = React.useState(false)
  const [accountType, setAccountType] = React.useState('user')
  const [showAccountType, setShowAccountType] = React.useState(false)
  const [pushToken, setPushToken] = React.useState('')
  // const [registered, setregistered] = React.useState(false)

  React.useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj
      })
      .then(statusObj => {
        if (statusObj.status !== 'granted') {
          // return
          // for push
          throw new Error('Permission not granted')
        }
      })
      // here the push notifications code begins
      .then(() => {
        return Notifications.getExpoPushTokenAsync()
      })
      .catch(err => console.log('Error for push', err))
      .then(data => {
        // console.log('TOKEN CALL FOR PUSH RESPONSE', data)
        const token = data.data
        setPushToken(token)
      })
  }, [])

  const registerHandler = () => {
    SignUp(email, password)
      .then(() => alert(`${name} account has been registered`))
      .catch(err => {
        alert(err.message)
        console.log(err.message)
      })
    firebase
      .firestore()
      .collection(ROOT_COLLECT_NAME)
      .doc(email)
      .set({
        name,
        email,
        phone,
        gender,
        accountType,
        pushToken,
        dateOfBirth: date,
      })
      .then(() => alert('data added'))
      .catch(err => {
        alert(err.message)
        console.log(err.message)
      })
  }
  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.loginText}>Register</Text>
          <TextInput
            style={styles.textInput}
            label="User name"
            value={name}
            placeholder="e.g. Jhon Deo"
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.textInput}
            label="Email"
            value={email}
            placeholder="e.g. example@example.com"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCompleteType="password"
            placeholder="e.g. ••••••••"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="e.g. 9876543210"
            maxLength={10}
            keyboardType="numeric"
            label="Phone Number"
            value={phone}
            onChangeText={value => setPhone(value)}
          />
          {/* Date Time Picker */}
          <>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => {
                setShowDatePicker(true)
              }}
            >
              <MaterialCommunityIcons
                style={styles.datePickerIcon}
                name="calendar"
                size={30}
                color={Colors.purple300}
              />
              <Text style={styles.datePickerText}>Date of Birth</Text>
              <Text style={styles.datePickerDate}>
                {date.toISOString().split('T')[0]}
              </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={showDatePicker}
              onCancel={() => setShowDatePicker(false)}
              onConfirm={date => {
                setShowDatePicker(false)
                setDate(date)
              }}
            />
          </>
          {/* Date ends */}
          {/* Gender Radio */}
          <>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => setShowGender(val => !val)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.listText}>Select Gender</Text>
                <MaterialCommunityIcons
                  style={styles.listIcon}
                  name={
                    showGender
                      ? 'arrow-up-drop-circle-outline'
                      : 'arrow-down-drop-circle-outline'
                  }
                />
              </View>
            </TouchableOpacity>
            {showGender && (
              <RadioButton.Group
                onValueChange={value => setGender(value)}
                value={gender}
              >
                <RadioButton.Item label="Male" value="male" />
                <RadioButton.Item label="Female" value="female" />
                <RadioButton.Item label="Other" value="other" />
              </RadioButton.Group>
            )}
          </>
          {/* Gender Radio ends */}
          {/* Account Radio */}
          <>
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => setShowAccountType(val => !val)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.listText}>Select Account Type</Text>
                <MaterialCommunityIcons
                  style={styles.listIcon}
                  name={
                    showAccountType
                      ? 'arrow-up-drop-circle-outline'
                      : 'arrow-down-drop-circle-outline'
                  }
                />
              </View>
            </TouchableOpacity>
            {showAccountType && (
              <RadioButton.Group
                onValueChange={value => setAccountType(value)}
                value={accountType}
              >
                <RadioButton.Item label="User" value="user" />
                <RadioButton.Item label="Admin" value="admin" />
                <RadioButton.Item label="Vender" value="vender" />
              </RadioButton.Group>
            )}
          </>
          {/* account Radio ends */}
          <Button
            icon="account-plus"
            style={styles.loginButton}
            mode="contained"
            loading={false}
            onPress={registerHandler}
          >
            Register
          </Button>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => navigation.navigate('login-screen')}
          >
            <Text style={styles.link}>Already have one? Goto Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 1.3,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
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
    marginBottom: 40,
  },
  link: {
    color: '#555',
    fontSize: 15,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerIcon: {
    fontSize: 30,
  },
  datePickerText: {
    paddingLeft: 10,
    fontSize: 18,
  },
  datePickerDate: {
    paddingLeft: 10,
    color: Colors.green900,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  listText: {
    fontSize: 16,
    paddingLeft: 2,
    paddingRight: 5,
  },
  listIcon: {
    fontSize: 24,
    color: Colors.purple700,
  },
})

export default RegisterScreen
