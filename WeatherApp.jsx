import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.png';
import wind from '../Assets/wind.png';
import snow from '../Assets/snow.png';

const WeatherApp = () => {
    let api_key = "254a5a6764ed2c59398121cd8656c252";
    const [wicon, setWincon] = useState(cloud);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Imperial&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        if (humidity[0]) {
            humidity[0].innerHTML = data.main.humidity + "%";
        }
        if (wind[0]) {
            wind[0].innerHTML = Math.floor(data.wind.speed) + "Km/h";
        }
        if (temprature[0]) {
            temprature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        }
        if (location[0]) {
            location[0].innerHTML = data.name;
        }
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWincon(clear);
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWincon(cloud);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWincon(drizzle);
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWincon(drizzle);
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWincon(rain);
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWincon(rain);
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWincon(snow);
        }
        else {
            setWincon(clear);
        }

    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder="search" />
                <div className="search-icon" onClick={() => search()}>
                    <img src={searchIcon} alt="Search Icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp"></div>
            <div className="weather-location"></div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage"></div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate"></div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
