import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRIMARY } from '../colors';

const Weather = ({ navigation, route }) => {
  const { item } = route.params;
  const lat = item.destination.lat;
  const lng = item.destination.lng
  
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '6b947b76af8b63012798ca7919e115c8'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        console.log('data', data)
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
    fetchWeather();
  }, [item]);

  // Function to convert UNIX timestamp to date string
  const unixToDateString = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toDateString();
  };

  // Function to convert UNIX timestamp to 24-hour time string
  const unixToTimeString = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Image source={require('../assets/back_white.png')} style={{ height: 24, width: 24, }} />
            </TouchableOpacity>
            <Text style={styles.text}> {unixToDateString(weatherData.dt)}</Text>
          </View>
          <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 24, marginVertical: 10 }}>{weatherData.name}</Text>
          <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', marginBottom: 10, fontSize: 18 }}>{weatherData.main.temp}°C</Text>
          <Text style={styles.text}>Feels Like: {weatherData.main.feels_like}°C</Text>

          <Image source={require('../assets/weather.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginVertical: 10 }}>
            <Text style={styles.text}>Max: {weatherData.main.temp_max}°C</Text>
            <Text style={styles.text}>Min: {weatherData.main.temp_min}°C</Text>

          </View>
          <Text style={styles.text}>Sunrise: {unixToTimeString(weatherData.sys.sunrise)}</Text>
          <Text style={styles.text}>Sunset: {unixToTimeString(weatherData.sys.sunset)}</Text>
          <Text style={styles.text}>Sky: {weatherData.weather[0].description}</Text>
        </View>
      ) : (
        <Text>Loading weather data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: PRIMARY
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18, fontWeight: '600',
    marginVertical: 5
  }
});

export default Weather;
