import React from 'react';
import { History, Brain, AlertTriangle, ArrowRight, CheckCircle2, RotateCcw, Clock, Target, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/soundEffects';

export const RevisionCenter = () => {
  const { weakTopics, setSelectedWorldId, setActiveTab } = useGame();

  const handleRemediate = (topicName) => {
    sound.playClick();
    if (topicName === 'Arrays') setSelectedWorldId('array-kingdom');
    else if (topicName === 'Linked Lists') setSelectedWorldId('linked-list-land');
    else if (topicName === 'Trees') setSelectedWorldId('tree-forest');
    else if (topicName === 'Graphs') setSelectedWorldId('graph-galaxy');
    else setSelectedWorldId('array-kingdom');
    setActiveTab('world-detail');
  };

  const spacedSchedule = [
    { review: 'First Review', interval: 'After 1 Day', status: 'Ready for Review', color: 'emerald' },
    { review: 'Second Review', interval: 'After 3 Days', status: 'Scheduled', color: 'cyan' },
    { review: 'Third Review', interval: 'After 7 Days', status: 'Scheduled', color: 'purple' },
    { review: 'Final Retention', interval: 'After 14 Days', status: 'Locked', color: 'slate' }
  ];

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold uppercase">
          <Brain className="w-3.5 h-3.5 text-purple-400" /> Neuro-Spaced Repetition
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          Smart Revision &amp; Memory Retention
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Intelligent remediation engine automatically schedules reviews for concepts with lower accuracy scores to guarantee permanent retention.
        </p>
      </div>

      {/* Weak Topics Analysis Dashboard */}
      <div className="space-y-4">
        <h3 className="text-xl font-gaming font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> Targeted Topic Diagnostic
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(weakTopics).map(([topic, data]) => {
            const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const isWeak = accuracy < 70;

            return (
              <div
                key={topic}
                className={`p-5 rounded-2xl border transition-all ${
                  isWeak
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-gaming font-bold text-lg text-white">
                    {topic}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${
                    isWeak ? 'bg-rose-950 border border-rose-700 text-rose-300' : 'bg-emerald-950 border border-emerald-700 text-emerald-300'
                  }`}>
                    {accuracy}% Accuracy
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${isWeak ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Solved: {data.correct} / {data.total} correct</span>
                  <button
                    onClick={() => handleRemediate(topic)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                  >
                    Remediate ➔
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5-Step Automated Remediation Recommendation */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
        <h3 className="text-lg font-gaming font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" /> Recommended Remediation Pipeline
        </h3>
        <p className="text-xs font-mono text-slate-400">
          When errors recur on a topic, complete these 5 pedagogical steps:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">1. Revisit</span>
            <span className="text-slate-400 text-[11px]">Concept &amp; Rules</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">2. Watch</span>
            <span className="text-slate-400 text-[11px]">Live Visualizer</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">3. Play</span>
            <span className="text-slate-400 text-[11px]">Mini-Game Puzzle</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">4. Attempt</span>
            <span className="text-slate-400 text-[11px]">Simpler MCQ</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-rose-400 font-bold block mb-1">5. Final Check</span>
            <span className="text-slate-400 text-[11px]">Boss Knowledge Check</span>
          </div>
        </div>
      </div>

      {/* Spaced Intervals Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-lg font-gaming font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" /> Spaced Repetition Schedule
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
          {spacedSchedule.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block font-bold">{s.review}</span>
              <span className="text-white font-bold block text-sm">{s.interval}</span>
              <span className="text-emerald-400 text-[11px] font-bold block pt-1">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
