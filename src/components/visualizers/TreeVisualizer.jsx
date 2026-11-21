import React, { useState } from 'react';
import { Network, Play, RotateCcw, Plus, Search, Trash2, Info, ArrowDown } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export const TreeVisualizer = ({ initialValues = [50, 30, 70, 20, 40, 60, 80], onMissionComplete }) => {
  const [treeValues, setTreeValues] = useState(initialValues);
  const [insertVal, setInsertVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [deleteVal, setDeleteVal] = useState('');
  const [activeNode, setActiveNode] = useState(null);
  const [traversalOutput, setTraversalOutput] = useState([]);
  const [activeTraversalName, setActiveTraversalName] = useState('');
  const [message, setMessage] = useState('Binary Search Tree: Left subtree values < Root < Right subtree values.');

  // Build BST tree object from flat array
  const buildTree = (values) => {
    if (values.length === 0) return null;
    let root = null;
    const insertNode = (node, val) => {
      if (!node) return new TreeNode(val);
      if (val < node.val) node.left = insertNode(node.left, val);
      else if (val > node.val) node.right = insertNode(node.right, val);
      return node;
    };
    values.forEach(v => { root = insertNode(root, v); });
    return root;
  };

  // Convert tree into visual levels with (x, y) coordinates for SVG
  const calculateCoordinates = (values) => {
    const root = buildTree(values);
    if (!root) return { nodes: [], edges: [] };

    const nodes = [];
    const edges = [];

    const assignCoords = (node, x, y, level, spread) => {
      if (!node) return;
      nodes.push({ val: node.val, x, y });

      if (node.left) {
        const nextX = x - spread;
        const nextY = y + 70;
        edges.push({ fromX: x, fromY: y, toX: nextX, toY: nextY });
        assignCoords(node.left, nextX, nextY, level + 1, spread / 1.8);
      }
      if (node.right) {
        const nextX = x + spread;
        const nextY = y + 70;
        edges.push({ fromX: x, fromY: y, toX: nextX, toY: nextY });
        assignCoords(node.right, nextX, nextY, level + 1, spread / 1.8);
      }
    };

    assignCoords(root, 300, 45, 1, 120);
    return { nodes, edges };
  };

  const { nodes: visualNodes, edges: visualEdges } = calculateCoordinates(treeValues);

  // BST Insert
  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(insertVal);
    if (isNaN(val)) return;
    if (treeValues.includes(val)) {
      setMessage(`Value ${val} already exists in BST! Duplicate keys not permitted.`);
      sound.playError();
      return;
    }

    const updated = [...treeValues, val];
    setTreeValues(updated);
    setActiveNode(val);
    setMessage(`Inserted ${val} into BST. Traversing left if < root, or right if > root until null slot found.`);
    sound.playSuccess();
    setInsertVal('');
    if (onMissionComplete) onMissionComplete();
  };

  // BST Search
  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchVal);
    if (isNaN(val)) return;

    sound.playClick();
    let current = buildTree(treeValues);
    const searchPath = [];

    while (current) {
      searchPath.push(current.val);
      if (val === current.val) break;
      else if (val < current.val) current = current.left;
      else current = current.right;
    }

    // Animate path
    searchPath.forEach((nodeVal, idx) => {
      setTimeout(() => {
        setActiveNode(nodeVal);
        sound.playClick();
        if (idx === searchPath.length - 1) {
          if (current) {
            setMessage(`🎯 BST Search: Target ${val} found! Search path: ${searchPath.join(' ➔ ')} in O(h) time.`);
            sound.playSuccess();
          } else {
            setMessage(`BST Search: Target ${val} does not exist in BST. Reached NULL leaf.`);
            sound.playError();
          }
        }
      }, idx * 400);
    });

    setSearchVal('');
  };

  // BST Delete
  const handleDelete = (e) => {
    e.preventDefault();
    const val = parseInt(deleteVal);
    if (isNaN(val) || !treeValues.includes(val)) {
      setMessage(`Cannot delete ${val}: not found in tree.`);
      sound.playError();
      return;
    }

    const updated = treeValues.filter(v => v !== val);
    setTreeValues(updated);
    setActiveNode(null);
    setMessage(`Deleted node ${val}. If node had 2 children, replaced with Inorder Successor; if 1 child, bypassed to child.`);
    sound.playClick();
    setDeleteVal('');
  };

  // Traversal Animations
  const runTraversal = (type) => {
    const root = buildTree(treeValues);
    if (!root) return;
    sound.playClick();

    const sequence = [];
    if (type === 'inorder') {
      const inorder = (n) => {
        if (!n) return;
        inorder(n.left);
        sequence.push(n.val);
        inorder(n.right);
      };
      inorder(root);
      setActiveTraversalName('Inorder (Left ➔ Root ➔ Right) [Always Sorted!]');
    } else if (type === 'preorder') {
      const preorder = (n) => {
        if (!n) return;
        sequence.push(n.val);
        preorder(n.left);
        preorder(n.right);
      };
      preorder(root);
      setActiveTraversalName('Preorder (Root ➔ Left ➔ Right)');
    } else if (type === 'postorder') {
      const postorder = (n) => {
        if (!n) return;
        postorder(n.left);
        postorder(n.right);
        sequence.push(n.val);
      };
      postorder(root);
      setActiveTraversalName('Postorder (Left ➔ Right ➔ Root)');
    } else if (type === 'levelorder') {
      const queue = [root];
      while (queue.length > 0) {
        const curr = queue.shift();
        sequence.push(curr.val);
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
      }
      setActiveTraversalName('Level-Order (Breadth-First Search BFS)');
    }

    setTraversalOutput([]);
    sequence.forEach((val, i) => {
      setTimeout(() => {
        setActiveNode(val);
        setTraversalOutput(prev => [...prev, val]);
        sound.playClick();
        if (i === sequence.length - 1) {
          sound.playSuccess();
          if (onMissionComplete) onMissionComplete();
        }
      }, i * 350);
    });
  };

  const handleReset = () => {
    setTreeValues(initialValues);
    setActiveNode(null);
    setTraversalOutput([]);
    setActiveTraversalName('');
    setMessage('Tree restored to standard balanced BST.');
    sound.playClick();
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-emerald-400 flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-400" />
            Interactive Binary Search Tree & Traversal Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Construct BSTs, watch real-time node insertions, deletions, and step through Inorder, Preorder, Postorder & Level-Order traversals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset Tree"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Traversal Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => runTraversal('inorder')}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-600/60 hover:bg-emerald-900 text-emerald-300 font-mono text-xs font-bold transition flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" /> Inorder (L-Root-R)
        </button>
        <button
          onClick={() => runTraversal('preorder')}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-600/60 hover:bg-cyan-900 text-cyan-300 font-mono text-xs font-bold transition flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" /> Preorder (Root-L-R)
        </button>
        <button
          onClick={() => runTraversal('postorder')}
          className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 border border-purple-600/60 hover:bg-purple-900 text-purple-300 font-mono text-xs font-bold transition flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" /> Postorder (L-R-Root)
        </button>
        <button
          onClick={() => runTraversal('levelorder')}
          className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600/60 hover:bg-amber-900 text-amber-300 font-mono text-xs font-bold transition flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5" /> Level-Order (BFS)
        </button>
      </div>

      {/* SVG Canvas for Tree */}
      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 relative overflow-x-auto min-h-[340px] flex flex-col items-center justify-center">
        <svg width="600" height="280" className="max-w-full">
          {/* Edges */}
          {visualEdges.map((edge, i) => (
            <line
              key={i}
              x1={edge.fromX}
              y1={edge.fromY}
              x2={edge.toX}
              y2={edge.toY}
              stroke="#334155"
              strokeWidth="2.5"
            />
          ))}

          {/* Nodes */}
          {visualNodes.map((n, i) => {
            const isHighlight = activeNode === n.val;
            return (
              <g key={i}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  fill={isHighlight ? '#059669' : '#0f172a'}
                  stroke={isHighlight ? '#34d399' : '#334155'}
                  strokeWidth={isHighlight ? '3.5' : '2'}
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
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Traversal Stream */}
        {activeTraversalName && (
          <div className="w-full mt-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
            <div className="text-[11px] font-mono font-bold text-slate-400 mb-1">
              {activeTraversalName}:
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
              {traversalOutput.map((val, idx) => (
                <span key={idx} className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {val} {idx < traversalOutput.length - 1 && <span className="text-slate-600">➔</span>}
                </span>
              ))}
              {traversalOutput.length === 0 && <span className="text-slate-500 text-xs">Traversing...</span>}
            </div>
          </div>
        )}

        {/* Message */}
        <div className="w-full mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {message}
          </p>
        </div>
      </div>

      {/* Control Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <form onSubmit={handleInsert} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Insert into BST
          </div>
          <input
            type="number"
            placeholder="Key value"
            value={insertVal}
            onChange={(e) => setInsertVal(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 outline-none"
            required
          />
          <button type="submit" className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition">
            Insert (O(log n))
          </button>
        </form>

        <form onSubmit={handleSearch} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> BST Search Path
          </div>
          <input
            type="number"
            placeholder="Search Target"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            required
          />
          <button type="submit" className="w-full py-1.5 cyber-button-primary text-xs">
            Trace Path (O(h))
          </button>
        </form>

        <form onSubmit={handleDelete} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <Trash2 className="w-3.5 h-3.5" /> Delete Node
          </div>
          <input
            type="number"
            placeholder="Node to delete"
            value={deleteVal}
            onChange={(e) => setDeleteVal(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-rose-500 outline-none"
            required
          />
          <button type="submit" className="w-full py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition">
            Remove Node
          </button>
        </form>
      </div>
    </div>
  );
};
