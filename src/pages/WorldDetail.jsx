import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Trophy,
  BookOpen,
  Cpu,
  Gamepad2,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worldsData';
import { ArrayVisualizer } from '../components/visualizers/ArrayVisualizer';
import { LinkedListVisualizer } from '../components/visualizers/LinkedListVisualizer';
import { StackVisualizer } from '../components/visualizers/StackVisualizer';
import { QueueVisualizer } from '../components/visualizers/QueueVisualizer';
import { TreeVisualizer } from '../components/visualizers/TreeVisualizer';
import { GraphVisualizer } from '../components/visualizers/GraphVisualizer';
import { SortingVisualizer } from '../components/visualizers/SortingVisualizer';
import { HashingVisualizer } from '../components/visualizers/HashingVisualizer';
import { MiniGameHub } from '../components/minigames/MiniGameHub';
import { sound } from '../utils/soundEffects';

export const WorldDetail = () => {
  const {
    selectedWorldId,
    setActiveTab,
    completedLevels,
    completeLevel,
    recordQuizAnswer,
    openAITutor
  } = useGame();

  const currentWorld = WORLDS.find(w => w.id === selectedWorldId) || WORLDS[0];
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('concept'); // 'concept' | 'visualizer' | 'game' | 'quiz'

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const level = currentWorld.levels[activeLevelIndex] || currentWorld.levels[0];
  const isLevelCompleted = completedLevels.includes(level.id);

  const handleSelectAnswer = (qId, optionIdx) => {
    sound.playClick();
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    sound.playClick();
    setSubmittedQuiz(true);
    let allCorrect = true;

    level.quiz.forEach(q => {
      const isCorrect = selectedAnswers[q.id] === q.correctIndex;
      recordQuizAnswer(level.topic, isCorrect);
      if (!isCorrect) allCorrect = false;
    });

    if (allCorrect) {
      sound.playLevelUp();
    }
  };

  const handleLevelFinished = () => {
    completeLevel(level.id, currentWorld.id, 100);
  };

  const renderVisualizer = () => {
    switch (currentWorld.visualizerType) {
      case 'array': return <ArrayVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'linkedList': return <LinkedListVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'stack': return <StackVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'queue': return <QueueVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'tree': return <TreeVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'graph': return <GraphVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'sorting': return <SortingVisualizer onMissionComplete={() => sound.playCoin()} />;
      case 'hashing': return <HashingVisualizer onMissionComplete={() => sound.playCoin()} />;
      default: return <ArrayVisualizer />;
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Navigation Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => { sound.playClick(); setActiveTab('map'); }}
          className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Adventure Map
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Realm:</span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs font-bold">
            {currentWorld.name}
          </span>
        </div>
      </div>

      {/* World Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-cyan-400 block uppercase tracking-wider">
            {currentWorld.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-gaming font-extrabold text-white">
            {currentWorld.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyan-300">
            {currentWorld.subtitle}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            {currentWorld.description}
          </p>
        </div>

        {/* Level Selector Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
          {currentWorld.levels.map((lvl, idx) => {
            const isCompleted = completedLevels.includes(lvl.id);
            const isCurrent = idx === activeLevelIndex;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  sound.playClick();
                  setActiveLevelIndex(idx);
                  setActiveSection('concept');
                  setSubmittedQuiz(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-cyan-600 text-slate-950 border-cyan-400 shadow-neon-cyan'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>Level {idx + 1}: {lvl.title.slice(0, 24)}...</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Navigation Tabs */}
      <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono overflow-x-auto">
        {[
          { id: 'concept', label: '1. Concept & Theory', icon: BookOpen },
          { id: 'visualizer', label: '2. Live Visualizer', icon: Cpu },
          { id: 'game', label: '3. Mini-Game Challenge', icon: Gamepad2 },
          { id: 'quiz', label: '4. Knowledge Check', icon: HelpCircle }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { sound.playClick(); setActiveSection(tab.id); }}
              className={`flex-1 min-w-max py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition ${
                isActive
                  ? 'bg-cyan-600 text-slate-950 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* STAGE 1: CONCEPT & THEORY */}
      {activeSection === 'concept' && (
        <div className="cyber-panel p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-gaming font-bold text-white mb-1">
              {level.title}
            </h3>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Core Concept: {level.topic}
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {level.summary}
          </p>

          {/* Key Principles */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              Essential Rules &amp; Invariants:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {level.keyPoints.map((pt, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">▶</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Life Analogy */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-950 border border-purple-500/40 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" /> Real-World Analogy
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {level.realLifeAnalogy}
            </p>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => openAITutor(`Explain ${level.topic} in depth with step-by-step algorithms and code.`)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-bold transition flex items-center gap-1.5"
            >
              Ask AI Tutor About This 🤖
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveSection('visualizer'); }}
              className="px-6 py-2.5 cyber-button-primary text-xs font-bold font-mono"
            >
              Next: Step Through Visualizer ➔
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: LIVE VISUALIZER */}
      {activeSection === 'visualizer' && (
        <div className="space-y-4">
          {renderVisualizer()}
          <div className="flex justify-end">
            <button
              onClick={() => { sound.playClick(); setActiveSection('game'); }}
              className="px-6 py-2.5 cyber-button-primary text-xs font-bold font-mono"
            >
              Next: Play Mini-Game Challenge ➔
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: MINI-GAME */}
      {activeSection === 'game' && (
        <div className="space-y-4">
          <MiniGameHub
            gameType={level.miniGameType}
            worldId={currentWorld.id}
            onComplete={() => sound.playLevelUp()}
          />
          <div className="flex justify-end">
            <button
              onClick={() => { sound.playClick(); setActiveSection('quiz'); }}
              className="px-6 py-2.5 cyber-button-primary text-xs font-bold font-mono"
            >
              Next: Take Knowledge Check Quiz ➔
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: KNOWLEDGE CHECK QUIZ */}
      {activeSection === 'quiz' && (
        <div className="cyber-panel p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-gaming font-bold text-white mb-1">
              Knowledge Check: {level.title}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Answer the questions below to prove mastery and earn 50 XP.
            </p>
          </div>

          <div className="space-y-6">
            {level.quiz.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isCorrect = submittedQuiz && selected === q.correctIndex;
              const isWrong = submittedQuiz && selected !== undefined && selected !== q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono">
                  <div className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                    <span className="text-cyan-400">Q{qIndex + 1}.</span>
                    <span>{q.question}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = selected === optIndex;
                      const isOptionCorrect = submittedQuiz && optIndex === q.correctIndex;

                      return (
                        <button
                          key={optIndex}
                          onClick={() => !submittedQuiz && handleSelectAnswer(q.id, optIndex)}
                          disabled={submittedQuiz}
                          className={`p-3 rounded-xl text-xs font-mono text-left transition border ${
                            isOptionCorrect
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                              : isOptionSelected && isWrong
                              ? 'bg-rose-950 border-rose-500 text-rose-200'
                              : isOptionSelected
                              ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + optIndex)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                      <strong className="text-cyan-400 font-mono block mb-1">Explanation:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Finish Level */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            {!submittedQuiz ? (
              <button
                onClick={handleQuizSubmit}
                className="px-8 py-3 cyber-button-primary text-xs font-bold font-mono"
              >
                Submit Answers &amp; Check Score
              </button>
            ) : (
              <button
                onClick={handleLevelFinished}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold font-mono text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" /> Complete Level &amp; Collect 50 XP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
