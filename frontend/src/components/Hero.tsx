import { Star, Shield, Clock, ArrowLeft } from 'lucide-react'
import { trackEvent, trackConversion } from '../lib/analytics'

export default function Hero() {
  const handleBooking = () => {
    trackEvent('cta_click', { location: 'hero', action: 'book_appointment' })
    trackConversion('HERO_BOOKING_LABEL')
  }

  return (
    <section className="relative pt-20 lg:pt-24 overflow-hidden">
      {/* خلفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-dental-50 via-white to-teal-50/50" />
      <div className="absolute top-20 left-0 w-96 h-96 bg-dental-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-dental-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* المحتوى */}
          <div className="animate-fade-in-up">
            {/* شارة الثقة */}
            <div className="inline-flex items-center gap-2 bg-dental-50 border border-dental-200 rounded-full px-4 py-1.5 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-dental-800">تقييم ٤.٩/٥ من أكثر من ٢٠٠٠ مريض</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              ابتسامتك
              <br />
              <span className="text-dental-600">تستحق أفضل</span>
              <br />
              رعاية
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
              اختبر طب أسنان لطيف وحديث مع فريق يعاملك كأحد أفراد العائلة.
              من الفحوصات الروتينية إلى تجميل الابتسامة الكامل — نحن هنا لخدمتك.
            </p>

            {/* أزرار الحجز */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                onClick={handleBooking}
                className="group inline-flex items-center justify-center gap-2 bg-dental-600 hover:bg-dental-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-dental-600/25 animate-pulse-glow"
              >
                احجز استشارة مجانية
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center gap-2 border-2 border-dental-600 text-dental-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-dental-50 transition-all"
              >
                اتصل بنا ٠١٢٣-٤٥٦-٧٨٩٠
              </a>
            </div>

            {/* مؤشرات الثقة */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-dental-600" />
                <span className="text-sm font-medium">نقبل جميع التأمينات</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-dental-600" />
                <span className="text-sm font-medium">مواعيد في نفس اليوم</span>
              </div>
            </div>
          </div>

          {/* الجزء البصري */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-dental-100 to-dental-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg animate-float">
                    <svg viewBox="0 0 100 100" className="w-20 h-20">
                      <path
                        d="M50 15c-8 0-15 5-18 12-2 5-3 10-2 16 1 8 4 16 8 23 3 5 7 10 12 14 5-4 9-9 12-14 4-7 7-15 8-23 1-6 0-11-2-16-3-7-10-12-18-12z"
                        fill="#0d9488"
                        opacity="0.9"
                      />
                      <path
                        d="M50 15c-8 0-15 5-18 12-2 5-3 10-2 16 1 8 4 16 8 23 3 5 7 10 12 14"
                        fill="#14b8a6"
                      />
                      <ellipse cx="50" cy="40" rx="8" ry="10" fill="white" opacity="0.6" />
                    </svg>
                  </div>
                  <p className="mt-4 text-dental-800 font-semibold text-lg">ابتسامة صحية تبدأ هنا</p>
                </div>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <p className="text-2xl font-bold text-dental-600">+١٥</p>
              <p className="text-sm text-gray-500">سنة خبرة</p>
            </div>
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float animation-delay-400">
              <p className="text-2xl font-bold text-dental-600">+١٠ آلاف</p>
              <p className="text-sm text-gray-500">مريض سعيد</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
