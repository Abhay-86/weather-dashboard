"use client"

import { getWeatherIcon, getWeatherDescription } from "@/lib/weather-utils"
import { Card, CardContent } from "@/components/ui/card"

interface ForecastGridProps {
  data: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

export default function ForecastGrid({ data }: ForecastGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {data.time.slice(1, 6).map((date, index) => {
        const dateObj = new Date(date)
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" })
        const monthDay = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })

        return (
          <Card
            key={index}
            className="bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/20"
          >
            <CardContent className="p-4">
              <div className="mb-4">
                <p className="font-semibold text-card-foreground">{dayName}</p>
                <p className="text-sm text-muted-foreground">{monthDay}</p>
              </div>

              <div className="flex justify-center mb-4 text-primary">
                {getWeatherIcon(data.weather_code[index + 1], 40)}
              </div>

              <p className="text-xs text-muted-foreground text-center mb-4 capitalize">
                {getWeatherDescription(data.weather_code[index + 1])}
              </p>

              <div className="flex justify-between items-center bg-secondary rounded-lg p-3">
                <div>
                  <p className="text-xs text-muted-foreground">High</p>
                  <p className="text-lg font-bold text-card-foreground">
                    {Math.round(data.temperature_2m_max[index + 1])}°
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Low</p>
                  <p className="text-lg font-bold text-card-foreground">
                    {Math.round(data.temperature_2m_min[index + 1])}°
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
