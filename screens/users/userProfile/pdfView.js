import React from 'react'
import { Appbar } from 'react-native-paper'
import PDFReader from 'rn-pdf-reader-js'
import { View, ActivityIndicator } from 'react-native'

export default ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#007AFF' }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Resume View" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, paddingTop: '10%', backgroundColor: '#fff' }}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : null}
        <PDFReader
          style={{ flex: 1 }}
          withPinchZoom={true}
          source={{ uri: route?.params?.url }}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </>
  )
}
