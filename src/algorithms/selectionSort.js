export function selectionSort(arr) {
  const startTime = performance.now();
  const steps = [];
  const n = arr.length;
  let array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        swapping: [],
        sorted: Array.from({ length: i }, (_, idx) => idx),
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swaps++;
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      });
    }
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
