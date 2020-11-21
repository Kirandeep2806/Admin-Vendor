import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Colors } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ label, visible, onPress, children, color }) => (
  <>
    <View>
      <TouchableOpacity style={styles.listContainer} onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.listText}>{label}</Text>
          <MaterialCommunityIcons
            style={[styles.listIcon, color ? { color: color } : {}]}
            name={
              visible
                ? 'arrow-up-drop-circle-outline'
                : 'arrow-down-drop-circle-outline'
            }
          />
        </View>
      </TouchableOpacity>
    </View>
    {visible && children}
  </>
)

const styles = StyleSheet.create({
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
