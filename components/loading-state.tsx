"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cloud } from "lucide-react"

export default function LoadingState() {
  return (
    <div className="space-y-8">
      {/* Current Weather Loading */}
      <Card className="p-8 bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-4/20 animate-pulse">
        <CardContent className="p-0">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-primary/20 rounded"></div>
              <div className="h-4 w-24 bg-primary/20 rounded"></div>
            </div>
            <div className="p-3 bg-primary/20 rounded-full">
              <Cloud className="w-12 h-12 text-primary/40" />
            </div>
          </div>
          <div className="mb-8">
            <div className="h-16 w-32 bg-primary/20 rounded mb-2"></div>
            <div className="h-6 w-40 bg-primary/20 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-primary/20 rounded-lg p-4 space-y-2">
                <div className="h-4 w-20 bg-primary/30 rounded"></div>
                <div className="h-8 w-16 bg-primary/30 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Loading */}
      <div>
        <div className="h-8 w-48 bg-muted rounded mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                </div>
                <div className="h-3 w-20 bg-muted rounded mx-auto"></div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <div className="h-3 w-8 bg-muted-foreground/20 rounded"></div>
                      <div className="h-5 w-10 bg-muted-foreground/20 rounded"></div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="h-3 w-6 bg-muted-foreground/20 rounded ml-auto"></div>
                      <div className="h-5 w-8 bg-muted-foreground/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
