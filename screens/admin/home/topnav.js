import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Appbar } from 'react-native-paper'
import { BOTTOM_TAB_COLORS } from '../../../constants'

// Screens
import MyProductsScreen from './myproducts'
import AllProductsScreen from './allproducts'

export default ({ navigation }) => {
    const TopNav = createMaterialTopTabNavigator()
    return (
        <>
            <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[4] }}>
                <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
                <Appbar.Content title="Home" />
                <Appbar.Action
                    icon="account"
                    onPress={() => navigation.navigate('admin-profile')}
                />
            </Appbar.Header>
            <TopNav.Navigator screenOptions={{ header: () => null }} tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: BOTTOM_TAB_COLORS[4]
                }
            }}>
                <TopNav.Screen name="myproducts" component={MyProductsScreen} options={{ title: "My Products" }} />
                <TopNav.Screen name="allproducts" component={AllProductsScreen} options={{ title: "All Products" }} />
            </TopNav.Navigator>
        </>
    )
}