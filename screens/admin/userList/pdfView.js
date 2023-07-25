import React from 'react'
import { Appbar } from 'react-native-paper'
import PDFReader from 'rn-pdf-reader-js'
import { View, ActivityIndicator } from 'react-native'
import { BOTTOM_TAB_COLORS } from '../../../constants'

export default ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[2] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Resume View" />
      </Appbar.Header>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {isLoading ? (
          <View style={{ flex: 1, marginTop: '10%' }}>
            <ActivityIndicator size="large" color={BOTTOM_TAB_COLORS[2]} />
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
