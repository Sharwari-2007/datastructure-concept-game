import React, { useState } from 'react';
import { Bot, X, Sparkles, Send, Lightbulb, BookOpen, Code2, HelpCircle, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { useGame } from '../../context/GameContext';

const PRESET_TOPICS = [
  {
    title: 'Array vs Linked List',
    analogy: 'Numbered lockers in a straight row (Arrays) vs a treasure hunt with clues scattered across town (Linked Lists).',
    explanation: 'Arrays allocate one contiguous block of RAM, giving O(1) random access via memory math Base + (i * size). Linked lists allocate isolated nodes anywhere in heap memory and connect them via next pointers, allowing O(1) insertions at HEAD without shifting elements, but requiring O(n) sequential traversal to reach index k.'
  },
  {
    title: 'Why does Stack Overflow happen in Recursion?',
    analogy: 'Stacking ceramic plates until they hit the ceiling and crash.',
    explanation: 'Every recursive function call creates an activation record (stack frame) on the thread call stack containing local variables and return addresses. If a base condition is missing or never reached, new stack frames keep piling up until the OS stack memory limit (typically 1-8 MB) is exceeded, terminating the program with Stack Overflow.'
  },
  {
    title: 'Dijkstra vs Bellman-Ford',
    analogy: 'A greedy courier who assumes every road takes positive time (Dijkstra) vs an auditor who accounts for tolls and discount rebates (Bellman-Ford).',
    explanation: 'Dijkstra uses a greedy strategy: once a node is finalized from the priority queue, it is never visited again. If negative edge weights exist, a longer-looking path could become shorter later, breaking Dijkstra. Bellman-Ford relaxes all V-1 edges iteratively and can detect negative weight cycles.'
  },
  {
    title: 'Hash Collisions & Load Factor',
    analogy: 'A coat check room: if two people receive the same ticket number, you either hang both coats on the same hanger (Chaining) or place the second coat in the next empty hook (Probing).',
    explanation: 'By the Pigeonhole Principle, mapping an infinite universe of keys to a finite table of m buckets will inevitably map two keys to the same index. The Load Factor α = n / m measures fullness. When α exceeds 0.75, standard hash tables double their size and rehash all keys to maintain O(1) average lookup.'
  }
];

export const AITutorModal = () => {
  const { aiTutorOpen, closeAITutor, tutorContext } = useGame();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Greetings, coder! I am ByteWise, your DSA AI Mentor. Ask me any question, request real-world analogies, algorithm dry runs, or ask for hints without spoilers!"
    }
  ]);
  const [input, setInput] = useState('');

  if (!aiTutorOpen) return null;

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    sound.playClick();
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Rule-based intelligent DSA knowledge engine
    setTimeout(() => {
      sound.playSuccess();
      const lower = query.toLowerCase();
      let reply = '';

      if (lower.includes('array') && lower.includes('linked list')) {
        reply = "💡 Array vs Linked List Comparison:\n• Access: Arrays are O(1) random access; Linked Lists are O(n) sequential.\n• Insert at Head: Arrays take O(n) due to right-shifting; Linked Lists take O(1) pointer updates.\n• Memory: Arrays are contiguous (cache friendly); Linked Lists have pointer overhead (4-8 bytes per node).\n• Real-world rule of thumb: Use arrays when lookups are frequent; use linked lists when rapid head insertions/deletions predominate.";
      } else if (lower.includes('recursion') || lower.includes('base case')) {
        reply = "🔄 Recursive Logic Anatomy:\nEvery recursive algorithm consists of two crucial halves:\n1. Base Case: The termination condition that returns immediately without calling itself.\n2. Recursive Step: Decomposing input towards the base case.\nAnalogy: Russian nesting dolls! You open outer dolls until you hit the solid baby doll (base case) which cannot be opened further.";
      } else if (lower.includes('big o') || lower.includes('complexity') || lower.includes('time')) {
        reply = "⏱️ Asymptotic Complexity Hierarchy:\n• O(1) Constant: Hash lookup, array index.\n• O(log n) Logarithmic: Binary Search, BST operations.\n• O(n) Linear: Linear scan, single loop.\n• O(n log n) Linearithmic: Merge Sort, Quick Sort avg.\n• O(n²) Quadratic: Nested loops, Bubble/Selection sort.\n• O(2^n) Exponential: Naive Fibonacci, subsets.";
      } else if (lower.includes('hint') || lower.includes('help')) {
        reply = "🎯 ByteWise Strategic Hint:\n1. Check constraints: Is the data already sorted? (Think Binary Search / Two Pointers).\n2. Are you computing maximum/minimum in a window? (Think Monotonic Queue / Deque).\n3. Are there overlapping subproblems? (Think Memoization / Dynamic Programming).\n4. Does the problem ask for shortest path in an unweighted grid? (Think BFS!).";
      } else if (lower.includes('stack') || lower.includes('queue')) {
        reply = "🥞 Stack (LIFO) vs Queue (FIFO):\n• Stack: Last-In, First-Out (Push/Pop at TOP). Used for undo/redo, browser history, balanced parentheses, and recursion call stack.\n• Queue: First-In, First-Out (Enqueue at REAR, Dequeue at FRONT). Used for BFS traversal, OS CPU task scheduling, and printer buffers.";
      } else if (lower.includes('tree') || lower.includes('bst')) {
        reply = "🌲 Binary Search Tree (BST) Rules:\nFor every node X:\n• Left Subtree: all values strictly < X.val\n• Right Subtree: all values strictly > X.val\n• Inorder Traversal (Left -> Root -> Right) always yields sorted values!\n• Search time: O(log n) average, O(n) worst if degenerate/skewed.";
      } else if (lower.includes('graph') || lower.includes('bfs') || lower.includes('dfs')) {
        reply = "🌐 Graph Traversals Breakdown:\n• BFS (Breadth-First): Uses a FIFO Queue. Explores neighbors level by level. Guarantees shortest path in unweighted graphs!\n• DFS (Depth-First): Uses a LIFO Stack or recursion. Dives as deep as possible before backtracking. Best for cycle detection, maze solving, and topological sort.";
      } else {
        reply = `🧠 ByteWise Insights on "${query}":\nTo master this concept, always analyze:\n1. What is the fundamental memory model (contiguous RAM vs pointers)?\n2. What are the time and space trade-offs in best, average, and worst cases?\n3. Would a secondary data structure (like a Hash Map or Stack) reduce complexity from O(n²) to O(n)?\nTry testing this in the Visualizer Lab or Code Lab!`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-neon-cyan">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-gaming font-bold text-lg text-white flex items-center gap-2">
                ByteWise AI <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">DSA Mentor</span>
              </h3>
              <p className="text-xs text-slate-400">Step-by-step guidance, real-world analogies & hints</p>
            </div>
          </div>
          <button
            onClick={closeAITutor}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset quick prompt pills */}
        <div className="p-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Topics:
          </span>
          {PRESET_TOPICS.map((topic, i) => (
            <button
              key={i}
              onClick={() => handleSend(topic.title)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 whitespace-nowrap transition"
            >
              {topic.title}
            </button>
          ))}
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-slate-950 shrink-0 font-bold">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-sans'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 font-bold">
                  ⚔️
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3.5 bg-slate-950 border-t border-slate-800 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask ByteWise about any DSA concept, algorithm, or code hint..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:border-cyan-500 outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 cyber-button-primary text-xs font-bold flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" /> Ask
          </button>
        </form>
      </div>
    </div>
  );
};
