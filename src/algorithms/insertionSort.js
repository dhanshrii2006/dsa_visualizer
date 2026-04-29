export function insertionSort(arr) {
  const startTime = performance.now();
  const steps = [];
  const n = arr.length;
  let array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      comparisons++;
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from({ length: i }, (_, idx) => idx),
      });

      swaps++;
      array[j + 1] = array[j];
      j--;

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [j + 1, j + 2],
        sorted: Array.from({ length: i }, (_, idx) => idx),
      });
    }

    array[j + 1] = key;
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
  });

  const executionTime = performance.now() - startTime;

  return {
    steps,
    comparisons,
    swaps,
    executionTime,
  };
}
