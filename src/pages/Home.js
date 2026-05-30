import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div style={styles.badge}>🌟 India's #1 AI Wellness Guide</div>
        <h1 style={styles.title}>Apni Life Ko<br /><span style={styles.accent}>Manage Karo</span></h1>
        <p style={styles.subtitle}>Skin se lekar stress tak — apni problem choose karo, AI se personalized report pao, aur best products discover karo. Sirf ₹399 mein.</p>
        <button style={styles.btn} onClick={() => navigate('/select')}>
          Apni Problem Choose Karo →
        </button>
        <div style={styles.trust}>
          <span>⭐ 4.8 Rating</span>
          <span>👥 50,000+ Users</span>
          <span>🔒 Secure Payment</span>
        </div>
        <div style={styles.steps}>
          <h3 style={styles.stepsTitle}>Kaise Kaam Karta Hai?</h3>
          <div style={styles.stepsGrid}>
            {[
              { n: '1', t: 'Issue Chunno', s: '8 categories mein se apni problem select karo' },
              { n: '2', t: 'Quick Survey', s: '5-6 simple sawaalon ke jawab do' },
              { n: '3', t: 'AI Report Pao', s: '₹399 mein expert-level personalized report' },
              { n: '4', t: 'Products Discover Karo', s: 'Aapke liye curated best products' },
            ].map(s => (
              <div key={s.n} style={styles.stepCard}>
                <div style={styles.stepNum}>{s.n}</div>
                <div style={styles.stepTitle}>{s.t}</div>
                <div style={styles.stepSub}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E8 100%)', padding: '20px 16px 60px', fontFamily: 'Georgia, serif' },
  inner: { maxWidth: 640, margin: '0 auto', textAlign: 'center', paddingTop: 40 },
  badge: { display: 'inline-block', background: '#FFF3CD', border: '1px solid #F4C430', color: '#8B6914', borderRadius: 50, padding: '6px 18px', fontSize: 13, marginBottom: 24, fontFamily: 'sans-serif' },
  title: { fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, margin: '0 0 16px' },
  accent: { color: '#E76F51' },
  subtitle: { fontSize: 16, color: '#555', lineHeight: 1.7, margin: '0 0 28px', fontFamily: 'sans-serif' },
  btn: { background: 'linear-gradient(135deg, #E76F51, #F4A261)', color: '#fff', border: 'none', borderRadius: 14, padding: '16px 32px', fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', boxShadow: '0 8px 24px rgba(231,111,81,0.35)' },
  trust: { display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20, fontFamily: 'sans-serif', color: '#666', fontSize: 13 },
  steps: { marginTop: 56, textAlign: 'left' },
  stepsTitle: { fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 20, textAlign: 'center' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 },
  stepCard: { background: '#fff', borderRadius: 16, padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  stepNum: { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#E76F51,#F4A261)', color: '#fff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontFamily: 'sans-serif' },
  stepTitle: { fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, fontFamily: 'sans-serif' },
  stepSub: { fontSize: 12, color: '#888', lineHeight: 1.5, fontFamily: 'sans-serif' },
};

export default Home;