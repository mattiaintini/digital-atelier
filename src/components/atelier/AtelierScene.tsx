import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useAtelierStore, MaterialType, palettes } from '@/stores/atelierStore';

function getMaterial(type: MaterialType) {
  switch (type) {
    case 'obsidian':
      return <meshPhysicalMaterial color="#0a0a0a" metalness={0.9} roughness={0.05} clearcoat={1} clearcoatRoughness={0.1} reflectivity={1} envMapIntensity={2} />;
    case 'frosted-glass':
      return <meshPhysicalMaterial color="#ffffff" metalness={0} roughness={0.15} transmission={0.9} thickness={0.5} ior={1.5} transparent opacity={0.7} envMapIntensity={1.5} />;
    case 'gold':
      return <meshPhysicalMaterial color="#D97757" metalness={1} roughness={0.15} clearcoat={0.5} clearcoatRoughness={0.2} envMapIntensity={2.5} />;
    case 'marble':
      return <meshPhysicalMaterial color="#f0ede8" metalness={0.05} roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.15} envMapIntensity={1.2} />;
    case 'carbon':
      return <meshPhysicalMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1.8} />;
    case 'holographic':
      return <meshPhysicalMaterial color="#c084fc" metalness={0.3} roughness={0.1} clearcoat={1} clearcoatRoughness={0.05} iridescence={1} iridescenceIOR={1.3} envMapIntensity={3} />;
  }
}

// ─── Floating Device / Site Preview Card ───
function FloatingDevice() {
  const groupRef = useRef<THREE.Group>(null);
  const palette = useAtelierStore((s) => s.palette);

  const paletteColors = palettes.find((p) => p.id === palette)?.colors || palettes[0].colors;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef}>
        <RoundedBox args={[2.8, 1.7, 0.04]} radius={0.04} smoothness={8} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#111111" metalness={0.95} roughness={0.1} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1.5} />
        </RoundedBox>

        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[2.6, 1.5]} />
          <meshPhysicalMaterial color={paletteColors[0]} metalness={0.1} roughness={0.8} envMapIntensity={0.3} />
        </mesh>

        <mesh position={[0, 0.62, 0.022]}>
          <planeGeometry args={[2.5, 0.06]} />
          <meshBasicMaterial color={paletteColors[2]} transparent opacity={0.5} />
        </mesh>

        <mesh position={[-0.5, 0.2, 0.022]}>
          <planeGeometry args={[1.2, 0.04]} />
          <meshBasicMaterial color={paletteColors[4]} transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.65, 0.1, 0.022]}>
          <planeGeometry args={[0.9, 0.025]} />
          <meshBasicMaterial color={paletteColors[3]} transparent opacity={0.4} />
        </mesh>
        <mesh position={[-0.75, 0.0, 0.022]}>
          <planeGeometry args={[0.7, 0.025]} />
          <meshBasicMaterial color={paletteColors[3]} transparent opacity={0.25} />
        </mesh>

        <RoundedBox args={[0.5, 0.1, 0.005]} radius={0.02} smoothness={4} position={[-0.65, -0.12, 0.022]}>
          <meshBasicMaterial color={paletteColors[3]} transparent opacity={0.6} />
        </RoundedBox>

        <RoundedBox args={[0.8, 0.7, 0.005]} radius={0.02} smoothness={4} position={[0.8, 0.05, 0.022]}>
          <meshPhysicalMaterial color={paletteColors[1]} metalness={0.2} roughness={0.6} />
        </RoundedBox>

        {[-0.85, -0.15, 0.55].map((x, i) => (
          <RoundedBox key={i} args={[0.6, 0.35, 0.005]} radius={0.015} smoothness={4} position={[x, -0.45, 0.022]}>
            <meshPhysicalMaterial color={paletteColors[i === 1 ? 2 : 1]} metalness={0.1} roughness={0.7} transparent opacity={0.4} />
          </RoundedBox>
        ))}

        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[2.6, 1.5]} />
          <meshPhysicalMaterial transparent opacity={0.03} color="#ffffff" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Brand Text 3D ───
function BrandText3D() {
  const brandName = useAtelierStore((s) => s.brandName);
  const material = useAtelierStore((s) => s.material);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  if (!brandName) return null;

  return (
    <group ref={groupRef} position={[0, 1.4, 0]}>
      <Center>
        <Text3D font="/fonts/inter_bold.json" size={0.2} height={0.06} bevelEnabled bevelThickness={0.01} bevelSize={0.005} bevelSegments={3} curveSegments={16}>
          {brandName}
          {getMaterial(material)}
        </Text3D>
      </Center>
    </group>
  );
}

// ─── Module Particles ───
function ModuleParticles() {
  const modules = useAtelierStore((s) => s.modules);
  const activeCount = modules.filter((m) => m.active).length;
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = activeCount * 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(Math.max(particleCount, 3) * 3);
    for (let i = 0; i < pos.length; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 2.5;
      pos[i] = Math.cos(angle) * radius;
      pos[i + 1] = (Math.random() - 0.5) * 3;
      pos[i + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  if (activeCount === 0) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#D97757" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Simple Lighting ───
function SimpleLighting() {
  return (
    <>
      <spotLight position={[4, 6, 3]} intensity={2.5} angle={0.35} penumbra={0.9} color="#fff5e6" castShadow shadow-mapSize={1024} />
      <spotLight position={[-5, 4, 2]} intensity={1.2} angle={0.4} penumbra={1} color="#d4e5ff" />
      <spotLight position={[0, 3, -5]} intensity={1.8} angle={0.5} penumbra={0.8} color="#D97757" />
      <spotLight position={[-6, 2, -2]} intensity={0.6} angle={0.3} penumbra={1} color="#ffffff" />
      <spotLight position={[6, 2, -2]} intensity={0.6} angle={0.3} penumbra={1} color="#ffffff" />
      <pointLight position={[0, -2, 0]} intensity={0.15} color="#1a1a2e" />
      <ambientLight intensity={0.06} />
    </>
  );
}

// ─── Dark Room Floor ───
function DarkRoomFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial color="#050505" metalness={0.85} roughness={0.1} envMapIntensity={0.6} />
      </mesh>
      <mesh position={[0, 1.5, -5]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#030303" metalness={0.2} roughness={0.9} />
      </mesh>
      <ContactShadows position={[0, -1.29, 0]} opacity={0.7} scale={12} blur={2.5} far={5} />
    </>
  );
}

function SceneContent() {
  return (
    <>
      <SimpleLighting />

      <Suspense fallback={null}>
        <BrandText3D />
        <ModuleParticles />
        <DarkRoomFloor />
        <Environment preset="city" background={false} />
      </Suspense>

      <EffectComposer>
        <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.6} />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

const AtelierScene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 4.5], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: '#020202' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default AtelierScene;
