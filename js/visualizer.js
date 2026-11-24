/**
 * DAA Project - Merge Sort vs Quick Sort
 * Interactive Visualizer Controller & Audio Synthesizer
 * Group 4 - SRM University-AP
 */

import { VisualizerTracer } from './algorithms.js';

export class VisualizerController {
  constructor() {
    this.arraySize = 25;
    this.speed = 40; // ms per step
    this.distribution = 'random';
    this.audioEnabled = false;
    this.isPlaying = false;
    this.viewMode = 'dual'; // 'dual', 'merge', 'quick'

    this.baseArray = [];
    this.mergeState = {
      array: [],
      steps: [],
      stepIdx: 0,
      comparisons: 0,
      accesses: 0,
      statusMsg: 'Ready to sort',
      activeIndices: [],
      pivotIdx: -1,
      range: []
    };
    this.quickState = {
      array: [],
      steps: [],
      stepIdx: 0,
      comparisons: 0,
      accesses: 0,
      statusMsg: 'Ready to sort',
      activeIndices: [],
      pivotIdx: -1,
      range: []
    };

    this.timer = null;
    this.audioCtx = null;

    this.initAudio();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  playTone(val, maxVal = 100) {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const freq = 180 + (val / maxVal) * 650;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      // Audio error ignored
    }
  }

  generateArray() {
    this.pause();
    const size = parseInt(this.arraySize, 10);
    const arr = [];

    switch (this.distribution) {
      case 'sorted':
        for (let i = 1; i <= size; i++) {
          arr.push(Math.round((i / size) * 95) + 5);
        }
        break;
      case 'reverse':
        for (let i = size; i >= 1; i--) {
          arr.push(Math.round((i / size) * 95) + 5);
        }
        break;
      case 'nearly':
        for (let i = 1; i <= size; i++) {
          arr.push(Math.round((i / size) * 95) + 5);
        }
        // Swap ~10% randomly
        const swaps = Math.max(1, Math.floor(size * 0.1));
        for (let s = 0; s < swaps; s++) {
          const i1 = Math.floor(Math.random() * size);
          const i2 = Math.floor(Math.random() * size);
          const tmp = arr[i1];
          arr[i1] = arr[i2];
          arr[i2] = tmp;
        }
        break;
      case 'duplicates':
        const choices = [15, 35, 60, 85];
        for (let i = 0; i < size; i++) {
          arr.push(choices[Math.floor(Math.random() * choices.length)]);
        }
        break;
      case 'random':
      default:
        for (let i = 0; i < size; i++) {
          arr.push(Math.floor(Math.random() * 90) + 10);
        }
        break;
    }

    this.baseArray = [...arr];

    // Build traces
    const mergeTrace = VisualizerTracer.traceMergeSort(this.baseArray);
    const quickTrace = VisualizerTracer.traceQuickSort(this.baseArray);

    this.mergeState = {
      array: [...this.baseArray],
      steps: mergeTrace.steps,
      stepIdx: 0,
      comparisons: 0,
      accesses: 0,
      statusMsg: 'Merge Sort ready (Divide & Conquer)',
      activeIndices: [],
      pivotIdx: -1,
      range: []
    };

    this.quickState = {
      array: [...this.baseArray],
      steps: quickTrace.steps,
      stepIdx: 0,
      comparisons: 0,
      accesses: 0,
      statusMsg: 'Quick Sort ready (Partitioning)',
      activeIndices: [],
      pivotIdx: -1,
      range: []
    };

    this.render();
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.updateControls();

    const tick = () => {
      if (!this.isPlaying) return;

      const mergeDone = this.mergeState.stepIdx >= this.mergeState.steps.length;
      const quickDone = this.quickState.stepIdx >= this.quickState.steps.length;

      if (mergeDone && quickDone) {
        this.pause();
        this.onFinish();
        return;
      }

      if (!mergeDone) this.advanceStep('merge');
      if (!quickDone) this.advanceStep('quick');

      this.render();
      this.timer = setTimeout(tick, this.speed);
    };

    tick();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.updateControls();
  }

  stepForward() {
    this.pause();
    this.advanceStep('merge');
    this.advanceStep('quick');
    this.render();
  }

  advanceStep(algoKey) {
    const state = algoKey === 'merge' ? this.mergeState : this.quickState;
    if (state.stepIdx >= state.steps.length) return;

    const step = state.steps[state.stepIdx];
    state.stepIdx++;

    state.activeIndices = [];
    state.pivotIdx = -1;
    state.range = [];

    if (step.comparisons !== undefined) state.comparisons = step.comparisons;
    if (step.arrayAccesses !== undefined) state.accesses = step.arrayAccesses;
    if (step.message) state.statusMsg = step.message;

    switch (step.type) {
      case 'highlight-range':
      case 'divide':
        state.range = step.range || [];
        break;
      case 'compare':
        state.activeIndices = step.indices;
        if (step.pivotIndex !== undefined) state.pivotIdx = step.pivotIndex;
        this.playTone(state.array[step.indices[0]] || 50);
        break;
      case 'overwrite':
        state.array[step.index] = step.value;
        state.activeIndices = [step.index];
        this.playTone(step.value);
        break;
      case 'swap':
        state.activeIndices = step.indices;
        const [i, j] = step.indices;
        const tmp = state.array[i];
        state.array[i] = state.array[j];
        state.array[j] = tmp;
        this.playTone(state.array[i]);
        break;
      case 'pivot-select':
        state.pivotIdx = step.index;
        state.range = step.range || [];
        break;
      case 'pivot-placed':
        state.pivotIdx = step.index;
        break;
      case 'sorted':
        state.activeIndices = [step.index];
        break;
    }
  }

  onFinish() {
    this.mergeState.statusMsg = `✅ Merge Sort Complete! Total: ${this.mergeState.comparisons} comparisons`;
    this.quickState.statusMsg = `⚡ Quick Sort Complete! Total: ${this.quickState.comparisons} comparisons`;
    this.render();
    if (window.confetti) {
      try {
        window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      } catch (e) {}
    }
  }

  render() {
    this.renderBars('merge-bars-container', this.mergeState);
    this.renderBars('quick-bars-container', this.quickState);

    // Update stats UI
    const mComp = document.getElementById('merge-comparisons');
    const mAcc = document.getElementById('merge-accesses');
    const mMsg = document.getElementById('merge-status-msg');
    const mProg = document.getElementById('merge-progress');

    if (mComp) mComp.innerText = this.mergeState.comparisons.toLocaleString();
    if (mAcc) mAcc.innerText = this.mergeState.accesses.toLocaleString();
    if (mMsg) mMsg.innerText = this.mergeState.statusMsg;
    if (mProg) {
      const pct = this.mergeState.steps.length
        ? Math.round((this.mergeState.stepIdx / this.mergeState.steps.length) * 100)
        : 0;
      mProg.style.width = `${pct}%`;
    }

    const qComp = document.getElementById('quick-comparisons');
    const qAcc = document.getElementById('quick-accesses');
    const qMsg = document.getElementById('quick-status-msg');
    const qProg = document.getElementById('quick-progress');

    if (qComp) qComp.innerText = this.quickState.comparisons.toLocaleString();
    if (qAcc) qAcc.innerText = this.quickState.accesses.toLocaleString();
    if (qMsg) qMsg.innerText = this.quickState.statusMsg;
    if (qProg) {
      const pct = this.quickState.steps.length
        ? Math.round((this.quickState.stepIdx / this.quickState.steps.length) * 100)
        : 0;
      qProg.style.width = `${pct}%`;
    }
  }

  renderBars(containerId, state) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const maxVal = Math.max(...state.array, 100);
    const n = state.array.length;

    state.array.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'visualizer-bar';

      // Height
      const heightPct = Math.max(6, (val / maxVal) * 98);
      bar.style.height = `${heightPct}%`;

      // Determine color state
      let colorClass = 'bar-default';

      const isFinished = state.stepIdx >= state.steps.length;
      if (isFinished) {
        colorClass = 'bar-sorted';
      } else if (idx === state.pivotIdx) {
        colorClass = 'bar-pivot';
      } else if (state.activeIndices.includes(idx)) {
        colorClass = 'bar-active';
      } else if (state.range && idx >= state.range[0] && idx <= state.range[1]) {
        colorClass = 'bar-range';
      }

      bar.classList.add(colorClass);

      // Label for smaller sizes
      if (n <= 35) {
        const valSpan = document.createElement('span');
        valSpan.className = 'bar-label';
        valSpan.innerText = val;
        bar.appendChild(valSpan);
      }

      if (idx === state.pivotIdx && !isFinished) {
        const pivotTag = document.createElement('span');
        pivotTag.className = 'pivot-tag';
        pivotTag.innerText = 'P';
        bar.appendChild(pivotTag);
      }

      container.appendChild(bar);
    });
  }

  updateControls() {
    const playBtn = document.getElementById('viz-play-btn');
    if (playBtn) {
      if (this.isPlaying) {
        playBtn.innerHTML = `<i data-lucide="pause" class="w-5 h-5 mr-1 inline"></i> Pause`;
        playBtn.classList.add('bg-amber-600', 'hover:bg-amber-700');
        playBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
      } else {
        playBtn.innerHTML = `<i data-lucide="play" class="w-5 h-5 mr-1 inline"></i> Start Race`;
        playBtn.classList.remove('bg-amber-600', 'hover:bg-amber-700');
        playBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }
}
