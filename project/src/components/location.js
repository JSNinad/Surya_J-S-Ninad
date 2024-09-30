import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const CityName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Temperature = styled.h2`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const WeatherStatus = styled.p`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const AirQuality = styled.p`
  font-size: 1.2rem;
`;

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            q: 'Mangaluru', 
            appid: API_KEY,
            units: 'metric'
          }
        });
        const airQualityResponse = await axios.get(`${BASE_URL}/air_pollution`, {
          params: {
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            appid: API_KEY
          }
        });
        setWeatherData({
          city: response.data.name,
          temperature: Math.round(response.data.main.temp),
          status: response.data.weather[0].main,
          tempRange: {
            min: Math.round(response.data.main.temp_min),
            max: Math.round(response.data.main.temp_max)
          },
          airQuality: airQualityResponse.data.list[0].main.aqi
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  const { city, temperature, status, tempRange, airQuality } = weatherData;

  const getAirQualityStatus = (aqi) => {
    if (aqi === 1) return 'Good';
    if (aqi === 2) return 'Fair';
    if (aqi === 3) return 'Moderate';
    if (aqi === 4) return 'Poor';
    return 'Very Poor';
  };

  return (
    <WeatherContainer>
      <CityName>{city}</CityName>
      <Temperature>{temperature}°C</Temperature>
      <WeatherStatus>{status} ({tempRange.min}°C - {tempRange.max}°C)</WeatherStatus>
      <AirQuality>
        Air Quality: {airQuality} - {getAirQualityStatus(airQuality)}
      </AirQuality>
    </WeatherContainer>
  );
};

export default WeatherDisplay;

