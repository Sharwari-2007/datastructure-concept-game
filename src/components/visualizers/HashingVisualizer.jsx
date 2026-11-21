import React, { useState } from 'react';
import { Hash, Plus, Search, RotateCcw, Info, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const HashingVisualizer = ({ initialTableSize = 7, onMissionComplete }) => {
  const [tableSize, setTableSize] = useState(initialTableSize);
  const [method, setMethod] = useState('chaining'); // 'chaining' | 'linear' | 'quadratic' | 'double'
  const [table, setTable] = useState(() => Array.from({ length: initialTableSize }, () => []));
  const [keyInput, setKeyInput] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [highlightBucket, setHighlightBucket] = useState(null);
  const [message, setMessage] = useState('Hash Table maps keys to buckets using index = key % table_size.');

  // Calculate Load Factor: total elements / table size
  const totalElements = table.reduce((acc, bucket) => acc + (Array.isArray(bucket) ? bucket.length : 0), 0);
  const loadFactor = (totalElements / tableSize).toFixed(2);

  // Hash functions
  const hash1 = (key) => key % tableSize;
  const hash2 = (key) => 1 + (key % (tableSize - 1)); // Secondary hash for double hashing

  // Dynamic Rehashing
  const handleRehash = () => {
    sound.playClick();
    const newSize = tableSize * 2 + 1; // next prime approx
    const allKeys = [];
    table.forEach(bucket => bucket.forEach(k => allKeys.push(k)));

    const newTable = Array.from({ length: newSize }, () => []);
    allKeys.forEach(k => {
      const idx = k % newSize;
      newTable[idx].push(k);
    });

    setTableSize(newSize);
    setTable(newTable);
    setMessage(`🔄 REHASHING COMPLETE! Table expanded from ${tableSize} ➔ ${newSize} slots. Load factor normalized!`);
    sound.playSuccess();
  };

  // Insert Key
  const handleInsert = (e) => {
    e.preventDefault();
    const key = parseInt(keyInput);
    if (isNaN(key)) return;

    sound.playClick();
    const initialIndex = hash1(key);

    if (method === 'chaining') {
      const newTable = table.map(bucket => [...bucket]);
      newTable[initialIndex].push(key);
      setTable(newTable);
      setHighlightBucket(initialIndex);
      setMessage(`Hash: ${key} % ${tableSize} = ${initialIndex}. Appended ${key} to bucket [${initialIndex}] linked list chain.`);
      sound.playSuccess();
    } else if (method === 'linear') {
      let i = 0;
      let inserted = false;
      const newTable = [...table];

      while (i < tableSize) {
        const probeIdx = (initialIndex + i) % tableSize;
        if (newTable[probeIdx].length === 0) {
          newTable[probeIdx] = [key];
          setTable(newTable);
          setHighlightBucket(probeIdx);
          setMessage(`Linear Probing: Hash index ${initialIndex} checked (step i=${i}). Inserted at slot [${probeIdx}].`);
          inserted = true;
          sound.playSuccess();
          break;
        }
        i++;
      }

      if (!inserted) {
        setMessage(`Table Full! Linear probing failed for key ${key}. Consider rehashing!`);
        sound.playError();
      }
    } else if (method === 'quadratic') {
      let i = 0;
      let inserted = false;
      const newTable = [...table];

      while (i < tableSize) {
        const probeIdx = (initialIndex + i * i) % tableSize;
        if (newTable[probeIdx].length === 0) {
          newTable[probeIdx] = [key];
          setTable(newTable);
          setHighlightBucket(probeIdx);
          setMessage(`Quadratic Probing: Probed (${initialIndex} + ${i}²) % ${tableSize} = ${probeIdx}. Inserted ${key}.`);
          inserted = true;
          sound.playSuccess();
          break;
        }
        i++;
      }

      if (!inserted) {
        setMessage(`Quadratic probing could not find open slot for key ${key}.`);
        sound.playError();
      }
    } else if (method === 'double') {
      // Double Hashing: (h1 + i * h2) % m
      const h2Val = hash2(key);
      let i = 0;
      let inserted = false;
      const newTable = [...table];

      while (i < tableSize) {
        const probeIdx = (initialIndex + i * h2Val) % tableSize;
        if (newTable[probeIdx].length === 0) {
          newTable[probeIdx] = [key];
          setTable(newTable);
          setHighlightBucket(probeIdx);
          setMessage(`Double Hashing: (${initialIndex} + ${i} * ${h2Val}) % ${tableSize} = ${probeIdx}. Inserted ${key}.`);
          inserted = true;
          sound.playSuccess();
          break;
        }
        i++;
      }

      if (!inserted) {
        setMessage(`Double hashing failed to find slot for key ${key}.`);
        sound.playError();
      }
    }

    setKeyInput('');
    if (onMissionComplete) onMissionComplete();
  };

  // Search Key
  const handleSearch = (e) => {
    e.preventDefault();
    const key = parseInt(searchKey);
    if (isNaN(key)) return;

    sound.playClick();
    const initialIndex = hash1(key);

    if (method === 'chaining') {
      setHighlightBucket(initialIndex);
      if (table[initialIndex].includes(key)) {
        setMessage(`🎯 Found key ${key} inside bucket [${initialIndex}] chain in O(1 + α) time!`);
        sound.playSuccess();
      } else {
        setMessage(`Key ${key} not found in bucket [${initialIndex}].`);
        sound.playError();
      }
    } else {
      let i = 0;
      let found = false;
      const h2Val = hash2(key);

      while (i < tableSize) {
        const probeIdx = method === 'linear'
          ? (initialIndex + i) % tableSize
          : method === 'quadratic'
          ? (initialIndex + i * i) % tableSize
          : (initialIndex + i * h2Val) % tableSize;

        if (table[probeIdx] && table[probeIdx][0] === key) {
          setHighlightBucket(probeIdx);
          setMessage(`🎯 Found key ${key} at slot [${probeIdx}] after ${i + 1} probes!`);
          sound.playSuccess();
          found = true;
          break;
        }
        if (table[probeIdx].length === 0) break;
        i++;
      }

      if (!found) {
        setMessage(`Key ${key} does not exist in hash table.`);
        sound.playError();
      }
    }

    setSearchKey('');
  };

  const handleReset = () => {
    setTable(Array.from({ length: tableSize }, () => []));
    setHighlightBucket(null);
    setMessage('Hash table cleared.');
    sound.playClick();
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-cyan-400 flex items-center gap-2">
            <Hash className="w-6 h-6 text-cyan-400" />
            Interactive Hashing &amp; Collision Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observe modular mapping, collision triggers, Separate Chaining, Open Addressing (Linear &amp; Quadratic Probing, Double Hashing), and Rehashing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['chaining', 'linear', 'quadratic', 'double'].map(m => (
              <button
                key={m}
                onClick={() => { setMethod(m); handleReset(); }}
                className={`px-3 py-1 rounded-lg capitalize font-mono transition ${
                  method === m ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleRehash}
            className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-700 text-purple-300 text-xs font-mono font-bold flex items-center gap-1"
            title="Rehash & Double Table Size"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Rehash
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Table Size (m)</span>
          <span className="text-cyan-400 font-bold text-base">{tableSize}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Total Keys (n)</span>
          <span className="text-purple-400 font-bold text-base">{totalElements}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-slate-500 block text-[10px]">Load Factor (α = n/m)</span>
          <span className={`font-bold text-base ${parseFloat(loadFactor) > 0.75 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
            {loadFactor} {parseFloat(loadFactor) > 0.75 && '⚠️ (High)'}
          </span>
        </div>
      </div>

      {/* Hash Table Visual Buckets */}
      <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="overflow-x-auto">
          <div className="space-y-2.5 min-w-[320px]">
            {table.map((bucket, idx) => {
              const isHighlight = highlightBucket === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-300 ${
                    isHighlight
                      ? 'bg-cyan-950/50 border-cyan-500 shadow-neon-cyan'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 font-mono text-xs font-bold text-cyan-300 text-center">
                    [{idx}]
                  </div>

                  <span className="text-slate-500 font-mono text-xs">➔</span>

                  <div className="flex items-center gap-2 flex-wrap">
                    {bucket.length > 0 ? (
                      bucket.map((k, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="px-3 py-1 rounded-lg bg-cyan-600/20 border border-cyan-500/50 text-cyan-200 font-mono font-bold text-xs flex items-center gap-1.5"
                        >
                          <span>{k}</span>
                          {method === 'chaining' && itemIdx < bucket.length - 1 && (
                            <span className="text-slate-500 font-normal">➔</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600 text-xs font-mono">NULL (empty slot)</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {message}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={handleInsert} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex gap-2">
          <input
            type="number"
            placeholder="Key to Hash & Insert"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            required
          />
          <button type="submit" className="px-4 py-2 cyber-button-primary text-xs font-bold">
            Insert Key
          </button>
        </form>

        <form onSubmit={handleSearch} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex gap-2">
          <input
            type="number"
            placeholder="Search Key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            required
          />
          <button type="submit" className="px-4 py-2 cyber-button-secondary text-xs font-bold">
            Lookup (O(1))
          </button>
        </form>
      </div>
    </div>
  );
};
