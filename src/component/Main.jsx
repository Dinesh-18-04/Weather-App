import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import img from "../assest/weather.jpg";
import sea from "../assest/sea.jpeg";
import axios from "axios";
import { useEffect } from "react";

const Main = () => {
  const [city, setcity] = useState("");
  function handlecity(evt) {
    setcity(evt.target.value);
  }

  const [weather, setweather] = useState("Sunny");
  const [temp, settemp] = useState("273.15");
  var temp1 = Math.round(temp - 273.15);
  const [speed, setspeed] = useState("0");
  var speed1 = Math.round(speed * 3.6);
  const [humi, sethumi] = useState("0");
  const [minte, setminte] = useState("273.15");
  var minte1 = Math.round(minte - 273.15);
  const [maxte, setmaxte] = useState("273.15");
  var maxte1 = Math.round(maxte - 273.15);
  const [desc, setdesc] = useState("Na");
  const [press, setpress] = useState("0");
  const [name, setname] = useState("");

  function getweather() {
    const weatherdata = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8aeca586e066e6c46e5e9bdf5331205`
    );
    weatherdata
      .then(function (success) {
        console.log(success.data);
        setweather(success.data.weather[0].main);
        settemp(success.data.main.temp);
        setspeed(success.data.wind.speed);
        sethumi(success.data.main.humidity);
        setminte(success.data.main.temp_min);
        setmaxte(success.data.main.temp_max);
        setdesc(success.data.weather[0].description);
        setpress(success.data.main.pressure);
        setname(success.data.name);
      })
      .catch(function (failed) {
        <h1>Enter the Name Correctly</h1>;
      });
  }

  const [dayTime, setDayTime] = useState({
    day: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthsOfYear = [
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

      const day = daysOfWeek[currentDate.getDay()];
      const date = `${currentDate.getDate()} ${
        monthsOfYear[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;

      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;

      setDayTime({
        day,
        date,
        time,
      });
    };

    const interval = setInterval(updateTime, 1000);

    updateTime();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:flex m-5">
      <div
        style={{
          backgroundImage: `url(${sea})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" relative h-[790px] bg-sky-400 rounded-s-lg p-5 md:w-[30%] "
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity with alpha (e.g., 0.5)
            zIndex: 1, // Ensure the overlay is below the content
          }}
        ></div>
        <div style={{ zIndex: 2 }} className="absolute top-5 space-y-4">
          <h1 className="text-6xl font-bold text-white">{dayTime.day}</h1>
          <h2 className="text-5xl font-semibold text-white">{dayTime.date}</h2>
          <h2 className="text-4xl font-semibold text-white">{dayTime.time}</h2>
          <h3 className="text-2xl font-semibold text-white">
            <FaLocationDot className="inline" /> {name}
          </h3>
        </div>
        <div style={{ zIndex: 3 }} className="absolute bottom-5">
          <h1 className="text-9xl font-bold text-white  ">{temp1}°C</h1>
          <h3 className="text-5xl font-semibold text-white ">{weather}</h3>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="md:w-[70%] bg-[#202731] rounded-e-lg"
      >
        <div className="flex justify-center items-center mt-10 ">
          <input
            onChange={handlecity}
            type="text"
            className=" capitalize px-2 outline-none py-1.5 rounded-s-lg w-[70%]   "
            placeholder="Enter the Location"
          />
          <button
            onClick={getweather}
            className="bg-black py-1.5 rounded-e-lg text-white p-2 font-semibold"
          >
            Get Report
          </button>
        </div>
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-3 gap-5 md:p-[150px]">
          <div className="flex w-[250px] flex-col items-center space-y-3 bg-white/30 backdrop-blur-lg rounded-lg p-4">
            <h1 className="text-4xl font-bold text-white">Pressure</h1>
            <p className="text-2xl font-bold text-white">{press} mb</p>
          </div>
          <div className="flex w-[250px] flex-col items-center space-y-3 bg-white/30 backdrop-blur-lg rounded-lg p-4">
            <h1 className="text-4xl font-bold text-white">Humidity</h1>
            <p className="text-2xl font-bold text-white">{humi}%</p>
          </div>
          <div className="flex w-[250px] flex-col items-center space-y-3 bg-white/30 backdrop-blur-lg rounded-lg p-4">
            <h1 className="text-4xl font-bold text-white">Wind</h1>
            <p className="text-2xl font-bold text-white">{speed1} Km/h</p>
          </div>

          <div className="flex w-[250px] flex-col items-center space-y-3 bg-white/30 backdrop-blur-lg rounded-lg p-4">
            <h1 className="text-4xl font-bold text-white">Min-Temp</h1>
            <p className="text-2xl font-bold text-white">{minte1}℃</p>
          </div>
          <div className="flex w-[250px] flex-col items-center space-y-3 bg-white/30 backdrop-blur-lg rounded-lg p-4">
            <h1 className="text-4xl font-bold text-white">Max-Temp</h1>
            <p className="text-2xl font-bold text-white">{maxte1}℃</p>
          </div>
          <div className="flex w-[250px] flex-col items-center space-y-3 bg-white/30 backdrop-blur-lg rounded-lg p-4">
            <h1 className="text-4xl font-bold text-white">Description</h1>
            <p className="text-2xl font-bold text-white">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
