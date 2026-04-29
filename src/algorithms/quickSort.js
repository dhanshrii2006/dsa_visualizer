export function quickSort(arr) {
  const startTime = performance.now();
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        array: [...array],
        comparing: [j, high],
        swapping: [],
        sorted: [],
      });

      if (array[j] < pivot) {
        i++;
        swaps++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, j],
          sorted: [],
        });
      }
    }

    swaps++;
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [],
    });

    return i + 1;
  }

  function quickSortHelper(array, low, high) {
    if (low < high) {
      const pi = partition(array, low, high);
      quickSortHelper(array, low, pi - 1);
      quickSortHelper(array, pi + 1, high);
    }
  }

  let array = [...arr];
  quickSortHelper(array, 0, array.length - 1);

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
