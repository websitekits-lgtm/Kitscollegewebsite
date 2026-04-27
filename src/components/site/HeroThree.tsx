import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.PlaneGeometry(20, 12, 80, 50), []);
  const original = useMemo(() => geom.attributes.position.array.slice(), [geom]);
  const frameCountRef = useRef(0);

  useFrame((state) => {
    frameCountRef.current++;
    // Only update geometry every 2 frames to reduce CPU load
    if (frameCountRef.current % 2 !== 0) return;

    const t = state.clock.elapsedTime;
    const positions = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = (original as Float32Array)[i];
      const y = (original as Float32Array)[i + 1];
      positions[i + 2] =
        Math.sin(x * 0.4 + t * 0.6) * 0.45 +
        Math.cos(y * 0.5 + t * 0.4) * 0.35 +
        Math.sin((x + y) * 0.3 + t * 0.3) * 0.25;
    }
    geom.attributes.position.needsUpdate = true;
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geom} rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -1.2, 0]}>
      <meshBasicMaterial
        color="#000000"
        wireframe
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const HeroThree = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.6, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <WaveMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};
