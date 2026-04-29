export function mergeSort(arr) {
  const startTime = performance.now();
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function merge(array, left, mid, right) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      steps.push({
        array: [...array],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [],
      });

      if (leftArr[i] <= rightArr[j]) {
        array[k++] = leftArr[i++];
      } else {
        array[k++] = rightArr[j++];
      }
      swaps++;
    }

    while (i < leftArr.length) {
      array[k++] = leftArr[i++];
      swaps++;
    }

    while (j < rightArr.length) {
      array[k++] = rightArr[j++];
      swaps++;
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [],
    });
  }

  function mergeSortHelper(array, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(array, left, mid);
      mergeSortHelper(array, mid + 1, right);
      merge(array, left, mid, right);
    }
  }

  let array = [...arr];
  mergeSortHelper(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
  });

  const executionTime = performance.now() - startTime;

  return {
    steps,
    comparisons,
    swaps,
    executionTime,
  };
}
