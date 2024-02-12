import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons'; // Import appropriate icons from Expo vector icons library
import { PRIMARY } from '../colors';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const fetchTrips = async () => {
      const tripsRef = ref(db, 'trips');
      try {
        const snapshot = await get(tripsRef);
        if (snapshot.exists()) {
          const tripsData = [];
          snapshot.forEach((childSnapshot) => {
            const trip = {
              id: childSnapshot.key,
              ...childSnapshot.val()
            };
            tripsData.push(trip);
          });
          setTrips(tripsData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    fetchTrips();
  }, []);
  const handleNavigate = (sourceLat, sourceLng, destLat, destLng) => {
    const source = `${sourceLat},${sourceLng}`;
    const destination = `${destLat},${destLng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}`;
    Linking.openURL(url);
  };
  const renderTripItem = ({ item }) => {
    const lat1 = item.location.latitude
    const lng1 = item.location.longitude
    const lat2 = item.destination.lat
    const lng2 = item.destination.lng
    return(    
    <View style={styles.tripItem}>

      <View style={styles.tripDetails}>
        <Image source={require('../assets/flags.png')} style={{ height: 24, width: 24, marginRight: 5 }} />
        <Text style={styles.addressText}><Text style={{ fontWeight: '700' }}>Starting from:</Text> {item.locationAddress}</Text>
      </View>
      <View style={styles.tripDetails}>
        <Image source={require('../assets/destination.png')} style={{ height: 24, width: 24, marginRight: 5 }} />
        <Text style={styles.addressText}><Text style={{ fontWeight: '700' }}>Destination:</Text> {item.destinationAddress}</Text>
      </View>
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ccc', justifyContent: 'space-between' }}>
        <View style={styles.distanceContainer}>
          <MaterialIcons name="directions" size={24} color={PRIMARY} />
          <Text style={styles.distanceValue}>{item.distance} km</Text>
        </View>
        <TouchableOpacity style={[styles.distanceContainer, { backgroundColor: '#00796B' }]}
        
        >
          <Image source={require('../assets/rain.png')} style={{ height: 24, width: 24, marginRight: 5 }} />
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            Check Weather
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.navigateButton}
      onPress={()=>{handleNavigate(lat1, lng1, lat2, lng2)}}
      >
        <Image source={require('../assets/navigate.png')} style={styles.navigateIcon} />
        <Text style={styles.navigateText}>Navigate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navigateButton, { backgroundColor: '#70B1F8' }]}>
        <Image source={require('../assets/more.png')} style={styles.navigateIcon} />
        <Text style={[styles.navigateText, { color: 'white', fontWeight: 'bold' }]}>See Details</Text>
      </TouchableOpacity>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', margin: 20 }}>My Trips</Text>
      <FlatList
        data={trips}
        renderItem={renderTripItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyListText}>No trips found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  tripItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Add shadow effect
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  distanceValue: {
    fontSize: 16,
    color: '#333',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  navigateIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  navigateText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyListText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});

export default MyTrips;
