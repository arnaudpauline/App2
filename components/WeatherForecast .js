import React, { useState, useEffect } from 'react';

const API_KEY = '40a2b964252cc9c1a08eebf65192fab0';

const WeatherComponent = ({ location, onWeatherUpdate, onError }) => {
  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Données météo indisponible');
        }

        const data = await response.json();
        onWeatherUpdate(data);
      } catch (error) {
        console.error(error);
        onError('Erreur de la récupération des données');
      }
    };

    if (location) {
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  return null;
};

export default WeatherComponent;