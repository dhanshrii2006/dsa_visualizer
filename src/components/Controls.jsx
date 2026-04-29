const algorithms = [
  { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
  { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)' },
  { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)' },
  { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
  { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
];

const statusColors = {
  idle: '#94a3b8',
  running: '#22c55e',
  paused: '#f59e0b',
};

const getStatus = (isRunning) => {
  if (isRunning) return { text: '⚡ Running', color: statusColors.running };
  return { text: '⏸️ Ready', color: statusColors.idle };
};

export default function Controls({
  onRandomArray,
  onStart,
  onPause,
  isRunning,
  speed,
  onSpeedChange,
  algorithm,
  onAlgorithmChange,
}) {
  const status = getStatus(isRunning);
  const activeAlgo = algorithms.find((a) => a.id === algorithm);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(15, 23, 42, 0.98)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid rgba(79, 70, 229, 0.3)',
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: '#fff',
        minWidth: '320px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: '20px', color: '#4f46e5', fontWeight: '700' }}>
          Sorting Viz
        </h2>
        <span style={{ fontSize: '12px', color: status.color, fontWeight: '600', letterSpacing: '0.5px' }}>
          {status.text}
        </span>
      </div>

      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(79, 70, 229, 0.2)' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
          Algorithm
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}>
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onAlgorithmChange(algo.id)}
              disabled={isRunning}
              style={{
                padding: '12px 10px',
                background: algorithm === algo.id
                  ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                  : '#1e293b',
                color: '#fff',
                border: algorithm === algo.id ? '2px solid #818cf8' : '1px solid #334155',
                borderRadius: '8px',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontSize: '11px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                opacity: isRunning && algorithm !== algo.id ? 0.5 : 1,
                transform: algorithm === algo.id ? 'scale(1.02)' : 'scale(1)',
              }}
              onMouseOver={(e) => {
                if (!isRunning) {
                  e.target.style.borderColor = '#4f46e5';
                  e.target.style.background = algorithm === algo.id
                    ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                    : '#334155';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = algorithm === algo.id ? '#818cf8' : '#334155';
                e.target.style.background = algorithm === algo.id
                  ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                  : '#1e293b';
              }}
            >
              <div>{algo.name}</div>
              <div style={{ fontSize: '9px', opacity: 0.7, marginTop: '2px' }}>{algo.complexity}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(79, 70, 229, 0.2)' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
          Speed: {Math.round((1 - speed) * 100)}ms
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
            width: '100%',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            accentColor: '#4f46e5',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(79, 70, 229, 0.2)' }}>
        <button
          onClick={onRandomArray}
          disabled={isRunning}
          style={{
            flex: 1,
            padding: '11px',
            background: '#475569',
            color: '#fff',
            border: '1px solid #64748b',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.5 : 1,
            fontWeight: '600',
            fontSize: '13px',
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
            flex: 1,
            padding: '11px',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: '#fff',
            border: '2px solid #4ade80',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.5 : 1,
            fontWeight: '600',
            fontSize: '13px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (!isRunning) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          ▶️ Start
        </button>
        <button
          onClick={onPause}
          disabled={!isRunning}
          style={{
            flex: 1,
            padding: '11px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            border: '2px solid #f87171',
            borderRadius: '8px',
            cursor: !isRunning ? 'not-allowed' : 'pointer',
            opacity: !isRunning ? 0.5 : 1,
            fontWeight: '600',
            fontSize: '13px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (isRunning) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.5)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          ⏸️ Pause
        </button>
      </div>

      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
        <p style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#4f46e5', borderRadius: '2px' }} />
          Default
        </p>
        <p style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#eab308', borderRadius: '2px' }} />
          Comparing
        </p>
        <p style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }} />
          Swapping
        </p>
        <p style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#22c55e', borderRadius: '2px' }} />
          Sorted
        </p>
      </div>
    </div>
  );
}
