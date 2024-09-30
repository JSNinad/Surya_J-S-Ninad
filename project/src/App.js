import "./index.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toJson } from "plain-text-data-to-json";

function App() {
  const [curentPlace, setcurrentPlace] = useState();
  const [curentTemp, setcurrentTemp] = useState();
  const [weather_summary, setweather_summary] = useState();
  const [minimum_temp, setminimum_temp] = useState();
  const [maximum_temp, setmaximum_temp] = useState();
  const [air_quality, setair_quality] = useState();
  const [air_quality_summary, setairquality_summary] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const curr_result = await axios.get(
        "https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-current-weather.txt"
      );

      console.log(curr_result.data);

      const newJSon = toJson(curr_result.data);

      setcurrentPlace(newJSon.place);
      setcurrentTemp(newJSon.temperature);
      setweather_summary(newJSon.setweather_summary);
      setminimum_temp(newJSon.minimum_temperature);
      setmaximum_temp(newJSon.maximum_temperature);
      setair_quality(newJSon.air_quality);
      setairquality_summary(newJSon.air_quality_summary);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fectchData1 = async () => {
      const curr_result1 = await axios.get(
        "https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-forecast.txt"
      );
      console.log(curr_result1)

    };

   

    fectchData1();
  }, []);

  return (
    <>
      <div class="bg-gray-600 h-screen flex items-center justify-center" style={{ backgroundImage: "url('Background .png')",backgroundRepeat:"no-repeat"}}  >
        <center>
          <h2 class="text-white text-5xl font-bold">{curentPlace}</h2>
          <h2 class="text-white text-5xl font-bold">{curentTemp} C</h2>
          <h3 class="text-white text-2xl">{weather_summary}</h3>
          <h3 class="text-white text-2xl">
            Mostly cloudy {minimum_temp} /{maximum_temp}{" "}
          </h3>
          <h3 class="text-white text-2xl">
            Air Quality: {air_quality} - {air_quality_summary}
          </h3>
       

        

        <div class="h-1/4 w-100vw bg-white border-slate-600	">
        <div className='flex justify-center items-center mt-5 '>
                 <div className='grid grid-cols-5 space-x-6'>
                    <div className='col-span-1'>
                      <h1>Now</h1>
                      <image src= "./cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>33</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>1:00pm</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>34</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>2:00pm</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>44</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>3:00pm</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>38</h1>
                    </div>
                    <div className='col-span-1'>
                      <h1>4:00pm</h1>
                      <image src= "./Assets/cloudy .svg" alt="img" height="250px" width="250px"/>
                      <h1>41</h1>
                    </div>
                 </div>
              </div>
        </div>
        </center>
      </div>
    </>
  );
}

export default App;
