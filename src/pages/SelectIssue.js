import React from 'react';
import { useNavigate } from 'react-router-dom';

const ISSUES = [
  { id: 'skin', icon: '✨', title: 'Skin Problems', subtitle: 'Acne, pigmentation, dryness & more', color: '#F4A261', bg: '#FFF3E8' },
  { id: 'hair', icon: '💆', title: 'Hair Fall', subtitle: 'Thinning, breakage, scalp issues', color: '#E76F51', bg: '#FFF0EC' },
  { id: 'stress', icon: '🧘', title: 'Stress Management', subtitle: 'Anxiety, burnout, overthinking', color: '#457B9D', bg: '#EAF2F8' },
  { id: 'time', icon: '⏰', title: 'Time Management', subtitle: 'Productivity, focus, procrastination', color: '#2A9D8F', bg: '#E8F8F5' },
  { id: 'astrology', icon: '🔮', title: 'Astrology', subtitle: 'Kundli, career, relationship guidance', color: '#7B2D8B', bg: '#F5EAF8' },
  { id: 'weight', icon: '💪', title: 'Weight & Fitness', subtitle: 'Weight loss, muscle gain, body goals', color: '#E63946', bg: '#FDE8E9' },
  { id: 'sleep', icon: '🌙', title: 'Sleep Issues', subtitle: 'Insomnia, restlessness, sleep cycles', color: '#264653', bg: '#E9EEF0' },
  { id: 'nutrition', icon: '🥗', title: 'Nutrition & Diet', subtitle: 'Deficiencies, diet planning, gut health', color: '#52B788', bg: '#EBF7F0' },
];

function SelectIssue() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <button style={styles.back} onClick={() => navigate('/')}>← Back</button>
        <h2 style={styles.title}>Apni Problem Choose Karo</h2>
        <p style={styles.subtitle}>Ek issue select karo jiske liye report chahiye</p>
        <div style={styles.grid}>
          {ISSUES.map(issue => (
            <button
              key={issue.id}
              style={{ ...styles.card, background: issue.bg, borderColor: issue.color + '44' }}
              onClick={() => navigate(`/questions/${issue.id}`)}
            >
              <div style={{ ...styles.iconBox, background: issue.color + '22' }}>{issue.icon}</div>
              <div style={styles.issueTitle}>{issue.title}</div>
              <div style={styles.issueSub}>{issue.subtitle}</div>
              <div style={{ ...styles.arrow, color: issue.color }}>Get Report →</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #FDFBF7, #F5F0E8)', padding: '20px 16px 60px', fontFamily: 'Georgia, serif' },
  inner: { maxWidth: 900, margin: '0 auto' },
  back: { background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#666', fontFamily: 'sans-serif', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 700, color: '#1A1A1A', margin: '0 0 8px' },
  subtitle: { color: '#888', fontSize: 14, marginBottom: 24, fontFamily: 'sans-serif' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 },
  card: { border: '1.5px solid', borderRadius: 18, padding: '24px 20px', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.15s' },
  iconBox: { width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 14 },
  issueTitle: { fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 4, fontFamily: 'sans-serif' },
  issueSub: { fontSize: 12, color: '#888', marginBottom: 14, lineHeight: 1.4, fontFamily: 'sans-serif' },
  arrow: { fontSize: 13, fontWeight: 600, fontFamily: 'sans-serif' },
};

export default SelectIssue;
