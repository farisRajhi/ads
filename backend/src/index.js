const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const axios = require('axios')
require('dotenv').config()

const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Trust proxy for getting real IP behind reverse proxies
app.set('trust proxy', true)

// ─── IP Geolocation Tracking ───────────────────────────────
app.post('/api/analytics/track-location', async (req, res) => {
  try {
    // Get visitor's IP address
    let ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip

    // On localhost, get the public IP to test geolocation
    if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
      try {
        const pubIp = await axios.get('https://api.ipify.org?format=json', { timeout: 5000 })
        ip = pubIp.data.ip
      } catch {
        return res.json({ success: true, message: 'Could not resolve public IP' })
      }
    }

    // Call free geolocation API (ip-api.com — 45 req/min, no key needed)
    const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`, {
      timeout: 5000,
    })

    const geo = geoResponse.data

    if (geo.status === 'success') {
      await prisma.visitorLocation.create({
        data: {
          ip: ip,
          country: geo.country || null,
          city: geo.city || null,
          region: geo.regionName || null,
          latitude: geo.lat || null,
          longitude: geo.lon || null,
          userAgent: req.headers['user-agent'] || null,
          page: req.headers['referer'] || null,
        },
      })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Location tracking error:', error.message)
    res.json({ success: false })
  }
})

// ─── HTML5 Geolocation (Precise GPS) ───────────────────────
app.post('/api/analytics/track-precise-location', async (req, res) => {
  try {
    const { latitude, longitude, accuracy } = req.body

    if (latitude == null || longitude == null) {
      return res.status(400).json({ error: 'Missing coordinates' })
    }

    // Reverse geocode using free API to get city/country from GPS coords
    const geoResponse = await axios.get(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`,
      { timeout: 5000 }
    ).catch(() => null)

    const address = geoResponse?.data?.address || {}

    await prisma.visitorLocation.create({
      data: {
        ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'gps',
        country: address.country || null,
        city: address.city || address.town || address.village || null,
        region: address.state || null,
        latitude: latitude,
        longitude: longitude,
        userAgent: req.headers['user-agent'] || null,
        page: req.headers['referer'] || null,
        source: 'gps',
      },
    })

    res.json({ success: true, accuracy })
  } catch (error) {
    console.error('Precise location tracking error:', error.message)
    res.json({ success: false })
  }
})

// ─── Get Location Analytics ────────────────────────────────
app.get('/api/analytics/locations', async (req, res) => {
  try {
    const locations = await prisma.visitorLocation.findMany({
      orderBy: { visitedAt: 'desc' },
      take: 100,
    })

    // Aggregate by country
    const countryStats = {}
    const cityStats = {}

    locations.forEach((loc) => {
      if (loc.country) {
        countryStats[loc.country] = (countryStats[loc.country] || 0) + 1
      }
      if (loc.city) {
        cityStats[loc.city] = (cityStats[loc.city] || 0) + 1
      }
    })

    res.json({
      total: locations.length,
      countries: Object.entries(countryStats)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      cities: Object.entries(cityStats)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      recent: locations.slice(0, 20),
    })
  } catch (error) {
    console.error('Analytics error:', error.message)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
})

// ─── Booking Endpoint ──────────────────────────────────────
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, service, preferredDate, message } = req.body

    if (!name || !email || !phone || !service) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        service,
        preferredDate: preferredDate || null,
        message: message || null,
      },
    })

    res.json({ success: true, booking })
  } catch (error) {
    console.error('Booking error:', error.message)
    res.status(500).json({ error: 'Failed to create booking' })
  }
})

// ─── Get Bookings ──────────────────────────────────────────
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(bookings)
  } catch (error) {
    console.error('Bookings error:', error.message)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
