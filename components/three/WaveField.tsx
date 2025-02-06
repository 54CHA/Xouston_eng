"use client";

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Vector2 } from 'three';
import * as THREE from 'three';

export default function WaveField() {
  const meshRef = useRef<Mesh>(null);
  const mouse = useRef(new Vector2(0, 0));
  const { viewport } = useThree();

  // Create geometry with vertex colors
  const geometry = new THREE.PlaneGeometry(30, 30, 64, 64);
  const colors = new Float32Array(geometry.attributes.position.count * 4);
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array;
    const colors = meshRef.current.geometry.attributes.color.array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      const distanceToMouse = Math.sqrt(
        Math.pow((x / viewport.width) - mouse.current.x, 2) + 
        Math.pow((y / viewport.height) - mouse.current.y, 2)
      );

      // Calculate distance from center for fade effect
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const fadeRadius = 15;
      const fadeStrength = Math.max(0, 1 - (distanceFromCenter / fadeRadius));

      // Original wave calculation with fade
      positions[i + 2] = Math.sin(x * 0.5 + time) * 0.5 + 
                        Math.sin(y * 0.5 + time) * 0.5 +
                        Math.exp(-distanceToMouse * 2) * 2 * Math.sin(time * 2);

      // Update vertex colors for fade effect
      const colorIndex = (i / 3) * 4;
      colors[colorIndex] = 0.31;     // R
      colors[colorIndex + 1] = 0.27; // G
      colors[colorIndex + 2] = 0.9;  // B
      colors[colorIndex + 3] = fadeStrength; // A
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, 0]} geometry={geometry}>
      <meshStandardMaterial 
        color="#4f46e5"
        vertexColors
        wireframe
        transparent
        opacity={0.5}
        emissive="#4f46e5"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
} 