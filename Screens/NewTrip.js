
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Image } from 'react-native';
import { PRIMARY } from '../colors';
import * as Location from 'expo-location';
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth'

const NewTrip = ({ navigation }) => {
  const [destination, setDestination] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [stayingDays, setStayingDays] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState('');
  const [showDistance, setShowDistance] = useState(false);
  const [locationAddress, setLocationAddress] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const db = getDatabase()
  const auth = getAuth()
  useEffect(() => {
    // Request permission to access location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get live location updates
      let locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second
        },
        newPosition => {
          setLocation(newPosition.coords);
          (async () => {
            try {
              const addressData = await Location.reverseGeocodeAsync({
                latitude: newPosition.coords.latitude,
                longitude: newPosition.coords.longitude,
              });
              if (addressData && addressData.length > 0) {
                const firstAddress = addressData[0];
                const formattedAddress = `${firstAddress.name}, ${firstAddress.street}, ${firstAddress.city}, ${firstAddress.region}, ${firstAddress.country}`;
                setLocationAddress(formattedAddress);
                console.log(formattedAddress)
              }
            } catch (error) {
              console.error('Error getting address:', error);
            }
          })();
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);


  const handleConfirmDate = (event, selectedDate) => {
    const currentDate = selectedDate || departureDate;
    setShowDatePicker(false);
    setDepartureDate(currentDate);
  };

  const handleOnPress = (data, details) => {
    setDestinationAddress(data.description)
    setDestination(details.geometry.location);
    console.log(details.geometry.location)
    const DestLocation = details.geometry.location
    calculateDistance(location, DestLocation)
  }
  const calculateDistance = (location, destination) => {
    const lat1 = location.latitude;
    const lon1 = location.longitude;
    const lat2 = destination.lat;
    const lon2 = destination.lng;
  
    const R = 6371; // Radius of the Earth in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in meters
  
    setDistance(distance.toFixed(2)); // Set distance with 2 decimal places
    setShowDistance(true);
  };
  
  const createTrip = () => {
    const tripsRef = ref(db, 'trips')
    if (!destinationAddress.trim() || !numberOfPeople || !departureDate || !stayingDays){
      Alert.alert('All the fields are required to create the trip')
      return
    }
    const tripData={
     destination: destination,
     destinationAddress:destinationAddress,
     location: location, 
     locationAddress:locationAddress,
     distance: distance,
     date: departureDate,
     people:numberOfPeople,
     days: stayingDays,
     uid: auth.currentUser.uid
    }
    push(tripsRef, tripData).then(()=>{
      Alert.alert('Trip created successfully')
      setDestination('')
      setNumberOfPeople('')
      setStayingDays('')
    })
    .catch((error)=>{
      console.log(error);
      Alert.alert('Something went wrong, please try again')
    })
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle='dark-content' />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={{ height: 25, width: 25 }} />
        </TouchableOpacity>
        <Text style={styles.heading}>Create New Trip</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#CCCCCC', }}>
          <Feather name="map-pin" size={24} color={PRIMARY} style={styles.inputIcon} />
          <GooglePlacesAutocomplete
            placeholder='Destination'
            fetchDetails={true}
            onPress={(data, details = null) => {
              handleOnPress(data, details)
            }}

            minLength={2}
            query={{
              key: 'AIzaSyB9zgTdLN3KTUB9fJWDiAwDyE2QWQUX5qk',
              language: 'en',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            enableHighAccuracyLocation
            styles={{
              textInputContainer: {
              },
              textInput: {
                height: 40,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </View>
        {
          showDistance &&
          <View style={{ backgroundColor: '#676464', alignSelf: 'flex-end', marginTop: 20, padding: 15, borderRadius: 5, opacity: 0.7, flexDirection: 'row' }}>
            <Text style={{ color: 'white' }}>
              Distance : {distance}km
            </Text>
          </View>
        }


        <View style={styles.inputContainer}>
          <Feather name="users" size={24} color={PRIMARY} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Number of People"
            value={numberOfPeople}
            onChangeText={text => setNumberOfPeople(text)}
            keyboardType='numbers-and-punctuation'
          />
        </View>
        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 5, paddingRight: 10 }}>
          <TouchableOpacity style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, borderColor: '#CCCCCC', }]} onPress={() => setShowDatePicker(true)}>
            <Feather name="calendar" size={24} color={PRIMARY} />
            <Text style={{ color: '#CCCCCC' }}>Departure Date:</Text>
          </TouchableOpacity>


          <DateTimePicker
            testID="dateTimePicker"
            value={departureDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleConfirmDate}
            collapsable='true'
          />

        </View>
        <View style={styles.inputContainer}>
          <Feather name="calendar" size={24} color={PRIMARY} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Number of Days Staying "
            value={stayingDays}
            onChangeText={text => setStayingDays(text)}
            keyboardType='numbers-and-punctuation'
          />
        </View>
        <TouchableOpacity style={styles.createButton} onPress={createTrip}>
          <Text style={styles.createButtonText}>Create Trip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginVertical: 20,
  },
  inputIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewTrip;
