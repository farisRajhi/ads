import axios from 'axios'

// Listeners that get notified when location tracking completes
const locationListeners: Array<() => void> = []

export function onLocationTracked(callback: () => void) {
  locationListeners.push(callback)
}

function notifyListeners() {
  locationListeners.forEach(cb => cb())
}

// Track visitor location: try GPS first for accuracy, fall back to IP geolocation
export function trackLocation() {
  if (!navigator.geolocation) {
    trackByIP()
    return
  }

  // Don't track IP immediately — wait to see if GPS succeeds first
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      // GPS succeeded — use precise coordinates only (no IP duplicate)
      try {
        await axios.post('/api/analytics/track-precise-location', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
        notifyListeners()
      } catch (error) {
        console.warn('Precise location tracking failed:', error)
        await trackByIP()
      }
    },
    async () => {
      // GPS denied/unavailable — fall back to IP
      await trackByIP()
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

async function trackByIP() {
  try {
    await axios.post('/api/analytics/track-location')
    notifyListeners()
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
