// ============================================================================
// DAA Course Project - Merge Sort Implementation & Performance Analysis
// SRM University-AP | Department of CSE (AIML) | Group 4
// Team: G. Nithin Kumar, K. Veera Manikanta, R. Rohan Sathwik, D. Rakesh
// Faculty Guide: Dr. Nihar Ranjan Pradhan
// ============================================================================

#include <iostream>
#include <vector>
#include <chrono>
#include <random>

long long merge_comparisons = 0;

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    std::vector<int> L(n1);
    std::vector<int> R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        merge_comparisons++;
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    std::cout << "=== Merge Sort Benchmark (DAA Group 4) ===" << std::endl;
    std::vector<int> sizes = {1000, 5000, 10000, 50000};

    std::mt19937 rng(42);
    for (int n : sizes) {
        std::vector<int> arr(n);
        for (int i = 0; i < n; i++) arr[i] = rng() % 100000;

        merge_comparisons = 0;
        auto start = std::chrono::high_resolution_clock::now();
        mergeSort(arr, 0, n - 1);
        auto stop = std::chrono::high_resolution_clock::now();

        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(stop - start);
        std::cout << "N = " << n 
                  << " | Time: " << duration.count() / 1000.0 << " ms"
                  << " | Comparisons: " << merge_comparisons << std::endl;
    }
    return 0;
}
