
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faWind, faDroplet, faCompass } from '@fortawesome/free-solid-svg-icons';
import App from '../App';

const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [climateDetails, setClimateDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [showExtendedForecast, setShowExtendedForecast] = useState(false);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currentRes = await axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
      const [forecastRes, climateRes] = await Promise.all([
        axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/air_pollution?lat=${currentRes.data.coord.lat}&lon=${currentRes.data.coord.lon}&appid=${API_KEY}`)
      ]);
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
      setClimateDetails(climateRes.data);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, fetchWeatherData]);

  const renderCurrentWeather = () => {
    if (!currentWeather) return null;
    return (
      <div className="current-weather">
        <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
        <div className="weather-main">
          <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description} />
          <p className="temperature">{Math.round(currentWeather.main.temp)}°C</p>
        </div>
        <p className="description">{currentWeather.weather[0].description}</p>
        <p className="wind">Wind: {currentWeather.wind.speed} m/s</p>
      </div>
    );
  };

  const renderForecast = () => {
    if (!forecast) return null;
    const forecastDays = showExtendedForecast ? 15 : 7;
    return (
      <div className="forecast">
        <h3>Forecast</h3>
        <div className="forecast-list">
          {forecast.list.slice(0, forecastDays).map((day, index) => (
            <div key={index} className="forecast-item">
              <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
              <p>{Math.round(day.main.temp)}°C</p>
            </div>
          ))}
        </div>
        <button onClick={() => setShowExtendedForecast(!showExtendedForecast)}>
          {showExtendedForecast ? '7-day forecast' : '15-day forecast'}
        </button>
      </div>
    );
  };

  const renderClimateDetails = () => {
    if (!climateDetails || !currentWeather) return null;
    return (
      <div className="climate-details">
        <h3>Additional Weather Details</h3>
        <div className="details-grid">
          <div className="detail-item">
            <FontAwesomeIcon icon={faSun} />
            <p>Sunrise: {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faMoon} />
            <p>Sunset: {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faWind} />
            <p>Wind: {currentWeather.wind.speed} m/s</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faDroplet} />
            <p>Humidity: {currentWeather.main.humidity}%</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faCompass} />
            <p>Pressure: {currentWeather.main.pressure} hPa</p>
          </div>
        </div>
        <div className="air-quality">
          <h4>Air Quality Index: {climateDetails.list[0].main.aqi}</h4>
          <p>CO: {climateDetails.list[0].components.co} μg/m³</p>
          <p>NO2: {climateDetails.list[0].components.no2} μg/m³</p>
          <p>O3: {climateDetails.list[0].components.o3} μg/m³</p>
          <p>PM2.5: {climateDetails.list[0].components.pm2_5} μg/m³</p>
        </div>
      </div>
    );
  };

  return (
    <div className="weather-app">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData()}
      />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {renderCurrentWeather()}
      {renderForecast()}
      {renderClimateDetails()}
    </div>
  );
}

export default WeatherApp;


