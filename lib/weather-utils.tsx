import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning, CloudDrizzle } from "lucide-react"

export function getWeatherIcon(weatherCode: number, size = 24) {
  // WMO Weather interpretation codes
  if (weatherCode === 0 || weatherCode === 1) {
    return <Sun className="w-6 h-6" style={{ width: size, height: size }} />
  } else if (weatherCode === 2 || weatherCode === 3) {
    return <Cloud className="w-6 h-6" style={{ width: size, height: size }} />
  } else if (
    weatherCode === 45 ||
    weatherCode === 48 ||
    weatherCode === 51 ||
    weatherCode === 53 ||
    weatherCode === 55
  ) {
    return <CloudDrizzle className="w-6 h-6" style={{ width: size, height: size }} />
  } else if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return <CloudRain className="w-6 h-6" style={{ width: size, height: size }} />
  } else if (
    weatherCode === 71 ||
    weatherCode === 73 ||
    weatherCode === 75 ||
    weatherCode === 77 ||
    weatherCode === 85 ||
    weatherCode === 86
  ) {
    return <CloudSnow className="w-6 h-6" style={{ width: size, height: size }} />
  } else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
    return <CloudRain className="w-6 h-6" style={{ width: size, height: size }} />
  } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    return <CloudLightning className="w-6 h-6" style={{ width: size, height: size }} />
  }
  return <Cloud className="w-6 h-6" style={{ width: size, height: size }} />
}

export function getWeatherDescription(weatherCode: number): string {
  // WMO Weather interpretation codes
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  }

  return descriptions[weatherCode] || "Unknown"
}
