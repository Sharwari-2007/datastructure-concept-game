import React, { useState, useEffect } from 'react';
import { GraduationCap, Timer, CheckCircle2, Award, BookOpen, Clock, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { EXAM_UNITS, EXAM_QUESTIONS, MOCK_EXAM_QUESTIONS } from '../data/examQuestions';
import { sound } from '../utils/soundEffects';
import { triggerGrandCelebration } from '../utils/confetti';
import { useGame } from '../context/GameContext';

export const ExamArena = () => {
  const { addXP, addCoins } = useGame();
  const [activeTab, setActiveTab] = useState('model-answers'); // 'model-answers' | 'mock-exam'
  const [selectedMarks, setSelectedMarks] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [expandedId, setExpandedId] = useState('eq-2m-1');

  // Mock Exam Simulator State
  const [mockStarted, setMockStarted] = useState(false);
  const [mockAnswers, setMockAnswers] = useState({});
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [mockScore, setMockScore] = useState(0);
  const [mockTimer, setMockTimer] = useState(300); // 5 minutes (300 seconds)

  useEffect(() => {
    if (!mockStarted || mockSubmitted) return;
    if (mockTimer <= 0) {
      handleMockSubmit();
      return;
    }
    const interval = setInterval(() => setMockTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [mockStarted, mockSubmitted, mockTimer]);

  const toggleExpand = (id) => {
    sound.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleStartMock = () => {
    sound.playClick();
    setMockStarted(true);
    setMockSubmitted(false);
    setMockAnswers({});
    setMockTimer(300);
  };

  const handleSelectMockAnswer = (qId, optionIdx) => {
    sound.playClick();
    setMockAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleMockSubmit = () => {
    sound.playSuccess();
    setMockSubmitted(true);
    let total = 0;
    MOCK_EXAM_QUESTIONS.forEach(q => {
      if (mockAnswers[q.id] === q.correctIndex) {
        total += q.marks;
      }
    });
    setMockScore(total);
    if (total >= 6) {
      triggerGrandCelebration();
      addXP(100, 'Mock Exam Passed');
      addCoins(50);
    }
  };

  const filteredQuestions = EXAM_QUESTIONS.filter(q => {
    const marksMatch = selectedMarks === 'all' || q.marks === parseInt(selectedMarks);
    const unitMatch = selectedUnit === 'all' || q.unit === selectedUnit;
    return marksMatch && unitMatch;
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold uppercase">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> University Examination Arena
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          College Exam Mastery &amp; Mock Tests
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Prepare for semester exams with 2-mark definitions, 5-mark differences &amp; algorithms, 10-mark full proofs, and a timed auto-graded mock exam!
        </p>
      </div>

      {/* Arena Switcher Tabs */}
      <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono max-w-md mx-auto">
        <button
          onClick={() => { sound.playClick(); setActiveTab('model-answers'); }}
          className={`flex-1 py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'model-answers' ? 'bg-emerald-600 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Model Answers Library
        </button>
        <button
          onClick={() => { sound.playClick(); setActiveTab('mock-exam'); }}
          className={`flex-1 py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'mock-exam' ? 'bg-cyan-600 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" /> Timed Mock Examination
        </button>
      </div>

      {/* TAB 1: MODEL ANSWERS */}
      {activeTab === 'model-answers' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            {/* Marks Filter */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 font-bold">Marks:</span>
              {['all', '2', '5', '10'].map(m => (
                <button
                  key={m}
                  onClick={() => { sound.playClick(); setSelectedMarks(m); }}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${
                    selectedMarks === m
                      ? 'bg-emerald-600 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m === 'all' ? 'All Questions' : `${m} Marks`}
                </button>
              ))}
            </div>

            {/* Unit Filter */}
            <select
              value={selectedUnit}
              onChange={(e) => { sound.playClick(); setSelectedUnit(e.target.value); }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 font-bold outline-none"
            >
              <option value="all">All Units (I - V)</option>
              {EXAM_UNITS.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-4">
            {filteredQuestions.map(q => {
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-800/40 transition gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          q.marks === 2 ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                          q.marks === 5 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-purple-950 text-purple-400 border border-purple-800'
                        }`}>
                          {q.marks} MARKS
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{q.topic}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                        {q.question}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-slate-950/70 border-t border-slate-800 space-y-4 font-mono text-xs">
                      {/* Definition */}
                      {q.modelAnswer.definition && (
                        <div className="space-y-1">
                          <span className="text-emerald-400 font-bold block text-xs">
                            Standard Definition &amp; Formula:
                          </span>
                          <p className="text-slate-300 font-sans leading-relaxed">
                            {q.modelAnswer.definition}
                          </p>
                        </div>
                      )}

                      {/* Comparison Table */}
                      {q.modelAnswer.comparisonTable && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse border border-slate-800 text-xs">
                            <thead>
                              <tr className="bg-slate-900 text-slate-300">
                                <th className="p-2 border border-slate-800">Parameter</th>
                                <th className="p-2 border border-slate-800 text-cyan-400">Array</th>
                                <th className="p-2 border border-slate-800 text-emerald-400">Linked List</th>
                              </tr>
                            </thead>
                            <tbody>
                              {q.modelAnswer.comparisonTable.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-900/50">
                                  <td className="p-2 border border-slate-800 font-bold text-white">{row.parameter}</td>
                                  <td className="p-2 border border-slate-800 text-slate-300">{row.array}</td>
                                  <td className="p-2 border border-slate-800 text-slate-300">{row.linkedList}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Code / Pseudo-code */}
                      {q.modelAnswer.codeC && (
                        <div className="space-y-1">
                          <span className="text-cyan-400 font-bold block">Model C Program / Function:</span>
                          <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 overflow-x-auto font-mono text-[11px] leading-relaxed">
                            {q.modelAnswer.codeC}
                          </pre>
                        </div>
                      )}

                      {/* Complexity Note */}
                      {q.modelAnswer.complexity && (
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-bold">
                          {q.modelAnswer.complexity}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TIMED MOCK EXAM */}
      {activeTab === 'mock-exam' && (
        <div className="cyber-panel p-6 sm:p-8 space-y-6">
          {!mockStarted ? (
            <div className="text-center space-y-4 py-8">
              <Clock className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
              <h3 className="text-2xl font-gaming font-bold text-white">
                Semester Mock Examination Simulator
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md mx-auto leading-relaxed">
                Test your comprehensive knowledge across all 5 syllabus units. 5 questions, 10 marks total, 5 minutes countdown timer with instant automated evaluation!
              </p>
              <button
                onClick={handleStartMock}
                className="px-8 py-3.5 cyber-button-primary text-xs font-gaming font-bold tracking-wider"
              >
                Begin Timed Mock Exam ➔
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Exam Timer & Status Bar */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-cyan-400 font-bold">Unit I - V Comprehensive Test</span>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Timer className="w-4 h-4" />
                  <span>
                    {Math.floor(mockTimer / 60)}:{(mockTimer % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Mock Questions */}
              <div className="space-y-6">
                {MOCK_EXAM_QUESTIONS.map((q, idx) => {
                  const selected = mockAnswers[q.id];
                  const isCorrect = mockSubmitted && selected === q.correctIndex;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-bold">Question {idx + 1} ({q.marks} Marks)</span>
                        <span className="text-slate-500">{q.topic}</span>
                      </div>
                      <p className="text-sm font-bold text-white">{q.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => !mockSubmitted && handleSelectMockAnswer(q.id, optIdx)}
                            disabled={mockSubmitted}
                            className={`p-3 rounded-lg text-left transition border ${
                              mockSubmitted && optIdx === q.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                                : selected === optIdx
                                ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit or Score Report */}
              {!mockSubmitted ? (
                <button
                  onClick={handleMockSubmit}
                  className="w-full py-3.5 cyber-button-primary text-xs font-bold font-mono"
                >
                  Submit Mock Examination
                </button>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 space-y-4 text-center font-mono">
                  <h4 className="text-xl font-bold font-gaming text-emerald-400">
                    Mock Exam Result: {mockScore} / 10 Marks
                  </h4>
                  <p className="text-xs text-slate-300">
                    {mockScore >= 6 ? 'Congratulations! You passed with high proficiency. +100 XP awarded!' : 'Review the Weak Topics in the Revision Center and retake to improve your grade.'}
                  </p>
                  <button
                    onClick={handleStartMock}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs"
                  >
                    Retake Mock Exam
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
