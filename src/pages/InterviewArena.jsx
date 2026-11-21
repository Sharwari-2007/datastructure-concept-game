import React, { useState } from 'react';
import { Briefcase, Building2, Lightbulb, CheckCircle2, ChevronRight, Terminal, Award, Clock } from 'lucide-react';
import { INTERVIEW_ROUNDS } from '../data/interviewQuestions';
import { sound } from '../utils/soundEffects';
import { triggerCelebration } from '../utils/confetti';
import { useGame } from '../context/GameContext';

export const InterviewArena = () => {
  const { addXP, addCoins } = useGame();
  const [activeRound, setActiveRound] = useState(1);
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState([]);

  const currentRoundData = INTERVIEW_ROUNDS.find(r => r.round === activeRound) || INTERVIEW_ROUNDS[0];

  const handleRevealHint = (qId, hintIdx) => {
    sound.playClick();
    setRevealedHints(prev => ({
      ...prev,
      [`${qId}-${hintIdx}`]: true
    }));
  };

  const handleRevealSolution = (qId) => {
    sound.playClick();
    setRevealedSolutions(prev => ({ ...prev, [qId]: true }));
  };

  const handleMarkSolved = (qId) => {
    sound.playSuccess();
    triggerCelebration();
    setCompletedQuestions(prev => [...prev, qId]);
    addXP(50, 'Interview Question Mastered');
    addCoins(25);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold uppercase">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> FAANG &amp; Tier-1 Technical Preparation
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          Simulated Technical Interview Arena
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Conquer 5 progressive interview rounds designed to mirror Google, Meta, Amazon, and Microsoft hiring loops.
        </p>
      </div>

      {/* Rounds Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
        {INTERVIEW_ROUNDS.map(r => {
          const isActive = activeRound === r.round;
          return (
            <button
              key={r.round}
              onClick={() => { sound.playClick(); setActiveRound(r.round); }}
              className={`p-3 rounded-2xl border text-center transition ${
                isActive
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-neon-cyan font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="block text-[10px] text-slate-500">ROUND {r.round}</span>
              <span className="truncate block mt-0.5">{r.name.replace(`Round ${r.round}: `, '')}</span>
            </button>
          );
        })}
      </div>

      {/* Active Round Info Header */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-gaming font-bold text-white">
            {currentRoundData.name}
          </h3>
          <p className="text-xs font-mono text-cyan-400">
            Interview Focus: {currentRoundData.focus}
          </p>
        </div>
        <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
          {currentRoundData.questions.length} Scenario(s)
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {currentRoundData.questions.map(q => {
          const isSolved = completedQuestions.includes(q.id);
          const showSolution = revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className="cyber-panel p-6 sm:p-8 space-y-6 font-mono"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-xs">
                    {q.company}
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    Tier: {q.difficulty}
                  </span>
                </div>
                {isSolved && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Solved (+50 XP)
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white font-gaming">
                {q.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {q.prompt}
              </p>

              {/* Hints Accordion / Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-amber-400" /> Progressive Interviewer Hints:
                </span>
                <div className="space-y-2">
                  {q.hints.map((hint, hIdx) => {
                    const isRevealed = revealedHints[`${q.id}-${hIdx}`];
                    return (
                      <div key={hIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                        {isRevealed ? (
                          <div className="text-slate-300 font-sans">
                            <strong className="text-amber-400 font-mono">Hint {hIdx + 1}: </strong>
                            {hint}
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRevealHint(q.id, hIdx)}
                            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5"
                          >
                            <span>▶ Reveal Hint {hIdx + 1}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Solution Section */}
              {showSolution ? (
                <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-bold text-sm">
                      Model Optimal Solution &amp; Insights:
                    </span>
                    <span className="text-amber-300 font-bold">
                      {q.solution.complexity}
                    </span>
                  </div>

                  {q.solution.keyInsight && (
                    <div className="text-slate-300 font-sans">
                      <strong className="text-white font-mono">Key Insight: </strong>
                      {q.solution.keyInsight}
                    </div>
                  )}

                  {q.solution.explanation && (
                    <p className="text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                      {q.solution.explanation}
                    </p>
                  )}

                  {q.solution.code && (
                    <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 overflow-x-auto text-[11px] leading-relaxed">
                      {q.solution.code}
                    </pre>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleRevealSolution(q.id)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Terminal className="w-4 h-4" /> Reveal Optimal Solution &amp; Code
                </button>
              )}

              {/* Mark Solved Action */}
              {!isSolved && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleMarkSolved(q.id)}
                    className="px-6 py-2.5 cyber-button-primary text-xs font-bold"
                  >
                    Mark as Understood &amp; Claim 50 XP
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
