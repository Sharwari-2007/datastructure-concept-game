# ⚔️ DSA QUEST – Master the Logic, Conquer the Code

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Learn It. Play It. Master It."**

**DSA Quest** is a complete, interactive, responsive gamified educational platform built to help college students, beginners, and technical job seekers master Data Structures and Algorithms. Through 8 major thematic realms plus a bonus Algorithm Arena, step-by-step memory visualizers, arcade mini-games, university exam preparation (2M, 5M, 10M model answers), and FAANG interview simulations, DSA Quest transforms abstract computing logic into an engaging, playable RPG experience.

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

1. **World 1: Array Kingdom**
   - Contiguous memory allocation and zero-indexed arithmetic: $\text{Addr}(i) = \text{Base} + (i \times \text{Size})$.
   - $O(1)$ random access, insertion shift-right, and deletion compact-left.
   - 2D Row-Major vs Column-Major address calculations.
   - Trade-offs: Cache-locality advantages vs static size limitations.

2. **World 2: Linked List Land**
   - Node pointer mechanics (`data`, `next`, `prev`).
   - Singly, Doubly, and Circular Linked List architectures.
   - $O(1)$ prepend/head operations vs $O(n)$ search and traversal.
   - 3-Pointer in-place list reversal (`prev`, `curr`, `next`).

3. **World 3: Stack & Queue Dungeon**
   - LIFO Stack operations: Push, Pop, Peek, Overflow, and Underflow.
   - Infix-to-Postfix conversion using Dijkstra's Shunting-Yard algorithm.
   - Postfix expression evaluation using an operand stack.
   - FIFO Queue operations: Enqueue, Dequeue, and Circular Queue modulo wrapping: $\text{rear} = (\text{rear} + 1) \pmod m$.
   - Double-Ended Queues (Deque) supporting push/pop at both boundaries.

4. **World 4: Recursion & Backtracking**
   - Base conditions and recursive decomposition.
   - Call stack frame visualization and unwinding.
   - Tower of Hanoi recurrence: $T(n) = 2T(n-1) + 1 \Rightarrow O(2^n)$ with $2^n - 1$ optimal moves.
   - Backtracking and pruning in the N-Queens problem.

5. **World 5: Sorting Speedway**
   - Elementary $O(n^2)$ sorts: Bubble Sort, Selection Sort, and Insertion Sort.
   - Algorithmic stability and in-place sorting definitions.
   - Divide-and-conquer $O(n \log n)$ sorts: Merge Sort (split and merge) and Quick Sort (Lomuto partitioning).
   - Step-by-step swap counters, comparison metrics, and speed throttles.

6. **World 6: Searching & Hashing City**
   - Linear Search $O(n)$ vs Binary Search $O(\log n)$ with low/mid/high pointer tracking.
   - Hash functions: Division Modulo $h(k) = k \pmod m$.
   - Load factor analysis: $\alpha = n / m$.
   - Collision resolution: Separate Chaining (linked buckets) vs Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).

7. **World 7: Tree Forest**
   - Tree hierarchies: Root, Parent, Child, Leaf, Depth, and Height.
   - Binary Search Tree (BST) invariants (Left < Root $\le$ Right).
   - BST Insertions, Deletions (handling 0, 1, or 2 children via inorder successor), and Searches.
   - 4 Animated Traversals: Inorder (L-Root-R), Preorder (Root-L-R), Postorder (L-R-Root), and Level-Order BFS (Queue-based).

8. **World 8: Graph Galaxy**
   - Adjacency Matrices vs Adjacency Lists (density vs sparsity trade-offs).
   - Breadth-First Search (BFS) using FIFO Queues.
   - Depth-First Search (DFS) using LIFO Stacks / recursion.
   - Dijkstra's Single-Source Shortest Path algorithm with real-time distance relaxation table.
   - Prim's Minimum Spanning Tree (MST) cut property visualization.

9. **Bonus Arena: Algorithm Arena**
   - Asymptotic analysis: Big-O (Upper Bound), Big-$\Omega$ (Lower Bound), and Big-$\Theta$ (Tight Bound).
   - Two Pointers & Sliding Window linear-time optimizations ($O(n)$ vs $O(n^2)$).
   - Dynamic Programming: Top-Down Memoization vs Bottom-Up Tabulation for overlapping subproblems.

---

### 2. 🔬 8 Interactive Visualizers

Real interactive visualizers where you manipulate data structures and observe real-time algorithmic reactions:
- **Array Visualizer**: Insert & shift right, delete & compact left, linear search, binary search with low/mid/high pointers, $O(1)$ slot updates, and 2D row-major memory mapping.
- **Linked List Visualizer**: Singly, Doubly, and Circular views, insert at HEAD, insert at TAIL, delete nodes, and step-by-step 3-pointer list reversal.
- **Stack Visualizer**: Vertical tube frame with animated LIFO push, pop, peek, overflow alerts, Infix-to-Postfix conversion, and Postfix evaluation.
- **Queue Visualizer**: Linear & circular buffer with FRONT and REAR pointer tracking, modulo wrap-around, and Double-Ended Queue (Deque) operations.
- **Tree Visualizer**: BST node insertion, search path highlighting, deletion, and 4 animated traversals (Inorder, Preorder, Postorder, Level-Order).
- **Graph Visualizer**: Interactive weighted network with step-by-step BFS queue playback, DFS stack traversal, Dijkstra shortest path with distance relaxation table, and Prim's MST.
- **Sorting Visualizer**: Animated bar charts for Bubble, Selection, Insertion, Merge, and Quick Sort with comparisons, swaps, and speed controls.
- **Hashing Visualizer**: Division modulo hashing, Separate Chaining buckets, Linear Probing, Quadratic Probing, and Dynamic Rehashing when $\alpha > 0.75$.

---

### 3. 🕹️ 12 Playable Concept Mini-Games

Each mini-game reinforces core DSA principles through engaging arcade puzzles:
1. **Missing Memory Slot**: Deduce the missing contiguous array index.
2. **Pointer Repair**: Reconstruct broken linked list pointers to `NULL`.
3. **Dungeon Pressure Gate**: Push/pop blocks onto a LIFO stack to hit target weight.
4. **FIFO Customer Dispatch**: Process service queue requests in strict FIFO order.
5. **Bubble Speedway Swap Predictor**: Compare adjacent values and predict swap operations.
6. **Inorder Traversal Hunter**: Click nodes in L-Root-R order to generate sorted sequences.
7. **Dijkstra's Path Optimization**: Evaluate routes and choose the true shortest path.
8. **Hash Slot Hunter**: Calculate target modulo bucket index $k \pmod 7$.
9. **Tower of Hanoi 3-Peg Puzzle**: Solve the 3-disk recursive puzzle without placing larger disks on smaller ones.
10. **Big-O Speed Ranker**: Rank asymptotic complexities from lowest to highest cost.
11. **Fibonacci DP Table Builder**: Build bottom-up tabulation $dp[i] = dp[i-1] + dp[i-2]$.
12. **Sliding Window Maximum Sum**: Slide a $k=3$ window frame to locate maximum subarray sum.

---

### 4. 🎓 University Exam Arena

Built specifically to prepare students for college and semester exams:
- **Model Answers**: 2-Mark definitions, 5-Mark comparison tables, and 10-Mark comprehensive proofs.
- **Complete Code Snippets**: Production C and Python implementations with step-by-step dry-run trace tables and ASCII architecture diagrams.
- **5-Minute Timed Mock Exam**: Simulates formal semester examinations with instant grading, pass/fail thresholds, and XP rewards.

---

### 5. 💼 FAANG Technical Interview Arena

Simulate real coding interviews modeled after Google, Meta, Amazon, and Microsoft hiring loops:
- **5 Progressive Rounds**: Online Assessment, Data Structures, Algorithmic Problem Solving, Advanced Optimization, and System Design & Complexities.
- **Tier-1 Problem Sets**: Two Sum, Cycle Detection in Linked Lists, Longest Substring Without Repeating Characters, LRU Cache Design.
- **Progressive Hint System**: 3 tiers of hints that guide intuition without spoiling answers.
- **Optimal Solutions**: Complete code in C++ and Python with formal Time and Space Complexity proofs.

---

### 6. 💻 Multi-Language Code Lab

- Built-in coding environment for practicing classic interview challenges.
- Starter code templates in **JavaScript**, **Python 3**, **C**, and **Java**.
- Integrated test case runner validating outputs against expected test constraints.

---

### 7. 🧠 Smart Revision & Spaced Repetition

- **Weak Topics Diagnostic**: Dynamically calculates topic accuracy based on your quiz and mission performance.
- **Neuro-Spaced Repetition**: Automatic scheduling for Day 1, Day 3, Day 7, and Day 14 reviews.
- **One-Click Remediation**: Directly links to the corresponding world to practice struggling topics.

---

### 8. 🤖 ByteWise AI Learning Assistant

- Pedagogical DSA tutor modal available from every screen.
- Generates real-world analogies, step-by-step logic, edge case considerations, and intuition hints.

---

## 🛠️ Technology Stack

| Component | Technologies |
|---|---|
| **Framework & Build** | React 18, Vite |
| **Styling & UI** | Tailwind CSS, PostCSS, Autoprefixer, Custom Cyberpunk Palette |
| **Icons** | Lucide React |
| **Analytics & Charts** | Recharts (Mastery Radar & Progress Analytics) |
| **Celebrations** | Canvas Confetti |
| **Audio Synthesizer** | Zero-dependency Web Audio API Synthesizer |
| **Persistence** | HTML5 LocalStorage |

---

## 🚀 Getting Started

### 1. Launching the Development Server

```bash
# Clone the repository
git clone https://github.com/Sharwari-2007/dsa-quest.git

# Navigate to project directory
cd dsa-quest

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 2. Building for Production

```bash
npm run build
```

The optimized static production assets will be built into the `dist/` folder.

### 3. Previewing the Production Build

```bash
npm run preview
```

---

## 🏆 Gamification Mechanics

- **XP System**: Earn +20 XP for reading concepts, +25 XP for interactive missions, +15 XP for timed challenges, +50 XP for interview rounds, and +100 XP for passing mock exams.
- **Rank Titles**: Progress from *Byte Initiate* $\rightarrow$ *Code Squire* $\rightarrow$ *Algorithm Knight* $\rightarrow$ *Data Sorcerer* $\rightarrow$ *Logic Grandmaster* $\rightarrow$ *Cyber Demigod*.
- **Coins**: Earn coins to customize avatars, unlock hints, and claim daily rewards.
- **13 Badges**: Unlock Common, Rare, Epic, and Legendary achievements.
- **Daily Quests & Streaks**: Maintain active consecutive login streaks and complete daily missions.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
