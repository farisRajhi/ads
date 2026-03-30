import { useState, useEffect } from 'react'
import {
  Globe,
  MapPin,
  Users,
  Calendar,
  Clock,
  ArrowLeft,
  RefreshCw,
  Eye,
  BookOpen,
  TrendingUp,
} from 'lucide-react'
import axios from 'axios'
import { onLocationTracked } from '../lib/analytics'

interface LocationData {
  total: number
  countries: { name: string; count: number }[]
  cities: { name: string; count: number }[]
  recent: {
    id: number
    ip: string
    country: string | null
    city: string | null
    region: string | null
    latitude: number | null
    longitude: number | null
    visitedAt: string
    userAgent: string | null
    source: string
  }[]
}

interface Booking {
  id: number
  name: string
  email: string
  phone: string
  service: string
  preferredDate: string | null
  message: string | null
  createdAt: string
  status: string
}

const serviceLabels: Record<string, string> = {
  'general-checkup': 'فحص عام وتنظيف',
  'teeth-whitening': 'تبييض الأسنان',
  'dental-implants': 'زراعة الأسنان',
  'cosmetic': 'تجميل الأسنان',
  'pediatric': 'طب أسنان الأطفال',
  'emergency': 'طوارئ',
  'other': 'أخرى',
}

export default function AdminDashboard() {
  const [locations, setLocations] = useState<LocationData | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState<'locations' | 'bookings'>('locations')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [locRes, bookRes] = await Promise.all([
        axios.get('/api/analytics/locations'),
        axios.get('/api/bookings'),
      ])
      setLocations(locRes.data)
      setBookings(bookRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // Auto-refresh when a new location is tracked (e.g. user clicks "Allow" on GPS)
    onLocationTracked(() => fetchData())
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getMaxCount = (items: { count: number }[]) =>
    items.length > 0 ? Math.max(...items.map((i) => i.count)) : 1

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-dental-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">العودة للموقع</span>
            </a>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 bg-dental-600 hover:bg-dental-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            label="إجمالي الزيارات"
            value={locations?.total ?? 0}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            icon={<Globe className="w-5 h-5" />}
            label="الدول"
            value={locations?.countries.length ?? 0}
            color="bg-green-50 text-green-600"
          />
          <StatCard
            icon={<MapPin className="w-5 h-5" />}
            label="المدن"
            value={locations?.cities.length ?? 0}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            icon={<BookOpen className="w-5 h-5" />}
            label="الحجوزات"
            value={bookings.length}
            color="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('locations')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'locations'
                ? 'bg-dental-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            المواقع الجغرافية
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'bookings'
                ? 'bg-dental-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            الحجوزات
            {bookings.length > 0 && (
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-dental-600 animate-spin" />
          </div>
        ) : activeTab === 'locations' ? (
          <LocationsView locations={locations} formatDate={formatDate} getMaxCount={getMaxCount} />
        ) : (
          <BookingsView bookings={bookings} formatDate={formatDate} />
        )}
      </main>
    </div>
  )
}

/* ─── Stat Card ───────────────────────────────────── */
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString('ar-SA')}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

/* ─── Locations View ──────────────────────────────── */
function LocationsView({
  locations,
  formatDate,
  getMaxCount,
}: {
  locations: LocationData | null
  formatDate: (d: string) => string
  getMaxCount: (items: { count: number }[]) => number
}) {
  if (!locations) return null

  return (
    <div className="space-y-6">
      {/* Country & City Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Countries */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-dental-600" />
            <h2 className="text-lg font-bold text-gray-900">أعلى الدول زيارة</h2>
          </div>
          {locations.countries.length === 0 ? (
            <EmptyState text="لا توجد بيانات دول بعد" />
          ) : (
            <div className="space-y-3">
              {locations.countries.slice(0, 10).map((country, i) => (
                <BarRow
                  key={country.name}
                  rank={i + 1}
                  label={country.name}
                  count={country.count}
                  max={getMaxCount(locations.countries)}
                  color="bg-dental-500"
                />
              ))}
            </div>
          )}
        </div>

        {/* Cities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-dental-600" />
            <h2 className="text-lg font-bold text-gray-900">أعلى المدن زيارة</h2>
          </div>
          {locations.cities.length === 0 ? (
            <EmptyState text="لا توجد بيانات مدن بعد" />
          ) : (
            <div className="space-y-3">
              {locations.cities.slice(0, 10).map((city, i) => (
                <BarRow
                  key={city.name}
                  rank={i + 1}
                  label={city.name}
                  count={city.count}
                  max={getMaxCount(locations.cities)}
                  color="bg-purple-500"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 p-6 border-b border-gray-100">
          <Clock className="w-5 h-5 text-dental-600" />
          <h2 className="text-lg font-bold text-gray-900">آخر الزوار</h2>
          <span className="text-sm text-gray-400 mr-auto">آخر ٢٠ زيارة</span>
        </div>
        {locations.recent.length === 0 ? (
          <div className="p-6">
            <EmptyState text="لا توجد زيارات بعد — شارك رابط الموقع لبدء التتبع" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-right px-6 py-3 font-medium">#</th>
                  <th className="text-right px-6 py-3 font-medium">الدولة</th>
                  <th className="text-right px-6 py-3 font-medium">المدينة</th>
                  <th className="text-right px-6 py-3 font-medium">المنطقة</th>
                  <th className="text-right px-6 py-3 font-medium">الإحداثيات</th>
                  <th className="text-right px-6 py-3 font-medium">الدقة</th>
                  <th className="text-right px-6 py-3 font-medium">IP</th>
                  <th className="text-right px-6 py-3 font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {locations.recent.map((v, i) => (
                  <tr key={v.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-900">{v.country || '—'}</td>
                    <td className="px-6 py-3 text-gray-700">{v.city || '—'}</td>
                    <td className="px-6 py-3 text-gray-500">{v.region || '—'}</td>
                    <td className="px-6 py-3 font-mono text-xs">
                      {v.latitude && v.longitude
                        ? (
                          <a
                            href={`https://www.google.com/maps?q=${v.latitude},${v.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-dental-600 hover:text-dental-800 hover:underline transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            {v.latitude.toFixed(6)}, {v.longitude.toFixed(6)}
                          </a>
                        )
                        : '—'}
                    </td>
                    <td className="px-6 py-3">
                      {v.source === 'gps' ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          GPS دقيق
                        </span>
                      ) : v.source === 'ip-verified' ? (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          IP متحقق
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          IP تقريبي
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-400 font-mono text-xs">{v.ip}</td>
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">{formatDate(v.visitedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Bookings View ───────────────────────────────── */
function BookingsView({
  bookings,
  formatDate,
}: {
  bookings: Booking[]
  formatDate: (d: string) => string
}) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12">
        <EmptyState text="لا توجد حجوزات بعد" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-dental-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-dental-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{b.name}</h3>
                  <p className="text-sm text-gray-500">{b.email} · {b.phone}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-dental-50 text-dental-700 px-3 py-1 rounded-full text-sm font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {serviceLabels[b.service] || b.service}
                </span>
                {b.preferredDate && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {b.preferredDate}
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  b.status === 'pending'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-green-50 text-green-700'
                }`}>
                  {b.status === 'pending' ? 'قيد الانتظار' : 'مؤكد'}
                </span>
              </div>

              {b.message && (
                <p className="mt-3 text-gray-600 text-sm bg-gray-50 rounded-lg p-3">
                  {b.message}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-400 whitespace-nowrap">{formatDate(b.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Bar Row ─────────────────────────────────────── */
function BarRow({
  rank,
  label,
  count,
  max,
  color,
}: {
  rank: number
  label: string
  count: number
  max: number
  color: string
}) {
  const pct = (count / max) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-5 text-center">{rank}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-800">{label}</span>
          <span className="text-sm font-bold text-gray-900">{count}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${color} transition-all duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Empty State ─────────────────────────────────── */
function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-8">
      <Globe className="w-12 h-12 text-gray-200 mx-auto mb-3" />
      <p className="text-gray-400">{text}</p>
    </div>
  )
}
