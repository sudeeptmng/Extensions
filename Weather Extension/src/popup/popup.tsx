import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import "./popup.css"
import { fetchWeatherData } from "../utils/api"
import "@fontsource/roboto"
import WeatherCard from "./WeatherCard"
import { Box, IconButton, Paper, InputBase } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { setStoredCities, getStoredCities } from "../utils/storage"

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
  }, [])

  const [cityInput, setCityInput] = useState<string>("")

  const handleCityButtonClick = () => {
    if (cityInput === "") {
      return
    }

    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput("")
    })
  }

  const handleCityDeleteButton = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  return (
    <Box sx={{ mx: "8px", my: "16px" }}>
      <Paper>
        <Box
          sx={{ px: "15px", my: "5px", display: "flex", alignItems: "center" }}
        >
          <InputBase
            placeholder="Add a city name"
            sx={{ flex: 1 }}
            value={cityInput}
            onChange={(event) => {
              setCityInput(event.target.value)
            }}
          />
          <IconButton onClick={handleCityButtonClick}>
            <AddIcon />
          </IconButton>
        </Box>
      </Paper>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteButton(index)}
        />
      ))}
      <Box sx={{ height: "16px" }}></Box>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<App />)
