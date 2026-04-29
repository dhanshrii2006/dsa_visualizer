export default function BarChart({ array, barColors, action }) {
  const barHeight = 300; // Fixed max height for visualization
  const maxValue = 20;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '8px',
        padding: '40px 20px 20px 20px',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '8px',
        margin: '20px',
      }}
    >
      {array.map((value, index) => {
        const height = (value / maxValue) * barHeight;
        const color = barColors[index] || '#4f46e5';

        return (
          <div
            key={index}
            style={{
              width: `${100 / array.length - 0.5}%`,
              height: `${height}px`,
              background: color,
              borderRadius: '4px 4px 0 0',
              transition: 'all 0.15s ease-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#fff',
              fontWeight: '700',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              cursor: 'default',
              position: 'relative',
              boxShadow: color !== '#4f46e5' ? `0 0 12px ${color}33` : 'none',
              minHeight: '30px',
            }}
            title={`Value: ${value}`}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}
