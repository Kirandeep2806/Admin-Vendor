import React from 'react'
import { Appbar } from 'react-native-paper'
import PDFReader from 'rn-pdf-reader-js'
import { View } from 'react-native'

export default ({ route, navigation }) => (
  <>
    <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Resume View" />
    </Appbar.Header>
    <View style={{ flex: 1 }}>
      <PDFReader
        style={{ flex: 1 }}
        withPinchZoom={true}
        source={{ uri: route?.params?.url }}
      />
    </View>
  </>
)
