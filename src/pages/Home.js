import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Star, Brain, Moon, Leaf, Heart, Droplets, Zap, Scale, Flame, Sparkles, ChevronRight, Activity, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const TRANSLATIONS = {
  en: { badge: "India's #1 AI Wellness Guide", title1: 'Manage Your Life,', title2: 'The Smart Way', sub: 'From skin to stress — choose your problem, get AI-powered insights, personalized reports and discover the best products for you.', cta: 'Choose Your Problem →' },
  hi: { badge: "भारत का #1 AI वेलनेस गाइड", title1: 'अपनी Life को', title2: 'Smart तरीके से', sub: 'Skin से stress तक — अपनी problem choose करो, AI से personalized report पाओ।', cta: 'अपनी Problem Choose करो →' },
  bn: { badge: "ভারতের #1 AI ওয়েলনেস গাইড", title1: 'আপনার জীবন পরিচালনা করুন,', title2: 'স্মার্ট উপায়ে', sub: 'ত্বক থেকে স্ট্রেস — আপনার সমস্যা বেছে নিন, AI-চালিত insights পান।', cta: 'আপনার সমস্যা বেছে নিন →' },
  te: { badge: "భారతదేశం #1 AI వెల్నెస్ గైడ్", title1: 'మీ జీవితాన్ని నిర్వహించండి,', title2: 'స్మార్ట్ మార్గంలో', sub: 'చర్మం నుండి ఒత్తిడి వరకు — మీ సమస్యను ఎంచుకోండి।', cta: 'మీ సమస్యను ఎంచుకోండి →' },
  mr: { badge: "भारताचा #1 AI वेलनेस गाइड", title1: 'तुमचे आयुष्य व्यवस्थापित करा,', title2: 'स्मार्ट मार्गाने', sub: 'त्वचेपासून तणावापर्यंत — तुमची समस्या निवडा।', cta: 'तुमची समस्या निवडा →' },
  ta: { badge: "இந்தியாவின் #1 AI வெல்னஸ் கைடு", title1: 'உங்கள் வாழ்க்கையை நிர்வகிக்கவும்,', title2: 'சிறந்த வழியில்', sub: 'தோல் முதல் மன அழுத்தம் வரை — உங்கள் பிரச்சனையை தேர்ந்தெடுங்கள்।', cta: 'உங்கள் பிரச்சனையை தேர்ந்தெடுங்கள் →' },
  gu: { badge: "ભારતનો #1 AI વેલનેસ ગાઇડ", title1: 'તમારું જીવન મેનેજ કરો,', title2: 'સ્માર્ટ રીતે', sub: 'ત્વચાથી તણાવ સુધી — તમારી સમસ્યા પસંદ કરો।', cta: 'તમારી સમસ્યા પસંદ કરો →' },
  kn: { badge: "ಭಾರತದ #1 AI ವೆಲ್ನೆಸ್ ಗೈಡ್", title1: 'ನಿಮ್ಮ ಜೀವನವನ್ನು ನಿರ್ವಹಿಸಿ,', title2: 'ಸ್ಮಾರ್ಟ್ ರೀತಿಯಲ್ಲಿ', sub: 'ಚರ್ಮದಿಂದ ಒತ್ತಡದವರೆಗೆ — ನಿಮ್ಮ ಸಮಸ್ಯೆ ಆಯ್ಕೆ ಮಾಡಿ।', cta: 'ನಿಮ್ಮ ಸಮಸ್ಯೆ ಆಯ್ಕೆ ಮಾಡಿ →' },
  ml: { badge: "ഇന്ത്യയുടെ #1 AI വെൽനസ് ഗൈഡ്", title1: 'നിങ്ങളുടെ ജീവിതം കൈകാര്യം ചെയ്യൂ,', title2: 'സ്മാർട്ട് രീതിയിൽ', sub: 'ചർമ്മം മുതൽ സ്ട്രെസ് വരെ — നിങ്ങളുടെ പ്രശ്നം തിരഞ്ഞെടുക്കൂ।', cta: 'നിങ്ങളുടെ പ്രശ്നം തിരഞ്ഞെടുക്കൂ →' },
  pa: { badge: "ਭਾਰਤ ਦਾ #1 AI ਵੈਲਨੇਸ ਗਾਈਡ", title1: 'ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਸੰਭਾਲੋ,', title2: 'ਸਮਾਰਟ ਤਰੀਕੇ ਨਾਲ', sub: 'ਚਮੜੀ ਤੋਂ ਤਣਾਅ ਤੱਕ — ਆਪਣੀ ਸਮੱਸਿਆ ਚੁਣੋ।', cta: 'ਆਪਣੀ ਸਮੱਸਿਆ ਚੁਣੋ →' },
};

const floatingCards = [
  { icon: Brain, label: 'AI Insights', color: 'bg-purple-100 text-purple-600', pos: 'top-8 -left-16' },
  { icon: Moon, label: 'Sleep Analysis', color: 'bg-blue-100 text-blue-600', pos: 'top-24 -right-16' },
  { icon: Leaf, label: 'Wellness', color: 'bg-green-100 text-green-600', pos: 'bottom-32 -left-20' },
  { icon: Heart, label: 'Health Score', color: 'bg-pink-100 text-pink-600', pos: 'bottom-16 -right-14' },
  { icon: Shield, label: 'Privacy', color: 'bg-teal-100 text-teal-600', pos: 'top-1/2 -left-24' },
  { icon: Droplets, label: 'Hydration', color: 'bg-cyan-100 text-cyan-600', pos: 'top-1/2 -right-20' },
];

const steps = [
  { n: '01', icon: '⊞', title: 'Choose Issue', sub: 'Select from 8+ wellness categories', color: 'bg-purple-500' },
  { n: '02', icon: '📋', title: 'Quick Survey', sub: 'Answer 5-6 personalized questions', color: 'bg-pink-500' },
  { n: '03', icon: '🤖', title: 'Get AI Report', sub: 'Expert-level personalized insights', color: 'bg-violet-500' },
  { n: '04', icon: '🛍️', title: 'Discover Products', sub: 'Best curated products for you', color: 'bg-indigo-500' },
];

const healthCards = [
  { label: 'Stress Level', value: 'Low', color: 'text-green-500', bg: 'bg-green-50', icon: Brain },
  { label: 'Sleep Quality', value: 'Good', color: 'text-blue-500', bg: 'bg-blue-50', icon: Moon },
  { label: 'Energy Level', value: 'High', color: 'text-yellow-500', bg: 'bg-yellow-50', icon: Zap },
  { label: 'Skin Health', value: 'Fair', color: 'text-purple-500', bg: 'bg-purple-50', icon: Sparkles },
];

const TRENDING = [
  { slug: 'skin', emoji: '✨', title: 'Skin Problems', desc: 'Acne, pigmentation, dryness & more', badge: '🏆 #1 Best Seller', badgeColor: 'bg-purple-100 text-purple-800', borderTop: 'border-t-purple-500', count: '12,400+', dotColor: 'bg-purple-400', arrowBg: 'bg-purple-100', arrowText: 'text-purple-600' },
  { slug: 'astrology', emoji: '🔮', title: 'Astrology & Life', desc: 'Kundli, career, relationship guidance', badge: '🔮 Trending', badgeColor: 'bg-pink-100 text-pink-800', borderTop: 'border-t-pink-500', count: '9,800+', dotColor: 'bg-pink-400', arrowBg: 'bg-pink-100', arrowText: 'text-pink-600' },
  { slug: 'hair', emoji: '💆', title: 'Hair Fall', desc: 'Thinning, breakage, scalp issues', badge: '💚 Most Reviewed', badgeColor: 'bg-green-100 text-green-800', borderTop: 'border-t-green-500', count: '8,200+', dotColor: 'bg-green-400', arrowBg: 'bg-green-100', arrowText: 'text-green-600' },
];

const OTHER_ISSUES = [
  { slug: 'stress', emoji: '🧘', label: 'Stress Management', desc: 'Anxiety, burnout', from: 'from-orange-50', to: 'to-red-50', border: 'border-orange-100' },
  { slug: 'time', emoji: '⏰', label: 'Time Management', desc: 'Productivity, focus', from: 'from-blue-50', to: 'to-cyan-50', border: 'border-blue-100' },
  { slug: 'weight', emoji: '💪', label: 'Weight & Fitness', desc: 'Weight loss, muscle', from: 'from-red-50', to: 'to-orange-50', border: 'border-red-100' },
  { slug: 'sleep', emoji: '🌙', label: 'Sleep Issues', desc: 'Insomnia, restlessness', from: 'from-indigo-50', to: 'to-blue-50', border: 'border-indigo-100' },
  { slug: 'nutrition', emoji: '🥗', label: 'Nutrition & Diet', desc: 'Deficiencies, gut health', from: 'from-teal-50', to: 'to-green-50', border: 'border-teal-100' },
];

export default function Home() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScore(prev => prev < 89 ? prev + 1 : prev);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const t = TRANSLATIONS[lang];
  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <div className="min-h-screen bg-[#FAF7FF] font-sans">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .float2 { animation: float2 4s ease-in-out infinite; }
        .float-card { animation: float 3s ease-in-out infinite; }
        .float-card:nth-child(2){animation-delay:0.5s}
        .float-card:nth-child(3){animation-delay:1s}
        .float-card:nth-child(4){animation-delay:1.5s}
        .float-card:nth-child(5){animation-delay:2s}
        .float-card:nth-child(6){animation-delay:2.5s}
      `}</style>

      {/* Language Bar */}
      <div className="flex justify-center items-center gap-3 py-2.5 bg-white/80 backdrop-blur border-b border-purple-100 sticky top-0 z-50">
        <span className="text-xs text-gray-400 font-medium">Choose Language</span>
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            <span>{currentLang.native}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {showDropdown && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden z-50 w-44">
              {LANGUAGES.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setShowDropdown(false); }} className={`w-full flex items-center justify-between px-4 py-2.5 text-xs hover:bg-purple-50 transition-all ${lang === l.code ? 'bg-purple-50 text-purple-600 font-bold' : 'text-gray-600'}`}>
                  <span>{l.native}</span>
                  <span className="text-gray-400">{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 lg:px-16 py-4 bg-white/70 backdrop-blur-sm border-b border-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 tracking-tight">LifeAI</div>
            <div className="text-xs text-gray-400">Better Insights, Better Life</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white border border-purple-100 rounded-full px-4 py-2 shadow-sm">
          <Shield className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-medium text-gray-600">100% Private & Secure</span>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-[90vh] flex items-center px-8 lg:px-16 max-w-[1600px] mx-auto py-10 gap-16">
        <div className="flex-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-5 py-2 text-sm text-amber-700 font-medium mb-6">
            ⭐ {t.badge}
          </div>
          <h1 className="font-black text-gray-900 leading-[1.1] mb-5" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: 'Georgia, serif' }}>
            {t.title1}<br />
            <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">{t.title2}</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">{t.sub}</p>
          <button onClick={() => navigate('/select')} className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-105 transition-all duration-300 mb-6">
            {t.cta}
          </button>
          <div className="flex gap-8 flex-wrap text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.8 Rating</span>
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-purple-400" /> 50,000+ Users</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-400" /> Secure & Private</span>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-100 via-violet-50 to-pink-100 blur-3xl opacity-60" />
          {floatingCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`float-card absolute ${card.pos} flex items-center gap-2 bg-white/90 backdrop-blur rounded-2xl px-3 py-2.5 shadow-lg border border-white z-10`}>
                <div className={`w-8 h-8 ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{card.label}</span>
              </div>
            );
          })}
          <div className="float2 relative z-20 w-72 bg-white rounded-[3rem] shadow-2xl border-8 border-gray-100 overflow-hidden" style={{ height: '580px' }}>
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-24 h-6 bg-gray-900 rounded-full" />
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-gray-400">Good Morning 👋</div>
                  <div className="text-base font-black text-gray-900">Your Dashboard</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-5 mb-4 text-white">
                <div className="text-xs font-medium opacity-80 mb-1">AI Wellness Score</div>
                <div className="text-5xl font-black mb-1">{score}<span className="text-2xl opacity-70">/100</span></div>
                <div className="text-xs opacity-80">↑ Great progress this week!</div>
                <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-100" style={{ width: `${score}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {healthCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} className={`${card.bg} rounded-2xl p-3`}>
                      <Icon className={`w-4 h-4 ${card.color} mb-1`} />
                      <div className="text-xs text-gray-500">{card.label}</div>
                      <div className={`text-sm font-bold ${card.color}`}>{card.value}</div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl py-3 text-sm font-bold">
                View Full Report →
              </button>
            </div>
          </div>
        </div>
      </section>

      
      {/* Issues */}
      <section className="px-8 lg:px-16 py-10 bg-white max-w-[1600px] mx-auto">
        <div className="mb-8">
          <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2">🔥 Most Popular</div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">Trending Reports Right Now</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-purple-500 to-pink-400 rounded mb-2" />
          <p className="text-gray-400 text-sm">These are our most purchased reports this week</p>
        </div>

        {/* Trending Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {TRENDING.map((issue) => (
            <div key={issue.slug} onClick={() => navigate(`/questions/${issue.slug}`)} className={`bg-white border border-gray-100 border-t-4 ${issue.borderTop} rounded-3xl p-6 cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group relative`}>
              <div className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${issue.badgeColor}`}>{issue.badge}</div>
              <div className="text-4xl mb-3">{issue.emoji}</div>
              <div className="text-lg font-black text-gray-900 mb-1">{issue.title}</div>
              <div className="text-sm text-gray-400 leading-relaxed mb-4">{issue.desc}</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${issue.dotColor}`} />
                <span className="text-xs text-gray-400 font-medium">{issue.count} reports sold</span>
              </div>
              <div className={`absolute bottom-5 right-5 w-8 h-8 ${issue.arrowBg} ${issue.arrowText} rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform`}>→</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">All Categories</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Other 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {OTHER_ISSUES.map((issue) => (
            <div key={issue.slug} onClick={() => navigate(`/questions/${issue.slug}`)} className={`bg-gradient-to-br ${issue.from} ${issue.to} border ${issue.border} rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 group`}>
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{issue.emoji}</div>
              <div className="text-sm font-black text-gray-800 mb-1">{issue.label}</div>
              <div className="text-xs text-gray-400">{issue.desc}</div>
            </div>
          ))}
        </div>
      </section>

{/* How It Works */}
      <section className="px-8 lg:px-16 py-10 max-w-[1600px] mx-auto">
        <h2 className="text-center text-4xl font-black text-gray-900 mb-3">How It Works?</h2>
        <p className="text-center text-gray-400 mb-10 text-lg">Simple 4-step process to transform your life</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              <div className="bg-white rounded-3xl p-8 border border-purple-50 shadow-sm hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-2 transition-all duration-300">
                <div className={`w-12 h-12 ${s.color} rounded-2xl text-white text-lg font-black flex items-center justify-center mb-5 shadow-lg`}>{s.n}</div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-lg font-black text-gray-900 mb-2">{s.title}</div>
                <div className="text-sm text-gray-400 leading-relaxed">{s.sub}</div>
              </div>
              {i < 3 && <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-purple-200 z-10" />}
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="px-8 lg:px-16 py-10 max-w-[1600px] mx-auto">
        <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-green-50 rounded-[2.5rem] p-10 border border-purple-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 mb-2">Your Privacy, Our Priority</div>
              <div className="text-sm mb-2 font-medium">
                <span className="text-green-600">100% Private</span>
                <span className="text-gray-300 mx-2">•</span>
                <span className="text-purple-600">AI-Powered</span>
                <span className="text-gray-300 mx-2">•</span>
                <span className="text-orange-500">Expert Backed</span>
              </div>
              <div className="text-gray-400 text-sm">Your data is safe with us and never shared.</div>
            </div>
          </div>
          <div className="text-8xl">🪴</div>
        </div>
      </section>

    </div>
  );
}
