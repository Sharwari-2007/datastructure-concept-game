import React, { useState } from 'react';
import { Gamepad2, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, Zap, Target, HelpCircle } from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { triggerCelebration } from '../../utils/confetti';
import { useGame } from '../../context/GameContext';

export const MiniGameHub = ({ gameType, worldId, onComplete }) => {
  const { addXP, addCoins } = useGame();

  // 1. Array Missing Element / Index Hunter Game
  if (gameType === 'array-missing' || gameType === 'array-hunter' || gameType === 'array-order') {
    return <ArrayMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 2. Linked List Pointer Connector Game
  if (gameType === 'll-connect' || gameType === 'll-middle' || gameType === 'll-repair') {
    return <LinkedListMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 3. Stack Dungeon Escape
  if (gameType === 'stack-escape' || gameType === 'stack-postfix') {
    return <StackMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 4. Queue Customer Service
  if (gameType === 'queue-customer') {
    return <QueueMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 5. Sorting Race Predictor
  if (gameType === 'sort-race' || gameType === 'sort-predict') {
    return <SortingMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 6. Tree Traversal Challenge
  if (gameType === 'tree-traversal' || gameType === 'tree-builder') {
    return <TreeMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 7. Graph Shortest Path Maze
  if (gameType === 'graph-maze' || gameType === 'graph-mst') {
    return <GraphMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 8. Recursion & Backtracking Challenge
  if (gameType === 'rec-hanoi' || gameType === 'rec-queens') {
    return <RecursionMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // 9. Algorithm Arena: Complexity, DP, Sliding Window
  if (gameType === 'algo-complexity') {
    return <AlgoComplexityMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }
  if (gameType === 'algo-dp') {
    return <AlgoDPMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }
  if (gameType === 'algo-window') {
    return <AlgoWindowMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
  }

  // Default / Hashing Slotter
  return <HashingMiniGame onWin={onComplete} addXP={addXP} addCoins={addCoins} />;
};

/* --- MINI-GAME 1: ARRAY INDEX HUNTER --- */
const ArrayMiniGame = ({ onWin, addXP, addCoins }) => {
  const targetSequence = [14, 28, 42, null, 70, 84]; // missing 56 at index 3
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isWon, setIsWon] = useState(false);
  const options = [48, 56, 52, 60];

  const handleSelect = (val) => {
    sound.playClick();
    setSelectedAnswer(val);
    if (val === 56) {
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'Array Mini-Game Victory');
      addCoins(10);
      if (onWin) onWin();
    } else {
      sound.playError();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold font-gaming text-cyan-400 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" /> Mini-Game: The Missing Memory Slot
        </h4>
        <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-800">
          Reward: +25 XP
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Rules: An arithmetic progression is stored in contiguous array memory. Identify the missing element at Index [3]!
      </p>

      {/* Array Slots */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {targetSequence.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-base border-2 ${
                val === null
                  ? 'border-dashed border-cyan-400 bg-cyan-950/40 text-cyan-300 animate-pulse'
                  : 'border-slate-700 bg-slate-950 text-white'
              }`}
            >
              {val !== null ? val : (isWon ? 56 : '?')}
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1">[{idx}]</span>
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={isWon}
            className={`py-2.5 px-4 rounded-xl font-mono font-bold text-sm transition ${
              selectedAnswer === opt
                ? opt === 56
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/40'
                  : 'bg-rose-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Target 56 placed! Memory integrity restored.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 2: LINKED LIST POINTER REPAIR --- */
const LinkedListMiniGame = ({ onWin, addXP, addCoins }) => {
  const correctOrder = [10, 20, 30, 40];
  const [selectedChain, setSelectedChain] = useState([]);
  const [availableNodes, setAvailableNodes] = useState([30, 10, 40, 20]);
  const [isWon, setIsWon] = useState(false);

  const handlePickNode = (val) => {
    sound.playClick();
    const newChain = [...selectedChain, val];
    setSelectedChain(newChain);
    setAvailableNodes(availableNodes.filter(n => n !== val));

    // Check if match
    if (newChain.length === correctOrder.length) {
      if (newChain.every((v, i) => v === correctOrder[i])) {
        sound.playSuccess();
        triggerCelebration();
        setIsWon(true);
        addXP(25, 'Linked List Repair Complete');
        addCoins(10);
        if (onWin) onWin();
      } else {
        sound.playError();
        setTimeout(() => {
          setSelectedChain([]);
          setAvailableNodes([30, 10, 40, 20]);
        }, 800);
      }
    }
  };

  const handleReset = () => {
    setSelectedChain([]);
    setAvailableNodes([30, 10, 40, 20]);
    setIsWon(false);
    sound.playClick();
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold font-gaming text-emerald-400 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" /> Mini-Game: Repair Broken Pointers
        </h4>
        <button onClick={handleReset} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300">
        Rules: A memory fault shattered the linked list! Click the nodes in ascending order to reconstruct HEAD ➔ TAIL.
      </p>

      {/* Assembled Chain */}
      <div className="flex items-center min-h-[50px] p-3 rounded-xl bg-slate-950 border border-slate-800 gap-2 overflow-x-auto">
        <span className="text-xs font-mono font-bold text-emerald-400">HEAD ➔</span>
        {selectedChain.map((val, idx) => (
          <div key={idx} className="flex items-center gap-1 font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-600/30 border border-emerald-500 text-emerald-200 font-bold text-xs">
              [{val} | •]
            </span>
            <span className="text-slate-500 text-xs">➔</span>
          </div>
        ))}
        {selectedChain.length === correctOrder.length ? (
          <span className="text-xs font-mono text-cyan-400">NULL</span>
        ) : (
          <span className="text-xs font-mono text-slate-600">[ ? ]</span>
        )}
      </div>

      {/* Available Scrambled Nodes */}
      <div className="flex gap-3 justify-center pt-2">
        {availableNodes.map(val => (
          <button
            key={val}
            onClick={() => handlePickNode(val)}
            className="w-14 h-14 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white font-mono font-bold text-lg border border-slate-700 transition"
          >
            {val}
          </button>
        ))}
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pointers Repaired! Correct list linked to NULL.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 3: STACK DUNGEON ESCAPE --- */
const StackMiniGame = ({ onWin, addXP, addCoins }) => {
  const targetSum = 15;
  const [stack, setStack] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const blocks = [3, 5, 7, 2, 8];

  const currentSum = stack.reduce((a, b) => a + b, 0);

  const handlePush = (val) => {
    if (isWon) return;
    sound.playClick();
    const updated = [...stack, val];
    setStack(updated);
    if (updated.reduce((a, b) => a + b, 0) === targetSum) {
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'Stack Dungeon Unlocked');
      addCoins(10);
      if (onWin) onWin();
    }
  };

  const handlePop = () => {
    if (stack.length === 0 || isWon) return;
    sound.playClick();
    setStack(stack.slice(0, -1));
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-violet-500/30 space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold font-gaming text-violet-400 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" /> Mini-Game: Dungeon Pressure Gate
        </h4>
        <span className="text-xs font-mono text-violet-300">Target Stack Sum: {targetSum}</span>
      </div>

      <p className="text-xs text-slate-300">
        Rules: Push and Pop blocks onto the LIFO stack until the total weight matches the dungeon lock of 15!
      </p>

      {/* Current Stack & Sum */}
      <div className="flex items-center justify-center gap-6 py-2">
        <div className="w-28 h-36 border-x-2 border-b-2 border-violet-500 rounded-b-xl bg-slate-950 flex flex-col-reverse p-1.5 gap-1.5">
          {stack.map((v, i) => (
            <div key={i} className="w-full h-7 rounded bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              {v}
            </div>
          ))}
        </div>
        <div className="text-center font-mono">
          <span className="text-xs text-slate-400 block">Current Weight</span>
          <span className={`text-2xl font-bold ${currentSum === targetSum ? 'text-emerald-400' : 'text-violet-300'}`}>
            {currentSum} / {targetSum}
          </span>
        </div>
      </div>

      {/* Push Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {blocks.map(b => (
          <button
            key={b}
            onClick={() => handlePush(b)}
            disabled={isWon}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-violet-600 text-white font-mono text-xs font-bold border border-slate-700 transition"
          >
            + Push {b}
          </button>
        ))}
        <button
          onClick={handlePop}
          disabled={stack.length === 0 || isWon}
          className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-mono text-xs font-bold transition"
        >
          - Pop Top
        </button>
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dungeon Gate Opened! Weight matches 15.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 4: QUEUE CUSTOMER DISPATCH --- */
const QueueMiniGame = ({ onWin, addXP, addCoins }) => {
  const [queue, setQueue] = useState(['VIP-1', 'Order-2', 'Order-3']);
  const [served, setServed] = useState([]);
  const [isWon, setIsWon] = useState(false);

  const handleServe = () => {
    if (queue.length === 0) return;
    sound.playClick();
    const customer = queue[0];
    const newQueue = queue.slice(1);
    const newServed = [...served, customer];
    setQueue(newQueue);
    setServed(newServed);

    if (newQueue.length === 0) {
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'FIFO Dispatch Master');
      addCoins(10);
      if (onWin) onWin();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-cyan-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: FIFO Customer Dispatch
      </h4>
      <p className="text-xs text-slate-300">
        Rules: Dequeue requests strictly in First-In First-Out order until the service buffer is clear!
      </p>

      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
        <span className="text-xs font-mono text-emerald-400 font-bold">FRONT (First In)</span>
        <div className="flex gap-2">
          {queue.map((c, i) => (
            <span key={i} className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono text-xs font-bold">
              {c}
            </span>
          ))}
          {queue.length === 0 && <span className="text-xs text-slate-500 font-mono">Queue Empty!</span>}
        </div>
        <span className="text-xs font-mono text-cyan-400 font-bold">REAR (Last In)</span>
      </div>

      <button
        onClick={handleServe}
        disabled={isWon || queue.length === 0}
        className="w-full py-2.5 cyber-button-primary text-xs font-bold"
      >
        Dequeue & Process Front Customer (FIFO)
      </button>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> All customers served in exact FIFO sequence!
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 5: SORTING SWAP PREDICTOR --- */
const SortingMiniGame = ({ onWin, addXP, addCoins }) => {
  const [array] = useState([70, 30, 90, 20]);
  const [isWon, setIsWon] = useState(false);

  const handlePredict = (isSwap) => {
    sound.playClick();
    if (isSwap) {
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'Bubble Predictor Success');
      addCoins(10);
      if (onWin) onWin();
    } else {
      sound.playError();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-amber-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Bubble Speedway Swap Predictor
      </h4>
      <p className="text-xs text-slate-300">
        In Bubble Sort, we compare the first adjacent pair: arr[0]=70 and arr[1]=30. Will they swap?
      </p>

      <div className="flex justify-center gap-3 py-2 font-mono">
        <div className="w-16 h-16 rounded-xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-200 text-lg">
          70
        </div>
        <div className="w-16 h-16 rounded-xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-200 text-lg">
          30
        </div>
        <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-slate-400 text-lg">
          90
        </div>
        <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-slate-400 text-lg">
          20
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handlePredict(true)}
          disabled={isWon}
          className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition"
        >
          YES, SWAP! (70 &gt; 30)
        </button>
        <button
          onClick={() => handlePredict(false)}
          disabled={isWon}
          className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
        >
          NO, KEEP ORDER
        </button>
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct! Since 70 &gt; 30, Bubble Sort swaps them.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 6: TREE TRAVERSAL SEQUENCER --- */
const TreeMiniGame = ({ onWin, addXP, addCoins }) => {
  // Tree with root 50, left 30, right 70. Inorder is 30, 50, 70
  const expectedInorder = [30, 50, 70];
  const [clicked, setClicked] = useState([]);
  const [isWon, setIsWon] = useState(false);

  const handleClickNode = (val) => {
    sound.playClick();
    const newClicked = [...clicked, val];
    setClicked(newClicked);

    if (newClicked.length === expectedInorder.length) {
      if (newClicked.every((v, i) => v === expectedInorder[i])) {
        sound.playSuccess();
        triggerCelebration();
        setIsWon(true);
        addXP(25, 'Tree Traversal Master');
        addCoins(10);
        if (onWin) onWin();
      } else {
        sound.playError();
        setTimeout(() => setClicked([]), 700);
      }
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-green-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-emerald-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Inorder Traversal Hunter (L-Root-R)
      </h4>
      <p className="text-xs text-slate-300">
        Rules: Click the nodes in exact INORDER sequence (Left Subtree ➔ Root ➔ Right Subtree) to generate a sorted output!
      </p>

      {/* Tree Diagram buttons */}
      <div className="flex flex-col items-center gap-3 py-2">
        <button
          onClick={() => handleClickNode(50)}
          className={`w-14 h-14 rounded-full font-mono font-bold text-sm border-2 ${
            clicked.includes(50) ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-950 border-slate-700 text-white'
          }`}
        >
          50
        </button>
        <div className="flex gap-16">
          <button
            onClick={() => handleClickNode(30)}
            className={`w-14 h-14 rounded-full font-mono font-bold text-sm border-2 ${
              clicked.includes(30) ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-950 border-slate-700 text-white'
            }`}
          >
            30
          </button>
          <button
            onClick={() => handleClickNode(70)}
            className={`w-14 h-14 rounded-full font-mono font-bold text-sm border-2 ${
              clicked.includes(70) ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-950 border-slate-700 text-white'
            }`}
          >
            70
          </button>
        </div>
      </div>

      <div className="text-center font-mono text-xs text-slate-400">
        Output: [{clicked.join(', ')}]
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Perfect Inorder: [30, 50, 70] produces sorted order!
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 7: GRAPH SHORTEST PATH MAZE --- */
const GraphMiniGame = ({ onWin, addXP, addCoins }) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [isWon, setIsWon] = useState(false);

  const handleChoose = (path, cost) => {
    sound.playClick();
    setSelectedPath(path);
    if (cost === 3) { // A -> C (2) -> B (1)
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'Shortest Path Discovered');
      addCoins(10);
      if (onWin) onWin();
    } else {
      sound.playError();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-cyan-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Dijkstra's Path Optimization
      </h4>
      <p className="text-xs text-slate-300">
        Graph Edges: (A ➔ B, weight 5), (A ➔ C, weight 2), (C ➔ B, weight 1). Which route from A to B has the minimum total cost?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => handleChoose('direct', 5)}
          className={`p-3 rounded-xl font-mono text-xs font-bold text-left border ${
            selectedPath === 'direct' ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}
        >
          Direct Highway: A ➔ B (Total Cost: 5)
        </button>
        <button
          onClick={() => handleChoose('detour', 3)}
          className={`p-3 rounded-xl font-mono text-xs font-bold text-left border ${
            selectedPath === 'detour' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}
        >
          Detour: A ➔ C (2) + C ➔ B (1) (Total Cost: 3)
        </button>
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Optimal Shortest Path: 3 &lt; 5! Greedy relaxation wins.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 8: HASHING SLOTTER --- */
const HashingMiniGame = ({ onWin, addXP, addCoins }) => {
  const tableSize = 7;
  const keyToHash = 19; // 19 % 7 = 5
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isWon, setIsWon] = useState(false);

  const handlePickSlot = (slot) => {
    sound.playClick();
    setSelectedSlot(slot);
    if (slot === 5) {
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'Hash Slot Master');
      addCoins(10);
      if (onWin) onWin();
    } else {
      sound.playError();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-blue-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Hash Slot Hunter
      </h4>
      <p className="text-xs text-slate-300">
        Formula: <span className="font-mono text-cyan-300 font-bold">Index = Key % TableSize</span>. Given Key = 19 and TableSize = 7, click the bucket where Key 19 belongs!
      </p>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePickSlot(i)}
            disabled={isWon}
            className={`py-3 rounded-xl font-mono font-bold text-sm border transition ${
              selectedSlot === i
                ? i === 5
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                  : 'bg-rose-600 border-rose-400 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500'
            }`}
          >
            [{i}]
          </button>
        ))}
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct! 19 % 7 = 5 (19 = 7 * 2 + 5).
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 9: RECURSION TOWER OF HANOI PUZZLE --- */
const RecursionMiniGame = ({ onWin, addXP, addCoins }) => {
  const [pegs, setPegs] = useState({
    A: [3, 2, 1],
    B: [],
    C: []
  });
  const [selectedPeg, setSelectedPeg] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePegClick = (pegKey) => {
    if (isWon) return;
    setErrorMsg('');

    if (!selectedPeg) {
      if (pegs[pegKey].length === 0) {
        sound.playError();
        setErrorMsg('Peg is empty! Select a peg with disks.');
        return;
      }
      sound.playClick();
      setSelectedPeg(pegKey);
    } else {
      if (selectedPeg === pegKey) {
        // Deselect
        setSelectedPeg(null);
        return;
      }

      const sourceDisk = pegs[selectedPeg][pegs[selectedPeg].length - 1];
      const targetDisk = pegs[pegKey][pegs[pegKey].length - 1];

      // Rule: cannot place larger disk on smaller disk
      if (targetDisk && sourceDisk > targetDisk) {
        sound.playError();
        setErrorMsg(`Illegal move! Disk ${sourceDisk} cannot be placed on top of smaller Disk ${targetDisk}.`);
        setSelectedPeg(null);
        return;
      }

      // Valid move
      sound.playClick();
      const newPegs = {
        ...pegs,
        [selectedPeg]: pegs[selectedPeg].slice(0, -1),
        [pegKey]: [...pegs[pegKey], sourceDisk]
      };
      setPegs(newPegs);
      setMoves(moves + 1);
      setSelectedPeg(null);

      // Check win condition: all 3 disks transferred to Peg C
      if (newPegs.C.length === 3) {
        sound.playSuccess();
        triggerCelebration();
        setIsWon(true);
        addXP(30, 'Tower of Hanoi Solved');
        addCoins(15);
        if (onWin) onWin();
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setPegs({ A: [3, 2, 1], B: [], C: [] });
    setSelectedPeg(null);
    setMoves(0);
    setErrorMsg('');
    setIsWon(false);
  };

  const diskWidths = { 1: 'w-12 bg-cyan-400', 2: 'w-20 bg-blue-500', 3: 'w-28 bg-purple-600' };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold font-gaming text-purple-400 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" /> Mini-Game: Tower of Hanoi 3-Peg Puzzle
        </h4>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-300">Moves: <span className="text-cyan-400 font-bold">{moves}</span> (Optimal: 7)</span>
          <button onClick={handleReset} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-300">
        Rules: Transfer all 3 disks from <span className="text-purple-400 font-bold">Peg A</span> to <span className="text-cyan-400 font-bold">Peg C</span>. You may only move one disk at a time and a larger disk can never rest on a smaller disk!
      </p>

      {errorMsg && (
        <div className="p-2 rounded bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* 3 Pegs Area */}
      <div className="grid grid-cols-3 gap-4 pt-4 pb-2">
        {['A', 'B', 'C'].map((pegKey) => (
          <div
            key={pegKey}
            onClick={() => handlePegClick(pegKey)}
            className={`flex flex-col items-center justify-end h-40 p-2 rounded-xl cursor-pointer transition border-2 relative ${
              selectedPeg === pegKey
                ? 'border-cyan-400 bg-cyan-950/30 shadow-neon-cyan'
                : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
            }`}
          >
            {/* Pole line */}
            <div className="absolute top-3 bottom-8 w-1.5 bg-slate-700 rounded-full z-0"></div>

            {/* Disks */}
            <div className="flex flex-col-reverse items-center gap-1.5 z-10 w-full mb-1">
              {pegs[pegKey].map((d) => (
                <div
                  key={d}
                  className={`h-6 rounded-md font-mono text-[10px] font-bold text-slate-950 flex items-center justify-center shadow-md ${diskWidths[d]}`}
                >
                  Disk {d}
                </div>
              ))}
            </div>

            {/* Base platform */}
            <div className="w-full h-3 bg-slate-800 rounded z-10 flex items-center justify-center text-[10px] font-mono text-slate-400 font-bold">
              PEG {pegKey}
            </div>
          </div>
        ))}
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tower of Hanoi solved in {moves} moves! Recurrence T(3) = 2³ - 1 = 7.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+30 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 10: ALGORITHM BIG-O SPEED RANKER --- */
const AlgoComplexityMiniGame = ({ onWin, addXP, addCoins }) => {
  const correctSequence = ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'];
  const [clicked, setClicked] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const pool = ['O(n²)', 'O(log n)', 'O(1)', 'O(n)'];

  const handlePick = (item) => {
    if (isWon || clicked.includes(item)) return;
    sound.playClick();
    const updated = [...clicked, item];
    setClicked(updated);

    if (updated.length === correctSequence.length) {
      if (updated.every((val, idx) => val === correctSequence[idx])) {
        sound.playSuccess();
        triggerCelebration();
        setIsWon(true);
        addXP(25, 'Big-O Hierarchy Master');
        addCoins(10);
        if (onWin) onWin();
      } else {
        sound.playError();
        setTimeout(() => setClicked([]), 800);
      }
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-fuchsia-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-fuchsia-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Big-O Speed Ranker
      </h4>
      <p className="text-xs text-slate-300">
        Rules: Click the asymptotic complexities in order from <span className="text-emerald-400 font-bold">Fastest Growth Rate (Lowest Cost)</span> to <span className="text-rose-400 font-bold">Slowest (Highest Cost)</span>!
      </p>

      {/* Progress sequence */}
      <div className="flex items-center justify-center gap-2 font-mono py-2">
        {clicked.map((val, idx) => (
          <span key={idx} className="px-3 py-1.5 rounded-lg bg-fuchsia-950 border border-fuchsia-600 text-fuchsia-300 font-bold text-xs">
            {idx + 1}. {val}
          </span>
        ))}
        {clicked.length === 0 && <span className="text-xs text-slate-500 font-mono">Select first item...</span>}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {pool.map((opt) => (
          <button
            key={opt}
            onClick={() => handlePick(opt)}
            disabled={isWon || clicked.includes(opt)}
            className={`py-3 rounded-xl font-mono font-bold text-xs border transition ${
              clicked.includes(opt)
                ? 'bg-slate-900 text-slate-600 border-slate-800'
                : 'bg-slate-950 border-slate-700 text-slate-200 hover:border-fuchsia-400 hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Perfect! O(1) &lt; O(log n) &lt; O(n) &lt; O(n²).
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 11: FIBONACCI DP TABULATION --- */
const AlgoDPMiniGame = ({ onWin, addXP, addCoins }) => {
  const [dpTable, setDpTable] = useState([0, 1]);
  const [isWon, setIsWon] = useState(false);
  // Next required: fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5
  const nextTarget = dpTable.length < 6 ? dpTable[dpTable.length - 1] + dpTable[dpTable.length - 2] : null;

  const choices = [
    dpTable.length === 2 ? 1 : null,
    dpTable.length === 3 ? 2 : null,
    dpTable.length === 4 ? 3 : null,
    dpTable.length === 5 ? 5 : null,
  ];

  const handleSelectVal = (val) => {
    if (isWon) return;
    sound.playClick();
    if (val === nextTarget) {
      sound.playSuccess();
      const updated = [...dpTable, val];
      setDpTable(updated);

      if (updated.length === 6) {
        triggerCelebration();
        setIsWon(true);
        addXP(25, 'DP Tabulation Master');
        addCoins(10);
        if (onWin) onWin();
      }
    } else {
      sound.playError();
    }
  };

  const optionPool = [nextTarget, nextTarget + 1, nextTarget + 2, Math.max(1, nextTarget - 1)].filter(Boolean).sort(() => Math.random() - 0.5);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-purple-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Fibonacci DP Table Builder
      </h4>
      <p className="text-xs text-slate-300">
        Formula: <span className="font-mono text-cyan-300 font-bold">dp[i] = dp[i-1] + dp[i-2]</span>. Compute the next entry in the DP table!
      </p>

      {/* Table Slots */}
      <div className="flex justify-center gap-2 py-2 overflow-x-auto font-mono">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border-2 ${
                dpTable[idx] !== undefined
                  ? 'border-purple-500 bg-purple-950/60 text-purple-200'
                  : idx === dpTable.length
                  ? 'border-dashed border-cyan-400 bg-cyan-950/30 text-cyan-300 animate-pulse'
                  : 'border-slate-800 bg-slate-950 text-slate-600'
              }`}
            >
              {dpTable[idx] !== undefined ? dpTable[idx] : '?'}
            </div>
            <span className="text-[10px] text-slate-500 mt-1">fib({idx})</span>
          </div>
        ))}
      </div>

      {!isWon && nextTarget !== null && (
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-400 block text-center">
            What is fib({dpTable.length}) = {dpTable[dpTable.length - 1]} + {dpTable[dpTable.length - 2]}?
          </span>
          <div className="flex justify-center gap-3">
            {[nextTarget, nextTarget + 1, nextTarget + 2].map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelectVal(opt)}
                className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-purple-600 text-white font-mono font-bold text-sm border border-slate-700 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DP Table Complete! [0, 1, 1, 2, 3, 5] solved in O(n) linear time.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};

/* --- MINI-GAME 12: SLIDING WINDOW MAX SUM --- */
const AlgoWindowMiniGame = ({ onWin, addXP, addCoins }) => {
  const array = [2, 1, 5, 1, 3, 2];
  const windowSize = 3;
  const [windowIndex, setWindowIndex] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const currentWindow = array.slice(windowIndex, windowIndex + windowSize);
  const currentSum = currentWindow.reduce((a, b) => a + b, 0);

  const handleSlide = (dir) => {
    sound.playClick();
    if (dir === 'left' && windowIndex > 0) {
      setWindowIndex(windowIndex - 1);
    } else if (dir === 'right' && windowIndex < array.length - windowSize) {
      setWindowIndex(windowIndex + 1);
    }
  };

  const handleConfirmMax = () => {
    sound.playClick();
    // Max sum is window [5, 1, 3] at index 2 (sum = 9)
    if (currentSum === 9 && windowIndex === 2) {
      sound.playSuccess();
      triggerCelebration();
      setIsWon(true);
      addXP(25, 'Sliding Window Conqueror');
      addCoins(10);
      if (onWin) onWin();
    } else {
      sound.playError();
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-5">
      <h4 className="text-lg font-bold font-gaming text-cyan-400 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5" /> Mini-Game: Sliding Window Maximum Sum (k = 3)
      </h4>
      <p className="text-xs text-slate-300">
        Rules: Slide the k=3 window frame across the array. Find and confirm the position that yields the <span className="text-cyan-300 font-bold">Maximum Subarray Sum</span>!
      </p>

      {/* Array with visual sliding frame */}
      <div className="flex justify-center gap-2 py-3 overflow-x-auto font-mono">
        {array.map((val, idx) => {
          const isInside = idx >= windowIndex && idx < windowIndex + windowSize;
          return (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border-2 transition-all ${
                  isInside
                    ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow-neon-cyan scale-105'
                    : 'border-slate-800 bg-slate-950 text-slate-500'
                }`}
              >
                {val}
              </div>
              <span className="text-[10px] text-slate-500 mt-1">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="text-center font-mono text-xs text-slate-300">
        Current Window Elements: <span className="text-cyan-400 font-bold">[{currentWindow.join(', ')}]</span> | Window Sum: <span className="text-amber-400 font-bold text-sm">{currentSum}</span>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => handleSlide('left')}
          disabled={windowIndex === 0 || isWon}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-mono font-bold text-slate-200"
        >
          &larr; Slide Left
        </button>
        <button
          onClick={handleConfirmMax}
          disabled={isWon}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-gaming text-xs shadow-neon-cyan"
        >
          Confirm Max Sum!
        </button>
        <button
          onClick={() => handleSlide('right')}
          disabled={windowIndex >= array.length - windowSize || isWon}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-mono font-bold text-slate-200"
        >
          Slide Right &rarr;
        </button>
      </div>

      {isWon && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-600 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Optimal Window Found! Subarray [5, 1, 3] gives maximum sum 9.
          </span>
          <span className="font-mono text-emerald-400 font-bold">+25 XP EARNED</span>
        </div>
      )}
    </div>
  );
};
