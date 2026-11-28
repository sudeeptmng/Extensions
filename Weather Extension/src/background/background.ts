import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage"
import { fetchWeatherData } from "../utils/api"

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: "",
    tempScale: "metric",
  })

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  })

  chrome.alarms.create({
    periodInMinutes: 1,
  })
})

chrome.contextMenus.onClicked.addListener((event) => {
  const selectedText = event.selectionText
  if (!selectedText) return
  getStoredCities().then((cities) => {
    setStoredCities([...cities, selectedText])
  })
})

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === "") {
      return
    }
    fetchWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp)
      const symbol = options.tempScale === "metric" ? "\u2103" : "\u2109"
      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      })
    })
  })
})
