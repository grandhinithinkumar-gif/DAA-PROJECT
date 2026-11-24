// ============================================================================
// DAA Course Project - Merge Sort Implementation in Java
// SRM University-AP | Department of CSE (AIML) | Group 4
// Team: G. Nithin Kumar, K. Veera Manikanta, R. Rohan Sathwik, D. Rakesh
// Faculty Guide: Dr. Nihar Ranjan Pradhan
// ============================================================================

import java.util.Random;

public class MergeSort {
    public static long comparisons = 0;

    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            comparisons++;
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }

        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void sort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            sort(arr, left, mid);
            sort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public static void main(String[] args) {
        int[] sizes = {1000, 5000, 10000, 50000};
        Random rand = new Random(42);

        System.out.println("=== Java Merge Sort Benchmark (DAA Group 4) ===");
        for (int n : sizes) {
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) arr[i] = rand.nextInt(100000);

            comparisons = 0;
            long start = System.nanoTime();
            sort(arr, 0, n - 1);
            long end = System.nanoTime();

            double ms = (end - start) / 1e6;
            System.out.printf("N = %d | Time: %.3f ms | Comparisons: %d\n", n, ms, comparisons);
        }
    }
}
