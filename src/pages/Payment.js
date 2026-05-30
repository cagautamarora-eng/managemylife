import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ISSUES = {
  skin: { icon: '✨', title: 'Skin Problems' },
  hair: { icon: '💆', title: 'Hair Fall' },
  stress: { icon: '🧘', title: 'Stress Management' },
  time: { icon: '⏰', title: 'Time Management' },
  astrology: { icon: '🔮', title: 'Astrology' },
  weight: { icon: '💪', title: 'Weight & Fitness' },
  sleep: { icon: '🌙', title: 'Sleep Issues' },
  nutrition: { icon: '🥗', title: 'Nutrition & Diet' },
};

function Payment() {
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const issueId = localStorage.getItem('mml_issue') || 'skin';
  const issue = ISSUES[issueId];

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      localStorage.setItem('mml_paid', 'true');
      navigate('/report');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <button style={styles.back} onClick={() => navigate(-1)}>← Back</button>
        <h2 style={styles.title}>Almost There! 🎉</h2>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.icon}>{issue.icon}</span>
            <div>
              <div style={styles.issueName}>{issue.title} Report</div>
              <div style={styles.issueDesc}>AI-powered personalized wellness report</div>
            </div>
          </div>
          <div style={styles.divider} />
          <div style={styles.includesTitle}>Report mein kya milega:</div>
          {['📊 Deep problem analysis', '🔍 Root cause identification', '🌟 Personalized 7-step action plan', '🍎 Lifestyle & diet guide', '💡 Expert wellness tips', '🛍️ Best product recommendations'].map(item => (
            <div key={item} style={styles.includeItem}>{item}</div>
          ))}
          <div style={styles.divider} />
          <div style={styles.priceRow}>
            <span style={styles.originalPrice}>₹999</span>
            <span style={styles.price}>₹399</span>
            <span style={styles.discount}>60% OFF</span>
          </div>
          <button style={styles.btn} onClick={handlePay} disabled={paying}>
            {paying ? 'Processing...' : 'Pay ₹399 & Get Report 🔒'}
          </button>
          <p style={styles.note}>🔒 Secure payment • Instant report • 100% satisfaction</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #FDFBF7, #F5F0E8)', padding: '20px 16px', fontFamily: 'Georgia, serif' },
  inner: { maxWidth: 480, margin: '0 auto' },
  back: { background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#666', fontFamily: 'sans-serif', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 20 },
  card: { background: '#fff', borderRadius: 24, padding: '32px 28px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' },
  header: { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 },
  icon: { fontSize: 40 },
  issueName: { fontSize: 18, fontWeight: 700, color: '#1A1A1A', fontFamily: 'sans-serif' },
  issueDesc: { fontSize: 13, color: '#888', fontFamily: 'sans-serif', marginTop: 4 },
  divider: { height: 1, background: '#F0F0F0', margin: '20px 0' },
  includesTitle: { fontSize: 14, fontWeight: 700, color: '#555', marginBottom: 12, fontFamily: 'sans-serif' },
  includeItem: { fontSize: 14, color: '#444', padding: '6px 0', fontFamily: 'sans-serif' },
  priceRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  originalPrice: { fontSize: 20, color: '#bbb', textDecoration: 'line-through', fontFamily: 'sans-serif' },
  price: { fontSize: 36, fontWeight: 800, color: '#1A1A1A', fontFamily: 'sans-serif' },
  discount: { background: '#E8F8F0', color: '#2A9D8F', borderRadius: 8, padding: '4px 10px', fontSize: 13, fontWeight: 700, fontFamily: 'sans-serif' },
  btn: { width: '100%', background: 'linear-gradient(135deg, #E76F51, #F4A261)', color: '#fff', border: 'none', borderRadius: 14, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif' },
  note: { textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 14, fontFamily: 'sans-serif' },
};

export default Payment;
