import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo vector icons library
import { PRIMARY } from '../colors';

const Emergency = () => {
  // Define your emergency numbers with labels and icons
  const emergencyNumbers = [
    { label: 'Police', number: '15', icon: require('../assets/badge.png') },
    { label: 'Fire', number: '16', icon:require('../assets/fire.png') },
    { label: 'Ambulance', number: '1122', icon: require('../assets/ambulance.png') },
    { label: 'Child Protection', number: '1121', icon: require('../assets/family.png') },
    { label: 'Disaster Management', number: '1129', icon: require('../assets/flood.png') },
    { label: 'Women Helpline', number: '1043', icon: require('../assets/women.png') },
    // Add more emergency numbers as needed
  ];

  // Function to handle dialing the number
  const handleDialNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Numbers</Text>
      {/* Render each emergency number with a corresponding button */}
      {emergencyNumbers.map((emergency, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleDialNumber(emergency.number)}
        >
          <View style={styles.buttonContent}>
            <View style={styles.iconContainer}>
              <Image source={emergency.icon} style={{height:24, width:24}}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.labelText}>{emergency.label}</Text>
              <Text style={styles.numberText}>{emergency.number}</Text>
            </View>
            <TouchableOpacity
              style={styles.dialButton}
              onPress={() => handleDialNumber(emergency.number)}
            >
              <MaterialIcons name="phone" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    color:'white'
  },
  button: {
    backgroundColor: '#443742',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  labelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  numberText: {
    color: '#fff',
    fontSize: 16,
  },
  dialButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
});

export default Emergency;
