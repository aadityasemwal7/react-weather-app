import React, { useState } from 'react';
import "./WeatherApp.css";

import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const WeatherApp = () => {
  const api_key = "62c9718ee0614597f0692e741080504c";
  const [icon, setIcon] = useState(cloud_icon);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [error, setError] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // Optionally update body background for full-page effect
    document.body.className = theme === "dark" ? "light-mode" : "";
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      setError("Please enter a city name.");
      setTimeout(() => setError(""), 2000);
      return 0;
    }

    setLoading(true);
    setError("");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${api_key}&q=${element[0].value}`;
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod && data.cod !== 200) {
        setError("Oops! Can't find the city's weather");
        setLoading(false);
        setTimeout(() => setError(""), 3500);
        return;
      }

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-percent");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = `${data.main.humidity} %`;
      wind[0].innerHTML = `${data.wind.speed} km/hr`;
      temperature[0].innerHTML = `${data.main.temp}°c`;
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setIcon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setIcon(cloud_icon);
      }
      else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setIcon(drizzle_icon);
      }
      else if (data.weather[0].icon === "04d" || data.weather[0].icon === "02n") {
        setIcon(drizzle_icon);
      }
      else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setIcon(rain_icon);
      }
      else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setIcon(rain_icon);
      }
      else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setIcon(snow_icon);
      }
      else {
        setIcon(clear_icon);
      }
    } catch (error) {
      setError("Oops! Can't find the city's weather");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`container ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder="search"></input>
        <div className='search-icon'>
          <img onClick={search} src={search_icon} alt="search" />
        </div>
      </div>
      {error && (
        <div className="popup-error">
          {error}
        </div>
      )}
      {loading && (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      )}
      <div className='weather-image'>
        <img src={icon} height={150} width={150} alt="weather" />
      </div>
      <div className='weather-temp'>24° c</div>
      <div className='weather-location'>london</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} className='icon' alt="humidity" />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} className='icon' alt="wind" />
          <div className='data'>
            <div className='wind-percent'>18 km/hr</div>
            <div className='text'>wind speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp