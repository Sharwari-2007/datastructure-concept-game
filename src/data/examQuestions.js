export const EXAM_UNITS = [
  { id: 'unit-1', name: 'Unit I: Linear Data Structures (Arrays & Linked Lists)' },
  { id: 'unit-2', name: 'Unit II: Stacks & Queues (Applications & Implementations)' },
  { id: 'unit-3', name: 'Unit III: Non-Linear Structures (Trees & Binary Search Trees)' },
  { id: 'unit-4', name: 'Unit IV: Graphs & Minimum Spanning Trees' },
  { id: 'unit-5', name: 'Unit V: Searching, Hashing & Algorithm Complexity' }
];

export const EXAM_QUESTIONS = [
  // 2-MARK QUESTIONS
  {
    id: 'eq-2m-1',
    marks: 2,
    unit: 'unit-1',
    topic: 'Arrays',
    question: 'Define Abstract Data Type (ADT) with two examples.',
    modelAnswer: {
      definition: 'An Abstract Data Type (ADT) is a mathematical model for data types where a data type is defined by its behavior (operations that can be performed) from the point of view of a user, independent of implementation details.',
      keyPoints: [
        'Focuses on WHAT the data structure does, not HOW it is implemented.',
        'Provides data abstraction and modular encapsulation.'
      ],
      examples: '1. Stack ADT: operations Push(), Pop(), Peek(), IsEmpty().\n2. Queue ADT: operations Enqueue(), Dequeue(), IsFull().'
    }
  },
  {
    id: 'eq-2m-2',
    marks: 2,
    unit: 'unit-2',
    topic: 'Stacks & Queues',
    question: 'What is the condition for Overflow and Underflow in a circular queue of size MAX?',
    modelAnswer: {
      definition: 'In a circular queue implemented using an array of size MAX with pointers front and rear:',
      keyPoints: [
        'Overflow Condition: (rear + 1) % MAX == front (Queue is full; new elements cannot be inserted).',
        'Underflow Condition: front == -1 (Queue has no elements; dequeue cannot be performed).'
      ]
    }
  },
  {
    id: 'eq-2m-3',
    marks: 2,
    unit: 'unit-3',
    topic: 'Trees',
    question: 'Differentiate between a Complete Binary Tree and a Full Binary Tree.',
    modelAnswer: {
      definition: 'Full Binary Tree: Every node has either 0 or 2 children (no node has only 1 child).',
      keyPoints: [
        'Complete Binary Tree: All levels are completely filled except possibly the last level, and all leaf nodes in the last level are as far left as possible.'
      ]
    }
  },
  {
    id: 'eq-2m-4',
    marks: 2,
    unit: 'unit-4',
    topic: 'Graphs',
    question: 'Define Degree of a vertex in an Undirected vs Directed Graph.',
    modelAnswer: {
      definition: 'In an undirected graph, degree of a vertex is the total number of edges incident to it.',
      keyPoints: [
        'In a directed graph, the degree is divided into:',
        'In-degree: The number of incoming edges pointing into the vertex.',
        'Out-degree: The number of outgoing edges pointing out from the vertex.'
      ]
    }
  },
  {
    id: 'eq-2m-5',
    marks: 2,
    unit: 'unit-5',
    topic: 'Algorithm Analysis',
    question: 'Define Big-O Notation and give its formal mathematical definition.',
    modelAnswer: {
      definition: 'Big-O notation represents the upper bound on the execution time of an algorithm, describing the worst-case asymptotic growth rate.',
      formula: 'f(n) = O(g(n)) iff there exist positive constants c and n₀ such that 0 <= f(n) <= c * g(n) for all n >= n₀.'
    }
  },

  // 5-MARK QUESTIONS
  {
    id: 'eq-5m-1',
    marks: 5,
    unit: 'unit-1',
    topic: 'Linked Lists vs Arrays',
    question: 'Compare Arrays and Singly Linked Lists in detail with respect to memory allocation, insertion, deletion, and access time.',
    modelAnswer: {
      comparisonTable: [
        { parameter: 'Memory Allocation', array: 'Contiguous, allocated at compile-time (static) or runtime in one block', linkedList: 'Non-contiguous, allocated dynamically node-by-node on heap' },
        { parameter: 'Random Access', array: 'O(1) direct access via index Base + (i * size)', linkedList: 'O(n) sequential access from HEAD' },
        { parameter: 'Insertion at Beginning', array: 'O(n) - requires shifting all elements right', linkedList: 'O(1) - update newNode.next = head; head = newNode' },
        { parameter: 'Deletion at Position', array: 'O(n) - requires shifting elements left', linkedList: 'O(n) to traverse + O(1) to bypass pointer' },
        { parameter: 'Memory Overhead', array: 'None (only raw data stored)', linkedList: 'Extra pointer field for every data element' }
      ],
      diagram: 'Array: [A|B|C|D] (contiguous addresses 1000, 1004, 1008...)\nLinked List: [A|*] -> [B|*] -> [C|*] -> NULL'
    }
  },
  {
    id: 'eq-5m-2',
    marks: 5,
    unit: 'unit-2',
    topic: 'Stacks',
    question: 'Explain the algorithm to convert an Infix expression to Postfix using a Stack. Dry run on: (A + B) * C - D / E',
    modelAnswer: {
      algorithmSteps: [
        '1. Scan infix expression from left to right.',
        '2. If scanned character is an operand, output it directly.',
        '3. If scanned character is "(", push it onto the stack.',
        '4. If scanned character is ")", pop and output operators from stack until "(" is encountered, then discard "(".',
        '5. If scanned character is an operator, pop higher or equal precedence operators from stack to output, then push the scanned operator.',
        '6. At end of expression, pop and output all remaining operators from the stack.'
      ],
      dryRunTable: [
        { token: '(', stack: '(', output: '' },
        { token: 'A', stack: '(', output: 'A' },
        { token: '+', stack: '( +', output: 'A' },
        { token: 'B', stack: '( +', output: 'A B' },
        { token: ')', stack: 'empty', output: 'A B +' },
        { token: '*', stack: '*', output: 'A B +' },
        { token: 'C', stack: '*', output: 'A B + C' },
        { token: '-', stack: '-', output: 'A B + C *' },
        { token: 'D', stack: '- /', output: 'A B + C * D' },
        { token: '/', stack: '- /', output: 'A B + C * D' },
        { token: 'E', stack: '- /', output: 'A B + C * D E' },
        { token: 'End', stack: 'empty', output: 'A B + C * D E / -' }
      ],
      finalResult: 'A B + C * D E / -'
    }
  },
  {
    id: 'eq-5m-3',
    marks: 5,
    unit: 'unit-3',
    topic: 'Binary Search Trees',
    question: 'Write an algorithm to insert a node into a Binary Search Tree (BST) and trace it for keys: 50, 30, 70, 20, 40, 60, 80.',
    modelAnswer: {
      codeC: `// C Implementation of BST Insertion
struct Node* insert(struct Node* root, int key) {
    if (root == NULL) return createNode(key);
    if (key < root->data)
        root->left = insert(root->left, key);
    else if (key > root->data)
        root->right = insert(root->right, key);
    return root;
}`,
      complexity: 'Time Complexity: Average O(log n), Worst O(n) for skewed tree. Space: O(h) recursion stack.'
    }
  },

  // 10-MARK QUESTIONS
  {
    id: 'eq-10m-1',
    marks: 10,
    unit: 'unit-4',
    topic: 'Graphs & Shortest Path',
    question: 'Explain Dijkstra’s algorithm to find the single-source shortest paths in a weighted directed graph with non-negative edge weights. Provide pseudo-code and trace on an example graph.',
    modelAnswer: {
      theory: 'Dijkstra’s algorithm uses a greedy approach to find the shortest path from a starting source node to all other vertices. It maintains a set of visited vertices and repeatedly selects the unvisited vertex with the minimum tentative distance.',
      relaxationRule: 'Edge Relaxation: If dist[u] + weight(u, v) < dist[v], then dist[v] = dist[u] + weight(u, v) and parent[v] = u.',
      pseudoCode: `Algorithm Dijkstra(Graph G, Source s):
1. Initialize dist[v] = INFINITY for all v in V, dist[s] = 0.
2. Initialize empty PriorityQueue PQ and insert (0, s).
3. While PQ is not empty:
     u = PQ.extractMin()
     For each neighbor v of u with edge weight w:
         if dist[u] + w < dist[v]:
             dist[v] = dist[u] + w
             PQ.insert(dist[v], v)
4. Return dist array.`,
      complexity: 'Time Complexity: O((V + E) log V) with Min-Heap/Priority Queue, or O(V²) with an array. Space Complexity: O(V).'
    }
  },
  {
    id: 'eq-10m-2',
    marks: 10,
    unit: 'unit-5',
    topic: 'Hashing',
    question: 'What is a Hash Collision? Explain different collision resolution techniques (Separate Chaining and Open Addressing: Linear Probing, Quadratic Probing, Double Hashing) with diagrams and comparisons.',
    modelAnswer: {
      theory: 'A hash collision occurs when two distinct keys k1 and k2 produce the same hash index via hash function h(k): h(k1) == h(k2). By the Pigeonhole Principle, collisions are inevitable whenever the key universe exceeds table capacity.',
      techniques: [
        '1. Separate Chaining: Each table slot contains a linked list. Colliding keys are simply appended to the list. Load factor can exceed 1.',
        '2. Linear Probing: When collision occurs at index h, probe sequentially: (h + i) % m for i = 1, 2, 3... Suffers from Primary Clustering.',
        '3. Quadratic Probing: Probes (h + c1*i + c2*i²) % m. Eliminates primary clustering, but can lead to secondary clustering.',
        '4. Double Hashing: Uses a secondary hash function h2(k): probe = (h1(k) + i * h2(k)) % m. Excellent distribution without clustering.'
      ]
    }
  }
];

export const MOCK_EXAM_QUESTIONS = [
  {
    id: 'mock-q1',
    question: 'Which of the following is true regarding arrays in most programming languages?',
    options: ['Elements can be stored anywhere in memory', 'Elements are stored in contiguous memory locations', 'Size can be altered at O(1) anytime', 'Deletion is always O(1)'],
    correctIndex: 1,
    topic: 'Arrays',
    marks: 2
  },
  {
    id: 'mock-q2',
    question: 'In a singly linked list, which operation requires traversal of the entire list if only the HEAD pointer is maintained?',
    options: ['Insertion at head', 'Deletion at head', 'Insertion at end', 'Checking if list is empty'],
    correctIndex: 2,
    topic: 'Linked Lists',
    marks: 2
  },
  {
    id: 'mock-q3',
    question: 'Which data structure is primarily used by compilers to check for balanced parentheses in source code?',
    options: ['Queue', 'Stack', 'Binary Tree', 'Hash Map'],
    correctIndex: 1,
    topic: 'Stacks',
    marks: 2
  },
  {
    id: 'mock-q4',
    question: 'What is the worst-case time complexity of Quick Sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctIndex: 2,
    topic: 'Sorting',
    marks: 2
  },
  {
    id: 'mock-q5',
    question: 'Which graph traversal algorithm uses a FIFO Queue data structure?',
    options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', 'Dijkstra with Array', 'Topological Sort with Recursion'],
    correctIndex: 1,
    topic: 'Graphs',
    marks: 2
  }
];
