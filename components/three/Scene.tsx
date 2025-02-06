"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import WaveField from "./WaveField";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
        <Suspense fallback={null}>
          <WaveField />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={3}
            color="#ffffff"
          />
          <directionalLight
            position={[-5, -5, -5]}
            intensity={0.5}
            color="#4f46e5"
          />
          <hemisphereLight
            intensity={0.2}
            groundColor="#000000"
            color="#ffffff"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
