// ============================================================================
// DAA Course Project - Quick Sort Implementation & Performance Analysis
// SRM University-AP | Department of CSE (AIML) | Group 4
// Team: G. Nithin Kumar, K. Veera Manikanta, R. Rohan Sathwik, D. Rakesh
// Faculty Guide: Dr. Nihar Ranjan Pradhan
// ============================================================================

#include <iostream>
#include <vector>
#include <chrono>
#include <random>

long long quick_comparisons = 0;
long long quick_swaps = 0;

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // Lomuto partition strategy
    int i = low - 1;

    for (int j = low; j < high; j++) {
        quick_comparisons++;
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
            quick_swaps++;
        }
    }
    std::swap(arr[i + 1], arr[high]);
    quick_swaps++;
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::cout << "=== Quick Sort Benchmark (DAA Group 4) ===" << std::endl;
    std::vector<int> sizes = {1000, 5000, 10000, 50000};

    std::mt19937 rng(42);
    for (int n : sizes) {
        std::vector<int> arr(n);
        for (int i = 0; i < n; i++) arr[i] = rng() % 100000;

        quick_comparisons = 0;
        quick_swaps = 0;
        auto start = std::chrono::high_resolution_clock::now();
        quickSort(arr, 0, n - 1);
        auto stop = std::chrono::high_resolution_clock::now();

        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(stop - start);
        std::cout << "N = " << n 
                  << " | Time: " << duration.count() / 1000.0 << " ms"
                  << " | Comparisons: " << quick_comparisons
                  << " | Swaps: " << quick_swaps << std::endl;
    }
    return 0;
}
