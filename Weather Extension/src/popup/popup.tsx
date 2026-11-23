import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import "./popup.css"
import { fetchWeatherData } from "../utils/api"
import WeatherCard from "./WeatherCard"

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Kathmandu" />
      <WeatherCard city="Tokyo" />
    </div>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<App />)
