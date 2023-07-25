import React from 'react'
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native'
import { Appbar, Title, Caption } from 'react-native-paper'
import { BOTTOM_TAB_COLORS } from '../../../constants'
import { ProfileItem } from '../../../components'

export default ({ navigation, route }) => {
  const data = route?.params?.data
  const size = 200
  const [height, width] = [size, size * 1.5]

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[4] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Details" />
      </Appbar.Header>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        <ScrollView style={styles.screen}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: data.url }}
              style={{
                flex: 1,
                width: width,
                height: height,
                borderRadius: 10,
              }}
            />
          </View>
          <Title style={styles.centerText}>{`posted by ${data.name}`}</Title>
          <Caption style={styles.centerText}>{data.email}</Caption>
          <View style={styles.data}>
            <ProfileItem title="Product Name" value={data.title} />
            <ProfileItem title="Description" value={data.description} />
            <ProfileItem title="Price" value={data.price} />
            <ProfileItem title="Contact" value={data.phone_no} />
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    // alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
  },
  avatar: {
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  data: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
})

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     backgroundColor: '#ddd',
//     padding: '7%',
//   },
//   card: {
//     borderColor: '#fff',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 30,
//     backgroundColor: '#fff',
//   },
//   imageStyles: {
//     height: 150,
//     width: 200,
//     marginBottom: 30,
//     alignSelf: 'center',
//   },
//   textStyles: {
//     fontSize: 15,
//     fontFamily: 'sans-serif-condensed',
//     paddingBottom: 5,
//   },
//   underlineText: {
//     fontSize: 15,
//     textDecorationLine: 'underline',
//     fontFamily: 'sans-serif-condensed',
//     paddingBottom: 5,
//   },
// })

// <ScrollView>
//     <View style={styles.container}>
//         <View style={styles.card}>
//             <Image source={{ uri: data.url }} style={styles.imageStyles} />
//             <Text style={styles.textStyles}>Product Name: {'\n' + data.title}</Text>
//             <Text style={styles.textStyles}>Details: {'\n' + data.description}</Text>
//             <Text style={styles.textStyles}>Price: {'\n' + data.price}</Text>
//             <Text style={styles.underlineText}>Vendor Details </Text>
//             <Text style={styles.textStyles}>Name : {data.name}</Text>
//             <Text style={styles.textStyles}>Email : {data.email}</Text>
//             <Text style={styles.textStyles}>Phone Number : {data.phone_no}</Text>
//         </View>
//     </View>
// </ScrollView>
