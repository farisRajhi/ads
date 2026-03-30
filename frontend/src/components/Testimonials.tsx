import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'سارة أحمد',
    role: 'مريضة منذ ٥ سنوات',
    rating: 5,
    text: 'كنت أخاف من طبيب الأسنان، لكن الدكتور محمد وفريقه غيّروا تجربتي تمامًا. العيادة جميلة والطاقم لطيف جدًا، وأسناني لم تبدُ أفضل من هكذا!',
    initials: 'سأ',
  },
  {
    name: 'محمد العلي',
    role: 'مريض زراعة أسنان',
    rating: 5,
    text: 'أجريت زراعة أسنان هنا وكانت العملية أسهل مما توقعت. شرحوا كل شيء بوضوح والنتائج مذهلة. أستطيع الآن الأكل والابتسام بثقة.',
    initials: 'مع',
  },
  {
    name: 'نورة الخالدي',
    role: 'مريضة عائلية',
    rating: 5,
    text: 'نحضر بكل العائلة هنا — من ابنتنا ذات الـ٤ سنوات إلى والديّ. فريق أسنان الأطفال رائع مع الصغار، والمواعيد المسائية تسهّل الأمر على الآباء المشغولين.',
    initials: 'نخ',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-dental-600 font-semibold text-sm tracking-widest uppercase">آراء المرضى</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
            ماذا يقول
            <br />
            <span className="text-dental-600">مرضانا عنّا</span>
          </h2>
        </div>

        {/* بطاقات الآراء */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative bg-gradient-to-b from-dental-50/50 to-white border border-dental-100 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-dental-200 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-dental-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* شارة تقييمات جوجل */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-6 py-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-gray-700 font-medium">٤.٩ نجوم على تقييمات جوجل (أكثر من ٢٠٠٠ تقييم)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
