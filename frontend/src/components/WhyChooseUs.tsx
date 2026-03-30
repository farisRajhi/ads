import { Award, Users, Clock, CreditCard, Wifi, HeartPulse } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'أطباء معتمدون',
    description: 'أطباء أسنان معتمدون بتدريب متقدم من أفضل كليات طب الأسنان.',
  },
  {
    icon: Users,
    title: 'مناسب للعائلة',
    description: 'نعالج المرضى من جميع الأعمار — من الأطفال الصغار إلى كبار السن.',
  },
  {
    icon: Clock,
    title: 'مواعيد مرنة',
    description: 'مواعيد صباحية مبكرة ومسائية وأيام السبت لتناسب جدولك.',
  },
  {
    icon: CreditCard,
    title: 'تمويل سهل',
    description: 'نقبل جميع التأمينات الرئيسية ونوفر خيارات تقسيط بدون فوائد.',
  },
  {
    icon: Wifi,
    title: 'تقنيات حديثة',
    description: 'أشعة رقمية ومسح ثلاثي الأبعاد وعلاج بالليزر لنتائج أسرع وأكثر راحة.',
  },
  {
    icon: HeartPulse,
    title: 'نهج لطيف',
    description: 'تخدير متوفر للمرضى القلقين. راحتك هي أولويتنا.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-gradient-to-b from-dental-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* المحتوى */}
          <div>
            <span className="text-dental-600 font-semibold text-sm tracking-widest uppercase">لماذا تختارنا</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              طب أسنان يمكنك
              <br />
              <span className="text-dental-600">الوثوق به والاعتماد عليه</span>
            </h2>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              لأكثر من ١٥ عامًا، كانت برايت سمايل الخيار الموثوق في المجتمع
              لرعاية أسنان استثنائية. إليك ما يميزنا.
            </p>

            {/* الإحصائيات */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-dental-600">+١٥</p>
                <p className="text-sm text-gray-500 mt-1">سنة</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-dental-600">+١٠ آلاف</p>
                <p className="text-sm text-gray-500 mt-1">مريض</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-dental-600">٤.٩</p>
                <p className="text-sm text-gray-500 mt-1">تقييم</p>
              </div>
            </div>
          </div>

          {/* شبكة المميزات */}
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-dental-200 transition-all"
              >
                <div className="w-11 h-11 bg-dental-50 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-dental-600" />
                </div>
                <h3 className="mt-3 font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
