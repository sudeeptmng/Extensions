import {
  getStoredCities,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage"

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
})

chrome.contextMenus.onClicked.addListener((event) => {
  const selectedText = event.selectionText

  if (!selectedText) return

  getStoredCities().then((cities) => {
    setStoredCities([...cities, selectedText])
  })
})
