import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';

const ForecastComponent = ({ errorMsg, weatherData }) => {
  let content;
  if (errorMsg) {
    content = <Text>{errorMsg}</Text>;
  } else if (weatherData) {
    const groupedForecasts = {};
    weatherData.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!groupedForecasts[date]) {
        groupedForecasts[date] = [];
      }
      groupedForecasts[date].push(forecast);
    });

    content = (
      <ScrollView style={styles.scrollView}>
        {Object.keys(groupedForecasts).map((date, index) => (
          <View key={index}>
            <Text style={styles.date}>{date}</Text>
            {groupedForecasts[date].map((forecast, subIndex) => (
              <View key={subIndex} style={styles.forecastItem}>
                <View style={styles.forecastText}>
                  <Text style={styles.heure}>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
                  <Text>Température : {forecast.main.temp}°C</Text>
                  <Text>Description : {forecast.weather[0].description}</Text>
                </View>
                <Image
                  source={{ uri: `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png` }}
                  style={styles.image}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  } else {
    content = <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      {content}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: '85%',
    },
    forecastItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
  forecastText: {
        //paddingRight: 10,
        //backgroundColor: 'pink',
    },
    image: {
        width: 50, 
        height: 50,
    },
    heure: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'blue',
    },
});

export default ForecastComponent;
