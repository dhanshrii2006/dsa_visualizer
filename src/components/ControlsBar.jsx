const algorithms = [
  { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
  { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)' },
  { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
  { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
  { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
];

export default function ControlsBar({
  onRandomArray,
  onStart,
  onPause,
  isRunning,
  speed,
  onSpeedChange,
  algorithm,
  onAlgorithmChange,
}) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        borderBottom: '2px solid #4f46e5',
        padding: '20px',
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Algorithm Selector */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label style={{ fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', whiteSpace: 'nowrap' }}>
          Algorithm:
        </label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onAlgorithmChange(algo.id)}
              disabled={isRunning}
              title={`${algo.name} - ${algo.complexity}`}
              style={{
                padding: '8px 12px',
                background: algorithm === algo.id
                  ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                  : '#1e293b',
                color: '#fff',
                border: algorithm === algo.id ? '2px solid #818cf8' : '1px solid #334155',
                borderRadius: '6px',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontSize: '11px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                opacity: isRunning && algorithm !== algo.id ? 0.4 : 1,
              }}
              onMouseOver={(e) => {
                if (!isRunning) {
                  e.target.style.borderColor = '#4f46e5';
                  if (algorithm !== algo.id) e.target.style.background = '#334155';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = algorithm === algo.id ? '#818cf8' : '#334155';
                e.target.style.background = algorithm === algo.id
                  ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                  : '#1e293b';
              }}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '30px', background: 'rgba(79, 70, 229, 0.2)' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onRandomArray}
          disabled={isRunning}
          style={{
            padding: '10px 16px',
            background: '#475569',
            color: '#fff',
            border: '1px solid #64748b',
            borderRadius: '6px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.5 : 1,
            fontWeight: '600',
            fontSize: '12px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (!isRunning) {
              e.target.style.background = '#64748b';
              e.target.style.borderColor = '#94a3b8';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#475569';
            e.target.style.borderColor = '#64748b';
          }}
        >
          🔀 Randomize
        </button>

        <button
          onClick={onStart}
          disabled={isRunning}
          style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: '#fff',
            border: '2px solid #4ade80',
            borderRadius: '6px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.5 : 1,
            fontWeight: '600',
            fontSize: '12px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (!isRunning) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          ▶️ Start
        </button>

        <button
          onClick={onPause}
          disabled={!isRunning}
          style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            border: '2px solid #f87171',
            borderRadius: '6px',
            cursor: !isRunning ? 'not-allowed' : 'pointer',
            opacity: !isRunning ? 0.5 : 1,
            fontWeight: '600',
            fontSize: '12px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (isRunning) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          ⏸️ Pause
        </button>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '30px', background: 'rgba(79, 70, 229, 0.2)' }} />

      {/* Speed Slider */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: '200px' }}>
        <label style={{ fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', whiteSpace: 'nowrap' }}>
          Speed:
        </label>
        <input
          type="range"
          min="0"
          max="0.99"
          step="0.01"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          disabled={isRunning}
          style={{
            flex: 1,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            accentColor: '#4f46e5',
            opacity: isRunning ? 0.6 : 1,
          }}
        />
        <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600', minWidth: '40px', textAlign: 'right' }}>
          {Math.round((1 - speed) * 100)}ms
        </span>
      </div>
    </div>
  );
}
