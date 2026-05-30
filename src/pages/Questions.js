import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QUESTIONS = {
  skin: [
    { id: 'problem', label: 'Aapko main problem kya hai?', options: ['Acne / Pimples', 'Dark Spots', 'Dry Skin', 'Oily Skin', 'Anti-Aging'] },
    { id: 'duration', label: 'Yeh problem kitne time se hai?', options: ['1 mahine se kam', '1-6 mahine', '6 mahine - 1 saal', '1 saal se zyada'] },
    { id: 'tried', label: 'Kya koi product try kiya?', options: ['Haan, koi fayda nahi', 'Haan, thoda fayda hua', 'Nahi, pehli baar'] },
    { id: 'medicine', label: 'Doctor se medicine li hai?', options: ['Haan, abhi bhi', 'Haan, band kar di', 'Kabhi nahi'] },
    { id: 'goal', label: 'Aap kya chahte hain?', options: ['Quick fix', 'Long term solution', 'Natural solution', 'Budget friendly'] },
  ],
  hair: [
    { id: 'problem', label: 'Hair problem kya hai?', options: ['Hair Fall', 'Dandruff', 'Dry Hair', 'Scalp Itching', 'Slow Growth'] },
    { id: 'duration', label: 'Kab se ho raha hai?', options: ['1 mahine se kam', '1-6 mahine', '6 mahine - 1 saal', '1+ saal'] },
    { id: 'tried', label: 'Koi oil/shampoo try kiya?', options: ['Haan, koi fayda nahi', 'Thoda better hua', 'Nahi'] },
    { id: 'diet', label: 'Aapki diet kaisi hai?', options: ['Vegetarian', 'Non-vegetarian', 'Junk food zyada', 'Balanced'] },
    { id: 'goal', label: 'Kya result chahte hain?', options: ['Hair fall rokna', 'New growth', 'Shiny hair', 'Dandruff free'] },
  ],
  stress: [
    { id: 'trigger', label: 'Stress ka main reason?', options: ['Work pressure', 'Relationship', 'Financial', 'Health', 'Family'] },
    { id: 'symptoms', label: 'Kya feel hota hai?', options: ['Anxiety', 'Irritability', 'Overthinking', 'Physical symptoms'] },
    { id: 'sleep', label: 'Neend kaisi hai?', options: ['Bilkul nahi', 'Interrupted', 'Normal', 'Bahut zyada'] },
    { id: 'tried', label: 'Koi meditation try ki?', options: ['Haan regular', 'Thoda try kiya', 'Kabhi nahi'] },
    { id: 'goal', label: 'Kya chahiye?', options: ['Quick relief', 'Long term plan', 'Meditation guide', 'Professional help'] },
  ],
  time: [
    { id: 'problem', label: 'Main challenge?', options: ['Procrastination', 'Too many tasks', 'Work-life balance', 'Distraction'] },
    { id: 'work', label: 'Aap kya karte hain?', options: ['Student', 'Job', 'Business', 'Freelancer', 'Homemaker'] },
    { id: 'tools', label: 'Productivity tool use karte hain?', options: ['Haan, effective nahi', 'Thoda', 'Nahi'] },
    { id: 'goal', label: 'Kya achieve karna hai?', options: ['Daily routine', 'Work faster', 'Stop procrastinating', 'Work-life balance'] },
  ],
  astrology: [
    { id: 'concern', label: 'Main concern?', options: ['Career', 'Marriage', 'Finance', 'Health', 'Education'] },
    { id: 'goal', label: 'Kya jaanna chahte hain?', options: ['Future prediction', 'Kundli analysis', 'Lucky dates', 'Remedies'] },
    { id: 'belief', label: 'Astrology mein kitna believe?', options: ['Poora', 'Thoda', 'Just curious'] },
  ],
  weight: [
    { id: 'goal', label: 'Aapka goal?', options: ['Weight loss', 'Muscle gain', 'Body toning', 'Stamina'] },
    { id: 'activity', label: 'Activity level?', options: ['No exercise', '1-2 days/week', '3-4 days/week', '5+ days'] },
    { id: 'diet', label: 'Diet preference?', options: ['Vegetarian', 'Non-vegetarian', 'Vegan', 'No preference'] },
    { id: 'tried', label: 'Koi plan try kiya?', options: ['Haan, results nahi', 'Kuch results mile', 'Pehli baar'] },
  ],
  sleep: [
    { id: 'problem', label: 'Sleep problem?', options: ['Neend nahi aati', 'Neend toot jaati', 'Bahut zyada neend', 'Nightmares'] },
    { id: 'hours', label: 'Average kitne ghante?', options: ['3 se kam', '3-5 ghante', '5-7 ghante', '7+ ghante'] },
    { id: 'cause', label: 'Wajah kya lagti hai?', options: ['Stress', 'Phone/Screen', 'Irregular schedule', 'Health issue'] },
    { id: 'tried', label: 'Kuch try kiya?', options: ['Meditation', 'Medicine', 'Kuch nahi', 'Lifestyle change'] },
  ],
  nutrition: [
    { id: 'concern', label: 'Main concern?', options: ['Energy/Fatigue', 'Weak immunity', 'Vitamin deficiency', 'Digestion'] },
    { id: 'diet', label: 'Current diet?', options: ['Home cooked', 'Outside food', 'Mixed', 'Raw/Salads'] },
    { id: 'symptoms', label: 'Koi symptom?', options: ['Thakaan', 'Dull skin/hair', 'Frequent illness', 'Bloating'] },
    { id: 'goal', label: 'Kya chahiye?', options: ['Diet plan', 'Supplements', 'Detox', 'Gut health'] },
  ],
};

function Questions() {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = QUESTIONS[issueId] || [];
  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(c => c + 1), 300);
    } else {
      localStorage.setItem('mml_answers', JSON.stringify(newAnswers));
      localStorage.setItem('mml_issue', issueId);
      navigate('/payment');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <button style={styles.back} onClick={() => currentQ === 0 ? navigate('/select') : setCurrentQ(c => c - 1)}>← Back</button>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <p style={styles.progressLabel}>Question {currentQ + 1} of {questions.length}</p>
        <div style={styles.card}>
          <h3 style={styles.qText}>{q.label}</h3>
          <div style={styles.options}>
            {q.options.map(opt => (
              <button key={opt} style={{ ...styles.optBtn, ...(answers[q.id] === opt ? styles.optActive : {}) }} onClick={() => handleAnswer(opt)}>
                {answers[q.id] === opt ? '✓ ' : ''}{opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: 'linear-gradient(135deg, #FDFBF7, #F5F0E8)', padding: '20px 16px', fontFamily: 'Georgia, serif' },
  inner: { maxWidth: 520, margin: '0 auto' },
  back: { background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#666', fontFamily: 'sans-serif', marginBottom: 20 },
  progressBar: { height: 6, background: '#E8E8E8', borderRadius: 3, marginBottom: 8, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(135deg, #E76F51, #F4A261)', borderRadius: 3, transition: 'width 0.4s ease' },
  progressLabel: { fontSize: 12, color: '#aaa', marginBottom: 24, fontFamily: 'sans-serif' },
  card: { background: '#fff', borderRadius: 20, padding: '28px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' },
  qText: { fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 20, lineHeight: 1.4 },
  options: { display: 'flex', flexDirection: 'column', gap: 10 },
  optBtn: { background: '#FAFAFA', border: '1.5px solid #E8E8E8', borderRadius: 12, padding: '13px 18px', fontSize: 14, cursor: 'pointer', textAlign: 'left', fontFamily: 'sans-serif', color: '#333' },
  optActive: { background: '#FFF3E8', border: '1.5px solid #E76F51', color: '#E76F51', fontWeight: 600 },
};

export default Questions;
