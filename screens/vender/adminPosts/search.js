import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import {
  Appbar,
  Searchbar,
  Card,
  Avatar,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper'
import { getAvatarText, getRandomColor } from '../../../utils'
import { BOTTOM_TAB_COLORS } from '../../../constants'

export default ({ navigation, route }) => {
  const [query, setQuery] = React.useState('')
  const [data, setData] = React.useState(route?.params)

  React.useEffect(() => {
    if (!query) {
      setData(route?.params)
      return
    }
    setData(data =>
      data.filter(
        item =>
          item.productName.toLowerCase().includes(query.toLowerCase()) ||
          item.institutionName.toLowerCase().includes(query.toLowerCase()) ||
          item.place.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query])

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[4] }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Search" />
      </Appbar.Header>
      <View style={styles.screen}>
        <Searchbar
          value={query}
          placeholder="e.g. Name, place..."
          onChangeText={text => setQuery(text)}
          style={{ marginBottom: 5 }}
        />
        {data.length > 0 ? (
          <View style={styles.screen}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <Card>
                    <Card.Title
                      title={item.name}
                      subtitle={item.email}
                      left={props => (
                        <Avatar.Text
                          {...props}
                          label={getAvatarText(item.name)}
                          backgroundColor={getRandomColor()}
                        />
                      )}
                      right={props => (
                        <IconButton
                          {...props}
                          icon="more"
                          color="#999"
                          onPress={() => navigation.navigate('info', item)}
                        />
                      )}
                    />
                    <Card.Content>
                      <Title>{item.productName}</Title>
                      <Paragraph>{item.institutionName}, {item.place}</Paragraph>
                    </Card.Content>
                  </Card>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No Posts found</Text>
          </View>
        )}
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    color: '#888',
  },
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
})
