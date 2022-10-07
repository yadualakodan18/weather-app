import { useState } from 'react';
import { WEATHER_API_URL,WEATHER_API_KEY } from './api';
import './App.css'
import CurrentWeather from './components/current-weather/current-weather';
import Search from "./components/search/Search";
import Forecast from "./components/forecast/forecast";


function App() {  
  const [currentWeather,setCurrentWeather]=useState(null)
  const [forecast,setForecast]=useState(null)
  const handleOnSearchChange=(searchData)=>{
   const [lat,lon]=searchData.value.split(" ");
const currentWeatherFetch=fetch(
  `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
const forecastFetch=fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
Promise.all([currentWeatherFetch,forecastFetch])
.then(async(response)=>{
  const weatherResponse=await response[0].json();
  const forecastResponse=await response[1].json();
  setCurrentWeather({city:searchData.label,...weatherResponse})
  setForecast({city:searchData.label,...forecastResponse})
})
.catch(console.log);

  }
  
  return (
    <div className="container">

<Search onSearchChange={handleOnSearchChange}/>
{CurrentWeather && <CurrentWeather data={currentWeather}/>}
{forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
