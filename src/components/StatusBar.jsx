const actionMessages = {
  idle: 'Ready to sort',
  running: 'Running...',
  paused: 'Paused',
};

const statusColors = {
  idle: '#94a3b8',
  running: '#22c55e',
  paused: '#f59e0b',
};

const algorithmNames = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
  quick: 'Quick Sort',
};

export default function StatusBar({ isRunning, isPaused, action, algorithm, comparisonValues }) {
  const status = isPaused ? 'paused' : isRunning ? 'running' : 'idle';
  const statusColor = statusColors[status];
  const actionMessage = actionMessages[status];
  const algoName = algorithmNames[algorithm] || 'Unknown';

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        borderBottom: '1px solid rgba(79, 70, 229, 0.3)',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '4px' }}>
            Algorithm
          </div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#4f46e5' }}>
            {algoName}
          </div>
        </div>

        <div style={{ width: '1px', height: '40px', background: 'rgba(79, 70, 229, 0.2)' }} />

        <div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '4px' }}>
            Status
          </div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: statusColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: statusColor, borderRadius: '50%', animation: status === 'running' ? 'pulse 1.5s infinite' : 'none' }} />
            {actionMessage}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '400px' }}>
        <div style={{ fontSize: '12px', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '4px', textAlign: 'right' }}>
          Current Operation
        </div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textAlign: 'right', minHeight: '20px' }}>
          {comparisonValues ? (
            <span>
              {comparisonValues.val1} {comparisonValues.comparison} {comparisonValues.val2} →{' '}
              <span style={{ color: comparisonValues.action === 'swap needed' ? '#ef4444' : '#22c55e', fontWeight: '700' }}>
                {comparisonValues.action}
              </span>
            </span>
          ) : (
            '—'
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
