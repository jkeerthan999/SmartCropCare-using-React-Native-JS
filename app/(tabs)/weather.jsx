import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import moment from 'moment';

const WEATHER_API_KEY = 'Qt4qLVr8tvcRd5fkX6hQ4AJS3HqsYmy4'; // Tomorrow.io API Key
const GEOCODE_API_KEY = 'AIzaSyBuxDxJM9PEr30csOFVVok9RkUr8wPFzQc'; // Google Maps API Key
const WEATHER_BASE_URL = 'https://api.tomorrow.io/v4/weather/forecast';

const WeatherScreen = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Fetching location...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCityName = useCallback(async (latitude, longitude) => {
    try {
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODE_API_KEY}`
      );

      if (geocodeResponse.data.status !== 'OK') {
        throw new Error('Failed to fetch location');
      }

      let city = 'Unknown Location';
      const addressComponents = geocodeResponse.data.results[0]?.address_components;

      if (addressComponents) {
        for (let component of addressComponents) {
          if (component.types.includes("locality")) {
            city = component.long_name; // Extract city name
            break;
          }
        }
      }

      setLocation(city);
    } catch (err) {
      setLocation('Hyderabad'); // Default to Hyderabad if error
    }
  }, []);

  const getWeatherData = useCallback(async (latitude, longitude) => {
    try {
      console.log(`📍 Location: ${latitude}, ${longitude}`);

      const weatherResponse = await axios.get(WEATHER_BASE_URL, {
        params: {
          location: `${latitude},${longitude}`,
          apikey: WEATHER_API_KEY,
          timesteps: '1h',
          units: 'metric',
        },
      });

      if (!weatherResponse.data || !weatherResponse.data.timelines?.hourly) {
        throw new Error('Invalid weather data received.');
      }

      setWeather(weatherResponse.data.timelines.hourly.slice(0, 6)); // Next 6 hours forecast
    } catch (err) {
      setError(`⚠ Error fetching weather: ${err.message}`);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let latitude, longitude;

        if (Platform.OS !== 'web') {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setError('⚠ Location permission denied. Defaulting to Hyderabad.');
            latitude = 17.3850; // Hyderabad latitude
            longitude = 78.4867; // Hyderabad longitude
          } else {
            let locationData = await Location.getCurrentPositionAsync({});
            latitude = locationData.coords.latitude;
            longitude = locationData.coords.longitude;
          }
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              getCityName(latitude, longitude);
              getWeatherData(latitude, longitude);
            },
            (error) => {
              setError('⚠ Location access denied. Defaulting to Hyderabad.');
              latitude = 17.3850;
              longitude = 78.4867;
            }
          );
          return;
        }

        await getCityName(latitude, longitude);
        getWeatherData(latitude, longitude);
      } catch (err) {
        setError(`⚠ Error fetching location: ${err.message}`);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [getCityName, getWeatherData]);

  if (loading) return <ActivityIndicator size="large" color="#2E7D32" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!weather || weather.length === 0) return <Text style={styles.errorText}>⚠ No weather data available</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WEATHER TODAY</Text>
      <Text style={styles.location}>{location} 📍</Text>
      <Text style={styles.temp}>{Math.round(weather[0].values.temperature)}°</Text>
      <Text style={styles.condition}>Weather: {weather[0].values.weatherCode}</Text>
      <Text style={styles.feelsLike}>Feels like {Math.round(weather[0].values.temperatureApparent)}°</Text>

      {/* Hourly Forecast */}
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>Hourly Forecast</Text>
        <View style={styles.forecastRow}>
          {weather.map((hourData, index) => {
            const forecastTime = moment().add(index, 'hours');
            const hour = forecastTime.hour();
            const weatherEmoji = hour >= 6 && hour < 18 ? '🌞' : '🌙';

            return (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastTime}>{forecastTime.format('HH:mm')}</Text>
                <Text style={styles.weatherEmoji}>{weatherEmoji}</Text>
                <Text style={styles.forecastTemp}>{Math.round(hourData.values.temperature)}°</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#007BFF', padding: 20 },
  header: { fontSize: 26, color: 'white', fontWeight: 'bold', marginBottom: 10 },
  location: { fontSize: 22, color: 'white', fontWeight: 'bold', marginBottom: 10 },
  temp: { fontSize: 70, fontWeight: 'bold', color: 'white' },
  condition: { fontSize: 22, color: '#E0E0E0', marginBottom: 10 },
  feelsLike: { fontSize: 18, color: '#BBBBBB', marginBottom: 20 },
  forecastContainer: { backgroundColor: '#2D2D3A', padding: 15, borderRadius: 10, width: '90%', alignItems: 'center' },
  forecastTitle: { fontSize: 18, color: 'white', fontWeight: 'bold', marginBottom: 10 },
  forecastRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  forecastItem: { alignItems: 'center' },
  forecastTime: { color: '#E0E0E0', fontSize: 16 },
  weatherEmoji: { fontSize: 24, marginVertical: 5 },
  forecastTemp: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center' },
});

export default WeatherScreen;
