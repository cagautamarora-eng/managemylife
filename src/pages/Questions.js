import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QUESTIONS = {
  skin: [
    { id: 'concern', label: 'What is your primary skin concern?', options: ['Acne & Pimples', 'Pigmentation & Dark Spots', 'Oily Skin', 'Dry & Flaky Skin', 'Dull & Uneven Skin'] },
    { id: 'duration', label: 'How long have you had this skin issue?', options: ['Less than 1 month', '1-3 months', '3-6 months', '6-12 months', 'More than 1 year'] },
    { id: 'skin_type', label: 'What is your skin type?', options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'] },
    { id: 'breakouts', label: 'How often do you get breakouts?', options: ['Never', 'Rarely (once in a while)', 'Monthly', 'Weekly', 'Almost daily'] },
    { id: 'current_routine', label: 'What skincare routine do you follow?', options: ['No routine at all', 'Just face wash', 'Basic (moisturizer + sunscreen)', 'Full routine (serum, toner etc)', 'Prescription products'] },
    { id: 'water', label: 'How much water do you drink daily?', options: ['Less than 1 litre', '1-2 litres', '2-3 litres', '3-4 litres', 'More than 4 litres'] },
    { id: 'sleep', label: 'How many hours do you sleep at night?', options: ['Less than 5 hours', '5-6 hours', '6-7 hours', '7-8 hours', 'More than 8 hours'] },
    { id: 'stress', label: 'How would you rate your stress level?', options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'] },
    { id: 'medication', label: 'Have you taken any medication for skin?', options: ['Never', 'Tried OTC products', 'Past doctor treatment', 'Currently on treatment', 'Multiple treatments tried'] },
    { id: 'goal', label: 'What result do you want from this report?', options: ['Clear acne completely', 'Get glowing skin', 'Reduce oiliness', 'Reduce pigmentation', 'Anti-aging solution'] },
  ],
  hair: [
    { id: 'severity', label: 'How severe is your hair fall?', options: ['Mild (few strands)', 'Moderate (noticeable)', 'Severe (clumps)', 'Hair thinning visible', 'Bald patches forming'] },
    { id: 'duration', label: 'How long has hair fall been happening?', options: ['Less than 1 month', '1-3 months', '3-6 months', '6-12 months', 'More than 1 year'] },
    { id: 'family', label: 'Do you have family history of hair loss?', options: ['No history at all', 'Father side history', 'Mother side history', 'Both sides affected', 'Not sure'] },
    { id: 'hair_type', label: 'What is your hair type?', options: ['Straight & Fine', 'Wavy', 'Curly', 'Thin & Weak', 'Thick & Coarse'] },
    { id: 'concern', label: 'What is your biggest hair concern?', options: ['Excessive hair fall', 'Hair thinning', 'Dandruff & itchy scalp', 'Balding / receding hairline', 'Weak & brittle hair'] },
    { id: 'oiling', label: 'How often do you oil your hair?', options: ['Never', 'Once a month', 'Once a week', 'Twice a week', 'Almost daily'] },
    { id: 'protein', label: 'How is your protein intake?', options: ['Very low (barely any)', 'Low (occasionally)', 'Average', 'Good (eggs/dal daily)', 'High (supplements too)'] },
    { id: 'stress', label: 'What is your current stress level?', options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'] },
    { id: 'sleep', label: 'How is your sleep quality?', options: ['Very poor', 'Below average', 'Average', 'Good', 'Excellent'] },
    { id: 'goal', label: 'What result do you want?', options: ['Stop hair fall completely', 'Regrow lost hair', 'Reduce dandruff', 'Increase hair thickness', 'Overall healthy hair'] },
  ],
  stress: [
    { id: 'source', label: 'What is the biggest source of your stress?', options: ['Work & career pressure', 'Financial problems', 'Relationship issues', 'Health concerns', 'Studies & exams'] },
    { id: 'frequency', label: 'How often do you feel stressed?', options: ['Rarely', 'Once a week', 'Few times a week', 'Almost daily', 'Constantly throughout day'] },
    { id: 'sleep', label: 'How is your sleep quality?', options: ['Very poor / insomnia', 'Below average', 'Average', 'Good', 'Excellent'] },
    { id: 'work_hours', label: 'How many hours do you work daily?', options: ['Less than 4 hours', '4-6 hours', '6-8 hours', '8-10 hours', 'More than 10 hours'] },
    { id: 'exercise', label: 'How often do you exercise?', options: ['Never', 'Rarely (monthly)', 'Once a week', '3-5 times a week', 'Daily'] },
    { id: 'anxiety', label: 'Do you experience anxiety or panic?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
    { id: 'support', label: 'How is your emotional support system?', options: ['No support at all', 'Weak support', 'Average', 'Good friends/family', 'Excellent support'] },
    { id: 'screen_time', label: 'How much screen time daily?', options: ['Less than 2 hours', '2-4 hours', '4-6 hours', '6-8 hours', 'More than 8 hours'] },
    { id: 'goal', label: 'What is your main goal?', options: ['Find inner peace', 'Improve focus & clarity', 'Build confidence', 'Achieve work-life balance', 'Increase productivity'] },
    { id: 'stress_score', label: 'Rate your stress on a scale of 1-10', options: ['1-2 (Very minimal)', '3-4 (Manageable)', '5-6 (Moderate)', '7-8 (High)', '9-10 (Unbearable)'] },
  ],
  time: [
    { id: 'challenge', label: 'What is your biggest time management challenge?', options: ['Procrastination constantly', 'Too many distractions', 'Poor planning & scheduling', 'Too many tasks at once', 'Low motivation to start'] },
    { id: 'productive_hours', label: 'How many truly productive hours per day?', options: ['Less than 2 hours', '2-4 hours', '4-6 hours', '6-8 hours', 'More than 8 hours'] },
    { id: 'procrastination', label: 'How often do you procrastinate?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
    { id: 'distraction', label: 'What distracts you the most?', options: ['Social media & phone', 'TV & entertainment', 'Gaming', 'People around me', 'Multitasking everything'] },
    { id: 'calendar', label: 'Do you use a calendar or planner?', options: ['Never used one', 'Rarely use it', 'Sometimes', 'Often', 'Use it daily'] },
    { id: 'todo', label: 'Do you make a to-do list?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Every single day'] },
    { id: 'work_life', label: 'How is your work-life balance?', options: ['Very poor', 'Below average', 'Average', 'Good', 'Excellent'] },
    { id: 'main_goal', label: 'What is your main life goal right now?', options: ['Career growth', 'Business success', 'Academic achievement', 'Health & fitness', 'Personal development'] },
    { id: 'blocker', label: 'What blocks your progress most?', options: ['Not enough time', 'Lack of focus', 'Poor planning', 'Low energy', 'No clarity on goals'] },
    { id: 'planning', label: 'How often do you plan your week?', options: ['Never', 'Monthly', 'Sometimes', 'Every week', 'Plan every day'] },
  ],
  sleep: [
    { id: 'problem', label: 'What is your biggest sleep problem?', options: ["Can't fall asleep at all", 'Wake up multiple times', 'Wake up too early', 'Poor quality sleep', 'Feel tired despite sleeping'] },
    { id: 'hours', label: 'How many hours do you sleep on average?', options: ['Less than 5 hours', '5-6 hours', '6-7 hours', '7-8 hours', 'More than 8 hours'] },
    { id: 'bedtime', label: 'What time do you usually go to bed?', options: ['Before 9 PM', '9-10 PM', '10-11 PM', '11 PM - 12 AM', 'After midnight'] },
    { id: 'wake_time', label: 'What time do you wake up?', options: ['Before 5 AM', '5-6 AM', '6-7 AM', '7-8 AM', 'After 8 AM'] },
    { id: 'awakenings', label: 'How many times do you wake up at night?', options: ['Never wake up', 'Once', 'Twice', '3 times', 'Many times'] },
    { id: 'screen', label: 'Screen time before sleep?', options: ['No screen at all', 'Less than 30 min', '30-60 minutes', '1-2 hours', 'More than 2 hours'] },
    { id: 'caffeine', label: 'How much caffeine do you consume daily?', options: ['None at all', '1 cup tea/coffee', '2 cups', '3 cups', '4 or more cups'] },
    { id: 'stress', label: 'How is your stress level?', options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'] },
    { id: 'energy', label: 'How is your daytime energy level?', options: ['Very low / exhausted', 'Low', 'Average', 'High', 'Very high'] },
    { id: 'goal', label: 'What sleep outcome do you want?', options: ['Fall asleep faster', 'Get deeper sleep', 'Wake up with energy', 'Fix sleep routine', 'Stop waking at night'] },
  ],
  weight: [
    { id: 'goal', label: 'What is your primary fitness goal?', options: ['Lose weight fast', 'Gain healthy weight', 'Build muscle mass', 'Improve overall fitness', 'Increase stamina & endurance'] },
    { id: 'current_weight', label: 'What is your current weight range?', options: ['Below 50 kg', '50-65 kg', '65-80 kg', '80-95 kg', '95 kg and above'] },
    { id: 'height', label: 'What is your height range?', options: ['Below 5 feet', '5 - 5.4 feet', '5.4 - 5.8 feet', '5.8 - 6.2 feet', 'Above 6.2 feet'] },
    { id: 'activity', label: 'What is your current activity level?', options: ['Completely sedentary', 'Light (1-2 days/week)', 'Moderate (3-4 days/week)', 'Active (5-6 days/week)', 'Very active (daily intense)'] },
    { id: 'diet', label: 'What type of diet do you follow?', options: ['Vegetarian', 'Non-vegetarian', 'Vegan', 'Keto / Low carb', 'No specific diet'] },
    { id: 'meals', label: 'How many meals do you eat per day?', options: ['1-2 meals', '3 meals', '4 meals', '5+ small meals', 'No fixed meal time'] },
    { id: 'water', label: 'How much water do you drink daily?', options: ['Less than 1 litre', '1-2 litres', '2-3 litres', '3-4 litres', 'More than 4 litres'] },
    { id: 'sleep', label: 'How many hours do you sleep?', options: ['Less than 5 hours', '5-6 hours', '6-7 hours', '7-8 hours', 'More than 8 hours'] },
    { id: 'past_attempts', label: 'Have you tried losing/gaining weight before?', options: ['Never tried', 'Tried but no results', 'Some results but gave up', 'Good results but regained', 'Currently on a plan'] },
    { id: 'timeline', label: 'What is your target timeline?', options: ['1 month', '3 months', '6 months', '1 year', 'Long-term lifestyle change'] },
  ],
  nutrition: [
    { id: 'goal', label: 'What is your main nutrition goal?', options: ['Eat healthier overall', 'Lose weight through diet', 'Build muscle with nutrition', 'Improve digestion & gut', 'Boost energy levels'] },
    { id: 'diet_type', label: 'What type of diet do you currently follow?', options: ['Mostly vegetarian', 'Non-vegetarian', 'Vegan', 'Junk food & fast food', 'No fixed pattern'] },
    { id: 'meals', label: 'How many meals a day do you eat?', options: ['1-2 meals only', '3 regular meals', '4 meals', '5+ small meals', 'Skip meals often'] },
    { id: 'deficiency', label: 'Do you have any known deficiency?', options: ['Vitamin D deficiency', 'Iron / Anaemia', 'Vitamin B12 deficiency', 'Calcium deficiency', 'No known deficiency'] },
    { id: 'digestion', label: 'How is your digestion?', options: ['Very poor / constant issues', 'Below average', 'Average', 'Good', 'Excellent'] },
    { id: 'junk_food', label: 'How often do you eat junk food?', options: ['Never', 'Rarely (monthly)', 'Weekly', 'Several times a week', 'Almost daily'] },
    { id: 'fruits_veg', label: 'How often do you eat fruits & vegetables?', options: ['Never', 'Rarely', 'Sometimes', 'Most days', 'Every single day'] },
    { id: 'supplements', label: 'Do you take any supplements?', options: ['No supplements at all', 'Multivitamin only', 'Protein powder', 'Multiple supplements', 'Doctor prescribed'] },
    { id: 'energy', label: 'How is your energy level throughout the day?', options: ['Very low / always tired', 'Low', 'Average', 'High', 'Very high & consistent'] },
    { id: 'concern', label: 'What is your biggest nutrition concern?', options: ['Not eating enough nutrients', 'Eating too much junk', 'Irregular meal timing', 'Digestive issues', 'Weight related nutrition'] },
  ],
  astrology: [
    { id: 'guidance', label: 'What area do you seek guidance for?', options: ['Career & job growth', 'Love & relationships', 'Marriage & compatibility', 'Finance & business', 'Health & wellbeing'] },
    { id: 'zodiac', label: 'What is your zodiac sign?', options: ['Aries / Taurus / Gemini', 'Cancer / Leo / Virgo', 'Libra / Scorpio / Sagittarius', 'Capricorn / Aquarius / Pisces', 'I don\'t know my sign'] },
    { id: 'current_phase', label: 'How would you describe your current life phase?', options: ['Major transition happening', 'Stuck & confused', 'Stable but seeking more', 'Facing challenges', 'Everything going well'] },
    { id: 'belief', label: 'How much do you believe in astrology?', options: ['Complete believer', 'Mostly believe', 'Neutral / curious', 'Slightly skeptical', 'Just exploring'] },
    { id: 'past_readings', label: 'Have you had astrology readings before?', options: ['Never', 'Once or twice', 'Several times', 'Regularly follow', 'Very frequently'] },
    { id: 'birth_details', label: 'Do you know your exact birth time?', options: ['Yes, exact time known', 'Approximate time only', 'Only birth date known', 'No details available', 'Will find out'] },
    { id: 'planet', label: 'Which planet do you feel most connected to?', options: ['Sun (confidence & power)', 'Moon (emotions & intuition)', 'Mercury (communication)', 'Venus (love & beauty)', 'Saturn (discipline & karma)'] },
    { id: 'challenge', label: 'What is your biggest life challenge now?', options: ['Career direction unclear', 'Relationship issues', 'Financial instability', 'Health problems', 'Personal growth blocked'] },
    { id: 'remedy', label: 'What type of remedy are you open to?', options: ['Gemstones & crystals', 'Mantras & meditation', 'Fasting & rituals', 'Color & number therapy', 'Open to all remedies'] },
    { id: 'expectation', label: 'What do you expect from this report?', options: ['Future predictions', 'Kundli analysis', 'Lucky dates & numbers', 'Practical remedies', 'Complete life guidance'] },
  ],
};

const ISSUE_META = {
  skin: { title: 'Skin Problems', icon: '✨', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600' },
  hair: { title: 'Hair Fall', icon: '💆', color: 'from-green-500 to-teal-500', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
  stress: { title: 'Stress Management', icon: '🧘', color: 'from-orange-500 to-red-400', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' },
  time: { title: 'Time Management', icon: '⏰', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
  sleep: { title: 'Sleep Issues', icon: '🌙', color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600' },
  weight: { title: 'Weight & Fitness', icon: '💪', color: 'from-red-500 to-orange-500', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
  nutrition: { title: 'Nutrition & Diet', icon: '🥗', color: 'from-teal-500 to-green-500', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600' },
  astrology: { title: 'Astrology & Life', icon: '🔮', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600' },
};

export default function Questions() {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [otherText, setOtherText] = useState('');
  const [showOther, setShowOther] = useState(false);

  const questions = QUESTIONS[issueId] || [];
  const meta = ISSUE_META[issueId] || ISSUE_META.skin;
  const q = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;
  const totalQ = questions.length;

  const handleAnswer = (val) => {
    if (val === 'Other') {
      setShowOther(true);
      return;
    }
    setShowOther(false);
    setOtherText('');
    saveAnswer(val);
  };

  const saveAnswer = (val) => {
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setTimeout(() => {
        setCurrentQ(c => c + 1);
        setShowOther(false);
        setOtherText('');
      }, 300);
    } else {
      localStorage.setItem('mml_answers', JSON.stringify(newAnswers));
      localStorage.setItem('mml_issue', issueId);
      navigate('/payment');
    }
  };

  const handleOtherSubmit = () => {
    if (otherText.trim().length < 50) return;
    saveAnswer(`Other: ${otherText.trim()}`);
  };

  const handleBack = () => {
    if (currentQ === 0) {
      navigate('/select');
    } else {
      setCurrentQ(c => c - 1);
      setShowOther(false);
      setOtherText('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FF] font-sans">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-all text-sm font-medium">
          ← Back
        </button>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${meta.bg} ${meta.border} border`}>
          <span>{meta.icon}</span>
          <span className={`text-xs font-bold ${meta.text}`}>{meta.title}</span>
        </div>
        <div className="text-xs text-gray-400 font-medium">
          {currentQ + 1} / {totalQ}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-gray-100">
        <div
          className={`h-full bg-gradient-to-r ${meta.color} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Step indicators */}
        <div className="flex gap-1.5 mb-8 justify-center">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentQ
                  ? `w-8 bg-gradient-to-r ${meta.color}`
                  : i < currentQ
                  ? 'w-4 bg-green-400'
                  : 'w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
          <div className={`inline-block text-xs font-bold ${meta.text} ${meta.bg} px-3 py-1 rounded-full mb-4`}>
            Question {currentQ + 1} of {totalQ}
          </div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-8">
            {q.label}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 group hover:scale-[1.01] ${
                  answers[q.id] === opt
                    ? `border-purple-400 bg-purple-50`
                    : 'border-gray-100 bg-gray-50 hover:border-purple-200 hover:bg-purple-50/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all ${
                  answers[q.id] === opt
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'border-gray-300 text-gray-400 group-hover:border-purple-300'
                }`}>
                  {answers[q.id] === opt ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-semibold ${answers[q.id] === opt ? 'text-purple-700' : 'text-gray-700'}`}>
                  {opt}
                </span>
              </button>
            ))}

            {/* Other Option */}
            <button
              onClick={() => handleAnswer('Other')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.01] ${
                showOther
                  ? 'border-purple-400 bg-purple-50'
                  : 'border-gray-100 bg-gray-50 hover:border-purple-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                showOther ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300 text-gray-400'
              }`}>
                6
              </div>
              <span className={`text-sm font-semibold ${showOther ? 'text-purple-700' : 'text-gray-700'}`}>
                Other (Please specify)
              </span>
            </button>
          </div>

          {/* Other Text Box */}
          {showOther && (
            <div className="mt-4 animate-pulse-once">
              <textarea
                className="w-full border-2 border-purple-200 rounded-2xl p-4 text-sm text-gray-700 resize-none focus:outline-none focus:border-purple-400 transition-all"
                rows={4}
                placeholder="Please describe your situation in detail (minimum 50 characters)..."
                value={otherText}
                onChange={e => setOtherText(e.target.value)}
                maxLength={500}
              />
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${otherText.length < 50 ? 'text-red-400' : 'text-green-500'}`}>
                  {otherText.length < 50
                    ? `${50 - otherText.length} more characters needed`
                    : '✓ Good to go!'}
                </span>
                <span className="text-xs text-gray-400">{otherText.length}/500</span>
              </div>
              <button
                onClick={handleOtherSubmit}
                disabled={otherText.trim().length < 50}
                className={`mt-3 w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                  otherText.trim().length >= 50
                    ? `bg-gradient-to-r ${meta.color} text-white hover:shadow-lg`
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          )}
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs text-gray-400">
          🔒 Your answers are private and used only to generate your report
        </p>
      </div>
    </div>
  );
}