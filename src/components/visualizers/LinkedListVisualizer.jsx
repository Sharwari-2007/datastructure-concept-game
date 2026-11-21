import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Plus, Trash2, Repeat, Info, GitCommit, Search } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const LinkedListVisualizer = ({ initialList = [10, 20, 30, 40], onMissionComplete }) => {
  const [nodes, setNodes] = useState(initialList);
  const [valInput, setValInput] = useState('');
  const [posInput, setPosInput] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [listType, setListType] = useState('singly'); // 'singly' | 'doubly' | 'circular'
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [message, setMessage] = useState('Inspect node structures with pointers in dynamic memory.');
  const [complexity, setComplexity] = useState({ time: 'O(1)', space: 'O(1)' });

  const executeSteps = (newSteps, comp) => {
    setSteps(newSteps);
    setActiveStep(0);
    setComplexity(comp);
    sound.playClick();
    runStep(0, newSteps);
  };

  const runStep = (idx, stepList) => {
    if (idx < 0 || idx >= stepList.length) return;
    const step = stepList[idx];
    setActiveStep(idx);
    setNodes([...step.nodes]);
    setHighlightedIndex(step.highlightedIndex !== undefined ? step.highlightedIndex : null);
    setMessage(step.message);
    if (step.isSuccess) sound.playSuccess();
    if (step.missionMatch && onMissionComplete) onMissionComplete();
  };

  // 1. Insert at Beginning (Head)
  const handleInsertHead = () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return;

    const genSteps = [
      {
        nodes: [...nodes],
        highlightedIndex: null,
        message: `Step 1: Allocate new node in heap with Data = ${val} and Next = null.`
      },
      {
        nodes: [val, ...nodes],
        highlightedIndex: 0,
        message: `Step 2: Point newNode.next to current HEAD (${nodes[0] || 'NULL'}). Update HEAD pointer to point to newNode.`
      },
      {
        nodes: [val, ...nodes],
        highlightedIndex: 0,
        isSuccess: true,
        missionMatch: true,
        message: `Success: Inserted ${val} at HEAD in O(1) time without shifting any other nodes!`
      }
    ];

    executeSteps(genSteps, { time: 'O(1) constant time', space: 'O(1)' });
    setValInput('');
  };

  // 2. Insert at End (Tail)
  const handleInsertTail = () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return;

    const genSteps = [];
    if (nodes.length === 0) {
      genSteps.push({
        nodes: [val],
        highlightedIndex: 0,
        isSuccess: true,
        missionMatch: true,
        message: `List was empty. newNode ${val} is now the HEAD.`
      });
    } else {
      genSteps.push({
        nodes: [...nodes],
        highlightedIndex: 0,
        message: `Step 1: Start at HEAD (node ${nodes[0]}) and traverse to find the last node where next == NULL.`
      });

      for (let i = 1; i < nodes.length; i++) {
        genSteps.push({
          nodes: [...nodes],
          highlightedIndex: i,
          message: `Traversing node ${nodes[i]}...`
        });
      }

      const updated = [...nodes, val];
      genSteps.push({
        nodes: updated,
        highlightedIndex: updated.length - 1,
        isSuccess: true,
        missionMatch: true,
        message: `Step 3: Attached new node ${val} to previous tail's next pointer.`
      });
    }

    executeSteps(genSteps, { time: 'O(n) traversal [O(1) if TAIL pointer kept]', space: 'O(1)' });
    setValInput('');
  };

  // 3. Insert at Specific Position k
  const handleInsertAtPosition = (e) => {
    e?.preventDefault();
    const val = parseInt(valInput);
    const pos = parseInt(posInput);
    if (isNaN(val) || isNaN(pos)) return;

    if (pos <= 0 || pos > nodes.length + 1) {
      setMessage(`Position ${pos} is out of bounds! Valid range: 1 to ${nodes.length + 1}.`);
      sound.playError();
      return;
    }

    if (pos === 1) {
      handleInsertHead();
      return;
    }

    const genSteps = [];
    genSteps.push({
      nodes: [...nodes],
      highlightedIndex: 0,
      message: `Step 1: Traverse from HEAD to position ${pos - 1} to reach previous node.`
    });

    for (let i = 1; i < pos - 1; i++) {
      genSteps.push({
        nodes: [...nodes],
        highlightedIndex: i,
        message: `Traversing to position ${i + 1}...`
      });
    }

    const updated = [...nodes];
    updated.splice(pos - 1, 0, val);

    genSteps.push({
      nodes: updated,
      highlightedIndex: pos - 1,
      isSuccess: true,
      missionMatch: true,
      message: `Step Final: Rewired pointers! newNode.next = prev.next; prev.next = newNode. Inserted ${val} at Position ${pos}.`
    });

    executeSteps(genSteps, { time: `O(k) traversal [pos=${pos}]`, space: 'O(1)' });
    setValInput('');
    setPosInput('');
  };

  // 4. Delete at Head
  const handleDeleteHead = () => {
    if (nodes.length === 0) {
      setMessage('List is already empty!');
      sound.playError();
      return;
    }

    const removed = nodes[0];
    const updated = nodes.slice(1);
    const genSteps = [
      {
        nodes: [...nodes],
        highlightedIndex: 0,
        message: `Step 1: Target current HEAD node ${removed}. Save reference to head.next.`
      },
      {
        nodes: updated,
        highlightedIndex: updated.length > 0 ? 0 : null,
        isSuccess: true,
        missionMatch: true,
        message: `Step 2: HEAD updated to ${updated[0] || 'NULL'}. Node ${removed} freed from memory in O(1) time.`
      }
    ];

    executeSteps(genSteps, { time: 'O(1) constant', space: 'O(1)' });
  };

  // 5. Search in Linked List
  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchVal);
    if (isNaN(val)) return;

    const genSteps = [];
    let found = false;

    for (let i = 0; i < nodes.length; i++) {
      genSteps.push({
        nodes: [...nodes],
        highlightedIndex: i,
        message: `Traversing sequential node at index ${i}: checking if data (${nodes[i]}) == ${val}...`
      });

      if (nodes[i] === val) {
        genSteps.push({
          nodes: [...nodes],
          highlightedIndex: i,
          isSuccess: true,
          missionMatch: true,
          message: `🎯 Target node ${val} located at position ${i + 1}! Traversed ${i + 1} pointers.`
        });
        found = true;
        break;
      }
    }

    if (!found) {
      genSteps.push({
        nodes: [...nodes],
        highlightedIndex: null,
        message: `Reached NULL tail pointer. Value ${val} not found in linked list.`
      });
    }

    executeSteps(genSteps, { time: 'O(n) sequential access', space: 'O(1)' });
    setSearchVal('');
  };

  // 6. Reverse List (3 pointers)
  const handleReverse = () => {
    if (nodes.length <= 1) {
      setMessage('List has 0 or 1 node, already reversed!');
      return;
    }

    const genSteps = [
      {
        nodes: [...nodes],
        highlightedIndex: 0,
        message: 'Step 1: Initialize 3 tracking pointers: prev = NULL, curr = HEAD, next = NULL.'
      }
    ];

    const reversed = [...nodes].reverse();
    genSteps.push({
      nodes: [...nodes],
      highlightedIndex: 1,
      message: 'Step 2: In-place reversal loop: save next = curr.next, reverse link curr.next = prev, advance prev = curr, curr = next.'
    });

    genSteps.push({
      nodes: reversed,
      highlightedIndex: 0,
      isSuccess: true,
      missionMatch: true,
      message: 'Step 3: List reversed! HEAD now points to what was previously the last node.'
    });

    executeSteps(genSteps, { time: 'O(n) single pass', space: 'O(1) in-place' });
  };

  const handleReset = () => {
    setNodes(initialList);
    setSteps([]);
    setActiveStep(0);
    setHighlightedIndex(null);
    setMessage('List reset to initial state.');
    sound.playClick();
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-emerald-400 flex items-center gap-2">
            <GitCommit className="w-6 h-6 text-emerald-400" />
            Interactive Linked List Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic node chains, pointer references, Singly / Doubly / Circular links, position inserts, and 3-pointer list reversal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* List Type Selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['singly', 'doubly', 'circular'].map(type => (
              <button
                key={type}
                onClick={() => { setListType(type); sound.playClick(); }}
                className={`px-3 py-1 rounded-lg capitalize font-mono transition ${
                  listType === type ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-emerald-300">
            Time: <span className="font-bold text-white">{complexity.time}</span>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-bold">
              HEAD: {nodes.length > 0 ? `[Node ${nodes[0]}]` : 'NULL'}
            </span>
            <span className="text-slate-500">Node Count: {nodes.length}</span>
          </div>

          {steps.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => runStep(activeStep - 1, steps)}
                disabled={activeStep === 0}
                className="px-2 py-1 rounded bg-slate-800 text-slate-200 disabled:opacity-40"
              >
                ◀ Prev
              </button>
              <span className="text-slate-400">Step {activeStep + 1} / {steps.length}</span>
              <button
                onClick={() => runStep(activeStep + 1, steps)}
                disabled={activeStep === steps.length - 1}
                className="px-2 py-1 rounded bg-slate-800 text-emerald-300 disabled:opacity-40"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>

        {/* Node Chain */}
        <div className="overflow-x-auto pb-6 pt-2">
          <div className="flex items-center min-w-max gap-3 px-2">
            {nodes.map((val, idx) => {
              const isHighlight = highlightedIndex === idx;
              return (
                <div key={idx} className="flex items-center">
                  {/* Node representation */}
                  <div className="flex flex-col items-center">
                    {/* Role Pill */}
                    <div className="h-5 text-[10px] font-mono font-bold">
                      {idx === 0 && <span className="text-emerald-400">HEAD</span>}
                      {idx === nodes.length - 1 && idx !== 0 && <span className="text-cyan-400">TAIL</span>}
                    </div>

                    <div
                      className={`flex rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                        isHighlight
                          ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {/* Prev Pointer if Doubly */}
                      {listType === 'doubly' && (
                        <div className="w-7 bg-slate-950 flex items-center justify-center border-r border-slate-800 text-[10px] font-mono text-purple-400">
                          {idx === 0 ? '⊘' : '◄'}
                        </div>
                      )}

                      {/* Data Field */}
                      <div className="px-5 py-3 font-mono font-bold text-lg text-white bg-slate-900">
                        {val}
                      </div>

                      {/* Next Pointer Field */}
                      <div className="w-8 bg-slate-950 flex items-center justify-center border-l border-slate-800 text-xs font-mono text-emerald-400">
                        ►
                      </div>
                    </div>

                    <div className="mt-1.5 text-[10px] font-mono text-slate-500">
                      addr: 0x{3100 + idx * 16}
                    </div>
                  </div>

                  {/* Arrow Connection */}
                  <div className="flex items-center px-1">
                    {idx < nodes.length - 1 ? (
                      <div className="flex flex-col items-center">
                        <span className="text-emerald-400 font-bold text-lg">──►</span>
                        {listType === 'doubly' && (
                          <span className="text-purple-400 font-bold text-xs -mt-2">◄──</span>
                        )}
                      </div>
                    ) : listType === 'circular' ? (
                      <div className="flex items-center text-xs text-amber-400 font-mono px-2">
                        <span>↺ (points back to HEAD)</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-slate-600 font-mono pl-2">
                        <span>──► NULL</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {nodes.length === 0 && (
              <div className="py-8 text-center w-full text-slate-500 font-mono text-sm">
                HEAD ──► NULL (List is empty)
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {message}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Insert at Beginning / End */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Insert (Head / Tail)
          </div>
          <input
            type="number"
            placeholder="Node Value"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 outline-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleInsertHead}
              className="py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition"
            >
              Head (O(1))
            </button>
            <button
              onClick={handleInsertTail}
              className="py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition"
            >
              Tail (O(n))
            </button>
          </div>
        </div>

        {/* Insert at Position k */}
        <form onSubmit={handleInsertAtPosition} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Insert at Position k
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Value"
              value={valInput}
              onChange={(e) => setValInput(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
              required
            />
            <input
              type="number"
              placeholder={`Pos (1-${nodes.length + 1})`}
              value={posInput}
              onChange={(e) => setPosInput(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full py-1.5 cyber-button-primary text-xs">
            Insert at Pos k
          </button>
        </form>

        {/* Search in List */}
        <form onSubmit={handleSearch} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> Sequential Search
          </div>
          <input
            type="number"
            placeholder="Search Value"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-amber-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition"
          >
            Traverse &amp; Find (O(n))
          </button>
        </form>

        {/* Delete Head & Reverse */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
            <Repeat className="w-3.5 h-3.5" /> Operations
          </div>
          <button
            onClick={handleDeleteHead}
            className="w-full py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
          >
            Delete HEAD (O(1))
          </button>
          <button
            onClick={handleReverse}
            className="w-full py-1.5 cyber-button-purple text-xs"
          >
            Reverse List (3 Pointers)
          </button>
        </div>
      </div>
    </div>
  );
};
