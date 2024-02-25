import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationComponent = ({ onLocationUpdate, onError }) => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        onError('Autorisation accès aux données refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      onLocationUpdate(location);
    })();
  }, []);

  return null;
};

export default LocationComponent;
