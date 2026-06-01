import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Star, Target, TrendingUp, Users, ChevronRight } from 'lucide-react';

const ISSUES = [
  { slug: 'skin', emoji: '✨', title: 'Skin Problems', desc: 'Acne, pigmentation, dryness & more', from: 'from-purple-50', to: 'to-pink-50', border: 'border-purple-100', icon: 'text-purple-500', dot: 'bg-purple-400' },
  { slug: 'hair', emoji: '💆', title: 'Hair Fall', desc: 'Thinning, breakage, scalp issues', from: 'from-green-50', to: 'to-teal-50', border: 'border-green-100', icon: 'text-green-500', dot: 'bg-green-400' },
  { slug: 'stress', emoji: '🧘', title: 'Stress Management', desc: 'Anxiety, burnout, overthinking', from: 'from-orange-50', to: 'to-red-50', border: 'border-orange-100', icon: 'text-orange-500', dot: 'bg-orange-400' },
  { slug: 'time', emoji: '⏰', title: 'Time Management', desc: 'Productivity, focus, procrastination', from: 'from-blue-50', to: 'to-cyan-50', border: 'border-blue-100', icon: 'text-blue-500', dot: 'bg-blue-400' },
  { slug: 'astrology', emoji: '🔮', title: 'Astrology & Life', desc: 'Kundli, career, relationship guidance', from: 'from-violet-50', to: 'to-purple-50', border: 'border-violet-100', icon: 'text-violet-500', dot: 'bg-violet-400' },
  { slug: 'weight', emoji: '💪', title: 'Weight & Fitness', desc: 'Weight loss, muscle gain, body goals', from: 'from-red-50', to: 'to-orange-50', border: 'border-red-100', icon: 'text-red-500', dot: 'bg-red-400' },
  { slug: 'sleep', emoji: '🌙', title: 'Sleep Issues', desc: 'Insomnia, restlessness, sleep cycles', from: 'from-indigo-50', to: 'to-blue-50', border: 'border-indigo-100', icon: 'text-indigo-500', dot: 'bg-indigo-400' },
  { slug: 'nutrition', emoji: '🥗', title: 'Nutrition & Diet', desc: 'Deficiencies, diet planning, gut health', from: 'from-teal-50', to: 'to-green-50', border: 'border-teal-100', icon: 'text-teal-500', dot: 'bg-teal-400' },
];

const WHY_POINTS = [
  { icon: Target, title: 'Personalized for You', desc: 'AI analyzes your inputs and creates a report just for you.' },
  { icon: TrendingUp, title: 'Expert-Backed Insights', desc: 'Our reports are built with medical and scientific data.' },
  { icon: Star, title: 'Actionable Solutions', desc: 'Get practical tips and solutions that actually work.' },
  { icon: Shield, title: 'Trusted by Thousands', desc: '50,000+ users believe in our AI-powered guidance.' },
];

export default function SelectIssue() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7FF] font-sans">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-all">
          ← Back
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step, i) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                step === 1
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {step}
              </div>
              {i < 3 && <div className={`w-8 h-0.5 rounded ${step < 1 ? 'bg-purple-300' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        <div className="text-xs text-gray-400">Step 1 of 4</div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-8">

        {/* Left - Issues Grid */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-purple-400 text-xl">✦</span>
              <h1 className="text-3xl font-black text-gray-900">Apni Problem Choose Karo</h1>
              <span className="text-purple-400 text-xl">✦</span>
            </div>
            <p className="text-gray-400 text-sm">Ek issue select karo jiske liye report chahiye</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ISSUES.map((issue) => (
              <button
                key={issue.slug}
                onClick={() => navigate(`/questions/${issue.slug}`)}
                className={`flex items-center gap-4 p-5 bg-gradient-to-br ${issue.from} ${issue.to} border ${issue.border} rounded-2xl text-left hover:scale-[1.02] hover:shadow-lg transition-all duration-200 group`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform text-2xl">
                  {issue.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-black text-gray-900 text-base">{issue.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{issue.desc}</div>
                </div>
                <ChevronRight className={`w-5 h-5 ${issue.icon} flex-shrink-0 group-hover:translate-x-1 transition-transform`} />
              </button>
            ))}
          </div>

          {/* Privacy Footer */}
          <div className="mt-6 flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-gray-800">Your Privacy, Our Priority</div>
              <div className="text-xs text-gray-400">Your data is safe with us and never shared.</div>
            </div>
          </div>
        </div>

        {/* Right - Why Choose Panel */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-3xl p-6 border border-purple-50 shadow-sm sticky top-20">

            <div className="flex items-center gap-2 mb-5">
              <span className="text-purple-500">✦</span>
              <h3 className="text-base font-black text-gray-900">Why Choose Our AI Report?</h3>
            </div>

            <div className="space-y-4 mb-6">
              {WHY_POINTS.map((point, i) => {
                const Icon = point.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">{point.title}</div>
                      <div className="text-xs text-gray-400 leading-relaxed mt-0.5">{point.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social proof */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {['🧑', '👩', '👨', '👩'].map((face, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs">
                      {face}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    50K
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">50,000+ Users</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-xs text-gray-500 font-medium ml-1">4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}