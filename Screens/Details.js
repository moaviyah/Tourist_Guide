import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, FlatList, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { PRIMARY } from '../colors';
import { getDatabase, push, ref } from 'firebase/database'
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you have FontAwesome installed for star icons

const API_KEY = 'AIzaSyB9zgTdLN3KTUB9fJWDiAwDyE2QWQUX5qk';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RatingPrompt = ({ onRate }) => {
    const [rating, setRating] = useState(0);

    const handleRate = () => {
        onRate(rating);
    };

    return (
        <View style={{ backgroundColor: 'white', marginVertical: 20, flex: 1, alignSelf: 'center', padding: 10, borderRadius: 15 }}>
            <Text style={{ alignSelf: 'center' }}>Rate your trip</Text>
            <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setRating(index)}
                    >
                        <Icon
                            name={index <= rating ? 'star' : 'star-o'}
                            size={30}
                            color={index <= rating ? 'gold' : 'gray'}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={handleRate} style={{ padding: 10, backgroundColor: PRIMARY, alignSelf: 'center', marginTop: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};
const Details = ({ navigation, route }) => {
    const { item } = route.params;
    const lat = item.destination.lat;
    const lng = item.destination.lng;
    console.log(item)
    const [placeDetails, setPlaceDetails] = useState(null);
    const [showRatingPrompt, setShowRatingPrompt] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedImage, setSelectedImage] = useState()
    const db = getDatabase();
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
    const endTrip = () => {
        if (!review.trim()) {
            Alert.alert('Please write a review first')
            return
        }
        if (!placeDetails || !placeDetails.photos || placeDetails.photos.length === 0) {
            Alert.alert('No images available for the trip')
            return
        }
        const randomIndex = Math.floor(Math.random() * placeDetails.photos.length);
        const randomPhoto = placeDetails.photos[randomIndex];
        setShowRatingPrompt(true)
        setSelectedImage(randomPhoto);
    }
    const handleRate = (ratedValue) => {
        if (ratedValue === 0) {
            Alert.alert('Please give a rating of your trip')
            return
        }
        // Push data to the database with rating
        const dataRef = ref(db, 'completedTrips');
        push(dataRef, {
            lat,
            lng,
            review,
            rating: ratedValue,
            image: selectedImage,
            id:item.id,
            address: item.destinationAddress,
            description: item.description
        });

        // Hide rating prompt
        setShowRatingPrompt(false);
        Alert.alert('Trip Ended! Hope you enjoyed')
        setReview('')
        setRating(0)
    };
    return (
        <View style={{ flex: 1 }}>
            {
                placeDetails ? (
                    <ScrollView style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back_white.png')} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                        <Text style={styles.heading}>{item.destinationAddress}</Text>
                        <View contentContainerStyle={{ flex: 1, backgroundColor: PRIMARY }}>
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


                            <Text style={{ fontWeight: '700', marginBottom: 10, color: 'white', fontSize: 18 }}>Description:</Text>
                            <Text style={styles.description}>{placeDetails.formatted_address}</Text>


                            {showRatingPrompt && (
                                <RatingPrompt onRate={handleRate} />
                            )}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50 }}>
                                <TextInput
                                    placeholder='Write Review'
                                    placeholderTextColor={'white'}
                                    style={styles.reviewInput}
                                    multiline
                                    onChangeText={setReview}
                                />
                                <TouchableOpacity
                                    style={{ backgroundColor: 'white', flex: 1, height: 70, marginHorizontal: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { endTrip() }}
                                >
                                    <Text style={{ color: PRIMARY, fontSize: 16, fontWeight: '700' }}>
                                        End Trip
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: PRIMARY }}>
                        <ActivityIndicator size={'small'} style={{ alignSelf: 'center', }} color={'white'} />
                    </View>
                )
            }
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
        width: width - 40,
        height: 400,
        marginRight: 10,
        borderRadius: 15
    },
    description: {
        fontSize: 16,
        color: 'white',
        marginVertical: 10
    },
    placeContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 10
    },
    placeInfo: {
        flex: 1
    },
    placeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    placeAddress: {
        color: 'white',
        marginBottom: 5
    },
    distance: {
        color: 'white',
        marginBottom: 5
    },
    navigateButton: {
        backgroundColor: '#42a5f5',
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    buttonText: {
        color: 'white'
    },
    reviewInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 20,
        alignItems: 'center',
        color: 'white',
        paddingTop: 20,
        width: width / 1.8
    }
});

export default Details;
