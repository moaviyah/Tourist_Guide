import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { PRIMARY } from '../colors';
const API_KEY = 'AIzaSyB9zgTdLN3KTUB9fJWDiAwDyE2QWQUX5qk';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Details = ({ navigation, route }) => {
    const { item } = route.params;
    const lat = item.destination.lat;
    const lng = item.destination.lng;
    const [placeDetails, setPlaceDetails] = useState(null);

    useEffect(() => {
        async function fetchPlaceId() {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500000&type=tourist_attraction&key=${API_KEY}`
                );
                const data = await response.json();
                if (data.results.length > 0) {
                    const placeId = data.results[0].place_id;
                    fetchPlaceDetails(placeId);
                } else {
                    console.error('No tourist attractions found near the location:', lat, lng);
                }
            } catch (error) {
                console.error('Error fetching place ID:', error);
            }
        }

        async function fetchPlaceDetails(placeId) {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`
                );
                const data = await response.json();
                setPlaceDetails(data.result);
            } catch (error) {
                console.error('Error fetching place details:', error);
            }
        }

        fetchPlaceId();
    }, [item]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/back_white.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <Text style={styles.heading}>{item.destinationAddress}</Text>
            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: PRIMARY }}>
                <FlatList
                    horizontal
                    data={placeDetails ? placeDetails.photos : []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                source={{
                                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${API_KEY}`,
                                }}
                                style={styles.image}

                            />
                        </View>
                    )}

                />
                {placeDetails ? (
                    <>
                        <Text style={{ fontWeight: '700', marginBottom: 10, color: 'white', fontSize: 18 }}>Description:</Text>
                        <Text style={styles.description}>{placeDetails.formatted_address}</Text>
                    </>
                ) : (
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Description not available</Text>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        backgroundColor: PRIMARY,
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        marginVertical: 10
    },
    image: {
        width: width-40,
        height: 400,
        marginRight: 10,
    },
    description: {
        fontSize: 16,
        color: 'white',
        marginVertical: 10
    },
});

export default Details;
