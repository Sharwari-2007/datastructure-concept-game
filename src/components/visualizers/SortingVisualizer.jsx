import React, { useState, useRef } from 'react';
import { Zap, Play, RotateCcw, Shuffle, Info } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const SortingVisualizer = ({ onMissionComplete }) => {
  const [array, setArray] = useState([45, 12, 89, 34, 22, 90, 11, 67]);
  const [algorithm, setAlgorithm] = useState('bubble'); // bubble | selection | insertion | merge | quick
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [speed, setSpeed] = useState(250); // ms delay
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('Select an algorithm (Bubble, Selection, Insertion, Merge, Quick) and click Start Sorting Animation.');

  const isCancelledRef = useRef(false);

  const resetArray = () => {
    isCancelledRef.current = true;
    setIsRunning(false);
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
    setArray(newArr);
    setComparing([]);
    setSwapping([]);
    setPivotIndex(null);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setMessage('Generated new random array.');
    sound.playClick();
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (isCancelledRef.current) return;
        setComparing([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        setMessage(`Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]})...`);
        sound.playClick();
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
          setMessage(`Swapped arr[${j}] and arr[${j + 1}]! Bubbling larger element to right.`);
          sound.playCoin();
          await sleep(speed);
        }
        setSwapping([]);
      }
      setSortedIndices(prev => [...prev, n - i - 1]);
    }
  };

  // 2. Selection Sort
  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (isCancelledRef.current) return;
        setComparing([minIdx, j]);
        compCount++;
        setComparisons(compCount);
        setMessage(`Scanning for minimum: comparing current min arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]}).`);
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
        setMessage(`Swapped minimum element ${arr[i]} into sorted position at index ${i}.`);
        sound.playCoin();
        await sleep(speed);
        setSwapping([]);
      }
      setSortedIndices(prev => [...prev, i]);
    }
  };

  // 3. Insertion Sort
  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      setMessage(`Inserting arr[${i}] (${key}) into the already sorted prefix.`);

      while (j >= 0 && arr[j] > key) {
        if (isCancelledRef.current) return;
        setComparing([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        await sleep(speed);

        arr[j + 1] = arr[j];
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
        sound.playClick();
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
      await sleep(speed);
    }
  };

  // 4. Merge Sort
  const mergeSort = async () => {
    const arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    const merge = async (left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;

      setMessage(`Merging sub-arrays: [${left}..${mid}] and [${mid + 1}..${right}].`);

      while (i < leftArr.length && j < rightArr.length) {
        if (isCancelledRef.current) return;
        setComparing([left + i, mid + 1 + j]);
        compCount++;
        setComparisons(compCount);
        sound.playClick();
        await sleep(speed);

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
        k++;
      }

      while (i < leftArr.length) {
        if (isCancelledRef.current) return;
        arr[k] = leftArr[i];
        i++;
        k++;
        setArray([...arr]);
        await sleep(speed / 2);
      }

      while (j < rightArr.length) {
        if (isCancelledRef.current) return;
        arr[k] = rightArr[j];
        j++;
        k++;
        setArray([...arr]);
        await sleep(speed / 2);
      }
    };

    const divideAndConquer = async (left, right) => {
      if (left >= right || isCancelledRef.current) return;
      const mid = Math.floor((left + right) / 2);
      await divideAndConquer(left, mid);
      await divideAndConquer(mid + 1, right);
      await merge(left, mid, right);
    };

    await divideAndConquer(0, arr.length - 1);
  };

  // 5. Quick Sort
  const quickSort = async () => {
    const arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    const partition = async (low, high) => {
      const pivot = arr[high];
      setPivotIndex(high);
      setMessage(`Pivot chosen: arr[${high}] = ${pivot}. Partitioning elements <= ${pivot} to left.`);
      await sleep(speed);

      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (isCancelledRef.current) return -1;
        setComparing([j, high]);
        compCount++;
        setComparisons(compCount);
        sound.playClick();
        await sleep(speed);

        if (arr[j] <= pivot) {
          i++;
          setSwapping([i, j]);
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
          await sleep(speed);
          setSwapping([]);
        }
      }

      setSwapping([i + 1, high]);
      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      swapCount++;
      setSwaps(swapCount);
      setArray([...arr]);
      await sleep(speed);
      setSwapping([]);
      setPivotIndex(null);

      return i + 1;
    };

    const qs = async (low, high) => {
      if (low < high && !isCancelledRef.current) {
        const pi = await partition(low, high);
        if (pi === -1) return;
        setSortedIndices(prev => [...prev, pi]);
        await qs(low, pi - 1);
        await qs(pi + 1, high);
      } else if (low === high) {
        setSortedIndices(prev => [...prev, low]);
      }
    };

    await qs(0, arr.length - 1);
  };

  const handleStartSort = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isCancelledRef.current = false;
    setComparing([]);
    setSwapping([]);
    setPivotIndex(null);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    sound.playClick();

    if (algorithm === 'bubble') {
      await bubbleSort();
    } else if (algorithm === 'selection') {
      await selectionSort();
    } else if (algorithm === 'insertion') {
      await insertionSort();
    } else if (algorithm === 'merge') {
      await mergeSort();
    } else if (algorithm === 'quick') {
      await quickSort();
    }

    if (!isCancelledRef.current) {
      setIsRunning(false);
      setComparing([]);
      setSwapping([]);
      setPivotIndex(null);
      setSortedIndices(Array.from({ length: array.length }, (_, k) => k));
      setMessage(`Sorting Complete! Array is strictly sorted in non-decreasing order.`);
      sound.playSuccess();
      if (onMissionComplete) onMissionComplete();
    }
  };

  const getComplexity = () => {
    switch (algorithm) {
      case 'bubble': return { time: 'O(n²)', space: 'O(1)', stable: 'Yes' };
      case 'selection': return { time: 'O(n²)', space: 'O(1)', stable: 'No' };
      case 'insertion': return { time: 'O(n²) [O(n) best]', space: 'O(1)', stable: 'Yes' };
      case 'merge': return { time: 'O(n log n)', space: 'O(n)', stable: 'Yes' };
      case 'quick': return { time: 'O(n log n) avg / O(n²) worst', space: 'O(log n)', stable: 'No' };
      default: return { time: 'O(n²)', space: 'O(1)', stable: 'Yes' };
    }
  };

  const compInfo = getComplexity();

  return (
    <div className="cyber-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-amber-400 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            Sorting Speedway Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Compare all 5 classical sorting algorithms: Bubble, Selection, Insertion, Merge Sort &amp; Quick Sort.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Algorithm selector */}
          <select
            value={algorithm}
            onChange={(e) => { setAlgorithm(e.target.value); sound.playClick(); }}
            disabled={isRunning}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 font-bold outline-none"
          >
            <option value="bubble">Bubble Sort O(n²)</option>
            <option value="selection">Selection Sort O(n²)</option>
            <option value="insertion">Insertion Sort O(n²)</option>
            <option value="merge">Merge Sort O(n log n)</option>
            <option value="quick">Quick Sort O(n log n)</option>
          </select>

          <button
            onClick={resetArray}
            disabled={isRunning}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Randomize Array"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Comparisons</span>
          <span className="text-amber-400 font-bold text-base">{comparisons}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Swaps / Writes</span>
          <span className="text-cyan-400 font-bold text-base">{swaps}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Time Complexity</span>
          <span className="text-rose-400 font-bold text-xs">{compInfo.time}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Stable Sorting?</span>
          <span className="text-emerald-400 font-bold text-xs">{compInfo.stable}</span>
        </div>
      </div>

      {/* Bar Chart Visualizer */}
      <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
        <div className="h-64 w-full flex items-end justify-center gap-3 px-4">
          {array.map((val, idx) => {
            const isComp = comparing.includes(idx);
            const isSwap = swapping.includes(idx);
            const isPivot = pivotIndex === idx;
            const isSorted = sortedIndices.includes(idx);
            const heightPercent = Math.max(15, (val / 100) * 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center max-w-[50px]">
                <div className="h-4 text-[10px] font-mono font-bold">
                  {isPivot && <span className="text-purple-400">PIVOT</span>}
                </div>
                <span className="text-[11px] font-mono text-slate-300 font-bold mb-1">
                  {val}
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg transition-all duration-200 border-2 ${
                    isPivot
                      ? 'bg-purple-600 border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.7)]'
                      : isSwap
                      ? 'bg-rose-500 border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                      : isComp
                      ? 'bg-amber-400 border-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.6)]'
                      : isSorted
                      ? 'bg-emerald-500/80 border-emerald-400'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                />
                <span className="text-[10px] font-mono text-slate-500 mt-1">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Message */}
        <div className="w-full mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {message}
          </p>
        </div>
      </div>

      {/* Controls & Speed */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handleStartSort}
          disabled={isRunning}
          className="px-6 py-2.5 cyber-button-primary text-xs font-bold flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          {isRunning ? 'Sorting in Progress...' : `Start ${algorithm.toUpperCase()} Sort`}
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Speed:</span>
          {[
            { label: '1x', delay: 350 },
            { label: '2x', delay: 200 },
            { label: '4x', delay: 75 }
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setSpeed(s.delay)}
              className={`px-2.5 py-1 rounded font-bold transition ${
                speed === s.delay ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
