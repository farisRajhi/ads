import { useState, type FormEvent } from 'react'
import { Calendar, Clock, Phone, CheckCircle } from 'lucide-react'
import { trackEvent, trackConversion } from '../lib/analytics'

export default function BookingCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    trackEvent('form_submit', { form: 'booking', service: formData.service })
    trackConversion('BOOKING_FORM_LABEL')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <section id="book" className="py-20 lg:py-28 bg-dental-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-20 h-20 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            تم استلام طلب الموعد!
          </h2>
          <p className="mt-4 text-dental-100 text-lg">
            سنتواصل معك خلال ٢٤ ساعة لتأكيد موعدك.
            نتطلع للقائك!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="book" className="py-20 lg:py-28 bg-gradient-to-br from-dental-600 via-dental-700 to-dental-800 relative overflow-hidden">
      {/* دوائر زخرفية */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-dental-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-dental-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* المحتوى */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              مستعد لابتسامة
              <br />
              أكثر صحة؟
            </h2>
            <p className="mt-4 text-dental-100 text-lg leading-relaxed">
              احجز استشارتك المجانية اليوم. بدون التزام وبدون ضغط — فقط
              نصيحة ودية من خبراء لتحقيق أفضل ابتسامة لك.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-dental-100">
                <Calendar className="w-5 h-5 text-dental-300" />
                <span>مواعيد متاحة ٦ أيام في الأسبوع</span>
              </div>
              <div className="flex items-center gap-3 text-dental-100">
                <Clock className="w-5 h-5 text-dental-300" />
                <span>زيارات طوارئ في نفس اليوم</span>
              </div>
              <div className="flex items-center gap-3 text-dental-100">
                <Phone className="w-5 h-5 text-dental-300" />
                <span>أو اتصل بنا مباشرة: <strong className="text-white">٠١٢٣-٤٥٦-٧٨٩٠</strong></span>
              </div>
            </div>
          </div>

          {/* النموذج */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">احجز موعدك</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition-all"
                  placeholder="أحمد محمد"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition-all"
                    placeholder="ahmed@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition-all"
                    placeholder="٠٥٥٥-١٢٣-٤٥٦٧"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">الخدمة المطلوبة</label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">اختر خدمة</option>
                  <option value="general-checkup">فحص عام وتنظيف</option>
                  <option value="teeth-whitening">تبييض الأسنان</option>
                  <option value="dental-implants">زراعة الأسنان</option>
                  <option value="cosmetic">تجميل الأسنان</option>
                  <option value="pediatric">طب أسنان الأطفال</option>
                  <option value="emergency">طوارئ</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">التاريخ المفضل</label>
                <input
                  id="date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">رسالة (اختياري)</label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="هل هناك شيء يجب أن نعرفه؟"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-dental-600 hover:bg-dental-700 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
              >
                طلب موعد
              </button>

              <p className="text-center text-xs text-gray-400">
                بإرسال النموذج، أنت توافق على سياسة الخصوصية. لن نشارك معلوماتك أبدًا.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
