/**
 * DAA Project - Merge Sort vs Quick Sort
 * Main Application Orchestrator & UI Interactions
 * Group 4 - SRM University-AP
 */

import { VisualizerController } from './visualizer.js';
import { BenchmarkController } from './benchmark.js';
import { CODE_SNIPPETS, BenchmarkEngine } from './algorithms.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Visualizer & Benchmark controllers
  const visualizer = new VisualizerController();
  const benchmark = new BenchmarkController();

  visualizer.generateArray();

  // 2. Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.add('hidden'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.classList.remove('hidden');
      }

      // Re-trigger layout for Chart.js if benchmark tab is opened
      if (targetTab === 'benchmark') {
        setTimeout(() => {
          if (benchmark.timeChart) benchmark.timeChart.resize();
          if (benchmark.compChart) benchmark.compChart.resize();
          if (benchmark.memChart) benchmark.memChart.resize();
        }, 100);
      }
    });
  });

  // 3. Visualizer Controls
  const playBtn = document.getElementById('viz-play-btn');
  const pauseBtn = document.getElementById('viz-pause-btn');
  const stepBtn = document.getElementById('viz-step-btn');
  const resetBtn = document.getElementById('viz-reset-btn');
  const sizeSlider = document.getElementById('viz-size-slider');
  const sizeValue = document.getElementById('viz-size-value');
  const speedSlider = document.getElementById('viz-speed-slider');
  const speedValue = document.getElementById('viz-speed-value');
  const distSelect = document.getElementById('viz-dist-select');
  const soundToggle = document.getElementById('viz-sound-toggle');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (visualizer.isPlaying) {
        visualizer.pause();
      } else {
        visualizer.play();
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => visualizer.pause());
  }

  if (stepBtn) {
    stepBtn.addEventListener('click', () => visualizer.stepForward());
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => visualizer.generateArray());
  }

  if (sizeSlider) {
    sizeSlider.addEventListener('input', (e) => {
      visualizer.arraySize = e.target.value;
      if (sizeValue) sizeValue.innerText = e.target.value;
      visualizer.generateArray();
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      // Invert speed so higher slider value = faster animation
      const val = parseInt(e.target.value, 10);
      visualizer.speed = Math.max(5, 520 - val * 5);
      if (speedValue) speedValue.innerText = `${val}x`;
    });
  }

  if (distSelect) {
    distSelect.addEventListener('change', (e) => {
      visualizer.distribution = e.target.value;
      visualizer.generateArray();
    });
  }

  if (soundToggle) {
    soundToggle.addEventListener('change', (e) => {
      visualizer.audioEnabled = e.target.checked;
      if (e.target.checked && visualizer.audioCtx && visualizer.audioCtx.state === 'suspended') {
        visualizer.audioCtx.resume();
      }
    });
  }

  // 4. Benchmark Controls
  const runBenchBtn = document.getElementById('run-benchmark-btn');
  const benchDistSelect = document.getElementById('bench-dist-select');
  const benchPivotSelect = document.getElementById('bench-pivot-select');
  const exportCsvBtn = document.getElementById('export-csv-btn');

  if (runBenchBtn) {
    runBenchBtn.addEventListener('click', () => benchmark.runBenchmarkSuite());
  }

  if (benchDistSelect) {
    benchDistSelect.addEventListener('change', (e) => {
      benchmark.selectedDistribution = e.target.value;
    });
  }

  if (benchPivotSelect) {
    benchPivotSelect.addEventListener('change', (e) => {
      benchmark.quickPivotStrategy = e.target.value;
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => benchmark.exportCSV());
  }

  // 5. Custom Array Sandbox Tester
  const customInput = document.getElementById('custom-array-input');
  const runCustomBtn = document.getElementById('run-custom-btn');
  const customOutputMerge = document.getElementById('custom-merge-result');
  const customOutputQuick = document.getElementById('custom-quick-result');
  const customPresets = document.querySelectorAll('.custom-preset-btn');

  customPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      let val = '';
      if (preset === 'random') val = '45, 12, 89, 23, 7, 64, 38, 91, 5, 52';
      if (preset === 'sorted') val = '2, 8, 14, 21, 35, 42, 59, 73, 88, 99';
      if (preset === 'reverse') val = '99, 88, 73, 59, 42, 35, 21, 14, 8, 2';
      if (preset === 'duplicates') val = '10, 50, 20, 50, 10, 30, 20, 50, 30, 10';
      if (customInput) customInput.value = val;
    });
  });

  if (runCustomBtn && customInput) {
    runCustomBtn.addEventListener('click', () => {
      const raw = customInput.value.trim();
      if (!raw) return;

      const parsed = raw.split(/[\s,]+/).map(x => parseInt(x, 10)).filter(x => !isNaN(x));
      if (parsed.length === 0) {
        alert('Please enter a valid list of numbers separated by commas.');
        return;
      }

      const mergeRes = BenchmarkEngine.runMergeSort(parsed);
      const quickRes = BenchmarkEngine.runQuickSort(parsed, 'last');

      if (customOutputMerge) {
        customOutputMerge.innerHTML = `
          <div class="space-y-1 font-mono text-xs">
            <div class="text-sky-300 font-semibold mb-1">Sorted Array (${mergeRes.sortedArray.length} items):</div>
            <div class="bg-slate-900/80 p-2.5 rounded border border-slate-700/60 overflow-x-auto text-emerald-400">
              [${mergeRes.sortedArray.join(', ')}]
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-slate-300">
              <div>Time: <span class="text-sky-400 font-bold">${mergeRes.timeMs.toFixed(4)} ms</span></div>
              <div>Comparisons: <span class="text-sky-400 font-bold">${mergeRes.comparisons}</span></div>
              <div>Max Stack Depth: <span class="text-sky-400 font-bold">${mergeRes.maxStackDepth}</span></div>
              <div>Auxiliary RAM: <span class="text-sky-400 font-bold">${mergeRes.auxiliaryMemoryBytes} bytes</span></div>
            </div>
          </div>
        `;
      }

      if (customOutputQuick) {
        customOutputQuick.innerHTML = `
          <div class="space-y-1 font-mono text-xs">
            <div class="text-amber-300 font-semibold mb-1">Sorted Array (${quickRes.sortedArray.length} items):</div>
            <div class="bg-slate-900/80 p-2.5 rounded border border-slate-700/60 overflow-x-auto text-emerald-400">
              [${quickRes.sortedArray.join(', ')}]
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-slate-300">
              <div>Time: <span class="text-amber-400 font-bold">${quickRes.timeMs.toFixed(4)} ms</span></div>
              <div>Comparisons: <span class="text-amber-400 font-bold">${quickRes.comparisons}</span></div>
              <div>Max Stack Depth: <span class="text-amber-400 font-bold">${quickRes.maxStackDepth}</span></div>
              <div>Auxiliary RAM: <span class="text-amber-400 font-bold">${quickRes.auxiliaryMemoryBytes} bytes</span></div>
            </div>
          </div>
        `;
      }
    });
  }

  // 6. Code Language Tabs
  const codeLangButtons = document.querySelectorAll('.code-lang-btn');
  const codeBlockMerge = document.getElementById('code-display-merge');
  const codeBlockQuick = document.getElementById('code-display-quick');

  function updateCodeDisplays(lang) {
    if (codeBlockMerge) codeBlockMerge.textContent = CODE_SNIPPETS[lang]?.mergesort || '';
    if (codeBlockQuick) codeBlockQuick.textContent = CODE_SNIPPETS[lang]?.quicksort || '';
  }

  codeLangButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      codeLangButtons.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-400');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-400');
      updateCodeDisplays(lang);
    });
  });

  // Default code snippet language
  updateCodeDisplays('cpp');

  // 7. Copy Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent || targetEl.value || '');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-emerald-400 text-xs">✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 1800);
      }
    });
  });

  // 8. Auto-populate LinkedIn post text
  const linkedinBox = document.getElementById('linkedin-post-content');
  if (linkedinBox) {
    linkedinBox.value = `🚀 Excited to present our Design and Analysis of Algorithms (DAA) Course Project at SRM University-AP!

📌 Project: Comparative Performance Analysis & Interactive Benchmarking of Merge Sort vs Quick Sort across Diverse Data Distributions.

👥 Team Members (Group 4, Sec-Q AIML):
• G. Nithin Kumar (AP25110070740)
• K. Veera Manikanta (AP25110070764)
• R. Rohan Sathwik (AP25110071363)
• D. Rakesh (AP25110071261)

👨‍🏫 Guided by: Dr. Nihar Ranjan Pradhan

✨ Key Findings & Highlights:
1️⃣ Merge Sort guarantees O(N log N) performance under all input distributions (random, sorted, reverse sorted) with stability, but requires O(N) auxiliary space making it ideal for external sorting (databases).
2️⃣ Quick Sort achieves 2-3x faster in-practice performance on random arrays due to superior CPU cache locality and O(1) in-place auxiliary memory, though Lomuto partitioning degrades to O(N²) on sorted arrays without pivot randomization.
3️⃣ Built an interactive web platform with real-time algorithm visualizer, live benchmarking studio (with Chart.js), and custom input sandbox.

🔗 Live Web App: [Insert Your Vercel URL Here]
💻 GitHub Repository: [Insert Your GitHub Repo URL Here]

#Algorithms #DAA #ComputerScience #AIML #SRMUniversity #MergeSort #QuickSort #WebDevelopment #DataStructures`;
  }

  // 9. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
