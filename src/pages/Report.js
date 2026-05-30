import React, { useState, useEffect } from 'react';
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

function Report() {
  const navigate = useNavigate();
  const [report, setReport] = useState('');
  const [generating, setGenerating] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);

  const issueId = localStorage.getItem('mml_issue') || 'skin';
  const answers = JSON.parse(localStorage.getItem('mml_answers') || '{}');
  const issueName = ISSUE_NAMES[issueId];
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

  useEffect(() => {
    generateReport();
    setTimeout(() => {
      setProducts(PRODUCTS[issueId] || []);
      setLoadingProducts(false);
    }, 8000);
  }, [issueId]);

  const generateReport = async () => {
    const prompt = `You are a wellness expert. Generate a detailed personalized wellness report in Hinglish (Hindi + English mix).

Issue: ${issueName}
User Answers: ${JSON.stringify(answers, null, 2)}

Generate report with these sections:
1. Aapki Current Situation
2. Root Causes
3. Personalized Action Plan (5-7 steps)
4. Lifestyle Recommendations
5. Kya Avoid Karein
6. Expert Tip

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
      setReport('Report generate karne mein error aayi: ' + err.message);
    }
    setGenerating(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div style={styles.topBar}>
          <h2 style={styles.title}>Aapki Personalized Report</h2>
          <button style={styles.back} onClick={() => { localStorage.clear(); navigate('/'); }}>New Report</button>
        </div>
        <div style={styles.reportCard}>
          {generating ? (
            <div style={styles.loading}>
              <div style={styles.spinner} />
              <p style={styles.loadingText}>AI aapke liye report taiyaar kar raha hai...</p>
              <p style={styles.loadingSmall}>10-15 seconds lagenge</p>
            </div>
          ) : (
            <div style={styles.reportContent}>
              {report.split('\n').map((line, i) => {
                if (!line.trim()) return <br key={i} />;
                if (line.match(/^[0-9]+\./)) return <h4 key={i} style={styles.reportH}>{line}</h4>;
                if (line.startsWith('##')) return <h4 key={i} style={styles.reportH}>{line.replace(/^#+\s*/, '')}</h4>;
                return <p key={i} style={styles.reportP}>{line}</p>;
              })}
            </div>
          )}
        </div>
        <h3 style={styles.productTitle}>
          {loadingProducts ? 'Best products dhundh rahe hain...' : 'Recommended Products'}
        </h3>
        {loadingProducts ? (
          <div style={styles.loading}><div style={styles.spinner} /></div>
        ) : (
          <div style={styles.productGrid}>
            {products.map((p, i) => (
              <div key={i} style={styles.productCard}>
                <div style={styles.productTag}>{p.tag}</div>
                <div style={styles.productName}>{p.name}</div>
                <div style={styles.productRating}>⭐ {p.rating}/5</div>
                <div style={styles.productPrice}>₹{p.price}</div>
                <button style={styles.buyBtn}>Buy Now →</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #FDFBF7, #F5F0E8)', padding: '20px 16px 60px', fontFamily: 'Georgia, serif' },
  inner: { maxWidth: 800, margin: '0 auto' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 700, color: '#1A1A1A' },
  back: { background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#666', fontFamily: 'sans-serif' },
  reportCard: { background: '#fff', borderRadius: 24, padding: '32px 28px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', marginBottom: 32 },
  loading: { textAlign: 'center', padding: '40px 0' },
  spinner: { width: 40, height: 40, border: '3px solid #F0F0F0', borderTop: '3px solid #E76F51', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' },
  loadingText: { fontSize: 16, color: '#555', fontFamily: 'sans-serif', margin: '16px 0 8px' },
  loadingSmall: { fontSize: 13, color: '#aaa', fontFamily: 'sans-serif' },
  reportContent: { lineHeight: 1.8 },
  reportH: { fontSize: 16, fontWeight: 700, color: '#E76F51', margin: '20px 0 8px', fontFamily: 'sans-serif' },
  reportP: { color: '#444', margin: '6px 0', fontSize: 15, fontFamily: 'sans-serif' },
  productTitle: { fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 20, fontFamily: 'sans-serif' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 },
  productCard: { background: '#fff', borderRadius: 18, padding: '24px 20px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' },
  productTag: { background: '#E76F51', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '3px 8px', display: 'inline-block', marginBottom: 12, fontFamily: 'sans-serif' },
  productName: { fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, lineHeight: 1.4, fontFamily: 'sans-serif' },
  productRating: { fontSize: 13, color: '#F4A261', marginBottom: 8, fontFamily: 'sans-serif' },
  productPrice: { fontSize: 22, fontWeight: 800, color: '#1A1A1A', marginBottom: 16, fontFamily: 'sans-serif' },
  buyBtn: { width: '100%', background: 'linear-gradient(135deg, #E76F51, #F4A261)', border: 'none', borderRadius: 10, padding: '11px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif' },
};

const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(styleEl);

export default Report;
