import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { PRIMARY } from '../colors';

const LikedDestinations = () => {
  const likedDestinations = [
    {
      id: 1,
      name: 'Paris',
      image: require('../assets/paris.jpg'),
      description: 'City of Love and Lights',
      review: '4.8',
    },
    {
      id: 2,
      name: 'Kyoto',
      image: require('../assets/kyoto.jpg'),
      description: 'Historic Japanese City',
      review: '4.7',
    },
    {
      id: 3,
      name: 'Swat, Pakistan',
      image: require('../assets/swat.jpg'),
      description: 'Breath-taking natural beauty',
      review: '4.9',
    },
    {
      id: 4,
      name: 'Kashmir, Pakistan',
      image: require('../assets/kashmit.png'),
      description: 'Great sceneries along with great people',
      review: '5.0',
    },
    {
      id: 5,
      name: 'Karachi, Pakistan',
      image: require('../assets/Karachi.jpg'),
      description: 'Do not take your phone out of hotel',
      review: '2.5',
    },
    // Add more destinations as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={{color:'white', fontSize:20, fontWeight:'bold', margin:20}}>
        Favourite Destinations
      </Text>
      {likedDestinations.map((destination) => (
        <View key={destination.id} style={styles.destinationContainer}>
          <Image source={destination.image} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{destination.name}</Text>
            <Text style={styles.description}>{destination.description}</Text>
            <View style={styles.reviewContainer}>
              <Text style={styles.review}>{destination.review}</Text>
              <Text style={styles.reviewLabel}>Rating</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    padding:20
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    backgroundColor:'#71697A',
    borderRadius:5,
    padding:10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white'
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  review: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color:'white'
  },
  reviewLabel: {
    fontSize: 14,
    color: 'white',
  },
});

export default LikedDestinations;
