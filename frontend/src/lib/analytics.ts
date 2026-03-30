import axios from 'axios'

// Track visitor location: try GPS first for accuracy, fall back to IP geolocation
export function trackLocation() {
  if (!navigator.geolocation) {
    // No GPS support — use IP geolocation
    trackByIP()
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      // GPS succeeded — use precise coordinates (avoids ISP city misdetection)
      try {
        await axios.post('/api/analytics/track-precise-location', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
      } catch (error) {
        console.warn('Precise location tracking failed:', error)
        trackByIP()
      }
    },
    () => {
      // GPS denied/unavailable — fall back to IP
      trackByIP()
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

async function trackByIP() {
  try {
    await axios.post('/api/analytics/track-location')
  } catch (error) {
    console.warn('IP location tracking failed:', error)
  }
}

// Google Ads conversion tracking helper
export function trackConversion(conversionLabel: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'conversion', {
      send_to: `AW-XXXXXXXXXX/${conversionLabel}`,
    })
  }
}

// GA4 custom event tracking
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, params)
  }
}
