"use client"

import { useState, useEffect } from "react"
import { Cloud } from "lucide-react"
import SearchBar from "@/components/search-bar"
import CurrentWeather from "@/components/current-weather"
import ForecastGrid from "@/components/forecast-grid"
import LoadingState from "@/components/loading-state"
import { ThemeToggle } from "@/components/theme-toggle"

type WeatherData = {
  latitude: number
  longitude: number
  timezone: string
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState("New York")

  useEffect(() => {
    fetchWeather(40.7128, -74.006, "New York")
  }, [])

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
      )

      if (!response.ok) throw new Error("Failed to fetch weather")

      const data = await response.json()
      setWeatherData(data)
      setLocation(cityName)
    } catch (err) {
      setError("Could not fetch weather data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      // Geocode the location using Open-Meteo Geocoding API
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query,
        )}&count=1&language=en&format=json`,
      )

      if (!geoResponse.ok) throw new Error("Location not found")

      const geoData = await geoResponse.json()

      if (!geoData.results || geoData.results.length === 0) {
        setError("Location not found. Please try another search.")
        setLoading(false)
        return
      }

      const result = geoData.results[0]
      const cityName = `${result.name}${result.admin1 ? ", " + result.admin1 : ""}${
        result.country ? ", " + result.country : ""
      }`

      await fetchWeather(result.latitude, result.longitude, cityName)
    } catch (err) {
      setError("Could not find location. Please try again.")
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary via-chart-2 to-chart-4 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-card-foreground">WeatherHub</h1>
            </div>
            <ThemeToggle />
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingState />}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {weatherData && !loading && (
          <>
            <div className="mb-8">
              <CurrentWeather data={weatherData.current} location={location} timezone={weatherData.timezone} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">5-Day Forecast</h2>
              <ForecastGrid data={weatherData.daily} />
            </div>
          </>
        )}
      </div>
    </main>
  )
} 