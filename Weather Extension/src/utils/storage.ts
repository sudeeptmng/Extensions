import { OpenWeatherTempScale } from "./api"

export interface LocalStorage {
  cities?: string[]
  options?: LocalStorageOtions
}

export interface LocalStorageOtions {
  homeCity: string
  tempScale: OpenWeatherTempScale
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(
      vals,

      () => {
        resolve()
      },
    )
  })
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? [])
    })
  })
}

export function setStoredOptions(options: LocalStorageOtions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOtions> {
  const keys: LocalStorageKeys[] = ["options"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => [
      resolve(res.options ?? { homeCity: "", tempScale: "metric" }),
    ])
  })
}
