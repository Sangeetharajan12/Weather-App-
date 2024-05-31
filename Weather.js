// api/weather.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
// import { fetchWeather } from './App';

const API_KEY = 'ba4e6e63de852db7fd789ba61b44b09b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: 'City not found' };
    } else {
      return { error: 'An error occurred. Please try again later.' };
    }
  }
};
const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    const data = await fetchWeather(city);
    if (data.error) {
      setError(data.error);
      setWeather(null);
    } else {
      setWeather(data);
      setError(null);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
      />
      <Button title="Get Weather" onPress={loadWeather} />
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temperature}>{(weather.main.temp - 273.15).toFixed(2)}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
          />
         
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    
  },
  title:{
    fontSize:30,
    color:'black',
    fontWeight:'bold',
    marginBottom:80,
  
  },
  
  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  weatherContainer: {
    alignItems: 'center',
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    marginVertical: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 20,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Weather;

