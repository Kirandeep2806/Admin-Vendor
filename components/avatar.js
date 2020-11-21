import React from 'react'
import { View, Text } from 'react-native'
import { getAvatarText, getRandomColor } from '../utils'

export default ({ size, text, backgroundColor, color }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: size,
      width: size,
      maxHeight: size,
      maxWidth: size,
      borderRadius: size * 10,
      backgroundColor: backgroundColor ? backgroundColor : getRandomColor(),
    }}
  >
    <Text style={{ color: color ? color : '#fff', fontSize: size * 0.55 }}>
      {getAvatarText(text)}
    </Text>
  </View>
)
