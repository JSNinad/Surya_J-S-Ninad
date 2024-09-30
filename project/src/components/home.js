import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toJson } from 'plain-text-data-to-json';

function Home(){
 
  const [weatherData, setWeatherData] = useState(null);
  const [weatherfetch, setWeatherfetch] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-current-weather.txt'
      );
       const data=toJson(response.data)
      setWeatherData(data);
      console.log(weatherData)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchWeatherData()
  })


  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-forecast.txt'
      );
       const data=toJson(response.data)
      setWeatherfetch(data);
      console.log(weatherfetch)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchWeather()
  })

  

  return (
    <div className=' text-white' style = {{
      backgroundImage:
      "url('/Assets/Background .png')",
      backgroundRepeat: "no-repeat",
   }}>
      <main>
        <section className='min-h-screen justify-center items-center flex'>
        {weatherData && (
          <div className='text-center'>
            <h1 className='text-5xl font-bold mb-3'>{weatherData.place}</h1>
            <h1 className='text-7xl font-bold text-center mb-3'>{weatherData.temperature}</h1>
            <div className='flex text-3xl mb-3'>
            <h2 className='mr-3'>{weatherData.weather_summary}</h2>
            <p className='space-x-2'>{weatherData.minimum_temperature}/{weatherData.maximum_temperature}</p>

            </div>
            <div className='flex text-2xl'>
            <p className='mr-2'>Air quality :</p>
            <p>{weatherData.air_quality}-{weatherData.air_quality_summary}</p>

            </div>
          </div>
        )}
        {error && <p>Error fetching data: {error.message}</p>}
        </section>
        <section className='min-h-screen'>
            <div>
              <div className='flex justify-center items-center mt-5'>
                 <div className='grid grid-cols-5 space-x-6 bg-slate-900/20'>
                    <div className='col-span-1'>
                      <h1>Now</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>34</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>1:00pm</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>34</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>Now</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>34</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>Now</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>34</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>Now</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>34</h1>
                    </div>
                 </div>
              </div>
          {/* {weatherfetch && (
          <div className='text-center'>
            <h1 className='text-5xl font-bold mb-3'>{weatherfetch.category}</h1>
            <h1 className='text-7xl font-bold text-center mb-3'>{weatherfetch.time}</h1>
            <div className='flex text-3xl mb-3'>
            <h2 className='mr-3'>{weatherfetch.temperature}</h2>
            <h2 className='mr-3'>{weatherfetch.weather}</h2>
            </div>
          </div>
        )}
        {error && <p>Error fetching data: {error.message}</p>} */}
            </div>
        </section>
      </main>
    </ div>
  );
}

export default Home;