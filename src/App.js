import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelectIssue from './pages/SelectIssue';
import Questions from './pages/Questions';
import Payment from './pages/Payment';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<SelectIssue />} />
        <Route path="/questions/:issueId" element={<Questions />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;