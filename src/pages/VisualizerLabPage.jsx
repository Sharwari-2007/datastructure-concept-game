import React, { useState } from 'react';
import { Cpu, RotateCcw, Zap, Info } from 'lucide-react';
import { ArrayVisualizer } from '../components/visualizers/ArrayVisualizer';
import { LinkedListVisualizer } from '../components/visualizers/LinkedListVisualizer';
import { StackVisualizer } from '../components/visualizers/StackVisualizer';
import { QueueVisualizer } from '../components/visualizers/QueueVisualizer';
import { TreeVisualizer } from '../components/visualizers/TreeVisualizer';
import { GraphVisualizer } from '../components/visualizers/GraphVisualizer';
import { SortingVisualizer } from '../components/visualizers/SortingVisualizer';
import { HashingVisualizer } from '../components/visualizers/HashingVisualizer';
import { sound } from '../utils/soundEffects';

const VISUALIZERS = [
  { id: 'array', label: 'Array', desc: 'Contiguous memory, index arithmetic, shifts' },
  { id: 'linkedList', label: 'Linked List', desc: 'Dynamic heap nodes, pointer reversal' },
  { id: 'stack', label: 'Stack (LIFO)', desc: 'Push, pop, peek, top pointer, overflow' },
  { id: 'queue', label: 'Queue (FIFO)', desc: 'Enqueue, dequeue, circular buffer wrapping' },
  { id: 'tree', label: 'Binary Search Tree', desc: 'BST inserts, deletes, 4 traversals' },
  { id: 'graph', label: 'Graph', desc: 'BFS, DFS, Dijkstra single-source shortest path' },
  { id: 'sorting', label: 'Sorting Speedway', desc: 'Bubble, Selection, Insertion, Merge, Quick' },
  { id: 'hashing', label: 'Hash Table', desc: 'Modulo hashing, collisions, chaining, probing' }
];

export const VisualizerLabPage = () => {
  const [activeVisualizer, setActiveVisualizer] = useState('array');

  const handleSelect = (id) => {
    sound.playClick();
    setActiveVisualizer(id);
  };

  const renderActiveVisualizer = () => {
    switch (activeVisualizer) {
      case 'array': return <ArrayVisualizer />;
      case 'linkedList': return <LinkedListVisualizer />;
      case 'stack': return <StackVisualizer />;
      case 'queue': return <QueueVisualizer />;
      case 'tree': return <TreeVisualizer />;
      case 'graph': return <GraphVisualizer />;
      case 'sorting': return <SortingVisualizer />;
      case 'hashing': return <HashingVisualizer />;
      default: return <ArrayVisualizer />;
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <h2 className="text-3xl font-gaming font-extrabold text-white">
            DSA Visualizer Laboratory
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-slate-400">
          The ultimate algorithmic sandbox. Select any data structure below to step through actual memory mutations, comparisons, and algorithmic execution.
        </p>
      </div>

      {/* Visualizer Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {VISUALIZERS.map((v) => {
          const isActive = activeVisualizer === v.id;
          return (
            <button
              key={v.id}
              onClick={() => handleSelect(v.id)}
              className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-950/70 border-cyan-400 shadow-neon-cyan'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <span className={`text-xs font-mono font-bold block ${isActive ? 'text-cyan-300' : 'text-white'}`}>
                {v.label}
              </span>
              <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                {v.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Visualizer Container */}
      <div className="pt-2">
        {renderActiveVisualizer()}
      </div>
    </div>
  );
};
