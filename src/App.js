import React, { useState } from "react";

// The api object consists of key and API base
const api = {
  key: "d2fb658252a5070ca330de91d0d09730",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // fetches the input from the search bar from the API and sets the date and weather to that value
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // index of the array will be a day from the seven days, so it will get us the Day out of the Days
    let day = days[d.getDay()];
    // It will return a number from 1 to 31
    let date = d.getDate();
    // It will return a number from 0 to 11
    let month = months[d.getMonth()];
    // This will get us the year
    let year = d.getFullYear();
    //  This will return us a template string with all the values
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      // Depending on the type of weather, the className will change, so will the background picture
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            // we get the value of the input we typed in, and we set it to query
            onChange={(e) => setQuery(e.target.value)}
            // and then we bind the value
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              {/* We use the dateBuilder function with a new Date */}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              {/* We Round the temperature */}
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
