import { useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleBookClick = () => {
    trackEvent('cta_click', { location: 'navbar', action: 'book_appointment' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* الشعار */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-dental-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">ب</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              برايت<span className="text-dental-600">سمايل</span>
            </span>
          </a>

          {/* القائمة الرئيسية */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-dental-600 transition-colors font-medium">خدماتنا</a>
            <a href="#why-us" className="text-gray-600 hover:text-dental-600 transition-colors font-medium">لماذا نحن</a>
            <a href="#testimonials" className="text-gray-600 hover:text-dental-600 transition-colors font-medium">آراء المرضى</a>
            <a href="#contact" className="text-gray-600 hover:text-dental-600 transition-colors font-medium">تواصل معنا</a>
          </div>

          {/* زر الحجز */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-dental-700 font-semibold">
              <Phone className="w-4 h-4" />
              ٠١٢٣-٤٥٦-٧٨٩٠
            </a>
            <a
              href="#book"
              onClick={handleBookClick}
              className="bg-dental-600 hover:bg-dental-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-dental-600/25"
            >
              احجز الآن
            </a>
          </div>

          {/* زر القائمة للموبايل */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a href="#services" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-dental-600 font-medium py-2">خدماتنا</a>
            <a href="#why-us" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-dental-600 font-medium py-2">لماذا نحن</a>
            <a href="#testimonials" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-dental-600 font-medium py-2">آراء المرضى</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-dental-600 font-medium py-2">تواصل معنا</a>
            <a
              href="#book"
              onClick={() => { setIsOpen(false); handleBookClick(); }}
              className="block bg-dental-600 text-white text-center px-6 py-3 rounded-full font-semibold"
            >
              احجز موعدك
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
