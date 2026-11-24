"""
DAA Project - Comprehensive Empirical Sorting Benchmark in Python
SRM University-AP | Department of CSE (AIML) | Group 4
Team: G. Nithin Kumar, K. Veera Manikanta, R. Rohan Sathwik, D. Rakesh
Faculty Guide: Dr. Nihar Ranjan Pradhan
"""

import sys
import time
import random

sys.setrecursionlimit(200000)

class PerformanceMetrics:
    def __init__(self):
        self.comparisons = 0
        self.swaps = 0

def merge_sort(arr, metrics):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid], metrics)
    right = merge_sort(arr[mid:], metrics)

    return merge(left, right, metrics)

def merge(left, right, metrics):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        metrics.comparisons += 1
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr, low, high, metrics):
    if low < high:
        pi = partition(arr, low, high, metrics)
        quick_sort(arr, low, pi - 1, metrics)
        quick_sort(arr, pi + 1, high, metrics)

def partition(arr, low, high, metrics):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        metrics.comparisons += 1
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            metrics.swaps += 1

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    metrics.swaps += 1
    return i + 1

def run_suite():
    print("=" * 70)
    print("  DAA EMPIRICAL BENCHMARKING SUITE - MERGE SORT VS QUICK SORT")
    print("  SRM University-AP | Group 4 (Sec-Q AIML)")
    print("=" * 70)

    sizes = [100, 500, 1000, 2500, 5000, 10000]
    distributions = ["random", "sorted", "reverse", "duplicates"]

    for dist in distributions:
        print(f"\n--- DATA DISTRIBUTION: {dist.upper()} ---")
        print(f"{'Size (N)':<10} | {'Merge Time (ms)':<15} | {'Quick Time (ms)':<15} | {'Merge Comp':<12} | {'Quick Comp':<12}")
        print("-" * 72)

        for n in sizes:
            if dist == "random":
                test_arr = [random.randint(1, n * 10) for _ in range(n)]
            elif dist == "sorted":
                test_arr = list(range(1, n + 1))
            elif dist == "reverse":
                test_arr = list(range(n, 0, -1))
            elif dist == "duplicates":
                test_arr = [random.choice([10, 20, 30, 40, 50]) for _ in range(n)]

            # Merge Sort
            m_metrics = PerformanceMetrics()
            t0 = time.perf_counter()
            _ = merge_sort(test_arr.copy(), m_metrics)
            t1 = time.perf_counter()
            merge_ms = (t1 - t0) * 1000

            # Quick Sort (with recursion protection for sorted/reverse on Lomuto)
            q_metrics = PerformanceMetrics()
            if dist in ["sorted", "reverse"] and n > 5000:
                quick_ms = float('nan') # Lomuto hits O(N^2) stack overflow
                q_comp_str = f"O(N²) ~ {n*(n-1)//2}"
            else:
                q_arr = test_arr.copy()
                t0 = time.perf_counter()
                quick_sort(q_arr, 0, n - 1, q_metrics)
                t1 = time.perf_counter()
                quick_ms = (t1 - t0) * 1000
                q_comp_str = str(q_metrics.comparisons)

            q_time_str = f"{quick_ms:.3f} ms" if not (quick_ms != quick_ms) else "STACK OVERFLOW"
            print(f"{n:<10} | {merge_ms:<15.3f} | {q_time_str:<15} | {m_metrics.comparisons:<12} | {q_comp_str:<12}")

if __name__ == "__main__":
    run_suite()
