# DAA Project: Performance Analysis & Interactive Benchmarking of Merge Sort vs Quick Sort

**Course:** Design and Analysis of Algorithms (DAA)  
**Section:** Sec-Q (AIML)  
**Institution:** SRM University-AP  
**Faculty Guide:** Dr. Nihar Ranjan Pradhan (`niharranjan.p@srmap.edu.in`)  
**Project Group:** Group 4  

---

## 👥 Group 4 Members
1. **G. Nithin Kumar** — `AP25110070740` (Project Lead & Frontend/Visualizer Architecture)
2. **K. Veera Manikanta** — `AP25110070764` (`manikanta_kedasu@srmap.edu.in`) (Empirical Benchmarking & Memory Profiling)
3. **R. Rohan Sathwik** — `AP25110071363` (`sathwik_rokkam@srmuap.edu.in`) (Theoretical Complexity & Recurrence Proofs)
4. **D. Rakesh** — `AP25110071261` (`rakesh_danaboyina@srmap.edu.in`) (Real-World Industry Applications & Scenarios)

---

## 📋 Problem Statement
> **"Implement both Merge Sort and Quick Sort and analyze their performance on various data distributions (e.g., random, sorted, reverse sorted). Evaluate and compare their time complexities and memory usage for different input sizes. Write down the real time Scenarios where this problem statement can be applicable."**

---

## 🚀 How to Deploy on Vercel (Instant 2-Minute Deployment)

### Method 1: Deploy via GitHub (Recommended for Submission)
1. Initialize Git in this project folder and push to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of DAA Group 4 Sorting Project"
   git branch -M main
   git remote add origin https://github.com/<your-username>/daa-sorting-project.git
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New Project"** -> **"Import Git Repository"**.
4. Select your `daa-sorting-project` repository.
5. In the **Framework Preset**, select **"Other"** (it is a clean static web app, no build step required).
6. Click **Deploy**. Within 15 seconds, your live production URL (e.g., `https://daa-sorting-project.vercel.app`) will be ready!

### Method 2: Deploy directly via Vercel CLI (No Git required)
If you have Vercel CLI installed:
```bash
npx vercel
```
Follow the quick prompts and your deployment URL will be generated instantly.

---

## 💻 How to Run Locally

You can run the web app locally using Python's built-in web server:

```bash
cd "C:\Users\Nithin\.gemini\antigravity\scratch\daa-sorting-visualizer"
python -m http.server 3000
```
Open your browser and navigate to:  
👉 **`http://localhost:3000`**

---

## 🌟 Key Application Features

1. **⚡ Side-by-Side Live Race Visualizer**:
   - Compare Merge Sort and Quick Sort executing simultaneously on the identical input dataset.
   - Real-time step counter, comparison counter, array accesses/swaps tracker, and auxiliary stack depth monitor.
   - Frequency-modulated audio tone generator using the Web Audio API.
   - Supports 5 data distributions: Random, Already Sorted, Reverse Sorted, Nearly Sorted (~90%), and Heavy Duplicates.
   - Interactive speed controller (10x to 100x) and array size slider (10 to 60 elements).

2. **📊 High-Precision Benchmarking Studio**:
   - Evaluates input sizes from $N = 100$ to $N = 50,000$ using sub-millisecond precision (`performance.now()`).
   - 3 dynamic interactive Chart.js visualizations:
     1. Execution Time vs Input Size (ms)
     2. Comparison Operations Count vs Input Size
     3. Auxiliary RAM Memory Footprint vs Input Size
   - One-click **Export to CSV** button to download data tables for your formal lab report.

3. **🧪 Custom Array Sandbox**:
   - Test any custom user array (e.g. `[45, 12, 89, 23, 7, 64]`).
   - Side-by-side verification with detailed computational statistics.

4. **📐 Theoretical & Complexity Matrix**:
   - Rigorous Big-O, $\Omega$, and $\Theta$ breakdown across Best, Average, and Worst cases.
   - Master Theorem Case 2 proof for Merge Sort: $T(N) = 2T(N/2) + \Theta(N) \implies \Theta(N \log N)$.
   - Lomuto partitioning pathological breakdown: $T(N) = T(N-1) + \Theta(N) \implies \Theta(N^2)$.
   - Hardware CPU cache locality and space-time tradeoff justifications.

5. **🌍 Real-World Scenarios & Industry Applicability**:
   - **External Sorting in Relational Databases (PostgreSQL / MySQL / Hadoop)**: Why Merge Sort wins due to sequential disk I/O.
   - **Standard Library & Systems Programming (`std::sort`, Java DualPivotQuicksort)**: Why Quick Sort wins in RAM due to cache hits and $O(1)$ extra space.
   - **Financial Ledgers & E-Commerce Order Books**: Why Merge Sort is mandatory to preserve stability for identical timestamps.
   - **Embedded IoT & Automotive Microcontrollers**: Why Quick Sort is chosen to prevent $O(N)$ dynamic memory allocation crashes.

6. **💻 Production Implementations**:
   - Clean, modular code in C++, Java, and Python with one-click copy buttons.

---

## 📊 Summary of Theoretical Complexity

| Dimension | Merge Sort | Quick Sort (Lomuto) | Analytical Justification |
| :--- | :--- | :--- | :--- |
| **Best Case Time** | $\Omega(N \log N)$ | $\Omega(N \log N)$ | Balanced subproblems split $N/2$ each time |
| **Average Case Time** | $\Theta(N \log N)$ | $\Theta(N \log N)$ | Quick Sort is $2\times - 3\times$ faster in CPU cycles due to cache locality |
| **Worst Case Time** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N^2)$ | Lomuto splits into $0$ and $N-1$ when array is already sorted/reverse sorted |
| **Auxiliary Memory** | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ data, $\mathcal{O}(\log N)$ stack | Merge Sort requires temporary merge buffer arrays |
| **Stability** | **STABLE** (Yes) | **UNSTABLE** (No) | Merge Sort maintains relative order of duplicate elements |
| **Sorting In-Place?** | No | **Yes** | Quick Sort modifies input array via pointer swaps |

---

## 🎥 Team Video Explanation Script (Deliverable #4 Guide)

For the required video where all 4 team members explain their work:
- **Member 1 (G. Nithin Kumar):** Introduce Group 4, project objectives, web frontend architecture, and demonstrate the live race visualizer.
- **Member 2 (K. Veera Manikanta):** Explain the Benchmarking Studio, empirical results across the 5 distributions, and demonstrate the Chart.js graphs.
- **Member 3 (R. Rohan Sathwik):** Cover the theoretical asymptotic complexities, Master Theorem proof, and Lomuto $O(N^2)$ degradation.
- **Member 4 (D. Rakesh):** Present the 4 real-world industry scenarios (Databases, Systems programming, Financial Ledgers, and Embedded Systems).

---

## 📄 Submission Checklist
- [x] Web Frontend & Visualizer Built
- [x] Benchmarking Suite & Charts Integrated
- [x] Vercel Deployment Configuration (`vercel.json`, `package.json`)
- [x] C++, Java, Python Source Code Included
- [x] Viva Q&A Cheatsheet Included in Web App
- [x] Pre-written LinkedIn Post Generator Built-in
