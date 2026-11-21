export const WORLDS = [
  {
    id: 'array-kingdom',
    name: 'Array Kingdom',
    tag: 'WORLD 1',
    subtitle: 'The Monolithic Bastion of Contiguous Memory',
    icon: 'LayoutGrid',
    color: 'cyan',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/40',
    description: 'Learn the bedrock of all data structures. Master continuous memory allocation, direct indexing, traversal, dynamic insertion, and deletion.',
    visualizerType: 'array',
    levels: [
      {
        id: 'arr-lvl-1',
        title: 'Contiguous Memory & Direct Indexing',
        topic: '1D Arrays & Memory Mapping',
        summary: 'An array stores elements of the same data type in contiguous memory locations. Because memory addresses are sequential, any element can be accessed in O(1) time using Base Address + (Index * Element Size).',
        keyPoints: [
          'Zero-based indexing: First element is at index 0, last is at index n-1.',
          'Constant time O(1) random access: Direct calculation of memory address.',
          'Fixed size in static languages: Size must be defined at allocation.',
          'Cache-friendly: Contiguous storage optimizes CPU L1/L2 cache prefetching.'
        ],
        timeComplexity: { access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)' },
        spaceComplexity: 'O(n)',
        realLifeAnalogy: 'Think of numbered lockers in a gym in a straight row. Locker 0 is right at the start. If each locker is 1 foot wide, you can walk straight to locker 5 in one step without checking 0 to 4!',
        interactiveMission: {
          objective: 'Access element at index 3 in the array [12, 45, 78, 99, 23]',
          initialData: [12, 45, 78, 99, 23],
          targetOperation: 'search',
          targetValue: 99,
          hint: 'Enter 99 in the search input or locate index 3!'
        },
        miniGameType: 'array-missing',
        quiz: [
          {
            id: 'arr-q1',
            type: 'mcq',
            question: 'What is the time complexity to access the 500th element in an array of size 10,000?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
            correctIndex: 1,
            explanation: 'Arrays store data contiguously. Any element can be fetched in constant time O(1) using its index without scanning preceding elements.'
          },
          {
            id: 'arr-q2',
            type: 'mcq',
            question: 'If Base Address is 2000 and integer size is 4 bytes, what is the address of Arr[4]?',
            options: ['2004', '2016', '2020', '2008'],
            correctIndex: 1,
            explanation: 'Address = Base + (Index * Size) = 2000 + (4 * 4) = 2000 + 16 = 2016.'
          }
        ]
      },
      {
        id: 'arr-lvl-2',
        title: 'Insertion & Element Shifting',
        topic: 'Dynamic Array Mutations',
        summary: 'Inserting an element in the middle or beginning of an array requires shifting all subsequent elements one position to the right to create an empty slot.',
        keyPoints: [
          'Inserting at the end takes O(1) if capacity is available.',
          'Inserting at the beginning takes O(n) because all n items must shift right.',
          'Inserting at index k requires shifting (n - k) elements.',
          'Dynamic arrays (like Java ArrayList, Python List, C++ vector) double their capacity when full, achieving amortized O(1) appends.'
        ],
        timeComplexity: { best: 'O(1) [at end]', worst: 'O(n) [at index 0]' },
        spaceComplexity: 'O(1) auxiliary',
        realLifeAnalogy: 'People sitting in a crowded movie theater row. If a friend arrives and wants to sit at seat 1, everyone in the row has to scoot one seat to the right!',
        interactiveMission: {
          objective: 'Insert value 55 at index 2 in array [10, 20, 30, 40]',
          initialData: [10, 20, 30, 40],
          targetOperation: 'insert',
          targetIndex: 2,
          targetValue: 55,
          hint: 'Use the Insert panel, set Index to 2, and Value to 55.'
        },
        miniGameType: 'array-order',
        quiz: [
          {
            id: 'arr-q3',
            type: 'mcq',
            question: 'What is the worst-case number of shifts when inserting into an array of size n?',
            options: ['0', '1', 'n', 'n/2'],
            correctIndex: 2,
            explanation: 'Inserting at the very beginning (index 0) requires shifting all n existing elements one position to the right.'
          }
        ]
      },
      {
        id: 'arr-lvl-3',
        title: 'Deletion & Two-Dimensional Arrays',
        topic: 'Matrix Storage & Deletion Mechanics',
        summary: 'Deleting an element leaves a hole that must be closed by shifting all trailing elements left. In 2D arrays, elements are mapped to 1D physical RAM using Row-Major or Column-Major order.',
        keyPoints: [
          'Deleting at index k shifts (n - k - 1) items to the left: O(n) worst case.',
          'Row-Major Order: Element at (i, j) = Base + (i * cols + j) * size.',
          'Column-Major Order: Element at (i, j) = Base + (j * rows + i) * size.',
          'C/C++, Java, and Python use Row-Major order; Fortran and MATLAB use Column-Major.'
        ],
        timeComplexity: { deletion: 'O(n)', matrixAccess: 'O(1)' },
        spaceComplexity: 'O(rows * cols)',
        realLifeAnalogy: 'A student leaving a waiting line: everyone behind that student takes one step forward to close the gap.',
        interactiveMission: {
          objective: 'Delete element at index 1 from [10, 88, 30, 40]',
          initialData: [10, 88, 30, 40],
          targetOperation: 'delete',
          targetIndex: 1,
          hint: 'Select Delete operation and input Index 1.'
        },
        miniGameType: 'array-hunter',
        quiz: [
          {
            id: 'arr-q4',
            type: 'mcq',
            question: 'In a 2D array Arr[3][4] stored in Row-Major order, which element comes immediately after Arr[1][3] in memory?',
            options: ['Arr[1][4]', 'Arr[2][0]', 'Arr[2][3]', 'Arr[0][0]'],
            correctIndex: 1,
            explanation: 'With 4 columns (indices 0 to 3), Arr[1][3] is the last element of row 1. The next element is Arr[2][0] (first element of row 2).'
          }
        ]
      }
    ]
  },
  {
    id: 'linked-list-land',
    name: 'Linked List Land',
    tag: 'WORLD 2',
    subtitle: 'The Realm of Dynamic Pointers and Flexible Chains',
    icon: 'GitCommit',
    color: 'emerald',
    accentColor: '#10b981',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/40',
    description: 'Break free from fixed contiguous memory! Traverse node references, construct Singly, Doubly, and Circular Linked Lists, and master the 3-pointer list reversal technique.',
    visualizerType: 'linkedList',
    levels: [
      {
        id: 'll-lvl-1',
        title: 'Node Anatomy & Singly Linked Lists',
        topic: 'Nodes, Data and Next References',
        summary: 'A Singly Linked List is a linear collection of data nodes where each node contains two fields: Data and a Pointer (Next) pointing to the address of the subsequent node. The chain begins at HEAD and ends with a pointer to NULL.',
        keyPoints: [
          'Non-contiguous memory allocation: Nodes reside anywhere in the heap.',
          'Insertion at HEAD takes O(1) without shifting any elements!',
          'No random access: Must traverse sequentially from HEAD, taking O(n).',
          'Memory overhead: Extra pointer field for each element.'
        ],
        timeComplexity: { insertHead: 'O(1)', insertTail: 'O(n) [or O(1) with tail ptr]', search: 'O(n)', deleteHead: 'O(1)' },
        spaceComplexity: 'O(n) with 1 pointer per node',
        realLifeAnalogy: 'A scavenger hunt where each clue written on a piece of paper tells you where the next clue is hidden anywhere in town!',
        interactiveMission: {
          objective: 'Insert a new node with value 42 at the Head of the list',
          initialData: [10, 20, 30],
          targetOperation: 'insertHead',
          targetValue: 42,
          hint: 'Select "Insert at Beginning" and enter 42.'
        },
        miniGameType: 'll-connect',
        quiz: [
          {
            id: 'll-q1',
            type: 'mcq',
            question: 'What is the time complexity to insert a node at the beginning of a singly linked list with a known HEAD?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
            correctIndex: 1,
            explanation: 'Just set newNode.next = head; head = newNode. This takes constant time O(1) with no shifting required.'
          }
        ]
      },
      {
        id: 'll-lvl-2',
        title: 'Doubly & Circular Linked Lists',
        topic: 'Bidirectional Links & Infinite Loops',
        summary: 'A Doubly Linked List has two pointers per node: Next and Prev, allowing bidirectional traversal and O(1) deletion given a node pointer. A Circular Linked List links the last node back to HEAD.',
        keyPoints: [
          'Doubly Linked List allows O(1) deletion if the node pointer is already known.',
          'Circular Linked List has no NULL pointer; useful for Round-Robin OS task scheduling and media playlists.',
          'Higher memory usage: Doubly linked list needs 2 pointers per node.',
          'Boundary hazards: Circular lists require careful termination conditions to avoid infinite loops.'
        ],
        timeComplexity: { traverseBothWays: 'O(n)', deleteGivenNode: 'O(1) in DLL' },
        spaceComplexity: 'O(n) with 2 pointers per node',
        realLifeAnalogy: 'A train where cars are hooked in front and behind. You can walk forwards towards the engine or backwards towards the caboose!',
        interactiveMission: {
          objective: 'Insert 99 at the end of the list and inspect bidirectional pointers',
          initialData: [5, 15, 25],
          targetOperation: 'insertTail',
          targetValue: 99,
          hint: 'Click "Insert at End" and enter 99.'
        },
        miniGameType: 'll-middle',
        quiz: [
          {
            id: 'll-q2',
            type: 'mcq',
            question: 'What is a major advantage of a Circular Linked List over a standard Singly Linked List?',
            options: ['Random O(1) access', 'Any node can be a starting point for full traversal', 'Requires less memory', 'Faster binary search'],
            correctIndex: 1,
            explanation: 'Since the tail points back to the head, starting at any arbitrary node allows you to visit all nodes in the cycle.'
          }
        ]
      },
      {
        id: 'll-lvl-3',
        title: 'Reversing a Linked List',
        topic: 'The 3-Pointer Iterative Algorithm',
        summary: 'Reversing a singly linked list in-place in O(n) time and O(1) space requires three tracking pointers: prev (initialized to null), curr (initialized to head), and next.',
        keyPoints: [
          'Save next: next = curr.next;',
          'Reverse pointer: curr.next = prev;',
          'Advance prev: prev = curr;',
          'Advance curr: curr = next;',
          'Update head: head = prev when curr becomes null.'
        ],
        timeComplexity: { time: 'O(n)', space: 'O(1) in-place' },
        spaceComplexity: 'O(1)',
        realLifeAnalogy: 'A line of people holding shoulders of the person ahead of them. In order, everyone lets go, turns around 180 degrees, and grabs the shoulders of the person who was behind them!',
        interactiveMission: {
          objective: 'Reverse the linked list [10 -> 20 -> 30 -> 40]',
          initialData: [10, 20, 30, 40],
          targetOperation: 'reverse',
          hint: 'Click the "Reverse List" button in the visualizer.'
        },
        miniGameType: 'll-repair',
        quiz: [
          {
            id: 'll-q3',
            type: 'mcq',
            question: 'In the 3-pointer list reversal algorithm, why must we save curr.next into a temporary variable before modifying curr.next?',
            options: ['To free memory', 'Because reassigning curr.next breaks the link to the rest of the list', 'To check for cycles', 'To update the tail'],
            correctIndex: 1,
            explanation: 'Setting curr.next = prev overwrites the pointer. Without preserving next = curr.next, the remaining chain would be lost in memory.'
          }
        ]
      }
    ]
  },
  {
    id: 'stack-queue-dungeon',
    name: 'Stack & Queue Dungeon',
    tag: 'WORLD 3',
    subtitle: 'LIFO Towers and FIFO Pipelines',
    icon: 'Layers',
    color: 'violet',
    accentColor: '#8b5cf6',
    gradient: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/40',
    description: 'Explore restricted-access linear abstract data types. Master LIFO (Last-In First-Out) stack operations, parenthesis validation, infix-postfix conversions, and FIFO (First-In First-Out) circular queues.',
    visualizerType: 'stack',
    levels: [
      {
        id: 'sq-lvl-1',
        title: 'Stack Architecture & LIFO Principles',
        topic: 'Push, Pop, Peek, Overflow & Underflow',
        summary: 'A Stack is a Last-In, First-Out (LIFO) structure where elements are inserted (Push) and removed (Pop) exclusively from a single end called TOP.',
        keyPoints: [
          'LIFO Principle: The most recently added item is the first one removed.',
          'Push: Insert element onto TOP. Error if full: Stack Overflow.',
          'Pop: Remove and return element from TOP. Error if empty: Stack Underflow.',
          'Peek/Top: Inspect topmost element without removing it.',
          'Applications: Browser history back-button, Undo/Redo, Function call stack, Expression parsing.'
        ],
        timeComplexity: { push: 'O(1)', pop: 'O(1)', peek: 'O(1)' },
        spaceComplexity: 'O(n)',
        realLifeAnalogy: 'A spring-loaded stack of dinner plates in a cafeteria. You place plates on top and take plates from the top. The first plate placed on the bottom is the last one picked up!',
        interactiveMission: {
          objective: 'Push 70, then 80, and then Pop once to observe the TOP pointer',
          initialData: [10, 20, 30],
          targetOperation: 'push',
          targetValue: 70,
          hint: 'Push 70 and 80, then click Pop.'
        },
        miniGameType: 'stack-escape',
        quiz: [
          {
            id: 'sq-q1',
            type: 'mcq',
            question: 'Which of the following operations causes a Stack Underflow error?',
            options: ['Pushing into a full stack', 'Popping from an empty stack', 'Peeking at a full stack', 'Searching an element'],
            correctIndex: 1,
            explanation: 'Attempting to remove (Pop) or read an item from an empty stack (TOP == -1 or NULL) is called Stack Underflow.'
          }
        ]
      },
      {
        id: 'sq-lvl-2',
        title: 'Infix, Postfix & Expression Evaluation',
        topic: 'Shunting Yard & Operator Precedence',
        summary: 'Compilers convert human-readable infix expressions (e.g. A + B * C) into postfix notation (A B C * +) using a stack to eliminate parentheses and enforce strict operator precedence.',
        keyPoints: [
          'Infix: Operator between operands [A + B].',
          'Postfix (Reverse Polish): Operator after operands [A B +].',
          'Prefix (Polish): Operator before operands [+ A B].',
          'Postfix expressions need NO parentheses because evaluation order is unambiguous from left to right.'
        ],
        timeComplexity: { conversion: 'O(n)', evaluation: 'O(n)' },
        spaceComplexity: 'O(n) auxiliary stack',
        realLifeAnalogy: 'Scientific calculators evaluate multiplications before additions by staging operands and operations on an internal stack.',
        interactiveMission: {
          objective: 'Push operators onto stack to evaluate postfix expression: 4 5 +',
          initialData: [4],
          targetOperation: 'push',
          targetValue: 5,
          hint: 'Operands push onto stack; operator + pops top two and pushes their sum 9.'
        },
        miniGameType: 'stack-postfix',
        quiz: [
          {
            id: 'sq-q2',
            type: 'mcq',
            question: 'What is the postfix equivalent of the infix expression: (A + B) * C?',
            options: ['A B + C *', 'A B C + *', '* + A B C', 'A B * C +'],
            correctIndex: 0,
            explanation: '(A + B) evaluates first to AB+, then multiplied with C gives AB+C*.'
          }
        ]
      },
      {
        id: 'sq-lvl-3',
        title: 'Queue Pipelines & Circular Buffers',
        topic: 'FIFO Pipelines, Front/Rear & Modulo Wrapping',
        summary: 'A Queue is a First-In, First-Out (FIFO) data structure. Elements enter at the REAR (Enqueue) and leave at the FRONT (Dequeue). A Circular Queue wraps around using modulo arithmetic to prevent unused memory holes.',
        keyPoints: [
          'FIFO Principle: First element added is first to be processed.',
          'Linear Queue issue: Dequeuing leaves empty space at front that cannot be reused without shifting.',
          'Circular Queue solution: rear = (rear + 1) % Capacity.',
          'Applications: CPU round-robin scheduling, Printer spooling, Breadth-First Search (BFS).'
        ],
        timeComplexity: { enqueue: 'O(1)', dequeue: 'O(1)', peek: 'O(1)' },
        spaceComplexity: 'O(n)',
        realLifeAnalogy: 'A line at a movie ticket booth. The first person to arrive is the first person served and leaves the line.',
        interactiveMission: {
          objective: 'Enqueue 90 into the circular queue and dequeue the front element',
          initialData: [15, 25, 35],
          targetOperation: 'enqueue',
          targetValue: 90,
          hint: 'Select the Queue visualizer tab, enqueue 90, then click Dequeue.'
        },
        miniGameType: 'queue-customer',
        quiz: [
          {
            id: 'sq-q3',
            type: 'mcq',
            question: 'In a circular queue of size 5 with front = 2 and rear = 4, what is the next rear index after enqueuing an element?',
            options: ['5', '0', '3', '1'],
            correctIndex: 1,
            explanation: 'rear = (rear + 1) % size = (4 + 1) % 5 = 5 % 5 = 0. It wraps around to index 0!'
          }
        ]
      }
    ]
  },
  {
    id: 'recursion-backtracking',
    name: 'Recursion & Backtracking',
    tag: 'WORLD 4',
    subtitle: 'The Mirror Dimensions of Recursive Call Stacks',
    icon: 'Sparkles',
    color: 'pink',
    accentColor: '#ec4899',
    gradient: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/40',
    description: 'Master the art of self-referential problem solving. Understand the base case, call stack frames, recursive tree visualization, Tower of Hanoi, and N-Queens backtracking.',
    visualizerType: 'recursion',
    levels: [
      {
        id: 'rec-lvl-1',
        title: 'Anatomy of Recursion & Call Stacks',
        topic: 'Base Conditions & Stack Frame Unwinding',
        summary: 'Recursion occurs when a function calls itself to solve a smaller instance of the same problem. Every recursive function MUST have at least one Base Case to terminate, otherwise it crashes with Stack Overflow.',
        keyPoints: [
          'Base Case: The halting condition that returns a value without further recursive calls.',
          'Recursive Step: Reduces the problem input towards the base case.',
          'Call Stack: Each recursive call pushes an activation frame storing local variables and return address.',
          'Stack Unwinding: When the base case hits, calls return in reverse order (LIFO).'
        ],
        timeComplexity: { factorial: 'O(n)', fibonacciNaive: 'O(2^n)' },
        spaceComplexity: 'O(n) auxiliary call stack space',
        realLifeAnalogy: 'Russian Matryoshka nesting dolls. You open a doll to find a smaller doll, until you reach the solid baby doll (base case) that cannot be opened!',
        interactiveMission: {
          objective: 'Visualize Factorial of 4 call stack frames (4 * 3 * 2 * 1)',
          initialData: [4],
          targetOperation: 'recursion',
          targetValue: 24,
          hint: 'Trace the stack frames as fact(4) calls fact(3) -> fact(2) -> fact(1).'
        },
        miniGameType: 'rec-hanoi',
        quiz: [
          {
            id: 'rec-q1',
            type: 'mcq',
            question: 'What happens if a recursive function lacks a base case?',
            options: ['It returns 0', 'It runs in O(1) time', 'Stack Overflow (infinite recursion)', 'Memory is automatically freed'],
            correctIndex: 2,
            explanation: 'Without a base condition, the function continues calling itself indefinitely until the OS call stack memory limit is exceeded.'
          }
        ]
      },
      {
        id: 'rec-lvl-2',
        title: 'Backtracking & The N-Queens Challenge',
        topic: 'Pruning Dead Ends in Decision Trees',
        summary: 'Backtracking is an algorithmic paradigm that tests candidate solutions incrementally. As soon as a candidate violates problem constraints, it abandons ("backtracks") that branch and reverts state.',
        keyPoints: [
          'Choose -> Explore -> Unchoose (Backtrack).',
          'Pruning: Stops exploring dead-end branches early, vastly outperforming brute-force permutation search.',
          'State restoration: When a path fails, revert the board or state to its exact prior configuration.',
          'Classic problems: N-Queens, Sudoku Solver, Maze Generation, Subset Sum.'
        ],
        timeComplexity: { nQueens: 'O(N!)' },
        spaceComplexity: 'O(N) for board recursion depth',
        realLifeAnalogy: 'Navigating a dark hedge maze. When you hit a dead-end wall, you retrace your exact footprints back to the last fork in the path and try a different turn.',
        interactiveMission: {
          objective: 'Place 4 Queens on a 4x4 board such that no two queens threaten each other',
          initialData: [0, 0, 0, 0],
          targetOperation: 'nqueens',
          targetValue: 4,
          hint: 'Queens threaten along rows, columns, and diagonals.'
        },
        miniGameType: 'rec-queens',
        quiz: [
          {
            id: 'rec-q2',
            type: 'mcq',
            question: 'What is the core distinction between pure brute-force and backtracking?',
            options: ['Backtracking uses no recursion', 'Backtracking prunes invalid branches as soon as a constraint is violated', 'Backtracking always takes O(1) space', 'Brute force is faster'],
            correctIndex: 1,
            explanation: 'Backtracking prunes (cuts off) subtree exploration the moment a partial solution violates any rule, saving massive amounts of compute.'
          }
        ]
      },
      {
        id: 'rec-lvl-3',
        title: 'Tower of Hanoi & Mathematical Induction',
        topic: 'Recursive State Trees & Exponential Growth',
        summary: 'The Tower of Hanoi puzzle demonstrates recursive problem decomposition with 3 pegs (Source, Auxiliary, Destination). To transfer n disks from Source to Destination: 1) Move n-1 disks from Source to Aux, 2) Move nth disk from Source to Dest, 3) Move n-1 disks from Aux to Dest.',
        keyPoints: [
          'Minimum moves required for n disks is exactly 2^n - 1.',
          'Recurrence relation: T(n) = 2T(n-1) + 1 -> O(2^n) exponential time.',
          'Maximum call stack depth is O(n) auxiliary memory.',
          'Mathematical induction: If solution holds for k disks, it transfers to k+1 disks.'
        ],
        timeComplexity: { moves: 'O(2^n)', recurrence: 'T(n) = 2T(n-1) + 1' },
        spaceComplexity: 'O(n) call stack depth',
        realLifeAnalogy: 'Moving stacked shipping containers where smaller containers must never be placed underneath larger containers, requiring an empty intermediate dock.',
        interactiveMission: {
          objective: 'Solve Tower of Hanoi for 3 disks in minimum 7 moves (2³ - 1 = 7)',
          initialData: [3, 2, 1],
          targetOperation: 'hanoi',
          targetValue: 7,
          hint: 'Recursively move top 2 disks to auxiliary peg, bottom disk to destination, then 2 disks to destination.'
        },
        miniGameType: 'rec-hanoi',
        quiz: [
          {
            id: 'rec-q3',
            type: 'mcq',
            question: 'For n = 4 disks, what is the minimum number of moves required to solve the Tower of Hanoi?',
            options: ['8', '15', '16', '7'],
            correctIndex: 1,
            explanation: 'Minimum moves = 2^n - 1 = 2^4 - 1 = 16 - 1 = 15 moves.'
          },
          {
            id: 'rec-q4',
            type: 'mcq',
            question: 'What is the maximum call stack depth (space complexity) for Tower of Hanoi with n disks?',
            options: ['O(1)', 'O(n)', 'O(2^n)', 'O(n²)'],
            correctIndex: 1,
            explanation: 'The call stack only holds active recursive frames down one path at a time, resulting in O(n) maximum recursion stack space.'
          }
        ]
      }
    ]
  },
  {
    id: 'sorting-speedway',
    name: 'Sorting Speedway',
    tag: 'WORLD 5',
    subtitle: 'The Grand Prix of Algorithmic Order and Swaps',
    icon: 'Zap',
    color: 'amber',
    accentColor: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/40',
    description: 'Feel the speed! Benchmark Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. Observe comparisons, step through swaps, and analyze worst vs average case complexities.',
    visualizerType: 'sorting',
    levels: [
      {
        id: 'sort-lvl-1',
        title: 'Comparison Sorts: Bubble, Selection, Insertion',
        topic: 'O(n²) Elementary Sorting Mechanics',
        summary: 'Elementary sorts compare adjacent or selected elements. Bubble sort bubbles maximums to the right; Selection sort repeatedly finds the minimum; Insertion sort builds a sorted prefix like playing cards.',
        keyPoints: [
          'Bubble Sort: Compares adjacent pairs and swaps if unordered. O(n²) worst, O(n) best with swap flag.',
          'Selection Sort: Finds minimum element in unsorted portion and swaps with first unsorted element. Always O(n²) comparisons, but at most O(n) swaps.',
          'Insertion Sort: Inserts each element into its correct spot among already sorted elements. Best for nearly sorted lists O(n).',
          'Stability: Preserves original relative order of equal keys (Bubble and Insertion are stable; Selection is not).'
        ],
        timeComplexity: { bubble: 'O(n²)', selection: 'O(n²)', insertion: 'O(n²) [O(n) best]' },
        spaceComplexity: 'O(1) in-place',
        realLifeAnalogy: 'Sorting playing cards in your hand: you take one card at a time and slide it into its proper place between the smaller and larger cards.',
        interactiveMission: {
          objective: 'Run Bubble Sort on an array of 8 elements and observe comparisons and swaps',
          initialData: [45, 12, 89, 34, 22, 90, 11, 67],
          targetOperation: 'sort-bubble',
          targetValue: 8,
          hint: 'Select Bubble Sort and click Play in the Sorting Visualizer.'
        },
        miniGameType: 'sort-race',
        quiz: [
          {
            id: 'sort-q1',
            type: 'mcq',
            question: 'Which elementary sorting algorithm makes the minimum number of swaps (at most O(n))?',
            options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Bogo Sort'],
            correctIndex: 2,
            explanation: 'Selection Sort makes exactly one swap per outer loop iteration, totaling at most n-1 swaps, making it ideal when writing to memory is expensive.'
          }
        ]
      },
      {
        id: 'sort-lvl-2',
        title: 'Divide & Conquer: Merge Sort & Quick Sort',
        topic: 'O(n log n) Efficient Sorting Engines',
        summary: 'Advanced sorts divide the dataset into sub-arrays. Merge Sort splits into halves and merges them back in sorted order; Quick Sort picks a pivot and partitions elements into smaller and larger sides.',
        keyPoints: [
          'Merge Sort: Splits array in half recursively until size 1, then merges. Guarantees O(n log n) in all cases. Stable. Requires O(n) extra memory.',
          'Quick Sort: Selects a pivot, partitions elements into <= pivot and > pivot. Average O(n log n), worst case O(n²) with bad pivots (e.g. sorted array with first element pivot). In-place O(log n) stack space.',
          'Logarithmic depth: Dividing by 2 creates log₂(n) levels; each level does O(n) work -> O(n log n).'
        ],
        timeComplexity: { mergeSort: 'O(n log n) all cases', quickSortAvg: 'O(n log n)', quickSortWorst: 'O(n²)' },
        spaceComplexity: { mergeSort: 'O(n)', quickSort: 'O(log n) call stack' },
        realLifeAnalogy: 'Sorting a giant pile of exam papers: divide the pile among 4 teaching assistants, have each TA sort their smaller stack, then merge the two sorted halves together!',
        interactiveMission: {
          objective: 'Execute Quick Sort and watch the pivot partitions in action',
          initialData: [50, 23, 9, 18, 61, 32],
          targetOperation: 'sort-quick',
          targetValue: 6,
          hint: 'Select Quick Sort in the dropdown and step through the algorithm.'
        },
        miniGameType: 'sort-predict',
        quiz: [
          {
            id: 'sort-q2',
            type: 'mcq',
            question: 'Why is standard Merge Sort generally preferred over Quick Sort for sorting Linked Lists?',
            options: ['Linked Lists cannot be partitioned', 'Merge Sort does not require random access and needs no extra array memory for linked nodes', 'Quick Sort is slower on lists', 'Linked lists cannot store numbers'],
            correctIndex: 1,
            explanation: 'Merge Sort can merge linked nodes simply by pointer manipulation in O(1) extra space without needing random access indexing.'
          }
        ]
      },
      {
        id: 'sort-lvl-3',
        title: 'Stability, In-Place Sorting & Benchmark Showdown',
        topic: 'Algorithm Trade-offs & Complexity Lower Bounds',
        summary: 'A sorting algorithm is Stable if it preserves the original relative order of elements with equal keys. It is In-Place if it requires O(1) auxiliary RAM beyond call stack frames.',
        keyPoints: [
          'Stable sorts: Bubble Sort, Insertion Sort, Merge Sort.',
          'Unstable sorts: Selection Sort, Quick Sort, Heap Sort.',
          'In-Place sorts: Bubble, Selection, Insertion, Quick Sort (in-place partition), Heap Sort.',
          'Merge Sort requires O(n) auxiliary memory for array merges.',
          'Comparison lower bound theorem: Any comparison-based sorting algorithm requires at least Ω(n log n) comparisons in the worst case.'
        ],
        timeComplexity: { lowerBound: 'Ω(n log n)', mergeSort: 'O(n log n)', quickSortAvg: 'O(n log n)' },
        spaceComplexity: 'O(1) in-place vs O(n) auxiliary',
        realLifeAnalogy: 'Sorting customer files first by State, then by Last Name: a stable sort ensures people from the same state remain alphabetically ordered!',
        interactiveMission: {
          objective: 'Observe comparisons in Bubble Sort vs Merge Sort across duplicate keys',
          initialData: [4, 2, 4, 1],
          targetOperation: 'sort-benchmark',
          targetValue: 4,
          hint: 'Equal keys (4 and 4) must retain their original input positions in a stable sort.'
        },
        miniGameType: 'sort-race',
        quiz: [
          {
            id: 'sort-q3',
            type: 'mcq',
            question: 'Which of the following sorting algorithms is guaranteed to be Stable and has O(n log n) worst-case time?',
            options: ['Quick Sort', 'Selection Sort', 'Merge Sort', 'Heap Sort'],
            correctIndex: 2,
            explanation: 'Merge Sort is strictly stable and guarantees O(n log n) time in all cases (best, average, worst).'
          },
          {
            id: 'sort-q4',
            type: 'mcq',
            question: 'What is the theoretical minimum number of comparisons needed to sort n elements in the worst case using comparison-based sorting?',
            options: ['O(n)', 'Ω(n log n)', 'O(n²)', 'O(log n)'],
            correctIndex: 1,
            explanation: 'By the Decision Tree model, a binary decision tree with n! leaves must have a minimum depth of log₂(n!) = Ω(n log n).'
          }
        ]
      }
    ]
  },
  {
    id: 'searching-hashing',
    name: 'Searching & Hashing City',
    tag: 'WORLD 6',
    subtitle: 'The Metropolis of Instant Lookups and Collision Resolvers',
    icon: 'Hash',
    color: 'blue',
    accentColor: '#3b82f6',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-500/40',
    description: 'Tackle the quest for O(1) lookups! Compare Linear and Binary Search, master hash functions, load factors, separate chaining, and linear/quadratic probing collision resolution.',
    visualizerType: 'hashing',
    levels: [
      {
        id: 'hash-lvl-1',
        title: 'Binary Search & Logarithmic Halving',
        topic: 'Divide-and-Conquer Search on Sorted Collections',
        summary: 'Binary Search eliminates half the remaining elements with every single comparison by checking the middle element (mid = low + (high - low) / 2).',
        keyPoints: [
          'Prerequisite: The array MUST be sorted.',
          'Halving mechanism: If target < arr[mid], search left; else search right.',
          'Efficiency: Can search 4 billion elements in at most 32 comparisons (log₂ 4,000,000,000 ≈ 32)!',
          'Overflow safety: Use low + (high - low)/2 instead of (low + high)/2 to prevent integer overflow in languages with fixed integer limits.'
        ],
        timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
        spaceComplexity: 'O(1) iterative, O(log n) recursive',
        realLifeAnalogy: 'Guessing a secret number between 1 and 100 with "higher" or "lower" clues: you first guess 50, instantly ruling out 50 numbers in one guess!',
        interactiveMission: {
          objective: 'Find 67 in sorted array [11, 22, 34, 45, 67, 89, 90]',
          initialData: [11, 22, 34, 45, 67, 89, 90],
          targetOperation: 'binary-search',
          targetValue: 67,
          hint: 'Initial mid is index 3 (45). Since 67 > 45, search the right sub-array.'
        },
        miniGameType: 'hash-slot',
        quiz: [
          {
            id: 'hash-q1',
            type: 'mcq',
            question: 'How many maximum comparisons does Binary Search need for an array of 1,024 sorted elements?',
            options: ['1024', '512', '10', '100'],
            correctIndex: 2,
            explanation: 'log₂(1024) = 10 comparisons. Each step halves the remaining candidates.'
          }
        ]
      },
      {
        id: 'hash-lvl-2',
        title: 'Hash Tables & Collision Resolution',
        topic: 'Hash Functions, Chaining & Open Addressing',
        summary: 'A Hash Table maps arbitrary keys to bucket indices using a Hash Function: index = hash(key) % table_size. When two keys hash to the same bucket, a Collision occurs.',
        keyPoints: [
          'Hash Collision: Inevitable by Pigeonhole Principle when keys > table slots.',
          'Separate Chaining: Each bucket holds a linked list of collided entries.',
          'Open Addressing (Linear Probing): If bucket is occupied, check (index + 1) % size, then +2, etc.',
          'Quadratic Probing: Checks index + 1², + 2², + 3² to reduce primary clustering.',
          'Load Factor (α = n / m): Ratio of elements to buckets. When α exceeds threshold (e.g. 0.75), table dynamically doubles in size and rehashes all keys.'
        ],
        timeComplexity: { lookupAvg: 'O(1)', lookupWorst: 'O(n) [all collided]', insertAvg: 'O(1)' },
        spaceComplexity: 'O(n)',
        realLifeAnalogy: 'Coat check system at a venue: your ticket number corresponds to a specific numbered rack. If rack 14 is occupied, separate chaining hangs both coats on the same hanger hook!',
        interactiveMission: {
          objective: 'Insert keys 25 and 35 into a hash table of size 10 to trigger collision at index 5',
          initialData: [15],
          targetOperation: 'insert-hash',
          targetValue: 25,
          hint: '25 % 10 = 5 and 35 % 10 = 5. Observe chaining or probing resolution!'
        },
        miniGameType: 'hash-collision',
        quiz: [
          {
            id: 'hash-q2',
            type: 'mcq',
            question: 'What is the primary drawback of Linear Probing collision resolution in hash tables?',
            options: ['Requires extra memory per node', 'Primary Clustering (long contiguous occupied blocks slowing down operations)', 'Cannot store strings', 'Takes O(n²) space'],
            correctIndex: 1,
            explanation: 'Linear probing causes Primary Clustering, where clusters of occupied slots merge together, causing search times to deteriorate towards O(n).'
          }
        ]
      },
      {
        id: 'hash-lvl-3',
        title: 'Double Hashing & Dynamic Rehashing Mechanics',
        topic: 'Two Hash Functions & Amortized Table Doubling',
        summary: 'Double Hashing calculates probe intervals using a secondary hash function h2(k): probe(k, i) = (h1(k) + i * h2(k)) % m, preventing both primary and secondary clustering. Dynamic Rehashing doubles capacity when load factor α > 0.75.',
        keyPoints: [
          'Secondary hash h2(k) must never evaluate to 0: e.g. h2(k) = 1 + (k % (m - 1)).',
          'Eliminates clustering by ensuring colliding keys have completely different jump strides.',
          'Rehashing allocates a new table of size 2m + 1 (prime) and re-inserts every key.',
          'Amortized cost: Although rehashing takes O(n), it occurs rarely, maintaining O(1) amortized insertion.'
        ],
        timeComplexity: { lookupDoubleHash: 'O(1) avg', rehashCost: 'O(n) amortized O(1)' },
        spaceComplexity: 'O(n) dynamically doubled array',
        realLifeAnalogy: 'Two people trying to book the same hotel room: instead of both walking down the hallway room-by-room (linear probing), they follow individual distinct jump codes (double hashing) to disperse across different floors.',
        interactiveMission: {
          objective: 'Trigger a Dynamic Rehashing event by exceeding load factor 0.75',
          initialData: [7, 14, 21, 28, 35],
          targetOperation: 'rehash',
          targetValue: 0.75,
          hint: 'Click the Rehash button or insert keys until load factor α > 0.75.'
        },
        miniGameType: 'hash-slot',
        quiz: [
          {
            id: 'hash-q3',
            type: 'mcq',
            question: 'Why must the secondary hash function h2(k) in Double Hashing never return 0?',
            options: ['It would cause integer overflow', 'Multiplying i * 0 yields an infinite loop probing the exact same slot repeatedly', 'Negative values would appear', 'Tables cannot store 0'],
            correctIndex: 1,
            explanation: 'If h2(k) = 0, the probe formula (h1(k) + i * 0) % m remains stuck on index h1(k) forever for all steps i.'
          },
          {
            id: 'hash-q4',
            type: 'mcq',
            question: 'What is the standard load factor threshold where modern hash tables (like Java HashMap) trigger automatic doubling and rehashing?',
            options: ['0.25', '0.50', '0.75', '1.00'],
            correctIndex: 2,
            explanation: 'A load factor of 0.75 offers the ideal balance between memory utilization and search performance (avoiding excessive collision chains).'
          }
        ]
      }
    ]
  },
  {
    id: 'tree-forest',
    name: 'Tree Forest',
    tag: 'WORLD 7',
    subtitle: 'The Hierarchical Canopies of Binary Search Trees and Heaps',
    icon: 'Network',
    color: 'green',
    accentColor: '#22c55e',
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/40',
    description: 'Climb the hierarchical canopy! Master Root, Leaves, Height, Binary Trees, Preorder/Inorder/Postorder traversals, BST insertions/deletions, and AVL self-balancing rotations.',
    visualizerType: 'tree',
    levels: [
      {
        id: 'tree-lvl-1',
        title: 'Tree Terminology & Tree Traversals',
        topic: 'Root, Height, Inorder, Preorder, Postorder & Level-Order',
        summary: 'A tree is a non-linear hierarchical data structure consisting of nodes connected by edges. Unlike linear lists, trees are traversed Depth-First (Preorder, Inorder, Postorder) or Breadth-First (Level-Order).',
        keyPoints: [
          'Preorder (D-L-R): Visit Node, Traverse Left, Traverse Right. Used for copying trees and prefix expressions.',
          'Inorder (L-D-R): Traverse Left, Visit Node, Traverse Right. Yields strictly SORTED order in a BST!',
          'Postorder (L-R-D): Traverse Left, Traverse Right, Visit Node. Used for deleting trees and postfix expressions.',
          'Level-Order (BFS): Visits nodes level by level from top to bottom using a FIFO Queue.'
        ],
        timeComplexity: { traversal: 'O(n) visits every node exactly once' },
        spaceComplexity: 'O(h) where h is tree height (call stack space)',
        realLifeAnalogy: 'A company organizational chart: CEO at the root, Vice Presidents as child nodes, managers beneath them, and individual contributors as leaf nodes.',
        interactiveMission: {
          objective: 'Execute an Inorder traversal on the Binary Search Tree and observe the sorted output',
          initialData: [50, 30, 70, 20, 40, 60, 80],
          targetOperation: 'traverse-inorder',
          targetValue: 50,
          hint: 'Click "Inorder Traversal (L-Root-R)" in the Tree Visualizer controls.'
        },
        miniGameType: 'tree-traversal',
        quiz: [
          {
            id: 'tree-q1',
            type: 'mcq',
            question: 'Which traversal of a Binary Search Tree (BST) produces nodes in non-decreasing sorted order?',
            options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
            correctIndex: 1,
            explanation: 'Inorder traversal visits Left subtree, then Root, then Right subtree. Because left < root < right in a BST, this always prints elements in ascending sorted order.'
          }
        ]
      },
      {
        id: 'tree-lvl-2',
        title: 'Binary Search Tree (BST) Operations',
        topic: 'Insert, Search and Deletion (3 Cases)',
        summary: 'A BST satisfies the invariant: every node in the left subtree is strictly less than the node, and every node in the right subtree is strictly greater.',
        keyPoints: [
          'Search: If target < root.val, go left; if target > root.val, go right. O(h) time.',
          'Insertion: Follow search path until reaching null, then attach new leaf node.',
          'Deletion Case 1: Node is a Leaf -> simply remove it.',
          'Deletion Case 2: Node has 1 Child -> bypass the node and link parent directly to child.',
          'Deletion Case 3: Node has 2 Children -> replace value with Inorder Successor (smallest in right subtree) and delete successor.'
        ],
        timeComplexity: { searchAvg: 'O(log n)', searchWorst: 'O(n) [skewed tree]', insertAvg: 'O(log n)' },
        spaceComplexity: 'O(h)',
        realLifeAnalogy: 'A dictionary index: words starting with A-M are in the left half of the library; words starting with N-Z are in the right half.',
        interactiveMission: {
          objective: 'Insert value 25 into the BST: [50, 30, 70, 20, 40]',
          initialData: [50, 30, 70, 20, 40],
          targetOperation: 'insert-bst',
          targetValue: 25,
          hint: '50 -> left (30) -> left (20) -> right child of 20!'
        },
        miniGameType: 'tree-builder',
        quiz: [
          {
            id: 'tree-q2',
            type: 'mcq',
            question: 'When deleting a node with two children in a BST, which node replaces it?',
            options: ['Its parent node', 'Its left child', 'Inorder Successor (smallest in right subtree) or Inorder Predecessor', 'Any random leaf'],
            correctIndex: 2,
            explanation: 'The Inorder Successor (or Predecessor) maintains the BST property because it is guaranteed to be greater than all left descendants and smaller than all remaining right descendants.'
          }
        ]
      },
      {
        id: 'tree-lvl-3',
        title: 'Self-Balancing AVL Trees & Binary Heaps',
        topic: 'Rotations (LL, RR, LR, RL) & Priority Queue Heaps',
        summary: 'An AVL tree maintains height balance such that the Balance Factor (Height(Left) - Height(Right)) is strictly between -1 and +1. When violated, rotations rebalance the tree in O(1) time. A Binary Heap satisfies the heap property where parent is >= children (Max-Heap) or <= children (Min-Heap), stored compactly in an array.',
        keyPoints: [
          'Balance Factor = Height(Left) - Height(Right) in {-1, 0, 1}.',
          'Left-Left imbalance: Resolved with a Single Right Rotation.',
          'Right-Right imbalance: Resolved with a Single Left Rotation.',
          'Left-Right & Right-Left: Resolved with Double Rotations.',
          'Binary Heap Array index mapping: parent at floor((i-1)/2), left at 2i+1, right at 2i+2.',
          'Heap operations: Peek in O(1), Insert and Extract in O(log n).'
        ],
        timeComplexity: { avlLookup: 'O(log n) guaranteed', heapExtract: 'O(log n)', heapPeek: 'O(1)' },
        spaceComplexity: 'O(n) auxiliary heap array',
        realLifeAnalogy: 'A gymnast balancing on a beam: whenever weight tilts too far to one side, they shift hips and arms (rotation) to restore absolute equilibrium!',
        interactiveMission: {
          objective: 'Inspect AVL balance factors and identify the 4 classic tree rotation types',
          initialData: [30, 20, 10],
          targetOperation: 'avl-rotate',
          targetValue: 'LL',
          hint: 'Inserting 10 into left-skewed 30->20 creates a Left-Left imbalance requiring a Right Rotation.'
        },
        miniGameType: 'tree-traversal',
        quiz: [
          {
            id: 'tree-q3',
            type: 'mcq',
            question: 'What is the balance factor of a node in an AVL tree with left height 3 and right height 1?',
            options: ['1', '2 (Imbalanced, rotation needed)', '0', '-2'],
            correctIndex: 1,
            explanation: 'Balance Factor = Left Height - Right Height = 3 - 1 = +2. Since |BF| > 1, the node violates AVL balance and requires rebalancing.'
          },
          {
            id: 'tree-q4',
            type: 'mcq',
            question: 'In an array representation of a binary heap, where is the parent of the node at index k?',
            options: ['2k', '2k + 1', 'floor((k - 1) / 2)', 'k - 2'],
            correctIndex: 2,
            explanation: 'For zero-based indexing, the parent of index k is located at floor((k - 1) / 2).'
          }
        ]
      }
    ]
  },
  {
    id: 'graph-galaxy',
    name: 'Graph Galaxy',
    tag: 'WORLD 8',
    subtitle: 'The Constellations of Networks, Shortest Paths, and Spanning Trees',
    icon: 'Share2',
    color: 'cyan',
    accentColor: '#00f2fe',
    gradient: 'from-cyan-500/20 to-purple-500/20',
    borderColor: 'border-cyan-500/40',
    description: 'Explore the infinite cosmos of interconnected networks! Master Vertices & Edges, Adjacency representations, BFS, DFS, Dijkstra’s shortest path, and Prim’s / Kruskal’s Minimum Spanning Trees.',
    visualizerType: 'graph',
    levels: [
      {
        id: 'graph-lvl-1',
        title: 'Graph Anatomy: BFS vs DFS',
        topic: 'Breadth-First Search (Queue) & Depth-First Search (Stack)',
        summary: 'Graphs consist of Vertices (V) and Edges (E). BFS explores level-by-level using a FIFO Queue to find shortest paths in unweighted graphs. DFS explores as deeply as possible along each branch before backtracking using a Stack or recursion.',
        keyPoints: [
          'Adjacency Matrix: V x V 2D grid. O(1) edge lookup, but O(V²) space even for sparse graphs.',
          'Adjacency List: Array of linked lists/arrays. O(V + E) space; optimal for sparse graphs.',
          'BFS: Queue-based. Guarantees shortest path in unweighted graphs.',
          'DFS: Stack/recursion-based. Ideal for cycle detection, topological sort, and maze traversal.',
          'Visited Array: Mandatory in cyclic graphs to prevent infinite loops!'
        ],
        timeComplexity: { bfs: 'O(V + E)', dfs: 'O(V + E)' },
        spaceComplexity: 'O(V) for visited array and queue/stack',
        realLifeAnalogy: 'Social networks: BFS finds your 1st-degree friends, then 2nd-degree mutual friends. DFS dives deep down a single friendship chain to find distant acquaintances!',
        interactiveMission: {
          objective: 'Run BFS starting from Vertex 0 on the 5-node graph',
          initialData: { nodes: [0, 1, 2, 3, 4], edges: [[0,1], [0,2], [1,3], [2,4]] },
          targetOperation: 'run-bfs',
          targetValue: 0,
          hint: 'Select BFS algorithm with Start Node 0 and click Run.'
        },
        miniGameType: 'graph-maze',
        quiz: [
          {
            id: 'graph-q1',
            type: 'mcq',
            question: 'Which graph traversal algorithm guarantees finding the shortest path between two nodes in an unweighted graph?',
            options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', 'Inorder Traversal', 'Kruskal Algorithm'],
            correctIndex: 1,
            explanation: 'BFS explores nodes ring by ring in increasing order of distance from the source. The first time the destination is dequeued, it is guaranteed to be via the shortest edge path.'
          }
        ]
      },
      {
        id: 'graph-lvl-2',
        title: 'Shortest Path & Dijkstra’s Algorithm',
        topic: 'Greedy Relaxation with Priority Queues',
        summary: 'Dijkstra’s algorithm finds the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights using greedy edge relaxation: if dist[u] + weight(u,v) < dist[v], then dist[v] = dist[u] + weight(u,v).',
        keyPoints: [
          'Greedy selection: Always relaxes the unvisited node with the smallest known tentative distance.',
          'Priority Queue optimization: Yields O((V + E) log V) time.',
          'Limitation: Fails with negative edge weights (Bellman-Ford algorithm must be used instead).',
          'Applications: GPS navigation systems (Google Maps), internet packet routing (OSPF).'
        ],
        timeComplexity: { dijkstraPQ: 'O((V + E) log V)', dijkstraArray: 'O(V²)' },
        spaceComplexity: 'O(V) for distance table and priority queue',
        realLifeAnalogy: 'GPS navigation finding the fastest route home during rush hour, recalculating when you hit traffic along a specific highway segment.',
        interactiveMission: {
          objective: 'Run Dijkstra from Node A to calculate shortest distances to all vertices',
          initialData: { nodes: ['A', 'B', 'C', 'D'], edges: [['A','B',4], ['A','C',2], ['C','B',1], ['B','D',5]] },
          targetOperation: 'run-dijkstra',
          targetValue: 'A',
          hint: 'Notice path A -> C (2) + C -> B (1) = 3 is shorter than direct A -> B (4)!'
        },
        miniGameType: 'graph-mst',
        quiz: [
          {
            id: 'graph-q2',
            type: 'mcq',
            question: 'Why does Dijkstra’s algorithm fail when a graph contains negative edge weights?',
            options: ['It uses too much memory', 'Its greedy assumption breaks because a previously finalized distance could later decrease', 'Graphs cannot have negative numbers', 'It causes stack overflow'],
            correctIndex: 1,
            explanation: 'Dijkstra assumes that once a vertex is visited and extracted from the priority queue, its shortest distance is finalized. A negative weight later in the graph can violate this assumption.'
          }
        ]
      },
      {
        id: 'graph-lvl-3',
        title: 'Minimum Spanning Trees: Prim\'s vs Kruskal\'s Algorithm',
        topic: 'Spanning Trees, Cut Property & Greedy Edge Selection',
        summary: 'A Spanning Tree of a connected graph contains all V vertices and exactly V-1 edges without forming cycles. A Minimum Spanning Tree (MST) minimizes the sum of edge weights. Prim\'s algorithm grows a tree vertex-by-vertex; Kruskal\'s algorithm sorts all edges and unites disjoint sets.',
        keyPoints: [
          'An MST of a graph with V vertices always has exactly V - 1 edges and 0 cycles.',
          'Prim\'s Algorithm: Optimal for dense graphs with O((V + E) log V) time using Min-Heap priority queue.',
          'Kruskal\'s Algorithm: Optimal for sparse graphs with O(E log E) edge sorting and near O(1) Disjoint Set Union (Union-Find).',
          'Cut Property: For any cut in a graph, the minimum weight edge crossing the cut belongs to the MST.',
          'Applications: Telecommunication fiber laying, electrical power line grid routing, water supply piping networks.'
        ],
        timeComplexity: { prims: 'O((V + E) log V)', kruskals: 'O(E log E)' },
        spaceComplexity: 'O(V + E)',
        realLifeAnalogy: 'Connecting electrical wiring across 5 islands with underwater cables: you want every island powered with the absolute minimum total length of expensive cable!',
        interactiveMission: {
          objective: 'Execute Prim\'s MST in the Graph Visualizer and observe total minimum weight',
          initialData: { nodes: [0, 1, 2, 3, 4] },
          targetOperation: 'run-prim',
          targetValue: 4,
          hint: 'Select "Prim\'s MST" in the Graph Visualizer to see greedy edge selection.'
        },
        miniGameType: 'graph-mst',
        quiz: [
          {
            id: 'graph-q3',
            type: 'mcq',
            question: 'How many edges does a Minimum Spanning Tree (MST) have for a connected undirected graph with V vertices?',
            options: ['V', 'V - 1', 'V + 1', '2V'],
            correctIndex: 1,
            explanation: 'Any spanning tree connecting V vertices must have exactly V - 1 edges. Adding any additional edge creates a cycle.'
          },
          {
            id: 'graph-q4',
            type: 'mcq',
            question: 'What auxiliary data structure does Kruskal’s algorithm use to check for cycles in near O(1) time?',
            options: ['Queue', 'Disjoint Set Union (Union-Find / DSU)', 'Binary Search Tree', 'Hash Map'],
            correctIndex: 1,
            explanation: 'Kruskal’s algorithm uses Disjoint Set Union (DSU) with path compression and union by rank to detect if two vertices belong to the same component in near O(1) time.'
          }
        ]
      }
    ]
  },
  {
    id: 'algorithm-arena',
    name: 'Algorithm Arena',
    tag: 'BONUS ARENA',
    subtitle: 'The Coliseum of Big-O, Two Pointers, Dynamic Programming & Greedy',
    icon: 'Trophy',
    color: 'purple',
    accentColor: '#a855f7',
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
    borderColor: 'border-purple-500/40',
    description: 'The supreme proving ground! Master asymptotic notations (Big O, Omega, Theta), Two Pointers, Sliding Window, Greedy paradigms, and Dynamic Programming (Memoization vs Tabulation).',
    visualizerType: 'algorithm',
    levels: [
      {
        id: 'algo-lvl-1',
        title: 'Asymptotic Notations & Complexity Mastery',
        topic: 'Big-O (Upper Bound), Omega (Lower Bound), Theta (Tight Bound)',
        summary: 'Asymptotic analysis evaluates algorithm efficiency as input size n approaches infinity, independent of hardware or programming language.',
        keyPoints: [
          'Big-O (O): Upper bound / worst-case growth rate [f(n) <= c * g(n)].',
          'Big-Omega (Ω): Lower bound / best-case growth rate [f(n) >= c * g(n)].',
          'Big-Theta (Θ): Tight bound [c1 * g(n) <= f(n) <= c2 * g(n)].',
          'Complexity Ranking: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!).'
        ],
        timeComplexity: { constant: 'O(1)', logarithmic: 'O(log n)', linear: 'O(n)', quadratic: 'O(n²)' },
        spaceComplexity: 'Auxiliary memory overhead',
        realLifeAnalogy: 'Speed limit vs minimum highway speed: Big-O is the speed limit (you will never exceed this time), Omega is the legal minimum speed.',
        interactiveMission: {
          objective: 'Identify the time complexity of a nested loop: for(i=0; i<n; i++) for(j=0; j<n; j++)',
          initialData: [1, 2, 3],
          targetOperation: 'complexity-check',
          targetValue: 'O(n²)',
          hint: 'An outer loop running n times containing an inner loop running n times executes n * n operations.'
        },
        miniGameType: 'algo-complexity',
        quiz: [
          {
            id: 'algo-q1',
            type: 'mcq',
            question: 'Which of the following time complexities grows the slowest as n becomes very large?',
            options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(√n)'],
            correctIndex: 1,
            explanation: 'O(log n) is logarithmic and grows extraordinarily slowly compared to linear O(n), sub-linear O(√n), or O(n log n).'
          }
        ]
      },
      {
        id: 'algo-lvl-2',
        title: 'Dynamic Programming: Memoization & Tabulation',
        topic: 'Overlapping Subproblems & Optimal Substructure',
        summary: 'Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems, storing results of subproblems to avoid redundant calculations.',
        keyPoints: [
          'Two Key Properties: 1) Overlapping Subproblems, 2) Optimal Substructure.',
          'Top-Down with Memoization: Recursive approach that caches computed answers in a lookup table or hash map.',
          'Bottom-Up with Tabulation: Iterative approach that fills an array from base cases upwards.',
          'Example: Naive Fibonacci is O(2^n); DP Fibonacci is O(n) time and O(1) space!'
        ],
        timeComplexity: { naiveFib: 'O(2^n)', dpFib: 'O(n)' },
        spaceComplexity: 'O(n) for memo table / O(1) with rolling variables',
        realLifeAnalogy: 'Write 1 + 1 + 1 + 1 on a chalkboard. Ask someone what it is: "4". Now write another "+ 1" at the end. They instantly know it is 5 because they remembered the previous 4 rather than recounting from 1!',
        interactiveMission: {
          objective: 'Compute 6th Fibonacci number using DP Tabulation: [0, 1, 1, 2, 3, 5, 8]',
          initialData: [0, 1],
          targetOperation: 'dp-fib',
          targetValue: 8,
          hint: 'Each number is the sum of the two preceding numbers: fib(6) = fib(5) + fib(4) = 5 + 3 = 8.'
        },
        miniGameType: 'algo-dp',
        quiz: [
          {
            id: 'algo-q2',
            type: 'mcq',
            question: 'What is the main distinction between Divide-and-Conquer and Dynamic Programming?',
            options: ['Divide and Conquer is always faster', 'Dynamic Programming deals with OVERLAPPING subproblems by caching, whereas Divide-and-Conquer subproblems are independent', 'D&C cannot be implemented in code', 'DP uses no recursion'],
            correctIndex: 1,
            explanation: 'Divide-and-Conquer (like Merge Sort) splits into independent non-overlapping subproblems. DP addresses overlapping subproblems where the same calculation repeats many times.'
          }
        ]
      },
      {
        id: 'algo-lvl-3',
        title: 'Two Pointers & Sliding Window Optimization Techniques',
        topic: 'Reducing O(n²) Brute Force to O(n) Optimal Traversal',
        summary: 'Two Pointers and Sliding Window techniques optimize array/string subarray searches and pair comparisons by maintaining dynamic window boundaries, reducing nested loop overhead from quadratic O(n²) to linear O(n).',
        keyPoints: [
          'Two Pointers: Pointers start at opposite ends (converging) or at the same position moving at different speeds (fast/slow runner).',
          'Sliding Window: Expands right pointer until condition is met, then contracts left pointer to maintain window invariant.',
          'Optimal for: Longest substring with distinct characters, maximum subarray sum of size k, pair sum in sorted array, palindrome verification.',
          'Eliminates redundant computations by reusing overlapping window sums or counts in O(1) step updates.'
        ],
        timeComplexity: { twoPointers: 'O(n)', slidingWindow: 'O(n)' },
        spaceComplexity: 'O(1) auxiliary space',
        realLifeAnalogy: 'Viewing a panoramic photo through an adjustable rectangular magnifying card. Instead of taking a brand-new photo for every step, you slide the card by 1 frame: subtract the pixel leaving on the left and add the new pixel entering on the right!',
        interactiveMission: {
          objective: 'Find maximum sum subarray of window size k = 3 in [2, 1, 5, 1, 3, 2]',
          initialData: [2, 1, 5, 1, 3, 2],
          targetOperation: 'sliding-window',
          targetValue: 9,
          hint: 'Subarray [5, 1, 3] yields sum 9.'
        },
        miniGameType: 'algo-window',
        quiz: [
          {
            id: 'algo-q3',
            type: 'mcq',
            question: 'When moving a fixed-size sliding window of size k by one position to the right, how many arithmetic operations are needed to compute the new window sum?',
            options: ['k operations', 'O(1) operations (subtract leaving element, add entering element)', 'O(n) operations', 'O(k²) operations'],
            correctIndex: 1,
            explanation: 'Sliding window updates in O(1) time: new_sum = current_sum - arr[left] + arr[right + 1], avoiding re-summing all k elements!'
          },
          {
            id: 'algo-q4',
            type: 'mcq',
            question: 'In which scenario is the two-pointer converging technique (left = 0, right = n - 1) guaranteed to find a pair with target sum in O(n) time?',
            options: ['Any unsorted array', 'Only when the input array is sorted', 'Only in binary trees', 'Only with negative numbers'],
            correctIndex: 1,
            explanation: 'Two pointer convergence requires the array to be sorted so that if sum < target we increment left (increasing sum), and if sum > target we decrement right (decreasing sum).'
          }
        ]
      }
    ]
  }
];
