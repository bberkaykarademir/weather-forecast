import React, { useEffect, useState } from "react";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [country, setCountry] = useState("Turkey");
  const [city, setCity] = useState("Istanbul");
  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=3ad9369f5dd481e8bc0a070cb5745947&units=metric`
    );
    if (res.ok) {
      const data = await res.json();
      setWeather(data);
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  const prepareCountry = (e) => {
    setCountry(e.target.value);
  };
  const prepareCity = (e) => {
    setCity(e.target.value);
  };

  const newLoc = (e) => {
    e.preventDefault();
    fetchWeather();
    setIsModal(false);
  };

  const closeHandler = () => {
    setIsModal(false);
    setCity("");
    setCountry("");
  };

  if (isModal) {
    return (
      <div className="card">
        <form onSubmit={newLoc}>
          <h2>Choose Location</h2>
          <label htmlFor="city">City:</label>
          <input
            onChange={(e) => {
              prepareCity(e);
            }}
            type="text"
            id="city"
          />
          <label htmlFor="country">Country:</label>
          <input
            onChange={(e) => {
              prepareCountry(e);
            }}
            type="text"
            id="country"
          />
          <button className="save">Save</button>
        </form>
        <button
          className="close"
          onClick={() => {
            closeHandler();
          }}
        >
          X
        </button>
      </div>
    );
  } else {
    return (
      <div className="card">
        <h1 className="city">{weather ? weather.name : null}</h1>
        <h3 className="description">
          {weather ? weather.weather[0].description : null}
        </h3>
        <h2 className="temperature">{weather ? weather.main.temp : null}</h2>
        <ul>
          <li>Humidity: {weather ? weather.main.humidity : null}</li>
          <li>Wind Deg: {weather ? weather.wind.deg : null}</li>
          <li>Wind Speed: {weather ? weather.wind.speed : null}</li>
          <button
            className="change"
            onClick={() => {
              setIsModal(true);
            }}
          >
            Change Location
          </button>
        </ul>
      </div>
    );
  }
};

export default App;
