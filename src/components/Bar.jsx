export default function Bar({ value, position, width, height, depth, color }) {
  // Different intensity for active vs default bars
  const isActive = color !== '#4f46e5';
  
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isActive ? 0.6 : 0}
        metalness={0.3}
        roughness={0.4}
        toneMapped={true}
      />
    </mesh>
  );
}
