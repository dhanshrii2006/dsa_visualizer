export function bubbleSort(arr) {
  const startTime = performance.now();
  const steps = [];
  const n = arr.length;
  let array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from({ length: n }, (_, idx) => idx >= n - i ? idx : null).filter(x => x !== null),
      });

      if (array[j] > array[j + 1]) {
        swaps++;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: Array.from({ length: n }, (_, idx) => idx >= n - i ? idx : null).filter(x => x !== null),
        });
      }
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
