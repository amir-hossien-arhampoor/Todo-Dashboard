import { useState } from "react"
import Loader from "../components/Loader"
import { useSideBar } from "../components/SideBarProvider"


export default function Weather() {
  const API_KEY = "96b0a02496496b72c1aedf435b487657"
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("")
  const [cityInput, setCityInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchSubmit, setSearchSubmit] = useState(false)
  const { openSideBar } = useSideBar()


  const sendCity = async (e) => {
    setSearchSubmit(true)
    e.preventDefault()
    try {
      setCity("")
      setError("")
      setLoading(true)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if (!response.ok) {
        throw new Error("City not found!")
      }
      const data = await response.json()
      setWeather(data)
      setCityInput(false)
    } catch (error) {
      setError(error.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }
  function selectCity(e) {
    const city = e.target.value
    setCity(city)
  }
  return (
    <>
      {loading && <Loader />}
      <section className="weather-app">
        <div className="weather-header">
          <i className="fa-solid fa-location-dot"></i>
          <h3>{weather ? weather.name : "Location"}</h3>
          <div className="select-city">
            <i className={`fa-solid fa-angle-${cityInput ? "down" : "right"}`} onClick={() => setCityInput(prev => !prev)}></i>
            <div className={`select-btn ${cityInput ? "shown" : "hidden"}`}>
              <p >Select city :</p>
              <form onSubmit={sendCity}>
                <input type="text" name="cityName" value={city} onChange={selectCity} required />
              </form>
            </div>
          </div>
          <i className="fa-solid fa-bars side-menu-btn" onClick={openSideBar}></i>
        </div>
        {!searchSubmit && <p className="starting-massage"><i className="fa-solid fa-arrow-turn-up"></i> Select location from top to see the weather condition</p>}
        {error && <p className="starting-massage">{error}</p>}
        {weather && <div className="weather-image">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        </div>}
        {weather && <div className="weather-info">
          <div className="weather-info-wrapper">
            <p className="date">Today</p>
            <h1 className="temperature-number">{weather.main.temp}<span>o</span></h1>
            <span className="status">{weather.weather[0].description}</span>
            <div className="wind-status weather-detail">
              <i className="fa-solid fa-wind"></i>
              <p>Wind</p>
              <span>|</span>
              <h4 className="wind-speed">{weather.wind.speed} km/h</h4>
            </div>
            <div className="humidity-status weather-detail">
              <i className="fa-solid fa-droplet"></i>
              <p>Hum</p>
              <span>|</span>
              <h4 className="humidity-percentage">{weather.main.humidity} %</h4>
            </div>
          </div>
        </div>}
      </section>
    </>
  )
}


