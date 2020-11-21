import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'

export default ({ label, onPress, checked }) => (
  <TouchableOpacity style={styles.checkbox} onPress={onPress}>
    <Text style={{ fontSize: 16 }}>{label}</Text>
    <Checkbox status={checked ? 'checked' : 'unchecked'} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
})
