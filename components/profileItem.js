import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default ({ title, value }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingBottom: 10,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#666',
    paddingBottom: 5,
  },
  value: {
    fontSize: 15,
    color: '#999',
  },
})
