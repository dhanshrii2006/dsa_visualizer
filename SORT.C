// sorting algorithmns using arrays
// bubble sort, selection sort, insertion sort, merge sort, quick sort

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) {
        arr[k++] = L[i++];
    }
    
    while (j < n2) {
        arr[k++] = R[j++];
    }
    
    free(L);
    free(R);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void copyArray(int src[], int dest[], int n) {
    for (int i = 0; i < n; i++) {
        dest[i] = src[i];
    }
}

int main() {
    int n;
    printf("Enter the number of elements in the array: ");
    scanf("%d", &n);
    
    int arr[n];
    printf("Enter the elements of the array: ");
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    printf("\nOriginal Array: ");
    printArray(arr, n);
    
    int choice;
    printf("\nEnter the sorting algorithm you want to use:\n");
    printf("1. Bubble Sort\n");
    printf("2. Selection Sort\n");
    printf("3. Insertion Sort\n");
    printf("4. Merge Sort\n");
    printf("5. Quick Sort\n");
    scanf("%d", &choice);
    
    int temp_arr[n];
    copyArray(arr, temp_arr, n);
    
    switch (choice) {
        case 1:
            bubbleSort(temp_arr, n);
            printf("Sorted using Bubble Sort: ");
            printArray(temp_arr, n);
            break;
        case 2:
            selectionSort(temp_arr, n);
            printf("Sorted using Selection Sort: ");
            printArray(temp_arr, n);
            break;
        case 3:
            insertionSort(temp_arr, n);
            printf("Sorted using Insertion Sort: ");
            printArray(temp_arr, n);
            break;
        case 4:
            mergeSort(temp_arr, 0, n - 1);
            printf("Sorted using Merge Sort: ");
            printArray(temp_arr, n);
            break;
        case 5:
            quickSort(temp_arr, 0, n - 1);
            printf("Sorted using Quick Sort: ");
            printArray(temp_arr, n);
            break;
        default:
            printf("Invalid choice!\n");
    }
    
    printf("\nDo you want to compare two algorithms? (1 for Yes, 0 for No): ");
    int compare;
    scanf("%d", &compare);
    
    if (compare == 1) {
        int alg1, alg2;
        printf("Enter the first sorting algorithm (1-5): ");
        scanf("%d", &alg1);
        printf("Enter the second sorting algorithm (1-5): ");
        scanf("%d", &alg2);
        
        int arr1[n], arr2[n];
        copyArray(arr, arr1, n);
        copyArray(arr, arr2, n);
        
        char *names[] = {"Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"};
        
        switch (alg1) {
            case 1: bubbleSort(arr1, n); break;
            case 2: selectionSort(arr1, n); break;
            case 3: insertionSort(arr1, n); break;
            case 4: mergeSort(arr1, 0, n - 1); break;
            case 5: quickSort(arr1, 0, n - 1); break;
        }
        
        switch (alg2) {
            case 1: bubbleSort(arr2, n); break;
            case 2: selectionSort(arr2, n); break;
            case 3: insertionSort(arr2, n); break;
            case 4: mergeSort(arr2, 0, n - 1); break;
            case 5: quickSort(arr2, 0, n - 1); break;
        }
        
        printf("\n%s result: ", names[alg1 - 1]);
        printArray(arr1, n);
        printf("%s result: ", names[alg2 - 1]);
        printArray(arr2, n);
    }
    
    return 0;
}