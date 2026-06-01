import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { Shield, Zap, Star, Gift, Check, Lock } from 'lucide-react';

const ISSUES = {
  skin: { icon: '✨', title: 'Skin Problems', emoji: '🧴' },
  hair: { icon: '💆', title: 'Hair Fall', emoji: '💇' },
  stress: { icon: '🧘', title: 'Stress Management', emoji: '🧠' },
  time: { icon: '⏰', title: 'Time Management', emoji: '📅' },
  astrology: { icon: '🔮', title: 'Astrology & Life', emoji: '⭐' },
  weight: { icon: '💪', title: 'Weight & Fitness', emoji: '🏋️' },
  sleep: { icon: '🌙', title: 'Sleep Issues', emoji: '😴' },
  nutrition: { icon: '🥗', title: 'Nutrition & Diet', emoji: '🥦' },
};

const INCLUDES = [
  { icon: '📊', title: 'Deep Problem Analysis', desc: 'Understand your problem in depth.' },
  { icon: '🔍', title: 'Root Cause Identification', desc: "Discover what's really holding you back." },
  { icon: '🌟', title: 'Personalized 7-Step Action Plan', desc: 'A clear, practical plan tailored just for you.' },
  { icon: '🍎', title: 'Lifestyle & Diet Guide', desc: 'Daily habits and nutrition tips to support your goals.' },
  { icon: '💡', title: 'Expert Wellness Tips', desc: 'Proven tips from experts to help you improve faster.' },
  { icon: '🛍️', title: 'Best Product Recommendations', desc: 'Handpicked products that suit your needs.' },
];

export default function Payment() {
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const issueId = localStorage.getItem('mml_issue') || 'skin';
  const issue = ISSUES[issueId];
  const answers = JSON.parse(localStorage.getItem('mml_answers') || '{}');

  const handlePay = async () => {
    if (!name || !email || !phone) {
      alert('Please fill all fields!');
      return;
    }
    setPaying(true);
    try {
      const { data: userData } = await supabase
        .from('users')
        .insert([{ name, email, phone, issue: issueId }])
        .select();

      if (userData && userData[0]) {
        await supabase.from('reports').insert([{
          user_id: userData[0].id,
          issue: issueId,
          answers,
          payment_status: 'paid',
          amount: 399
        }]);
        localStorage.setItem('mml_paid', 'true');
        localStorage.setItem('mml_user_id', userData[0].id);
      }
    } catch (err) {
      console.error('Error:', err);
    }
    setTimeout(() => navigate('/report'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7FF] font-sans">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-all">
          ← Back
        </button>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Shield className="w-3.5 h-3.5 text-purple-500" />
          100% Private & Secure
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Almost There!</h1>
          <p className="text-gray-400">Your personalized report is ready</p>
          <p className="text-gray-500 text-sm mt-1">
            Get complete insights and start your{' '}
            <span className="text-pink-500 font-semibold">transformation</span> today.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-5">

          {/* Issue Header */}
          <div className="flex items-center gap-4 mb-5 p-4 bg-purple-50 rounded-2xl">
            <div className="text-4xl">{issue.emoji}</div>
            <div>
              <div className="text-lg font-black text-gray-900">{issue.title} Report</div>
              <div className="text-sm text-gray-400">AI-powered personalized wellness report</div>
            </div>
          </div>

          {/* What you'll get */}
          <div className="mb-5">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">
              Here's what you'll get in your report:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INCLUDES.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">{item.title}</div>
                    <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Points */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 mb-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-purple-700">
                You'll get <span className="text-pink-500">399 reward points</span> in your wallet!
              </div>
              <div className="text-xs text-gray-400">Use up to 10% on any product or order.</div>
            </div>
            <div className="text-2xl">🪙</div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl text-gray-300 line-through">₹999</span>
            <span className="text-4xl font-black text-gray-900">₹399</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">60% OFF</span>
          </div>

          {/* Form */}
          <div className="space-y-3 mb-5">
            <input
              type="text"
              placeholder="Your Full Name *"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border-2 border-gray-100 focus:border-purple-300 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-700 outline-none transition-all bg-gray-50 focus:bg-white"
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-2 border-gray-100 focus:border-purple-300 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-700 outline-none transition-all bg-gray-50 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border-2 border-gray-100 focus:border-purple-300 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-700 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={paying}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Lock className="w-5 h-5" />
            {paying ? 'Processing...' : 'Pay ₹399 & Get Report'}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure payment</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant report</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 100% satisfaction</span>
          </div>

          <p className="text-center text-xs text-gray-300 mt-3">Your data is safe with us and never shared.</p>
        </div>

      </div>
    </div>
  );
}