import React, { useState } from 'react';
import { BookOpen, Search, Code2, Clock, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { WORLDS } from '../data/worldsData';
import { sound } from '../utils/soundEffects';

export const LearnHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorld, setSelectedWorld] = useState('all');
  const [expandedLevel, setExpandedLevel] = useState('arr-lvl-1');

  const filteredWorlds = WORLDS.filter(w => selectedWorld === 'all' || w.id === selectedWorld);

  const toggleExpand = (lvlId) => {
    sound.playClick();
    setExpandedLevel(expandedLevel === lvlId ? null : lvlId);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold uppercase">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Complete DSA Syllabus Library
        </div>
        <h2 className="text-3xl sm:text-4xl font-gaming font-extrabold text-white">
          Theoretical Mastery &amp; Deep Concepts
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-xl mx-auto">
          Comprehensive curriculum covering all 8 major data structures, complexity proofs, and implementation guides.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search concepts (e.g. Inorder, Binary Search, Quick Sort, Hash collisions...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono text-white focus:border-cyan-500 outline-none"
          />
        </div>

        <select
          value={selectedWorld}
          onChange={(e) => { sound.playClick(); setSelectedWorld(e.target.value); }}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-bold outline-none"
        >
          <option value="all">All Realms (8 Worlds)</option>
          {WORLDS.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-6">
        {filteredWorlds.map(world => (
          <div key={world.id} className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                {world.tag}
              </span>
              <h3 className="font-gaming font-bold text-xl text-white">
                {world.name}
              </h3>
            </div>

            <div className="space-y-3">
              {world.levels
                .filter(lvl => !searchQuery || lvl.title.toLowerCase().includes(searchQuery.toLowerCase()) || lvl.summary.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(lvl => {
                  const isExpanded = expandedLevel === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleExpand(lvl.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-800/40 transition"
                      >
                        <div>
                          <span className="text-[11px] font-mono font-bold text-cyan-400 block mb-0.5">
                            {lvl.topic}
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {lvl.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                            {isExpanded ? 'Collapse' : 'Expand'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-5 sm:p-6 bg-slate-950/60 border-t border-slate-800/80 space-y-4 font-mono text-xs">
                          {/* Summary */}
                          <p className="text-slate-300 leading-relaxed font-sans text-sm">
                            {lvl.summary}
                          </p>

                          {/* Key Points */}
                          <div className="space-y-1.5">
                            <span className="font-bold text-cyan-400 block text-xs uppercase">
                              Core Points &amp; Mechanics:
                            </span>
                            {lvl.keyPoints.map((pt, i) => (
                              <div key={i} className="flex items-start gap-2 text-slate-300">
                                <span className="text-cyan-400">✓</span>
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>

                          {/* Complexities Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                            {Object.entries(lvl.timeComplexity).map(([key, val]) => (
                              <div key={key} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-slate-500 text-[10px] block capitalize">{key}</span>
                                <span className="text-amber-300 font-bold">{val}</span>
                              </div>
                            ))}
                            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-500 text-[10px] block">Space Complexity</span>
                              <span className="text-purple-300 font-bold">{lvl.spaceComplexity}</span>
                            </div>
                          </div>

                          {/* Real-World Analogy */}
                          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-purple-200">
                            <span className="font-bold text-purple-300 block mb-1">💡 Real-Life Analogy:</span>
                            <span className="font-sans text-xs text-slate-300">{lvl.realLifeAnalogy}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
