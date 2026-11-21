# ⚔️ DSA QUEST – Master the Logic, Conquer the Code

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Learn It. Play It. Master It."**

**DSA Quest** is a complete, interactive, responsive gamified educational platform built to help college students, beginners, and technical job seekers master Data Structures and Algorithms. Through 8 major thematic realms, step-by-step memory visualizers, arcade mini-games, university exam preparation (2M, 5M, 10M model answers), and FAANG interview simulations, DSA Quest transforms abstract computing logic into an engaging, playable RPG experience.

---

## 📸 Platform Architecture & Key Systems

```
DSA QUEST APPLICATION
├── 🎮 Game Engine & State (GameContext)
│   ├── Reactive XP, Coins, Rank Titles & 13 Badges
│   ├── Level Progression & Unlocked Worlds
│   ├── Daily Quests & Streaks
│   └── HTML5 LocalStorage Persistence
│
├── 🗺️ Adventure Realms (8 Major Worlds + Algorithm Arena)
│   ├── Array Kingdom (Contiguous Memory, 2D Row-Major Layouts)
│   ├── Linked List Land (Singly, Doubly, Circular, In-Place Reversal)
│   ├── Stack & Queue Dungeon (LIFO / FIFO, Infix-to-Postfix, Modulo Wrapping)
│   ├── Recursion & Backtracking (Call Stack Frames, Tower of Hanoi, N-Queens)
│   ├── Sorting Speedway (Bubble, Selection, Insertion, Merge, Quick Sort)
│   ├── Searching & Hashing City (Binary Search Halving, Open Addressing, Chaining)
│   ├── Tree Forest (Binary Search Trees, Inorder, Preorder, Postorder, BFS)
│   ├── Graph Galaxy (Weighted Networks, BFS, DFS, Dijkstra, Prim's MST)
│   └── Algorithm Arena (Asymptotic Big-O, Two Pointers, Sliding Window, DP)
│
├── 🔬 Interactive Visualizers (Step-by-Step State Machines)
│   ├── Memory Pointer Highlighting (Head, Tail, Top, Front, Rear, Pivot)
│   ├── Comparison & Swap Counters
│   └── Live Mathematical Formula Displays
│
├── 🕹️ Mini-Game Arcade (12 Playable Concept Mini-Games)
│   ├── Missing Memory Slot & Pointer Connector
│   ├── Pressure Gate Weight Sum & FIFO Customer Dispatch
│   ├── Bubble Swap Predictor & Tree Inorder Traversal Hunter
│   ├── Dijkstra Path Optimizer & Hash Slot Calculator
│   ├── Tower of Hanoi 3-Peg Puzzle & Big-O Speed Ranker
│   └── Fibonacci DP Tabulation Builder & Sliding Window Max Sum
│
├── 🎓 Academic & Career Arenas
│   ├── University Exam Arena (2M, 5M, 10M Model Answers + Timed Mock Exam)
│   ├── FAANG Technical Interview Arena (5 Simulated Rounds with Hints)
│   ├── Code Lab (JavaScript, Python 3, Java, C Runner with Test Cases)
│   └── Smart Revision Center (Neuro-Spaced Repetition Days 1, 3, 7, 14)
│
└── 🤖 ByteWise AI Tutor (Real-Life Analogies, Intuition, and Hint Generation)
```

---

## 🌟 Detailed Feature Breakdown

### 1. 🗺️ The 8 Major DSA Worlds + Algorithm Arena
- **World 1: Array Kingdom** – Contiguous memory allocation, random access $O(1)$, element shifting on insertion/deletion, array traversal, and 2D row-major addressing $\text{Addr}(i, j) = \text{Base} + (i \times C + j) \times \text{Size}$.
- **World 2: Linked List Land** – Node pointers, Singly, Doubly, and Circular Linked Lists, $O(1)$ head insertions, $O(n)$ traversals, and 3-pointer in-place reversal (`prev`, `curr`, `next`).
- **World 3: Stack & Queue Dungeon** – LIFO stacks, push/pop/peek operations, stack overflow/underflow, Infix-to-Postfix conversion (Dijkstra's Shunting-Yard algorithm), postfix expression evaluation, FIFO queues, circular modulo wrapping $(rear+1)\%m$, and Double-Ended Queues (Deques).
- **World 4: Recursion & Backtracking** – Base conditions, call stack frame unwinding, exponential recurrence $T(n) = 2T(n-1) + 1$, Tower of Hanoi puzzle, and N-Queens constraint pruning.
- **World 5: Sorting Speedway** – Elementary sorts ($O(n^2)$ Bubble, Selection, Insertion) vs divide-and-conquer ($O(n \log n)$ Merge Sort and Quick Sort with Lomuto partitioning).
- **World 6: Searching & Hashing City** – Binary search interval halving, hash functions, load factor ($\alpha = n/m$), Separate Chaining, and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).
- **World 7: Tree Forest** – Binary tree terminology, Binary Search Tree (BST) property, search, insert, delete, and animated Inorder (sorted), Preorder, Postorder, and Level-Order traversals.
- **World 8: Graph Galaxy** – Adjacency matrix vs adjacency list, Breadth-First Search (Queue), Depth-First Search (Stack), Dijkstra's Shortest Path with real-time distance relaxation, and Prim's Minimum Spanning Tree.
- **Bonus World: Algorithm Arena** – Asymptotic notations (Big-O upper bound, Big-$\Omega$ lower bound, Big-$\Theta$ tight bound), Dynamic Programming (Top-Down Memoization vs Bottom-Up Tabulation), Two Pointers, and Sliding Window optimization ($O(n)$ vs $O(n^2)$).

---

### 2. 🔬 Interactive Data Structure Visualizers
Real algorithmic state machines where every operation mutates real underlying state:
- **Array Visualizer**: Insert and shift right, delete and compact left, linear search, binary search with active `low`/`mid`/`high` bounds, and direct index overwrite.
- **Linked List Visualizer**: Singly, Doubly, and Circular views, insert at Head, insert at Tail, insert at Position $k$, and step-by-step list reversal.
- **Stack Visualizer**: Vertical tube frame with animated push, pop, peek, top pointer tracking, overflow/underflow alerts, and Infix-to-Postfix conversion.
- **Queue Visualizer**: Circular queue with modulo arithmetic index wrap-around and Deque insert/delete at both ends.
- **Tree Visualizer**: Binary Search Tree with search path tracing, node deletion, and live traversal highlighting.
- **Graph Visualizer**: Interactive network with BFS, DFS, Dijkstra single-source shortest paths, and Prim's MST.
- **Sorting Visualizer**: Bar height visualizations with live comparison & swap metrics, play/pause controls, and $1\times/2\times/4\times$ speed options.
- **Hashing Visualizer**: Division hash function, collision triggers, Separate Chaining linked lists, Linear Probing, Quadratic Probing, and Dynamic Rehashing when $\alpha > 0.75$.

---

### 3. 🕹️ Concept Mini-Games & Puzzles
1. **The Missing Memory Slot**: Calculate missing values in contiguous memory slots.
2. **Pointer Repair**: Reassemble detached nodes into a valid null-terminated linked list.
3. **Pressure Gate**: Push and pop weights on a LIFO stack to balance the dungeon lock to 15.
4. **FIFO Customer Dispatch**: Dequeue incoming buffer requests in strict arrival sequence.
5. **Bubble Speedway Swap Predictor**: Compare adjacent elements and predict order swaps.
6. **Inorder Traversal Hunter**: Click binary tree nodes in L-Root-R sequence to output sorted values.
7. **Dijkstra Path Optimization**: Compare routes and calculate greedy edge relaxations.
8. **Hash Slot Hunter**: Compute bucket indices via $k \pmod 7$.
9. **Tower of Hanoi 3-Peg Puzzle**: Transfer 3 disks from Peg A to Peg C in 7 optimal moves without placing larger disks on smaller disks.
10. **Big-O Speed Ranker**: Rank asymptotic complexities from fastest to slowest growth rates.
11. **Fibonacci DP Tabulation**: Build $dp[i] = dp[i-1] + dp[i-2]$ in $O(n)$ linear time.
12. **Sliding Window Maximum Sum**: Slide a $k=3$ window frame across an array to locate the maximum sum subarray.

---

### 4. 🎓 University Exam Arena
- **Model Answers**: 2-Mark short definitions, 5-Mark differences & algorithms, and 10-Mark proofs with C/Python implementations, dry-run trace tables, and grading schemes.
- **Timed Mock Exam**: 5-minute timed exam with 5 curriculum questions, instant score calculation, celebration effects, and XP rewards.

---

### 5. 💼 FAANG Technical Interview Arena
- **5 Progressive Rounds**:
  - Round 1: Online Assessment Screening
  - Round 2: Core Data Structure Fluency
  - Round 3: Algorithmic Problem Solving
  - Round 4: Advanced Optimization & Trade-Offs
  - Round 5: System Design & Complexity Analysis
- **Progressive Hints**: Tiered hints without spoiling answers, full optimal C++ / Python code, and Big-O proofs.

---

### 6. 💻 Multi-Language Code Lab
- Integrated problem editor for classic algorithmic challenges (Two Sum, Valid Parentheses, Reverse Linked List, Binary Search, Climbing Stairs).
- Multi-language starter code: **JavaScript**, **Python 3**, **Java**, and **C**.
- Interactive test runner checking input/output test cases.

---

### 7. 🧠 Smart Revision Center
- **Weak Topics Diagnostic**: Calculates live percentage accuracy from quiz attempts.
- **Neuro-Spaced Repetition Schedule**: Automated reminders for Day 1, Day 3, Day 7, and Day 14.
- **One-Click Remediation**: Direct links to jump back to targeted worlds.

---

### 8. 📱 Mobile Responsive Gaming UI
- Desktop left sidebar navigation with 12 distinct terminals.
- Mobile bottom navigation bar + full slide-up drawer for accessing all 12 modules on smartphones and tablets.
- Zero external audio assets: Web Audio API Synthesizer generating real-time clicks, coins, level-ups, successes, and error alerts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18, Vite |
| **Styling & Theme** | Tailwind CSS, PostCSS, Autoprefixer, Custom Cyberpunk Theme |
| **Icons & Media** | Lucide React |
| **Charts & Analytics** | Recharts (Mastery Radar & Progression Analytics) |
| **Visual Celebrations** | Canvas Confetti |
| **Sound Synthesis** | Zero-dependency Web Audio API Synthesizer |
| **Persistence** | HTML5 LocalStorage |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sharwari-2007/dsa-quest.git

# Navigate to project directory
cd dsa-quest

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The game will launch on **[http://localhost:5173/](http://localhost:5173/)**.

### Production Build

```bash
# Compile and bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 🏆 Gamification Mechanics

- **XP System**: Earn +20 XP for reading concepts, +25 XP for solving interactive missions, +15 XP for timed challenges, +50 XP for interview rounds, and +100 XP for passing mock exams.
- **Rank Titles**: Progress from *Byte Initiate* $\rightarrow$ *Code Squire* $\rightarrow$ *Algorithm Knight* $\rightarrow$ *Data Sorcerer* $\rightarrow$ *Logic Grandmaster* $\rightarrow$ *Cyber Demigod*.
- **Coins**: Earn coins to unlock hints, customize avatar skins, and claim daily rewards.
- **13 Badges**: Collect Common, Rare, Epic, and Legendary achievements.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
