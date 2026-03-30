import { Sparkles, Heart, Smile, Stethoscope, Baby, Zap } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

const services = [
  {
    icon: Sparkles,
    title: 'تبييض الأسنان',
    description: 'علاجات تبييض احترافية لابتسامة أكثر إشراقًا وثقة. نتائج من أول زيارة.',
    price: 'يبدأ من ١٩٩$',
  },
  {
    icon: Heart,
    title: 'زراعة الأسنان',
    description: 'استبدال دائم للأسنان يبدو ويعمل كالأسنان الطبيعية تمامًا.',
    price: 'يبدأ من ١,٤٩٩$',
  },
  {
    icon: Smile,
    title: 'تجميل الأسنان',
    description: 'قشور وحشوات تجميلية وتصميم ابتسامة مخصص لملامح وجهك.',
    price: 'يبدأ من ٤٩٩$',
  },
  {
    icon: Stethoscope,
    title: 'فحص عام',
    description: 'فحوصات شاملة وتنظيف ورعاية وقائية للحفاظ على صحة أسنانك.',
    price: 'يبدأ من ٩٩$',
  },
  {
    icon: Baby,
    title: 'طب أسنان الأطفال',
    description: 'رعاية أسنان لطيفة وممتعة مصممة خصيصًا للأطفال من جميع الأعمار.',
    price: 'يبدأ من ٧٩$',
  },
  {
    icon: Zap,
    title: 'الطوارئ',
    description: 'مواعيد طوارئ في نفس اليوم لآلام الأسنان والإصابات والحالات العاجلة.',
    price: 'اتصل الآن',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-dental-600 font-semibold text-sm tracking-widest uppercase">خدماتنا</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
            رعاية أسنان شاملة
            <br />
            <span className="text-dental-600">تحت سقف واحد</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            من الرعاية الوقائية إلى الإجراءات المتقدمة، فريقنا المتخصص يقدم حلول أسنان شاملة.
          </p>
        </div>

        {/* شبكة الخدمات */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <a
              key={service.title}
              href="#book"
              onClick={() => trackEvent('service_click', { service: service.title })}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-dental-200 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-dental-50 rounded-xl flex items-center justify-center group-hover:bg-dental-600 transition-colors">
                <service.icon className="w-7 h-7 text-dental-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-dental-600 font-bold">{service.price}</span>
                <span className="text-sm text-dental-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  احجز الآن ←
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
