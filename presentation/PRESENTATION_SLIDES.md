# Project Presentation: Performance Analysis of Merge Sort vs Quick Sort

**Course:** Design and Analysis of Algorithms (DAA)  
**Section:** Sec-Q (AIML)  
**Institution:** SRM University-AP  
**Faculty Guide:** Dr. Nihar Ranjan Pradhan  
**Group:** Group 4  

---

## Slide 1: Title & Group Details
- **Title:** Comparative Performance Analysis & Interactive Benchmarking of Merge Sort vs Quick Sort across Diverse Data Distributions
- **Team Members:**
  1. G. Nithin Kumar (AP25110070740) - Team Lead, Frontend & Visualizer Architecture
  2. K. Veera Manikanta (AP25110070764) - Benchmarking Engine & Performance Profiling
  3. R. Rohan Sathwik (AP25110071363) - Theoretical Complexity & Recurrence Proofs
  4. D. Rakesh (AP25110071261) - Real-World Applications & Industry Use Cases
- **Faculty Guide:** Dr. Nihar Ranjan Pradhan (`niharranjan.p@srmap.edu.in`)

---

## Slide 2: Problem Statement & Objectives
- **Problem Statement:** Implement both Merge Sort and Quick Sort, evaluate their time complexities, comparison operations, and memory consumption on diverse data distributions (random, sorted, reverse sorted, nearly sorted, duplicates), and evaluate real-time industrial scenarios.
- **Key Objectives:**
  - Build verified implementations in C++, Java, Python, and JavaScript.
  - Engineer an interactive dual-race algorithm visualizer.
  - Conduct empirical benchmarking across $N = 100$ to $50,000$.
  - Demonstrate real-world scenarios where each algorithm is mathematically preferred.

---

## Slide 3: Merge Sort Architecture (Divide & Conquer)
- **Principle:** Recursive division of input array into two equal halves until base case of size 1, followed by a linear two-pointer merge operation.
- **Recurrence Relation:**
  $$T(N) = 2T(N/2) + \Theta(N)$$
- **Master Theorem Analysis:**
  - Form: $T(N) = aT(N/b) + f(N)$, with $a = 2, b = 2, f(N) = \Theta(N)$.
  - $N^{\log_b a} = N^{\log_2 2} = N^1$.
  - By Master Theorem Case 2: $T(N) = \mathbf{\Theta(N \log_2 N)}$ across Best, Average, and Worst cases.
- **Key Characteristics:**
  - **Stability:** Guaranteed Stable (preserves original order of duplicates).
  - **Memory:** Requires $O(N)$ auxiliary heap memory.

---

## Slide 4: Quick Sort Architecture (Partitioning)
- **Principle:** Selects an element as pivot and partitions the array into elements $\le \text{pivot}$ and $> \text{pivot}$, then recursively sorts the partitions in-place.
- **Partitioning Strategies:**
  1. **Lomuto Partition:** Pivot at `arr[high]`, single-direction scanner (Standard syllabus).
  2. **Hoare Partition:** Two pointers moving inwards from both ends (fewer swaps).
  3. **Median-of-Three:** Chooses median of first, middle, and last elements to eliminate pathological worst cases.
- **Recurrence Relations:**
  - Best / Average Case: $T(N) = 2T(N/2) + \Theta(N) = \mathbf{\Theta(N \log N)}$
  - Worst Case: $T(N) = T(N-1) + \Theta(N) = \mathbf{\Theta(N^2)}$

---

## Slide 5: Theoretical Complexity Comparison Matrix

| Dimension | Merge Sort | Quick Sort (Lomuto) | Analytical Justification |
| :--- | :--- | :--- | :--- |
| **Best Case Time** | $\Omega(N \log N)$ | $\Omega(N \log N)$ | Symmetric subarray divisions |
| **Average Case Time** | $\Theta(N \log N)$ | $\Theta(N \log N)$ | Quick Sort has lower constant factors |
| **Worst Case Time** | $O(N \log N)$ | $O(N^2)$ | Lomuto collapses on sorted/reverse arrays |
| **Auxiliary Memory** | $O(N)$ buffer | $O(1)$ data, $O(\log N)$ stack | Merge Sort cannot merge in-place cleanly |
| **Stability** | **Stable** (Yes) | **Unstable** (No) | Pivot swaps alter relative positions |
| **Cache Locality** | Poor (RAM copying) | **Excellent** | Linear memory sweeps inside CPU L1/L2 |

---

## Slide 6: The Pathological $O(N^2)$ Degeneration in Quick Sort
- **Root Cause:** When an array is already sorted or reverse sorted, choosing the last element as pivot creates extremely unbalanced partitions of size $0$ and $N-1$.
- **Mathematical Total Comparisons:**
  $$\sum_{i=1}^{N} i = \frac{N(N-1)}{2} = \mathcal{O}(N^2)$$
- **Recursion Stack Blowup:** Call stack depth escalates from $O(\log N)$ to $O(N)$, causing stack overflow in memory-constrained environments.
- **Mitigation:** Median-of-Three pivot or Randomized Pivot restores average $O(N \log N)$ behavior.

---

## Slide 7: Empirical Benchmarking Methodology
- **Test Matrix:**
  - Input Sizes: $N = 100, 500, 1000, 2500, 5000, 10000$
  - Distributions: Uniform Random, Sorted Ascending, Reverse Sorted, Nearly Sorted, Duplicates.
  - Measurement Tool: Microsecond-precision high-resolution timers (`performance.now()` and `std::chrono`).
- **Empirical Findings Summary:**
  1. On **Random arrays**: Quick Sort runs $1.8\times - 2.5\times$ faster than Merge Sort due to CPU cache locality.
  2. On **Sorted arrays**: Merge Sort maintains steady $O(N \log N)$, while Lomuto Quick Sort exhibits severe parabolic execution time explosion.
  3. On **Nearly Sorted arrays**: Quick Sort maintains superior cache performance.

---

## Slide 8: Real-Time Scenario 1 & 2
- **Scenario 1: External Sorting in Database Management Systems (PostgreSQL, MySQL, Hadoop)**
  - *Context:* Sorting multi-terabyte datasets exceeding physical RAM capacity.
  - *Algorithm:* **External Merge Sort**.
  - *Reasoning:* Merge Sort performs sequential block reads and writes, perfectly matching magnetic disk and NVMe sequential bandwidth. Quick Sort's random index hopping destroys disk I/O performance.
- **Scenario 2: Systems Programming & Standard Libraries (`std::sort`, Java Primitive Arrays)**
  - *Context:* General-purpose in-memory sorting.
  - *Algorithm:* **Quick Sort / Introsort**.
  - *Reasoning:* Minimal auxiliary RAM ($O(1)$) and highest L1/L2 cache hit rate make it optimal for CPU execution.

---

## Slide 9: Real-Time Scenario 3 & 4
- **Scenario 3: Financial Ledgers & E-Commerce Order Books (Amazon, Stock Exchanges)**
  - *Context:* Multi-level sorting (e.g. sort trades primarily by price, preserving secondary timestamp sequence).
  - *Algorithm:* **Merge Sort**.
  - *Reasoning:* **Stability is non-negotiable**. Unstable sorts (Quick Sort) scramble chronologically tied order records.
- **Scenario 4: Embedded Systems & Automotive Microcontrollers (Avionics, IoT, ECU)**
  - *Context:* Systems with strict physical SRAM bounds (e.g., 32 KB).
  - *Algorithm:* **In-Place Quick Sort**.
  - *Reasoning:* Allocating an $O(N)$ auxiliary merge buffer causes instantaneous heap exhaustion and kernel panics.

---

## Slide 10: Interactive Software Component Architecture
- **Tech Stack:** Modern Vanilla JavaScript (ES6+), HTML5 Canvas, Tailwind CSS, Chart.js, Web Audio API.
- **Live Capabilities:**
  - Real-time side-by-side animated race visualizer.
  - Step-by-step frame execution with forward/backward scrubbers.
  - Live Chart.js graphing for Time, Operations, and Memory.
  - Custom Array Sandbox with instant algorithmic output verification.
  - Cloud-ready configuration for 1-click Vercel deployment.

---

## Slide 11: Conclusion
- Neither algorithm is universally superior; selection is governed by operational constraints:
  - Choose **Quick Sort** when sorting **in-memory data with strict memory bounds** and maximum raw CPU throughput.
  - Choose **Merge Sort** when **stability is required**, when **worst-case guarantees are critical**, or when sorting **large external datasets on disk**.

---

## Slide 12: Viva Q&A & References
- Comprehensive Viva Cheatsheet integrated directly into the web platform.
- **Code Repository:** `https://github.com/grandhinithinkumar-gif/DAA-PROJECT`
- **Faculty Guide:** Dr. Nihar Ranjan Pradhan, Department of CSE, SRM University-AP.
