import { useState, useEffect, useRef } from 'react';
import Bar from './Bar.jsx';

export default function Canvas3D({ sortingSteps, isAnimating, speed }) {
  const [array, setArray] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [barColors, setBarColors] = useState({});
  const animationRef = useRef(null);

  // Initialize array
  useEffect(() => {
    const randomArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 20) + 1
    );
    setArray(randomArray);
    setBarColors({});
  }, []);

  // Animate through sorting steps
  useEffect(() => {
    if (!isAnimating || !sortingSteps || sortingSteps.length === 0) {
      return;
    }

    const animationDelay = Math.max(10, (1 - speed) * 100);

    const animate = () => {
      if (stepIndex < sortingSteps.length) {
        const step = sortingSteps[stepIndex];
        setArray(step.array);

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
        setStepIndex(stepIndex + 1);

        animationRef.current = setTimeout(animate, animationDelay);
      }
    };

    animationRef.current = setTimeout(animate, animationDelay);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isAnimating, stepIndex, sortingSteps, speed]);

  const barWidth = 1.8;
  const spacing = 0.5;
  const totalWidth = array.length * (barWidth + spacing);

  return (
    <group position={[0, 0, 0]}>
      {array.map((value, index) => (
        <Bar
          key={index}
          value={value}
          position={[index * (barWidth + spacing) - totalWidth / 2, value / 2, 0]}
          width={barWidth}
          height={value}
          depth={barWidth}
          color={barColors[index] || '#4f46e5'}
        />
      ))}
    </group>
  );
}

