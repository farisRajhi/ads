import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* الشعار */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-dental-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ب</span>
              </div>
              <span className="text-xl font-bold text-white">
                برايت<span className="text-dental-400">سمايل</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              نقدم رعاية أسنان استثنائية للعائلات منذ عام ٢٠١٠.
              ابتسامتك هي شغفنا.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-dental-400 transition-colors text-sm">خدماتنا</a></li>
              <li><a href="#why-us" className="text-gray-400 hover:text-dental-400 transition-colors text-sm">لماذا تختارنا</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-dental-400 transition-colors text-sm">آراء المرضى</a></li>
              <li><a href="#book" className="text-gray-400 hover:text-dental-400 transition-colors text-sm">احجز موعد</a></li>
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h3 className="text-white font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-dental-400 shrink-0" />
                <span className="text-sm">١٢٣ شارع الأسنان، جناح ١٠٠<br />الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-dental-400 shrink-0" />
                <a href="tel:+1234567890" className="text-sm hover:text-dental-400 transition-colors">٠١٢٣-٤٥٦-٧٨٩٠</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-dental-400 shrink-0" />
                <a href="mailto:hello@brightsmile.com" className="text-sm hover:text-dental-400 transition-colors">hello@brightsmile.com</a>
              </li>
            </ul>
          </div>

          {/* ساعات العمل */}
          <div>
            <h3 className="text-white font-semibold mb-4">ساعات العمل</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-dental-400 shrink-0" />
                <span className="text-sm">الأحد - الخميس: ٨ص - ٧م</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-dental-400 shrink-0" />
                <span className="text-sm">السبت: ٩ص - ٤م</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-dental-400 shrink-0" />
                <span className="text-sm">الجمعة: مغلق</span>
              </li>
            </ul>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} برايت سمايل للأسنان. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-dental-400 transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-sm text-gray-500 hover:text-dental-400 transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
