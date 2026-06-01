import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PRODUCTS = {
  skin: [
    { name: 'Minimalist 2% Salicylic Acid Serum', price: 599, rating: 4.5, tag: 'Best for Acne' },
    { name: 'Dot & Key Vitamin C Face Wash', price: 399, rating: 4.3, tag: 'Brightening' },
    { name: 'Plum Bright Years Serum', price: 899, rating: 4.6, tag: 'Anti-Aging' },
  ],
  hair: [
    { name: 'Traya Hair Ras Advanced', price: 1299, rating: 4.7, tag: 'Best Seller' },
    { name: 'WOW Onion Black Seed Oil', price: 499, rating: 4.4, tag: 'Hair Fall Control' },
    { name: 'Himalaya Anti-Dandruff Shampoo', price: 249, rating: 4.2, tag: 'Dandruff' },
  ],
  stress: [
    { name: 'Kapiva Ashwagandha Gold', price: 799, rating: 4.5, tag: 'Stress Relief' },
    { name: 'Setu Calm Supplement', price: 999, rating: 4.6, tag: 'Anxiety Control' },
    { name: 'Himalaya Stress Care', price: 499, rating: 4.3, tag: 'Daily Calm' },
  ],
  time: [
    { name: 'Passion Planner Notebook', price: 799, rating: 4.8, tag: 'Productivity' },
    { name: 'Pomodoro Timer', price: 599, rating: 4.4, tag: 'Focus Tool' },
    { name: 'Atomic Habits Book', price: 399, rating: 4.9, tag: 'Bestseller' },
  ],
  astrology: [
    { name: 'Rudraksha Bracelet 5 Mukhi', price: 999, rating: 4.6, tag: 'Protection' },
    { name: 'Clear Quartz Crystal Set', price: 799, rating: 4.5, tag: 'Positive Energy' },
    { name: 'Lal Kitab Remedies Book', price: 399, rating: 4.3, tag: 'Knowledge' },
  ],
  weight: [
    { name: 'MuscleBlaze Whey Protein 1kg', price: 1599, rating: 4.7, tag: 'Muscle Gain' },
    { name: 'Oziva Fit & Slim Shake', price: 1299, rating: 4.5, tag: 'Weight Loss' },
    { name: 'Resistance Band Set', price: 699, rating: 4.6, tag: 'Home Workout' },
  ],
  sleep: [
    { name: 'Wellbeing Nutrition Sleep Melts', price: 799, rating: 4.7, tag: 'Deep Sleep' },
    { name: 'Lavender Essential Oil Diffuser', price: 1199, rating: 4.5, tag: 'Relaxation' },
    { name: 'Sleep Mask + Ear Plugs Kit', price: 299, rating: 4.3, tag: 'Sleep Quality' },
  ],
  nutrition: [
    { name: 'Swisse Ultivite Multivitamin', price: 1499, rating: 4.6, tag: 'Complete Nutrition' },
    { name: 'Oziva Plant-Based Vitamin C', price: 699, rating: 4.5, tag: 'Immunity' },
    { name: 'Kapiva Triphala Juice', price: 499, rating: 4.4, tag: 'Gut Health' },
  ],
};

const ISSUE_NAMES = {
  skin: 'Skin Problems', hair: 'Hair Fall', stress: 'Stress Management',
  time: 'Time Management', astrology: 'Astrology', weight: 'Weight & Fitness',
  sleep: 'Sleep Issues', nutrition: 'Nutrition & Diet',
};

const LOADING_STEPS = [
  { text: 'Analyzing your answers...', icon: '🔍', color: '#7B5EA7' },
  { text: 'Consulting 500+ expert opinions...', icon: '👨‍⚕️', color: '#8B5CF6' },
  { text: 'Searching latest research papers...', icon: '📚', color: '#EC4899' },
  { text: 'Finding best wellness solutions...', icon: '💡', color: '#7B5EA7' },
  { text: 'Cross-referencing medical databases...', icon: '🏥', color: '#8B5CF6' },
  { text: 'Personalizing your report...', icon: '✨', color: '#EC4899' },
  { text: 'Almost ready...', icon: '🎯', color: '#7B5EA7' },
];

function OpticalIllusion() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      angleRef.current += 0.008;
      const angle = angleRef.current;

      // Draw concentric rotating rings
      const rings = 12;
      for (let i = rings; i >= 1; i--) {
        const radius = (i / rings) * 140;
        const segments = 8 + i * 2;
        const rotOffset = i % 2 === 0 ? angle * (1 + i * 0.1) : -angle * (1 + i * 0.1);

        for (let j = 0; j < segments; j++) {
          const startAngle = (j / segments) * Math.PI * 2 + rotOffset;
          const endAngle = ((j + 0.5) / segments) * Math.PI * 2 + rotOffset;

          const hue = (i * 25 + angle * 40) % 360;
          const lightness = 45 + i * 2;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fillStyle = `hsla(${hue}, 70%, ${lightness}%, 0.85)`;
          ctx.fill();
        }

        // Inner ring border
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
      gradient.addColorStop(0.5, 'rgba(139,92,246,0.6)');
      gradient.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Center brain icon text
      ctx.font = 'bold 28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#7B5EA7';
      ctx.fillText('🧠', cx, cy);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: '50%',
        boxShadow: '0 0 60px rgba(123,94,167,0.4), 0 0 120px rgba(139,92,246,0.2)',
      }}
    />
  );
}

function Report() {
  const navigate = useNavigate();
  const [report, setReport] = useState('');
  const [generating, setGenerating] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const issueId = localStorage.getItem('mml_issue') || 'skin';
  const answers = JSON.parse(localStorage.getItem('mml_answers') || '{}');
  const issueName = ISSUE_NAMES[issueId];
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

  useEffect(() => {
    // Cycle through loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % LOADING_STEPS.length);
    }, 2000);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 95 ? prev + 1 : prev);
    }, 150);

    generateReport();

    setTimeout(() => {
      setProducts(PRODUCTS[issueId] || []);
      setLoadingProducts(false);
    }, 8000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const generateReport = async () => {
    const prompt = `You are a wellness expert. Generate a detailed personalized wellness report in Hinglish (Hindi + English mix).

Issue: ${issueName}
User Answers: ${JSON.stringify(answers)}

Generate report with these sections:
1. 📊 Aapki Current Situation
2. 🔍 Root Causes  
3. 🌟 Personalized Action Plan (5-7 steps)
4. 🍎 Lifestyle Recommendations
5. ⚠️ Kya Avoid Karein
6. 💡 Expert Tip

Keep it warm, practical and encouraging. Use emojis. Write in simple Hinglish.`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || '').join('\n') || 'Report generate nahi ho saki.';
      setReport(text);
    } catch (err) {
      setReport('Error: ' + err.message);
    }
    setProgress(100);
    setGenerating(false);
  };

  const step = LOADING_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-[#FAF7FF] font-sans">

      {generating ? (
        // OPTICAL ILLUSION LOADING SCREEN
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">

          {/* Background gradient blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <div className="text-4xl font-black text-gray-900 mb-2">
              Generating Your Report
            </div>
            <div className="text-gray-400 text-lg">Powered by LifeAI • Expert-backed insights</div>
          </div>

          {/* Optical Illusion */}
          <div className="relative z-10 mb-10">
            <OpticalIllusion />
          </div>

          {/* Animated step text */}
          <div className="relative z-10 text-center mb-8">
            <div
              className="flex items-center justify-center gap-3 text-xl font-bold mb-2 transition-all duration-500"
              style={{ color: step.color }}
            >
              <span className="text-2xl">{step.icon}</span>
              <span>{step.text}</span>
            </div>
            <div className="text-gray-400 text-sm">This may take 10-15 seconds</div>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 w-full max-w-md">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Analyzing...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7B5EA7, #8B5CF6, #EC4899)'
                }}
              />
            </div>
          </div>

          {/* Steps indicator */}
          <div className="relative z-10 mt-8 flex gap-3 flex-wrap justify-center max-w-lg">
            {LOADING_STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  i === currentStep
                    ? 'bg-purple-100 text-purple-700 scale-105'
                    : i < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <span>{i < currentStep ? '✓' : s.icon}</span>
                <span>{s.text.split('...')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // REPORT CONTENT
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-black text-gray-900">🎯 Aapki Personalized Report</h1>
            <button
              onClick={() => { localStorage.clear(); navigate('/'); }}
              className="bg-white border border-purple-200 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-50 transition-all"
            >
              ← New Report
            </button>
          </div>

          {/* Report Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-50 mb-8">
            <div className="prose max-w-none">
              {report.split('\n').map((line, i) => {
                if (!line.trim()) return <br key={i} />;
                if (line.match(/^[0-9]+\./)) return <h4 key={i} className="text-lg font-bold text-purple-600 mt-6 mb-2">{line}</h4>;
                if (line.startsWith('##')) return <h4 key={i} className="text-lg font-bold text-purple-600 mt-6 mb-2">{line.replace(/^#+\s*/, '')}</h4>;
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-gray-800">{line.replace(/\*\*/g, '')}</p>;
                if (line.startsWith('- ') || line.startsWith('• ')) return <p key={i} className="text-gray-600 pl-4 border-l-2 border-purple-200 my-1">{line}</p>;
                return <p key={i} className="text-gray-600 leading-relaxed my-1">{line}</p>;
              })}
            </div>
          </div>

          {/* Products */}
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            {loadingProducts ? '🔍 Aapke liye products dhundh rahe hain...' : '🛍️ Recommended Products'}
          </h2>

          {loadingProducts ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-purple-50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4">{p.tag}</div>
                  <div className="text-base font-bold text-gray-800 mb-2 leading-tight">{p.name}</div>
                  <div className="text-yellow-500 text-sm mb-2">⭐ {p.rating}/5</div>
                  <div className="text-2xl font-black text-gray-900 mb-4">₹{p.price}</div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-2xl font-bold hover:shadow-lg transition-all">
                    Buy Now →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Report;