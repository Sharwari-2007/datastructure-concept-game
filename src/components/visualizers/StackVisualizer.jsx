import React, { useState } from 'react';
import { Layers, ArrowUp, ArrowDown, Eye, RotateCcw, Info, AlertTriangle, Code2 } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const StackVisualizer = ({ initialStack = [10, 20, 30], capacity = 6, onMissionComplete }) => {
  const [stack, setStack] = useState(initialStack);
  const [viewMode, setViewMode] = useState('stack'); // 'stack' | 'infix-postfix' | 'eval-postfix'
  const [pushVal, setPushVal] = useState('');
  const [message, setMessage] = useState('Stack is a LIFO (Last-In First-Out) structure. TOP pointer tracks active item.');
  const [isOverflow, setIsOverflow] = useState(false);
  const [isUnderflow, setIsUnderflow] = useState(false);

  // Infix to Postfix converter state
  const [infixInput, setInfixInput] = useState('(A+B)*C');
  const [postfixSteps, setPostfixSteps] = useState([]);
  const [postfixStepIdx, setPostfixStepIdx] = useState(0);

  // Postfix Evaluation state
  const [evalExpr, setEvalExpr] = useState('4 5 + 3 *'); // (4+5)*3 = 27
  const [evalStack, setEvalStack] = useState([]);
  const [evalResult, setEvalResult] = useState(null);

  // 1. Stack Push
  const handlePush = (e) => {
    e?.preventDefault();
    const val = parseInt(pushVal);
    if (isNaN(val)) return;

    if (stack.length >= capacity) {
      setIsOverflow(true);
      setMessage(`⚠️ STACK OVERFLOW! Capacity limit of ${capacity} reached. Cannot push ${val}.`);
      sound.playError();
      return;
    }

    setIsOverflow(false);
    setIsUnderflow(false);

    const updated = [...stack, val];
    setStack(updated);
    setMessage(`Pushed element ${val} onto TOP of stack (Index ${updated.length - 1}). Time: O(1).`);
    sound.playSuccess();
    setPushVal('');
    if (onMissionComplete) onMissionComplete();
  };

  // 2. Stack Pop
  const handlePop = () => {
    if (stack.length === 0) {
      setIsUnderflow(true);
      setMessage('⚠️ STACK UNDERFLOW! The stack is empty. Cannot pop any elements.');
      sound.playError();
      return;
    }

    setIsOverflow(false);
    setIsUnderflow(false);

    const poppedVal = stack[stack.length - 1];
    const updated = stack.slice(0, -1);
    setStack(updated);
    setMessage(`Popped element ${poppedVal} from TOP of stack! TOP decremented. Time: O(1).`);
    sound.playClick();
    if (onMissionComplete) onMissionComplete();
  };

  // 3. Stack Peek
  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty. TOP == -1.');
      return;
    }
    const topVal = stack[stack.length - 1];
    setMessage(`🔍 PEEK: Current TOP element is ${topVal} at Index ${stack.length - 1}. No elements removed.`);
    sound.playClick();
  };

  // Infix to Postfix Shunting Yard algorithm
  const convertInfixToPostfix = () => {
    sound.playClick();
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const isOperator = (ch) => ['+', '-', '*', '/', '^'].includes(ch);

    const steps = [];
    const opStack = [];
    let output = '';

    const expr = infixInput.replace(/\s+/g, '');

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];

      if (/[A-Za-z0-9]/.test(ch)) {
        output += ch + ' ';
        steps.push({
          token: ch,
          opStack: [...opStack],
          output,
          explanation: `Operand '${ch}' encountered: append directly to postfix output.`
        });
      } else if (ch === '(') {
        opStack.push(ch);
        steps.push({
          token: ch,
          opStack: [...opStack],
          output,
          explanation: `Open parenthesis '(': push onto operator stack.`
        });
      } else if (ch === ')') {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
          output += opStack.pop() + ' ';
        }
        opStack.pop(); // discard '('
        steps.push({
          token: ch,
          opStack: [...opStack],
          output,
          explanation: `Close parenthesis ')': pop operators from stack to output until '(' is met.`
        });
      } else if (isOperator(ch)) {
        while (
          opStack.length > 0 &&
          opStack[opStack.length - 1] !== '(' &&
          precedence[opStack[opStack.length - 1]] >= precedence[ch]
        ) {
          output += opStack.pop() + ' ';
        }
        opStack.push(ch);
        steps.push({
          token: ch,
          opStack: [...opStack],
          output,
          explanation: `Operator '${ch}': pop higher or equal precedence operators, then push '${ch}'.`
        });
      }
    }

    while (opStack.length > 0) {
      output += opStack.pop() + ' ';
    }
    steps.push({
      token: 'End',
      opStack: [],
      output,
      explanation: `End of expression: pop all remaining operators onto postfix output: ${output.trim()}`
    });

    setPostfixSteps(steps);
    setPostfixStepIdx(0);
    sound.playSuccess();
  };

  // Evaluate Postfix Expression
  const handleEvaluatePostfix = () => {
    sound.playClick();
    const tokens = evalExpr.trim().split(/\s+/);
    const st = [];

    for (let token of tokens) {
      if (!isNaN(parseFloat(token))) {
        st.push(parseFloat(token));
      } else {
        const b = st.pop();
        const a = st.pop();
        if (token === '+') st.push(a + b);
        else if (token === '-') st.push(a - b);
        else if (token === '*') st.push(a * b);
        else if (token === '/') st.push(a / b);
      }
    }

    setEvalStack(st);
    setEvalResult(st[0]);
    sound.playSuccess();
  };

  const handleReset = () => {
    setStack(initialStack);
    setIsOverflow(false);
    setIsUnderflow(false);
    setPostfixSteps([]);
    setEvalResult(null);
    setMessage('Stack reset.');
    sound.playClick();
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-violet-400 flex items-center gap-2">
            <Layers className="w-6 h-6 text-violet-400" />
            Interactive Stack LIFO &amp; Expressions Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Observe LIFO push/pop mechanics, TOP pointer, Infix to Postfix Shunting Yard, and Postfix evaluation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => { setViewMode('stack'); sound.playClick(); }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === 'stack' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              LIFO Stack
            </button>
            <button
              onClick={() => { setViewMode('infix-postfix'); sound.playClick(); }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === 'infix-postfix' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Infix ➔ Postfix
            </button>
            <button
              onClick={() => { setViewMode('eval-postfix'); sound.playClick(); }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                viewMode === 'eval-postfix' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Postfix Eval
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'stack' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stack Vertical Tube */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Stack Frame Top</span>
              <span>Limit: {capacity}</span>
            </div>

            {/* Tube */}
            <div className="w-44 h-80 border-x-4 border-b-4 border-violet-500/60 rounded-b-2xl bg-slate-900/60 flex flex-col-reverse p-2 gap-2 relative overflow-hidden">
              {stack.map((val, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-full h-10 rounded-lg flex items-center justify-between px-3 font-mono font-bold text-sm transition-all duration-300 ${
                      isTop
                        ? 'bg-violet-600 border border-violet-300 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                        : 'bg-slate-800/90 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="text-xs text-violet-300">[{idx}]</span>
                    <span>{val}</span>
                    {isTop ? (
                      <span className="text-[10px] bg-violet-900/80 px-1 rounded text-cyan-300">TOP</span>
                    ) : (
                      <span className="w-6"></span>
                    )}
                  </div>
                );
              })}

              {stack.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-600 text-xs font-mono">
                  Empty (TOP == -1)
                </div>
              )}
            </div>
            <div className="mt-2 text-xs font-mono text-violet-400 font-bold">
              TOP Pointer: {stack.length > 0 ? `Index ${stack.length - 1} (${stack[stack.length - 1]})` : '-1 (NULL)'}
            </div>
          </div>

          {/* Controls & Operations */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Status alerts */}
              {isOverflow && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-700/60 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Stack Overflow condition triggered! Maximum capacity reached.</span>
                </div>
              )}
              {isUnderflow && (
                <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-700/60 text-amber-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Stack Underflow condition triggered! Stack is empty.</span>
                </div>
              )}

              {/* Explanation box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                  {message}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <form onSubmit={handlePush} className="flex gap-2">
                <input
                  type="number"
                  placeholder="Value to push"
                  value={pushVal}
                  onChange={(e) => setPushVal(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-violet-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 cyber-button-purple text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowUp className="w-4 h-4" /> Push (O(1))
                </button>
              </form>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePop}
                  className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <ArrowDown className="w-4 h-4" /> Pop (O(1))
                </button>

                <button
                  onClick={handlePeek}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
                >
                  <Eye className="w-4 h-4" /> Peek Top (O(1))
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : viewMode === 'infix-postfix' ? (
        /* Infix to Postfix Shunting Yard Mode */
        <div className="space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Infix expression e.g. (A+B)*C"
              value={infixInput}
              onChange={(e) => setInfixInput(e.target.value)}
              className="flex-1 px-4 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-violet-500 outline-none"
            />
            <button
              onClick={convertInfixToPostfix}
              className="px-6 py-2 cyber-button-purple text-xs font-bold font-mono"
            >
              Convert to Postfix (Stack)
            </button>
          </div>

          {postfixSteps.length > 0 && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Shunting Yard Trace: Step {postfixStepIdx + 1} / {postfixSteps.length}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPostfixStepIdx(Math.max(0, postfixStepIdx - 1))}
                    disabled={postfixStepIdx === 0}
                    className="px-2 py-1 bg-slate-800 rounded disabled:opacity-40"
                  >
                    ◀ Prev
                  </button>
                  <button
                    onClick={() => setPostfixStepIdx(Math.min(postfixSteps.length - 1, postfixStepIdx + 1))}
                    disabled={postfixStepIdx === postfixSteps.length - 1}
                    className="px-2 py-1 bg-violet-600 rounded text-white disabled:opacity-40"
                  >
                    Next ▶
                  </button>
                </div>
              </div>

              {/* Step Detail */}
              <div className="p-3 bg-slate-900 rounded-xl space-y-2 border border-slate-800">
                <div>
                  Token: <strong className="text-cyan-400 font-bold text-sm">{postfixSteps[postfixStepIdx].token}</strong>
                </div>
                <div>
                  Operator Stack: <span className="text-purple-300 font-bold">[{postfixSteps[postfixStepIdx].opStack.join(', ')}]</span>
                </div>
                <div>
                  Postfix Output: <span className="text-emerald-400 font-bold text-sm">{postfixSteps[postfixStepIdx].output}</span>
                </div>
                <p className="text-slate-300 font-sans text-xs pt-1">
                  {postfixSteps[postfixStepIdx].explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Postfix Evaluation Mode */
        <div className="space-y-4 font-mono text-xs">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Postfix expr e.g. 4 5 + 3 *"
              value={evalExpr}
              onChange={(e) => setEvalExpr(e.target.value)}
              className="flex-1 px-4 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-violet-500 outline-none"
            />
            <button
              onClick={handleEvaluatePostfix}
              className="px-6 py-2 cyber-button-purple text-xs font-bold font-mono"
            >
              Evaluate via Stack
            </button>
          </div>

          {evalResult !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/50 flex items-center justify-between">
              <span className="text-slate-400">Evaluation Result:</span>
              <span className="text-emerald-400 font-bold text-lg">{evalResult}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
