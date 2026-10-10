"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// The "AI core": a liquid gold sphere wrapped in wireframe shells and orbiting rings.
function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.6, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.4, 0.05);
    }
    if (shell.current) {
      shell.current.rotation.y += delta * 0.15;
      shell.current.rotation.z += delta * 0.05;
    }
    if (rings.current) rings.current.rotation.z += delta * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.25, 64]} />
          <MeshDistortMaterial color="#c9a25a" metalness={1} roughness={0.18} distort={0.35} speed={1.8} />
        </mesh>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.85, 2]} />
          <meshBasicMaterial color="#f3dca6" wireframe transparent opacity={0.12} />
        </mesh>
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[2.35, 0.008, 16, 200]} />
            <meshBasicMaterial color="#d6b16c" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 1.7, 0.6, 0]}>
            <torusGeometry args={[2.7, 0.006, 16, 200]} />
            <meshBasicMaterial color="#8b7bff" transparent opacity={0.45} />
          </mesh>
          <Satellite radius={2.35} tilt={Math.PI / 2.3} speed={0.6} color="#f3dca6" />
          <Satellite radius={2.7} tilt={Math.PI / 1.7} speed={-0.4} color="#8b7bff" />
        </group>
      </Float>
    </group>
  );
}

function Satellite({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const p = new THREE.Vector3(Math.cos(t) * radius, Math.sin(t) * radius, 0);
    p.applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt);
    ref.current?.position.copy(p);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Slowly drifting starfield of tiny points for depth.
function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 18;
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#f4efe6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff1d0" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#8b7bff" />
      <pointLight position={[3, -3, -2]} intensity={20} color="#d6b16c" />
      <Core />
      <Sparkles count={60} scale={7} size={2.5} speed={0.35} color="#f3dca6" />
      <Dust />
    </Canvas>
  );
}
