import React, { useState } from 'react';
import { Share2, Play, RotateCcw, Info, Zap } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const GraphVisualizer = ({ onMissionComplete }) => {
  const defaultNodes = [
    { id: 0, label: '0 (Source)', x: 100, y: 140 },
    { id: 1, label: '1', x: 230, y: 60 },
    { id: 2, label: '2', x: 230, y: 220 },
    { id: 3, label: '3', x: 380, y: 60 },
    { id: 4, label: '4 (Dest)', x: 400, y: 220 },
  ];

  const defaultEdges = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 2 },
    { from: 2, to: 1, weight: 1 },
    { from: 1, to: 3, weight: 5 },
    { from: 2, to: 4, weight: 8 },
    { from: 1, to: 4, weight: 3 },
    { from: 3, to: 4, weight: 2 }
  ];

  const [nodes] = useState(defaultNodes);
  const [edges] = useState(defaultEdges);
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [queueState, setQueueState] = useState([]);
  const [distanceTable, setDistanceTable] = useState({});
  const [mstEdges, setMstEdges] = useState([]);
  const [mstTotalWeight, setMstTotalWeight] = useState(0);
  const [message, setMessage] = useState('Graph Galaxy: Explore BFS, DFS, Dijkstra shortest path, and Prim\'s Minimum Spanning Tree (MST).');
  const [activeAlgo, setActiveAlgo] = useState('');

  // 1. BFS Algorithm
  const runBFS = () => {
    sound.playClick();
    setActiveAlgo('BFS (Breadth-First Search)');
    setVisitedNodes([]);
    setDistanceTable({});
    setMstEdges([]);
    const visited = new Set();
    const queue = [0];
    visited.add(0);

    const steps = [];
    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => {
      adj[e.from].push(e.to);
      adj[e.to].push(e.from);
    });

    while (queue.length > 0) {
      const u = queue.shift();
      steps.push({ node: u, currentQueue: [...queue], explanation: `Dequeued Node ${u}. Visiting all unvisited neighbors.` });

      for (const v of adj[u]) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
          steps.push({
            node: v,
            edge: { from: u, to: v },
            currentQueue: [...queue],
            explanation: `Discovered neighbor Node ${v} from ${u}. Enqueued into FIFO Queue.`
          });
        }
      }
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveNode(step.node);
        if (step.edge) setActiveEdge(step.edge);
        setVisitedNodes(prev => Array.from(new Set([...prev, step.node])));
        setQueueState(step.currentQueue);
        setMessage(step.explanation);
        sound.playClick();
        if (idx === steps.length - 1) {
          sound.playSuccess();
          if (onMissionComplete) onMissionComplete();
        }
      }, idx * 600);
    });
  };

  // 2. DFS Algorithm
  const runDFS = () => {
    sound.playClick();
    setActiveAlgo('DFS (Depth-First Search)');
    setVisitedNodes([]);
    setDistanceTable({});
    setMstEdges([]);
    const visited = new Set();
    const steps = [];

    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => {
      adj[e.from].push(e.to);
      adj[e.to].push(e.from);
    });

    const dfs = (u, parent = null) => {
      visited.add(u);
      steps.push({ node: u, edge: parent !== null ? { from: parent, to: u } : null, explanation: `DFS: Diving deep into unvisited branch at Node ${u}.` });
      for (const v of adj[u]) {
        if (!visited.has(v)) {
          dfs(v, u);
        }
      }
    };

    dfs(0);

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveNode(step.node);
        if (step.edge) setActiveEdge(step.edge);
        setVisitedNodes(prev => Array.from(new Set([...prev, step.node])));
        setMessage(step.explanation);
        sound.playClick();
        if (idx === steps.length - 1) {
          sound.playSuccess();
          if (onMissionComplete) onMissionComplete();
        }
      }, idx * 600);
    });
  };

  // 3. Dijkstra Shortest Path Algorithm
  const runDijkstra = () => {
    sound.playClick();
    setActiveAlgo("Dijkstra's Shortest Path Algorithm");
    setVisitedNodes([]);
    setMstEdges([]);
    
    const dist = { 0: 0, 1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity };
    const visited = new Set();
    const steps = [];

    const adj = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => {
      adj[e.from].push({ node: e.to, weight: e.weight });
      adj[e.to].push({ node: e.from, weight: e.weight });
    });

    for (let count = 0; count < nodes.length; count++) {
      let u = -1;
      let minDist = Infinity;
      for (const n of nodes) {
        if (!visited.has(n.id) && dist[n.id] < minDist) {
          minDist = dist[n.id];
          u = n.id;
        }
      }

      if (u === -1) break;
      visited.add(u);
      steps.push({ node: u, distSnapshot: { ...dist }, explanation: `Greedy extraction: Picked unvisited Node ${u} with minimum distance ${dist[u]}.` });

      for (const edge of adj[u]) {
        const v = edge.node;
        const w = edge.weight;
        if (!visited.has(v) && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          steps.push({
            node: v,
            edge: { from: u, to: v },
            distSnapshot: { ...dist },
            explanation: `Relaxing edge (${u} ➔ ${v}, weight ${w}): New shortest distance to ${v} is ${dist[u]} + ${w} = ${dist[v]}.`
          });
        }
      }
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveNode(step.node);
        if (step.edge) setActiveEdge(step.edge);
        setVisitedNodes(prev => Array.from(new Set([...prev, step.node])));
        setDistanceTable(step.distSnapshot);
        setMessage(step.explanation);
        sound.playClick();
        if (idx === steps.length - 1) {
          sound.playSuccess();
          if (onMissionComplete) onMissionComplete();
        }
      }, idx * 700);
    });
  };

  // 4. Prim's Minimum Spanning Tree (MST) Algorithm
  const runPrimMST = () => {
    sound.playClick();
    setActiveAlgo("Prim's Minimum Spanning Tree (MST)");
    setVisitedNodes([]);
    setDistanceTable({});
    
    const inMST = new Set([0]);
    const chosenEdges = [];
    let totalWeight = 0;
    const steps = [];

    while (inMST.size < nodes.length) {
      let minEdge = null;
      let minW = Infinity;

      for (let e of edges) {
        const uIn = inMST.has(e.from);
        const vIn = inMST.has(e.to);
        if ((uIn && !vIn) || (!uIn && vIn)) {
          if (e.weight < minW) {
            minW = e.weight;
            minEdge = e;
          }
        }
      }

      if (minEdge) {
        const nextNode = inMST.has(minEdge.from) ? minEdge.to : minEdge.from;
        inMST.add(nextNode);
        chosenEdges.push(minEdge);
        totalWeight += minEdge.weight;
        steps.push({
          node: nextNode,
          edge: minEdge,
          edgesList: [...chosenEdges],
          totalW: totalWeight,
          explanation: `Prim's MST: Greedy pick edge (${minEdge.from} ➔ ${minEdge.to}, weight ${minEdge.weight}). Added Node ${nextNode} to Spanning Tree.`
        });
      } else {
        break;
      }
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveNode(step.node);
        setActiveEdge(step.edge);
        setMstEdges(step.edgesList);
        setMstTotalWeight(step.totalW);
        setVisitedNodes(prev => Array.from(new Set([...prev, step.node])));
        setMessage(step.explanation);
        sound.playClick();
        if (idx === steps.length - 1) {
          sound.playSuccess();
          if (onMissionComplete) onMissionComplete();
        }
      }, idx * 750);
    });
  };

  const handleReset = () => {
    setActiveNode(null);
    setActiveEdge(null);
    setVisitedNodes([]);
    setQueueState([]);
    setDistanceTable({});
    setMstEdges([]);
    setMstTotalWeight(0);
    setActiveAlgo('');
    setMessage('Graph reset.');
    sound.playClick();
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-cyan-400 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyan-400" />
            Interactive Graph &amp; Network Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate BFS (Queue), DFS (Stack), Dijkstra Shortest Path, and Prim's Minimum Spanning Tree (MST).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Algorithm Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={runBFS}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/60 hover:bg-cyan-900 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <Play className="w-3.5 h-3.5" /> BFS (Queue)
        </button>
        <button
          onClick={runDFS}
          className="px-3.5 py-1.5 rounded-xl bg-purple-950 border border-purple-500/60 hover:bg-purple-900 text-purple-300 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <Play className="w-3.5 h-3.5" /> DFS (Stack)
        </button>
        <button
          onClick={runDijkstra}
          className="px-3.5 py-1.5 rounded-xl bg-amber-950 border border-amber-500/60 hover:bg-amber-900 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <Play className="w-3.5 h-3.5" /> Dijkstra Shortest Path
        </button>
        <button
          onClick={runPrimMST}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/60 hover:bg-emerald-900 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <Zap className="w-3.5 h-3.5" /> Prim's MST
        </button>
      </div>

      {/* SVG Canvas for Graph */}
      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
        <svg width="520" height="280" className="max-w-full">
          {/* Edges */}
          {edges.map((e, idx) => {
            const fromNode = nodes.find(n => n.id === e.from);
            const toNode = nodes.find(n => n.id === e.to);
            const isMST = mstEdges.some(me => (me.from === e.from && me.to === e.to) || (me.from === e.to && me.to === e.from));
            const isHighlight = activeEdge && (
              (activeEdge.from === e.from && activeEdge.to === e.to) ||
              (activeEdge.from === e.to && activeEdge.to === e.from)
            );
            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isMST ? '#10b981' : isHighlight ? '#06b6d4' : '#334155'}
                  strokeWidth={isMST ? '4.5' : isHighlight ? '4' : '2'}
                  className="transition-all duration-300"
                />
                <circle
                  cx={(fromNode.x + toNode.x) / 2}
                  cy={(fromNode.y + toNode.y) / 2}
                  r="10"
                  fill="#090d16"
                  stroke={isMST ? '#10b981' : '#475569'}
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 + 3}
                  textAnchor="middle"
                  fill={isMST ? '#34d399' : '#e2e8f0'}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {e.weight}
                </text>
              </g>
            );
          })}

          {/* Vertices */}
          {nodes.map(n => {
            const isCurrent = activeNode === n.id;
            const isVisited = visitedNodes.includes(n.id);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="24"
                  fill={isCurrent ? '#06b6d4' : isVisited ? '#1e3a8a' : '#0f172a'}
                  stroke={isCurrent ? '#67e8f9' : isVisited ? '#3b82f6' : '#475569'}
                  strokeWidth={isCurrent ? '3.5' : '2'}
                  className="transition-all duration-300"
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Distance Table (for Dijkstra) */}
        {Object.keys(distanceTable).length > 0 && (
          <div className="w-full mt-4 p-3 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="text-xs font-mono font-bold text-amber-400 mb-2">
              Dijkstra Shortest Distances from Node 0:
            </div>
            <div className="grid grid-cols-5 gap-2 text-center font-mono text-xs">
              {nodes.map(n => (
                <div key={n.id} className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block">Node {n.id}</span>
                  <span className="text-amber-300 font-bold text-sm">
                    {distanceTable[n.id] === Infinity ? '∞' : distanceTable[n.id]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live MST Weight */}
        {mstEdges.length > 0 && (
          <div className="w-full mt-4 p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-300 font-bold">Minimum Spanning Tree Complete:</span>
            <span className="text-white font-bold">Total Weight = {mstTotalWeight} ({mstEdges.length} Edges)</span>
          </div>
        )}

        {/* Live Queue state if BFS */}
        {queueState.length > 0 && (
          <div className="w-full mt-3 p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-mono">
            <span className="text-cyan-400 font-bold">BFS FIFO Queue:</span>
            <div className="flex gap-1.5">
              {queueState.map((id, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-200">
                  {id}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Message */}
        <div className="w-full mt-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
