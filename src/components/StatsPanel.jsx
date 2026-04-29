const spaceComplexity = {
  bubble: 'O(1)',
  selection: 'O(1)',
  insertion: 'O(1)',
  merge: 'O(n)',
  quick: 'O(log n)',
};

const algorithmNames = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
  quick: 'Quick Sort',
};

export default function StatsPanel({
  comparisons,
  swaps,
  animationTime,
  executionTime,
  algorithm,
}) {
  const space = spaceComplexity[algorithm] || 'O(?)';

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        borderTop: '2px solid rgba(79, 70, 229, 0.3)',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div>
        <div style={{ fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '6px' }}>
          Comparisons
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#eab308' }}>
          {comparisons.toLocaleString()}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '6px' }}>
          Swaps
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>
          {swaps.toLocaleString()}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '6px' }}>
          Animation Time
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>
          {animationTime}ms
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '6px' }}>
          Algo Execution
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#4f46e5' }}>
          {executionTime.toFixed(2)}ms
        </div>
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '6px' }}>
          Space Complexity
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8' }}>
          {space}
        </div>
      </div>
    </div>
  );
}
