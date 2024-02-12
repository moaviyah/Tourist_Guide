import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector-icons library
import LikedDestinations from './LikedDestinations';
import MyTrips from './MyTrips';
import Emergency from './Emergency';
import Account from './Account';
import CreateTrips from './CreateTrips';
import { PRIMARY } from '../colors';

const Tab = createBottomTabNavigator();

const Navigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="CreateTrips"
            screenOptions={{
                headerShown:false,
                tabBarShowLabel:false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    ...styles.shadow,
                },
                
            }}
            
        >
            <Tab.Screen
                name="Emergency"
                component={Emergency}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Entypo name="info" size={24} color={focused ? PRIMARY : '#A9A9A9'} />
                            <Text style={{ color: focused ? PRIMARY : '#A9A9A9', fontSize: 12 }}>Emergency</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="My Trips"
                component={MyTrips}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="trip-origin" size={24} color={focused ? PRIMARY : '#A9A9A9'} />
                            <Text style={{ color: focused ? PRIMARY : '#A9A9A9', fontSize: 12 }}>My Trips</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="CreateTrips"
                component={CreateTrips}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome name="suitcase" size={34} color={focused ? PRIMARY : '#A9A9A9'} />
                            <Text style={{ color: focused ? PRIMARY : '#A9A9A9', fontSize: 12 }}>Create</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Liked Destinations"
                component={LikedDestinations}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name="hearto" size={24} color={focused ? PRIMARY : '#A9A9A9'} />
                            <Text style={{ color: focused ? PRIMARY : '#A9A9A9', fontSize: 12 }}>Liked</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="user" size={24} color={focused ? PRIMARY : '#A9A9A9'} />
                            <Text style={{ color: focused ? PRIMARY : '#A9A9A9', fontSize: 12 }}>Account</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = {
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
};

export default Navigator;
