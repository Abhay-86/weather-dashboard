"use client"

import { Wind, Droplets, Gauge } from "lucide-react"
import { getWeatherIcon, getWeatherDescription } from "@/lib/weather-utils"

interface CurrentWeatherProps {
  data: {
    temperature_2m: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  location: string
  timezone: string
}

export default function CurrentWeather({ data, location, timezone }: CurrentWeatherProps) {
  const now = new Date()
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  })

  const weatherDescription = getWeatherDescription(data.weather_code)

  return (
    <div className="bg-gradient-to-br from-primary via-chart-2 to-chart-4 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">{location}</h2>
          <p className="text-white/80">{timeString}</p>
        </div>
        <div className="p-3 bg-white/20 backdrop-blur rounded-full">
          {getWeatherIcon(data.weather_code, 48)}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-7xl font-bold mb-2">{Math.round(data.temperature_2m)}°</div>
        <p className="text-xl text-white/80 capitalize">{weatherDescription}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-sm text-white/80">Humidity</span>
          </div>
          <p className="text-2xl font-semibold">{data.relative_humidity_2m}%</p>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-sm text-white/80">Wind</span>
          </div>
          <p className="text-2xl font-semibold">{Math.round(data.wind_speed_10m)} km/h</p>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4" />
            <span className="text-sm text-white/80">Feels Like</span>
          </div>
          <p className="text-2xl font-semibold">{Math.round(data.temperature_2m - 2)}°</p>
        </div>
      </div>
    </div>
  )
}
