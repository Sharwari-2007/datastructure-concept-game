import React, { useState } from 'react';
import { ArrowRightLeft, RotateCcw, Info, AlertTriangle, Layers } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const QueueVisualizer = ({ initialQueue = [15, 25, 35], capacity = 6, onMissionComplete }) => {
  const [queue, setQueue] = useState(initialQueue);
  const [valInput, setValInput] = useState('');
  const [queueMode, setQueueMode] = useState('circular'); // 'circular' | 'linear' | 'deque'
  const [message, setMessage] = useState('A Queue follows FIFO (First-In First-Out). Elements enter at REAR and exit at FRONT.');
  const [isOverflow, setIsOverflow] = useState(false);
  const [isUnderflow, setIsUnderflow] = useState(false);

  // Enqueue at Rear
  const handleEnqueueRear = (e) => {
    e?.preventDefault();
    const val = parseInt(valInput);
    if (isNaN(val)) return;

    if (queue.length >= capacity) {
      setIsOverflow(true);
      setMessage(`⚠️ QUEUE OVERFLOW! Maximum queue capacity of ${capacity} reached.`);
      sound.playError();
      return;
    }

    setIsOverflow(false);
    setIsUnderflow(false);

    const updated = [...queue, val];
    setQueue(updated);
    setMessage(`Enqueued ${val} at REAR (Index ${updated.length - 1}). In circular queue: rear = (rear + 1) % ${capacity}.`);
    sound.playSuccess();
    setValInput('');
    if (onMissionComplete) onMissionComplete();
  };

  // Enqueue at Front (Deque)
  const handleEnqueueFront = () => {
    const val = parseInt(valInput);
    if (isNaN(val)) return;

    if (queue.length >= capacity) {
      setIsOverflow(true);
      setMessage(`⚠️ DEQUE OVERFLOW! Capacity limit of ${capacity} reached.`);
      sound.playError();
      return;
    }

    setIsOverflow(false);
    setIsUnderflow(false);

    const updated = [val, ...queue];
    setQueue(updated);
    setMessage(`Deque Operation: Enqueued ${val} directly at FRONT. In circular deque: front = (front - 1 + ${capacity}) % ${capacity}.`);
    sound.playSuccess();
    setValInput('');
  };

  // Dequeue from Front
  const handleDequeueFront = () => {
    if (queue.length === 0) {
      setIsUnderflow(true);
      setMessage('⚠️ QUEUE UNDERFLOW! The queue is empty.');
      sound.playError();
      return;
    }

    setIsOverflow(false);
    setIsUnderflow(false);

    const dequeuedVal = queue[0];
    const updated = queue.slice(1);
    setQueue(updated);
    setMessage(`Dequeued ${dequeuedVal} from FRONT! FRONT pointer incremented to Index 0.`);
    sound.playClick();
    if (onMissionComplete) onMissionComplete();
  };

  // Dequeue from Rear (Deque)
  const handleDequeueRear = () => {
    if (queue.length === 0) {
      setIsUnderflow(true);
      setMessage('⚠️ DEQUE UNDERFLOW! Empty deque.');
      sound.playError();
      return;
    }

    setIsOverflow(false);
    setIsUnderflow(false);

    const dequeuedVal = queue[queue.length - 1];
    const updated = queue.slice(0, -1);
    setQueue(updated);
    setMessage(`Deque Operation: Removed element ${dequeuedVal} from REAR in O(1) time.`);
    sound.playClick();
  };

  const handleReset = () => {
    setQueue(initialQueue);
    setIsOverflow(false);
    setIsUnderflow(false);
    setMessage('Queue reset.');
    sound.playClick();
  };

  return (
    <div className="cyber-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold font-gaming text-cyan-400 flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-cyan-400" />
            Interactive Queue, Circular Buffer &amp; Deque Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Explore FIFO pipelines, FRONT &amp; REAR pointers, circular modulo wrapping $(rear + 1) \pmod m$, and Double-Ended Queue (Deque).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {['circular', 'linear', 'deque'].map(mode => (
              <button
                key={mode}
                onClick={() => { setQueueMode(mode); sound.playClick(); }}
                className={`px-3 py-1 rounded-lg capitalize font-bold transition ${
                  queueMode === mode ? 'bg-cyan-600 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'circular' ? 'Circular Queue' : mode === 'linear' ? 'Linear' : 'Deque (Double-Ended)'}
              </button>
            ))}
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

      {/* Visualizer Area */}
      <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-bold">
            FRONT Pointer: {queue.length > 0 ? `Index 0 (${queue[0]})` : 'NULL'}
          </span>
          <span className="text-cyan-400 font-bold">
            REAR Pointer: {queue.length > 0 ? `Index ${queue.length - 1} (${queue[queue.length - 1]})` : 'NULL'}
          </span>
        </div>

        {/* Queue Pipeline */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center justify-center min-w-max gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
            {/* FRONT EXIT INDICATOR */}
            <div className="text-xs font-mono text-emerald-400 font-bold flex flex-col items-center">
              <span>◄ FRONT</span>
              <span className="text-[10px] text-slate-500">({queueMode === 'deque' ? 'Push / Pop' : 'Dequeue'})</span>
            </div>

            {queue.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queue.length - 1;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="h-5 text-[10px] font-mono font-bold">
                    {isFront && <span className="text-emerald-400">FRONT</span>}
                    {isRear && !isFront && <span className="text-cyan-400">REAR</span>}
                  </div>
                  <div
                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-lg border-2 shadow-lg transition-all ${
                      isFront
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : isRear
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900 border-slate-700 text-slate-100'
                    }`}
                  >
                    <span>{val}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">[{idx}]</span>
                </div>
              );
            })}

            {/* Empty slots preview if circular */}
            {queueMode === 'circular' && Array.from({ length: Math.max(0, capacity - queue.length) }).map((_, i) => (
              <div key={i} className="flex flex-col items-center opacity-40">
                <div className="h-5"></div>
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-xs font-mono text-slate-500">
                  empty
                </div>
                <span className="text-[10px] font-mono text-slate-600 mt-1">[{queue.length + i}]</span>
              </div>
            ))}

            {/* REAR ENTRY INDICATOR */}
            <div className="text-xs font-mono text-cyan-400 font-bold flex flex-col items-center">
              <span>REAR ◄</span>
              <span className="text-[10px] text-slate-500">({queueMode === 'deque' ? 'Push / Pop' : 'Enqueue'})</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            {message}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Enqueue Section */}
        <form onSubmit={handleEnqueueRear} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <input
            type="number"
            placeholder="Value to Enqueue"
            value={valInput}
            onChange={(e) => setValInput(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 outline-none"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2 cyber-button-primary text-xs font-bold">
              Enqueue Rear (O(1))
            </button>
            {queueMode === 'deque' && (
              <button
                type="button"
                onClick={handleEnqueueFront}
                className="flex-1 py-2 cyber-button-purple text-xs font-bold"
              >
                Enqueue Front (Deque)
              </button>
            )}
          </div>
        </form>

        {/* Dequeue Section */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-end space-y-2">
          <button
            onClick={handleDequeueFront}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition"
          >
            Dequeue Front (O(1))
          </button>
          {queueMode === 'deque' && (
            <button
              onClick={handleDequeueRear}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
            >
              Dequeue Rear (Deque)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
