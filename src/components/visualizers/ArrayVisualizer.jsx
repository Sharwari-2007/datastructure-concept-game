import React, { useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, Search, Edit3, ArrowRight, CheckCircle2, AlertCircle, Info, Grid } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const ArrayVisualizer = ({ initialArray = [12, 45, 78, 99, 23], onMissionComplete }) => {
  const [array, setArray] = useState(initialArray);
  const [viewMode, setViewMode] = useState('1d'); // '1d' | '2d-matrix'
  const [insertVal, setInsertVal] = useState('');
  const [insertIdx, setInsertIdx] = useState('');
  const [deleteIdx, setDeleteIdx] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [searchMode, setSearchMode] = useState('linear'); // 'linear' | 'binary'
  const [updateIdx, setUpdateIdx] = useState('');
  const [updateVal, setUpdateVal] = useState('');

  // 2D Matrix view state
  const [matrix] = useState([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
  ]);
  const [selectedCell, setSelectedCell] = useState(null);

  // Step state
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [binaryPointers, setBinaryPointers] = useState(null); // { low, mid, high }
  const [message, setMessage] = useState('Select an operation below to visualize step-by-step memory changes.');
  const [operationInfo, setOperationInfo] = useState({ name: 'Idle', time: 'O(1)', space: 'O(1)' });

  const recordStepsAndPlay = (generatedSteps, opInfo) => {
    setSteps(generatedSteps);
    setActiveStep(0);
    setOperationInfo(opInfo);
    sound.playClick();
    executeStep(0, generatedSteps);
  };

  const executeStep = (stepIdx, stepList) => {
    if (stepIdx < 0 || stepIdx >= stepList.length) return;
    const step = stepList[stepIdx];
    setActiveStep(stepIdx);
    setArray([...step.arrayState]);
    setHighlightedIndex(step.highlightedIndex !== undefined ? step.highlightedIndex : null);
    setComparingIndex(step.comparingIndex !== undefined ? step.comparingIndex : null);
    setBinaryPointers(step.binaryPointers || null);
    setMessage(step.explanation);
    if (step.isSuccess) sound.playSuccess();
    if (step.isError) sound.playError();
    if (onMissionComplete && step.missionMatch) onMissionComplete();
  };

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      executeStep(activeStep + 1, steps);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      executeStep(activeStep - 1, steps);
    }
  };

  // 1. Insert Operation
  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(insertVal);
    const idx = parseInt(insertIdx);
    if (isNaN(val) || isNaN(idx)) return;
    if (idx < 0 || idx > array.length) {
      setMessage(`Index ${idx} is Out of Bounds! Valid range: 0 to ${array.length}.`);
      sound.playError();
      return;
    }

    const genSteps = [];
    let current = [...array];

    genSteps.push({
      arrayState: [...current],
      highlightedIndex: idx,
      explanation: `Step 1: Check capacity and prepare insertion at Index ${idx} for value ${val}. Elements from index ${idx} to ${current.length - 1} must shift right.`
    });

    const newArr = [...current, 0];
    for (let i = current.length - 1; i >= idx; i--) {
      newArr[i + 1] = newArr[i];
      genSteps.push({
        arrayState: [...newArr],
        highlightedIndex: i + 1,
        comparingIndex: i,
        explanation: `Shift element ${newArr[i]} from index ${i} -> index ${i + 1} to create a vacancy.`
      });
    }

    newArr[idx] = val;
    genSteps.push({
      arrayState: [...newArr],
      highlightedIndex: idx,
      isSuccess: true,
      missionMatch: true,
      explanation: `Step Final: Successfully inserted ${val} at index ${idx}! Total size is now ${newArr.length}.`
    });

    recordStepsAndPlay(genSteps, { name: `Insert at ${idx}`, time: idx === array.length ? 'O(1) amortized' : 'O(n) shifting', space: 'O(1) auxiliary' });
    setInsertVal('');
    setInsertIdx('');
  };

  // 2. Delete Operation
  const handleDelete = (e) => {
    e.preventDefault();
    const idx = parseInt(deleteIdx);
    if (isNaN(idx)) return;
    if (idx < 0 || idx >= array.length) {
      setMessage(`Index ${idx} out of bounds! Valid range: 0 to ${array.length - 1}.`);
      sound.playError();
      return;
    }

    const genSteps = [];
    const removedVal = array[idx];

    genSteps.push({
      arrayState: [...array],
      highlightedIndex: idx,
      explanation: `Step 1: Locate target index ${idx} with value ${removedVal}. Elements to the right will shift left to fill the gap.`
    });

    const newArr = [...array];
    for (let i = idx; i < newArr.length - 1; i++) {
      newArr[i] = newArr[i + 1];
      genSteps.push({
        arrayState: [...newArr],
        highlightedIndex: i,
        comparingIndex: i + 1,
        explanation: `Shift element ${newArr[i]} from index ${i + 1} -> index ${i}.`
      });
    }
    newArr.pop();

    genSteps.push({
      arrayState: [...newArr],
      highlightedIndex: null,
      isSuccess: true,
      missionMatch: true,
      explanation: `Step Final: Successfully deleted ${removedVal} from index ${idx}. Array length reduced to ${newArr.length}.`
    });

    recordStepsAndPlay(genSteps, { name: `Delete at ${idx}`, time: 'O(n) left shifts', space: 'O(1)' });
    setDeleteIdx('');
  };

  // 3. Search Operation (Linear vs Binary)
  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchVal);
    if (isNaN(val)) return;

    if (searchMode === 'binary') {
      // Binary search requires sorted array
      const sorted = [...array].sort((a, b) => a - b);
      const genSteps = [];
      let low = 0, high = sorted.length - 1;
      let found = false;

      genSteps.push({
        arrayState: [...sorted],
        binaryPointers: { low, mid: Math.floor((low + high) / 2), high },
        explanation: `Binary Search Preparation: Array sorted in ascending order. Initial low=0, high=${high}.`
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        genSteps.push({
          arrayState: [...sorted],
          highlightedIndex: mid,
          binaryPointers: { low, mid, high },
          explanation: `Checking mid index ${mid}: arr[${mid}] = ${sorted[mid]}. Comparing with target ${val}.`
        });

        if (sorted[mid] === val) {
          genSteps.push({
            arrayState: [...sorted],
            highlightedIndex: mid,
            binaryPointers: { low, mid, high },
            isSuccess: true,
            missionMatch: true,
            explanation: `🎯 Found target ${val} at Index ${mid}! Binary search completed in O(log n) comparisons.`
          });
          found = true;
          break;
        } else if (sorted[mid] < val) {
          low = mid + 1;
          genSteps.push({
            arrayState: [...sorted],
            binaryPointers: { low, mid, high },
            explanation: `Since ${sorted[mid]} < ${val}, target must be in right half. Updating low = ${low}.`
          });
        } else {
          high = mid - 1;
          genSteps.push({
            arrayState: [...sorted],
            binaryPointers: { low, mid, high },
            explanation: `Since ${sorted[mid]} > ${val}, target must be in left half. Updating high = ${high}.`
          });
        }
      }

      if (!found) {
        genSteps.push({
          arrayState: [...sorted],
          isError: true,
          explanation: `Target ${val} not found in array. Search space exhausted (low > high).`
        });
      }

      recordStepsAndPlay(genSteps, { name: `Binary Search (${val})`, time: 'O(log n)', space: 'O(1)' });
    } else {
      // Linear Search
      const genSteps = [];
      let found = false;

      for (let i = 0; i < array.length; i++) {
        genSteps.push({
          arrayState: [...array],
          highlightedIndex: i,
          explanation: `Scanning Index ${i}: Checking if arr[${i}] (${array[i]}) == ${val}...`
        });

        if (array[i] === val) {
          genSteps.push({
            arrayState: [...array],
            highlightedIndex: i,
            isSuccess: true,
            missionMatch: true,
            explanation: `🎯 MATCH FOUND! Target ${val} exists at Index ${i}. Total comparisons: ${i + 1}.`
          });
          found = true;
          break;
        }
      }

      if (!found) {
        genSteps.push({
          arrayState: [...array],
          isError: true,
          explanation: `Target ${val} not found in array after scanning all ${array.length} elements.`
        });
      }

      recordStepsAndPlay(genSteps, { name: `Linear Search (${val})`, time: 'O(n)', space: 'O(1)' });
    }

    setSearchVal('');
  };

  // 4. Update Operation
  const handleUpdate = (e) => {
    e.preventDefault();
    const idx = parseInt(updateIdx);
    const val = parseInt(updateVal);
    if (isNaN(idx) || isNaN(val)) return;
    if (idx < 0 || idx >= array.length) {
      setMessage(`Index ${idx} is invalid.`);
      sound.playError();
      return;
    }

    const newArr = [...array];
    const oldVal = newArr[idx];
    newArr[idx] = val;

    const genSteps = [
      {
        arrayState: [...array],
        highlightedIndex: idx,
        explanation: `Step 1: Locate memory slot at Base Address + (${idx} * 4). Current value is ${oldVal}.`
      },
      {
        arrayState: [...newArr],
        highlightedIndex: idx,
        isSuccess: true,
        missionMatch: true,
        explanation: `Step 2: Overwrote memory at index ${idx} with ${val}. Constant time O(1) direct update!`
      }
    ];

    recordStepsAndPlay(genSteps, { name: `Update arr[${idx}]`, time: 'O(1) direct write', space: 'O(1)' });
    setUpdateIdx('');
    setUpdateVal('');
  };

  const handleReset = () => {
    setArray(initialArray);
    setSteps([]);
    setActiveStep(0);
    setHighlightedIndex(null);
    setComparingIndex(null);
    setBinaryPointers(null);
    setMessage('Array restored to original state.');
    sound.playClick();
  };

  const handleCellClick = (r, c) => {
    sound.playClick();
    setSelectedCell({ r, c, val: matrix[r][c] });
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-cyan-400 flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800">📊</span>
            Interactive Array Memory Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Contiguous memory addresses, direct $O(1)$ access, element shifting, Binary Search, and 2D Matrix Row-Major mapping.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* 1D vs 2D Matrix view toggle */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => { setViewMode('1d'); sound.playClick(); }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === '1d' ? 'bg-cyan-600 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              1D Array
            </button>
            <button
              onClick={() => { setViewMode('2d-matrix'); sound.playClick(); }}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                viewMode === '2d-matrix' ? 'bg-cyan-600 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> 2D Matrix
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset Array"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === '1d' ? (
        <>
          {/* Array Memory Grid */}
          <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400">
                Array Length: <span className="text-cyan-400 font-bold">{array.length}</span> | Base Address: <span className="text-purple-400">0x2000</span>
              </span>
              {steps.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
                  >
                    ◀ Prev
                  </button>
                  <span className="text-xs font-mono text-slate-300">
                    Step {activeStep + 1} / {steps.length}
                  </span>
                  <button
                    onClick={handleNextStep}
                    disabled={activeStep === steps.length - 1}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-cyan-300"
                  >
                    Next ▶
                  </button>
                </div>
              )}
            </div>

            {/* Visual Slots */}
            <div className="overflow-x-auto pb-4 pt-2">
              <div className="flex items-end gap-3 min-w-max px-2">
                {array.map((val, idx) => {
                  const isHighlight = highlightedIndex === idx;
                  const isComparing = comparingIndex === idx;
                  const isLow = binaryPointers?.low === idx;
                  const isMid = binaryPointers?.mid === idx;
                  const isHigh = binaryPointers?.high === idx;

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      {/* Pointer Label */}
                      <div className="h-6 flex items-center justify-center mb-1 text-[10px] font-mono font-bold">
                        {isMid && <span className="text-amber-400">▼ MID</span>}
                        {isLow && !isMid && <span className="text-cyan-400">▼ LOW</span>}
                        {isHigh && !isMid && <span className="text-rose-400">▼ HIGH</span>}
                        {isHighlight && !isMid && <span className="text-cyan-400 animate-bounce">▼ TARGET</span>}
                        {isComparing && <span className="text-amber-400">▼ SHIFT</span>}
                      </div>

                      {/* Cell Box */}
                      <div
                        className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-lg transition-all duration-300 border-2 ${
                          isHighlight || isMid
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-neon-cyan scale-105'
                            : isComparing
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-500'
                        }`}
                      >
                        <span>{val}</span>
                      </div>

                      {/* Index and Address */}
                      <div className="mt-2 text-center font-mono">
                        <span className="block text-xs font-bold text-cyan-400">[{idx}]</span>
                        <span className="block text-[10px] text-slate-500">
                          0x{2000 + idx * 4}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Explanation Panel */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {message}
              </p>
            </div>
          </div>

          {/* Control Actions Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Insert Form */}
            <form onSubmit={handleInsert} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Insert Element
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Value"
                  value={insertVal}
                  onChange={(e) => setInsertVal(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder={`Index (0-${array.length})`}
                  value={insertIdx}
                  onChange={(e) => setInsertIdx(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full py-1.5 cyber-button-primary text-xs">
                Insert &amp; Shift
              </button>
            </form>

            {/* Delete Form */}
            <form onSubmit={handleDelete} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" /> Delete Element
              </div>
              <input
                type="number"
                placeholder={`Target Index (0-${Math.max(0, array.length - 1)})`}
                value={deleteIdx}
                onChange={(e) => setDeleteIdx(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-rose-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
              >
                Delete &amp; Compact
              </button>
            </form>

            {/* Search Form (Linear vs Binary) */}
            <form onSubmit={handleSearch} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> Search</span>
                <div className="flex gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setSearchMode('linear')}
                    className={`px-1.5 py-0.5 rounded ${searchMode === 'linear' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Linear
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('binary')}
                    className={`px-1.5 py-0.5 rounded ${searchMode === 'binary' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Binary
                  </button>
                </div>
              </div>
              <input
                type="number"
                placeholder="Search Target Value"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-amber-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition"
              >
                {searchMode === 'binary' ? 'Binary Search O(log n)' : 'Linear Scan O(n)'}
              </button>
            </form>

            {/* Update Form */}
            <form onSubmit={handleUpdate} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" /> Direct Overwrite (O(1))
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Index"
                  value={updateIdx}
                  onChange={(e) => setUpdateIdx(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-purple-500 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="New Val"
                  value={updateVal}
                  onChange={(e) => setUpdateVal(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-purple-500 outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full py-1.5 cyber-button-purple text-xs">
                Direct Overwrite
              </button>
            </form>
          </div>
        </>
      ) : (
        /* 2D Matrix Memory Mapping View */
        <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80 space-y-6">
          <div className="border-b border-slate-800 pb-2">
            <h4 className="text-base font-bold font-gaming text-cyan-300">
              2D Array Physical Memory Mapping (3x3 Matrix)
            </h4>
            <p className="text-xs font-mono text-slate-400">
              Click any cell to calculate its physical 1D address using Row-Major Order: $\text{Address} = \text{Base} + (i \times \text{Cols} + j) \times \text{Size}$.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* 2D Grid */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 block mb-2 text-center">
                Logical 2D View
              </span>
              <div className="grid grid-cols-3 gap-2">
                {matrix.map((row, r) => (
                  row.map((val, c) => {
                    const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-bold transition border-2 ${
                          isSelected
                            ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-neon-cyan'
                            : 'bg-slate-950 border-slate-700 text-white hover:border-slate-500'
                        }`}
                      >
                        <span className="text-sm">{val}</span>
                        <span className="text-[9px] text-slate-500">[{r}][{c}]</span>
                      </button>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Formula Calculation Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex-1 max-w-md font-mono text-xs space-y-3">
              <span className="text-cyan-400 font-bold block uppercase text-[11px]">
                Physical Address Resolution:
              </span>
              {selectedCell ? (
                <div className="space-y-2 text-slate-300">
                  <div>
                    Target: <strong className="text-white">Matrix[{selectedCell.r}][{selectedCell.c}]</strong> (Value = {selectedCell.val})
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                    Base + ((row * cols + col) * element_size)
                    <br />
                    = 2000 + (({selectedCell.r} * 3 + {selectedCell.c}) * 4)
                    <br />
                    = 2000 + ({selectedCell.r * 3 + selectedCell.c} * 4)
                    <br />
                    = <span className="font-bold text-white">0x{2000 + (selectedCell.r * 3 + selectedCell.c) * 4}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Row-Major order stores Row 0 continuously, followed by Row 1, then Row 2. This optimizes CPU cache prefetching!
                  </p>
                </div>
              ) : (
                <p className="text-slate-500 text-xs">
                  Click any matrix cell above to view its physical memory offset computation.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
