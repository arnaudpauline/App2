import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LocationComponent from './components/Location';
import WeatherComponent from './components/WeatherForecast ';
import ForecastComponent from './components/Forescast';
import { LinearGradient } from 'expo-linear-gradient';


const API_KEY = '40a2b964252cc9c1a08eebf65192fab0'; 

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo</Text>
      <LocationComponent
        onLocationUpdate={setLocation}
        onError={setErrorMsg}
      />
      <WeatherComponent
        location={location}
        onWeatherUpdate={setWeatherData}
        onError={setErrorMsg}
      />
      <ForecastComponent
        errorMsg={errorMsg}
        weatherData={weatherData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
  },
});
