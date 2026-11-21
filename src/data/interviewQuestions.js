export const INTERVIEW_ROUNDS = [
  {
    round: 1,
    name: 'Round 1: DSA Fundamentals',
    focus: 'Data Structure Internal Architecture, Pointers, and Asymptotic Complexity',
    questions: [
      {
        id: 'int-r1-q1',
        title: 'Contiguous vs Dynamic Memory in Practice',
        company: 'Google / Amazon',
        difficulty: 'Medium',
        prompt: 'Why is accessing an array element significantly faster than traversing a linked list node, even when both operations have similar algorithmic time steps?',
        hints: [
          'Consider hardware architecture and CPU cache lines.',
          'Think about L1/L2 cache prefetching when reading sequential memory.'
        ],
        solution: {
          keyInsight: 'Spatial Locality of Reference in CPU Caches.',
          explanation: 'Arrays store data in contiguous RAM locations. When an array element is accessed, the CPU cache controller automatically loads an entire 64-byte Cache Line containing adjacent elements into ultra-fast L1/L2 cache. Subsequent sequential accesses are immediate cache hits (1-3 nanoseconds).\n\nIn contrast, Linked List nodes are allocated dynamically on the heap at scattered addresses. Traversing a linked list causes repeated CPU Cache Misses, forcing the processor to wait hundreds of CPU cycles for main memory reads (50-100 nanoseconds).'
        }
      },
      {
        id: 'int-r1-q2',
        title: 'Amortized Analysis of Dynamic Array Resizing',
        company: 'Meta / Microsoft',
        difficulty: 'Medium',
        prompt: 'When an ArrayList / std::vector doubles in size upon filling, what is the amortized time complexity of appending an element? Prove it.',
        hints: [
          'Most appends take O(1). Only every 2^k append takes O(n).',
          'Use the Aggregate Method or Banker’s/Accounting Method.'
        ],
        solution: {
          keyInsight: 'Amortized O(1) time per append operation.',
          explanation: 'Suppose we insert N elements starting from capacity 1. Resizing occurs at sizes 1, 2, 4, 8, ..., N.\nThe total copy cost across all resizes is: 1 + 2 + 4 + 8 + ... + N = 2N - 1 < 2N.\nAdding the N regular O(1) insert steps gives total work <= 3N.\nDividing total work (3N) by the number of insertions (N) gives an amortized cost of 3N / N = 3 = O(1) constant time per operation!'
        }
      }
    ]
  },
  {
    id: 'int-round-2',
    round: 2,
    name: 'Round 2: Data Structure Operations',
    focus: 'Pointer Manipulation, Edge Cases, and Cyclic Invariants',
    questions: [
      {
        id: 'int-r2-q1',
        title: 'Detect and Find the Starting Node of a Cycle in a Linked List',
        company: 'Amazon / Apple',
        difficulty: 'Hard',
        prompt: 'Given a linked list with a potential cycle, detect if a cycle exists. If yes, return the node where the cycle begins without using extra space.',
        hints: [
          'Use Floyd’s Cycle Detection (Tortoise and Hare with slow and fast pointers).',
          'When slow and fast meet, reset one pointer to HEAD and advance both by 1 step.'
        ],
        solution: {
          keyInsight: "Floyd's Tortoise and Hare algorithm.",
          code: `// Floyd's Algorithm
function detectCycleStart(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // Cycle detected!
      let ptr1 = head, ptr2 = slow;
      while (ptr1 !== ptr2) {
        ptr1 = ptr1.next;
        ptr2 = ptr2.next;
      }
      return ptr1; // Starting node of cycle
    }
  }
  return null; // No cycle
}`,
          complexity: 'Time Complexity: O(n). Space Complexity: O(1).'
        }
      }
    ]
  },
  {
    id: 'int-round-3',
    round: 3,
    name: 'Round 3: Live Coding Challenge',
    focus: 'Implementation Accuracy, Clean Code, and Test Boundaries',
    questions: [
      {
        id: 'int-r3-q1',
        title: 'Two Sum Problem',
        company: 'FAANG Classic',
        difficulty: 'Easy-Medium',
        prompt: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input has exactly one solution and you may not use the same element twice.',
        hints: [
          'Brute force tests all pairs in O(n²). Can you do it in one pass?',
          'Use a Hash Map to store complement = target - nums[i].'
        ],
        solution: {
          code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
          complexity: 'Time: O(n) single pass. Space: O(n) for hash map.'
        }
      }
    ]
  },
  {
    id: 'int-round-4',
    round: 4,
    name: 'Round 4: Algorithm Optimization',
    focus: 'Reducing Quadratic Solutions to Linear or Logarithmic Time',
    questions: [
      {
        id: 'int-r4-q1',
        title: 'Longest Substring Without Repeating Characters',
        company: 'Google / Meta',
        difficulty: 'Medium',
        prompt: 'Given a string s, find the length of the longest substring without duplicate characters.',
        hints: [
          'Use the Sliding Window technique with two pointers (left and right).',
          'Use a Hash Map or integer array to store the last seen index of each character.'
        ],
        solution: {
          code: `function lengthOfLongestSubstring(s) {
  let map = new Map();
  let maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
          complexity: 'Time Complexity: O(n). Space Complexity: O(min(m, n)) where m is charset size.'
        }
      }
    ]
  },
  {
    id: 'int-round-5',
    round: 5,
    name: 'Round 5: Advanced Problem Solving & System Design',
    focus: 'Complex Data Structure Hybrids (LRU Cache, Topological Sort)',
    questions: [
      {
        id: 'int-r5-q1',
        title: 'Design LRU (Least Recently Used) Cache',
        company: 'Google / Amazon / Netflix',
        difficulty: 'Hard',
        prompt: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. It must support get(key) and put(key, value) in O(1) average time complexity.',
        hints: [
          'A Hash Map gives O(1) key lookup, but cannot maintain recency order.',
          'Combine a Hash Map with a Doubly Linked List (DLL).',
          'Move accessed nodes to DLL HEAD; evict from DLL TAIL when capacity is full.'
        ],
        solution: {
          keyInsight: 'Hash Map + Doubly Linked List hybrid.',
          explanation: '1. Hash Map stores key -> Node reference for O(1) lookup.\n2. Doubly Linked List maintains access recency order.\n- get(key): Lookup node in map, detach from current spot in DLL, attach to HEAD. Return value.\n- put(key, value): If key exists, update value and move node to HEAD. If key is new, insert at HEAD. If size > capacity, remove TAIL node from DLL and delete its key from the Map. All operations run in O(1)!'
        }
      }
    ]
  }
];
