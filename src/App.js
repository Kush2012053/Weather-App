import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [inputName, setInputName] = useState("");
  const [name, setName] = useState("Agra");
  const [weather, setWeather] = useState({
    main: "",
    description: "",
    icon: "",
    temp: "",
    temp_min: "",
    temp_max: "",
  });
  useEffect(() => {
    const everyRender = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=542ad7a41a703c85efd8cac98393e6d8`;
      const request = axios.get(url);
      const response = await request;
      console.log(response);
      setWeather({
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        temp: (response.data.main.temp - 273.15).toFixed(2),
        temp_min: (response.data.main.temp_min - 273.15).toFixed(2),
        temp_max: (response.data.main.temp_max - 273.15).toFixed(2),
      });
    };
    everyRender();
  }, [name]);

  const changeInput = (e) => {
    setInputName(e.target.value);
  };
  const getData = () => {
    setName(inputName);
  };
  return (
    <>
      <div className="outer-div">
        <div className="inner-div">
          <div className="outer-input">
            <input
              type="text"
              placeholder="Enter a city name"
              className="main-input"
              onChange={changeInput}
            />
          </div>
          <div>
            <input
              type="button"
              value="Search"
              className="search-button"
              onClick={getData}
            />
          </div>
          <h2 className="gap zero">{name}</h2>
          <h4 className="gap zero">
            {weather.main}
            <br />
            {weather.description}
          </h4>
          <div className="outer-img">
            <div className="inner-img">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                height="100%"
                width="100%"
              />
            </div>
          </div>
          <h1 className="zero">{weather.temp}&#8451;</h1>
          <div className="overall">
            <div className="min">
              <h4 className="zero">min</h4>
              <h3 className="zero">{weather.temp_min}&#8451;</h3>
            </div>
            <div className="max">
              <h4 className="zero">max</h4>
              <h3 className="zero">{weather.temp_max}&#8451;</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
