import { useState, useCallback, useRef, useEffect } from 'react';
import ControlsBar from './components/ControlsBar.jsx';
import StatusBar from './components/StatusBar.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import BarChart from './components/BarChart.jsx';
import LandingPage from './components/LandingPage.jsx';
import { bubbleSort } from './algorithms/bubbleSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { quickSort } from './algorithms/quickSort.js';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [array, setArray] = useState(
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 20) + 1)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [speed, setSpeed] = useState(0.7);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [barColors, setBarColors] = useState({});
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);
  const [animationTime, setAnimationTime] = useState(0);
  const [comparisonValues, setComparisonValues] = useState(null);
  const stepIndexRef = useRef(0);
  const animationRef = useRef(null);
  const animationStartRef = useRef(null);

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 20) + 1
    );
    setArray(newArray);
    setIsRunning(false);
    setIsPaused(false);
    setSortingSteps([]);
    setBarColors({});
    setComparisons(0);
    setSwaps(0);
    setExecutionTime(0);
    setAnimationTime(0);
    setComparisonValues(null);
    stepIndexRef.current = 0;
  }, []);

  // Start sorting
  const handleStart = useCallback(() => {
    const algorithmMap = {
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort,
    };

    const sortFunc = algorithmMap[algorithm];
    const result = sortFunc([...array]);
    
    setSortingSteps(result.steps);
    setComparisons(result.comparisons);
    setSwaps(result.swaps);
    setExecutionTime(result.executionTime);
    setAnimationTime(0);
    setIsRunning(true);
    setIsPaused(false);
    setBarColors({});
    setComparisonValues(null);
    stepIndexRef.current = 0;
    animationStartRef.current = performance.now();
  }, [array, algorithm]);

  // Pause/Resume
  const handlePause = useCallback(() => {
    setIsRunning(false);
    setIsPaused(true);
  }, []);

  // Change algorithm
  const handleAlgorithmChange = useCallback((algo) => {
    setAlgorithm(algo);
    setIsRunning(false);
    setIsPaused(false);
    setSortingSteps([]);
    setBarColors({});
    setComparisons(0);
    setSwaps(0);
    setExecutionTime(0);
    setAnimationTime(0);
    setComparisonValues(null);
    stepIndexRef.current = 0;
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isRunning || !sortingSteps || sortingSteps.length === 0) {
      if (!isRunning && !isPaused && stepIndexRef.current > 0 && stepIndexRef.current >= sortingSteps.length) {
        // All sorted
        const colors = {};
        array.forEach((_, idx) => {
          colors[idx] = '#22c55e';
        });
        setBarColors(colors);
        setComparisonValues(null);
      }
      return;
    }

    const animationDelay = Math.max(10, (1 - speed) * 100);

    const animate = () => {
      if (stepIndexRef.current < sortingSteps.length) {
        const step = sortingSteps[stepIndexRef.current];
        setArray(step.array);

        // Calculate animation time elapsed
        const elapsed = performance.now() - (animationStartRef.current || performance.now());
        setAnimationTime(Math.round(elapsed));

        // Determine comparison values and action
        let compValues = null;
        if (step.comparing.length === 2) {
          const val1 = step.array[step.comparing[0]];
          const val2 = step.array[step.comparing[1]];
          compValues = {
            val1,
            val2,
            comparison: val1 > val2 ? '>' : val1 < val2 ? '<' : '=',
            action: val1 > val2 ? 'swap needed' : 'no swap',
          };
        } else if (step.swapping.length === 2) {
          const val1 = step.array[step.swapping[0]];
          const val2 = step.array[step.swapping[1]];
          compValues = {
            val1,
            val2,
            comparison: '↔',
            action: 'swapping',
          };
        }
        setComparisonValues(compValues);

        // Set colors based on step state
        const colors = {};
        step.array.forEach((_, idx) => {
          colors[idx] = '#4f46e5'; // default blue
        });

        step.comparing.forEach((idx) => {
          colors[idx] = '#eab308'; // yellow
        });

        step.swapping.forEach((idx) => {
          colors[idx] = '#ef4444'; // red
        });

        step.sorted.forEach((idx) => {
          colors[idx] = '#22c55e'; // green
        });

        setBarColors(colors);
        stepIndexRef.current += 1;

        animationRef.current = setTimeout(animate, animationDelay);
      } else {
        // Finished
        setIsRunning(false);
        const elapsed = performance.now() - (animationStartRef.current || performance.now());
        setAnimationTime(Math.round(elapsed));
        setComparisonValues(null);
        const colors = {};
        array.forEach((_, idx) => {
          colors[idx] = '#22c55e';
        });
        setBarColors(colors);
      }
    };

    animationRef.current = setTimeout(animate, animationDelay);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isRunning, stepIndexRef.current, sortingSteps, speed, array]);

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#0a0e27',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      {/* Controls at top */}
      <ControlsBar
        onRandomArray={generateRandomArray}
        onStart={handleStart}
        onPause={handlePause}
        isRunning={isRunning}
        speed={speed}
        onSpeedChange={setSpeed}
        algorithm={algorithm}
        onAlgorithmChange={handleAlgorithmChange}
      />

      {/* Status Bar */}
      <StatusBar
        isRunning={isRunning}
        isPaused={isPaused}
        action=""
        algorithm={algorithm}
        comparisonValues={comparisonValues}
      />

      {/* Stats Panel */}
      <StatsPanel
        comparisons={comparisons}
        swaps={swaps}
        animationTime={animationTime}
        executionTime={executionTime}
        algorithm={algorithm}
      />

      {/* Main visualization area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <BarChart array={array} barColors={barColors} action="" />
      </div>
    </div>
  );
}
