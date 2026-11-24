// ============================================================================
// DAA Course Project - Quick Sort Implementation in Java
// SRM University-AP | Department of CSE (AIML) | Group 4
// Team: G. Nithin Kumar, K. Veera Manikanta, R. Rohan Sathwik, D. Rakesh
// Faculty Guide: Dr. Nihar Ranjan Pradhan
// ============================================================================

import java.util.Random;

public class QuickSort {
    public static long comparisons = 0;
    public static long swaps = 0;

    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            comparisons++;
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                swaps++;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        swaps++;
        return i + 1;
    }

    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        int[] sizes = {1000, 5000, 10000, 50000};
        Random rand = new Random(42);

        System.out.println("=== Java Quick Sort Benchmark (DAA Group 4) ===");
        for (int n : sizes) {
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) arr[i] = rand.nextInt(100000);

            comparisons = 0;
            swaps = 0;
            long start = System.nanoTime();
            sort(arr, 0, n - 1);
            long end = System.nanoTime();

            double ms = (end - start) / 1e6;
            System.out.printf("N = %d | Time: %.3f ms | Comparisons: %d | Swaps: %d\n", n, ms, comparisons, swaps);
        }
    }
}
