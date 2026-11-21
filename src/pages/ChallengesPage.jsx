import React, { useState, useEffect } from 'react';
import { Gamepad2, Timer, CheckCircle2, XCircle, Trophy, RotateCcw, Zap, HelpCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/soundEffects';
import { triggerCelebration } from '../utils/confetti';

const QUESTIONS_BANK = [
  {
    id: 'ch-1',
    category: 'Arrays',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'What is the time complexity to access an element by index in a contiguous array?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correct: 0,
    explanation: 'Arrays store items at contiguous memory addresses: Address = Base + (Index * Size), allowing direct O(1) mathematical lookup.'
  },
  {
    id: 'ch-2',
    category: 'Stacks',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'Which principle governs the order of operations in a Stack ADT?',
    options: ['First-In, First-Out (FIFO)', 'Last-In, First-Out (LIFO)', 'Shortest-Job-First (SJF)', 'Random Access'],
    correct: 1,
    explanation: 'A stack is strictly Last-In First-Out: the most recently pushed item is the first one removed via Pop.'
  },
  {
    id: 'ch-3',
    category: 'Linked Lists',
    type: 'mcq',
    difficulty: 'Medium',
    question: 'How many pointer adjustments are required to delete the HEAD node of a singly linked list?',
    options: ['O(n) adjustments', '1 adjustment (head = head.next)', '3 adjustments', 'Requires shifting all elements'],
    correct: 1,
    explanation: 'Simply update head = head.next. This takes exactly one pointer reassignment in O(1) constant time.'
  },
  {
    id: 'ch-4',
    category: 'Trees',
    type: 'mcq',
    difficulty: 'Medium',
    question: 'Which tree traversal visits the Left Subtree, then the Root node, and then the Right Subtree?',
    options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
    correct: 1,
    explanation: 'Inorder (L-Root-R) traversal of a Binary Search Tree (BST) prints the elements in non-decreasing sorted order.'
  },
  {
    id: 'ch-5',
    category: 'Sorting',
    type: 'mcq',
    difficulty: 'Hard',
    question: 'What is the worst-case time complexity of Quick Sort, and when does it occur?',
    options: ['O(n log n) always', 'O(n²) when the pivot chosen is consistently the smallest or largest element', 'O(n) on reverse arrays', 'O(log n)'],
    correct: 1,
    explanation: 'When the partition is maximally unbalanced (e.g. choosing first element in an already sorted array), Quick Sort degrades to O(n²).'
  },
  {
    id: 'ch-6',
    category: 'Hashing',
    type: 'mcq',
    difficulty: 'Medium',
    question: 'What is the Load Factor (α) of a Hash Table with 15 stored elements and 20 buckets?',
    options: ['1.33', '0.75', '5', '300'],
    correct: 1,
    explanation: 'Load Factor α = n / m = 15 / 20 = 0.75. This is the common threshold when hash tables double in capacity.'
  }
];

export const ChallengesPage = () => {
  const { addXP, addCoins } = useGame();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const filteredQuestions = QUESTIONS_BANK.filter(
    q => selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
  );

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || hasAnswered) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // time expired
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isTimerActive, hasAnswered]);

  const handleAnswer = (optionIdx) => {
    sound.playClick();
    setSelectedOption(optionIdx);
    setHasAnswered(true);

    if (optionIdx === currentQ.correct) {
      sound.playSuccess();
      triggerCelebration();
      setScore(prev => prev + 1);
      addXP(15, 'Timed Challenge Correct');
      addCoins(5);
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setTimeLeft(20);
    } else {
      // Completed all
      sound.playLevelUp();
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setTimeLeft(20);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-3xl font-gaming font-extrabold text-white flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-cyan-400" /> Timed Challenge Arena
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Test your algorithmic instincts against the countdown timer. 15 XP per correct answer!
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
            <button
              key={diff}
              onClick={() => { setSelectedDifficulty(diff); handleRestart(); }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                selectedDifficulty === diff ? 'bg-cyan-600 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Countdown Bar */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Question</span>
          <span className="text-white font-bold">{currentIdx + 1} / {filteredQuestions.length}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Score</span>
          <span className="text-emerald-400 font-bold">{score} Correct</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Timer</span>
          <span className={`font-bold flex items-center justify-center gap-1 ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
            <Timer className="w-3.5 h-3.5" /> {timeLeft}s
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="cyber-panel p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
            {currentQ.category}
          </span>
          <span className={`px-2 py-0.5 rounded font-bold ${
            currentQ.difficulty === 'Easy' ? 'text-emerald-400' : currentQ.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'
          }`}>
            Tier: {currentQ.difficulty}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold font-mono text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = hasAnswered && idx === currentQ.correct;
            const isWrong = hasAnswered && isSelected && idx !== currentQ.correct;

            return (
              <button
                key={idx}
                onClick={() => !hasAnswered && handleAnswer(idx)}
                disabled={hasAnswered}
                className={`p-4 rounded-xl text-xs sm:text-sm font-mono text-left transition border ${
                  isCorrect
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                    : isWrong
                    ? 'bg-rose-950 border-rose-500 text-rose-200'
                    : isSelected
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {hasAnswered && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              {selectedOption === currentQ.correct ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Correct Answer! (+15 XP)
                </span>
              ) : (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Incorrect
                </span>
              )}
            </div>
            <p className="text-slate-300 font-sans leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation Action */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            title="Restart Challenge"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {hasAnswered && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 cyber-button-primary text-xs font-bold font-mono"
            >
              {currentIdx < filteredQuestions.length - 1 ? 'Next Question ➔' : 'View Results 🏆'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
