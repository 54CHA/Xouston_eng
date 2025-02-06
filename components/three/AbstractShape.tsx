import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Add mouse position tracking
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const windowSize = useRef({ width: 0, height: 0 });

  const shader = {
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#4f46e5") }, // Indigo
      color2: { value: new THREE.Color("#a855f7") }, // Purple
      color3: { value: new THREE.Color("#22d3ee") }, // Cyan
      mousePos: { value: new THREE.Vector2(0, 0) },
      mouseIntensity: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float time;
      uniform vec2 mousePos;
      uniform float mouseIntensity;
      
      // Simplex 3D noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vPosition = position;
        
        vec3 pos = position;
        float noiseScale = 2.0;
        float timeScale = 0.3;
        
        // Mouse influence calculation
        vec2 mouseOffset = mousePos - vec2(pos.x, pos.y);
        float mouseDist = length(mouseOffset);
        float mouseEffect = smoothstep(2.0, 0.0, mouseDist) * mouseIntensity * 0.15;
        
        // Multiple layers of animated noise
        float noise1 = snoise(vec3(pos.x * noiseScale, pos.y * noiseScale, pos.z * noiseScale + time * timeScale));
        float noise2 = snoise(vec3(pos.x * noiseScale * 2.0 + time * 0.1, pos.y * noiseScale * 2.0, pos.z * noiseScale * 2.0 + time * timeScale * 1.5)) * 0.5;
        float noise3 = snoise(vec3(pos.x * noiseScale * 4.0, pos.y * noiseScale * 4.0 + time * 0.2, pos.z * noiseScale * 4.0 + time * timeScale * 2.0)) * 0.25;
        
        float combinedNoise = noise1 + noise2 + noise3;
        
        // Remove spiral deformation and use gentler breathing
        float breathing = sin(time * 0.4) * 0.02 + 1.0; // Reduced amplitude and frequency
        pos *= breathing;
        
        // Combine base displacement with mouse influence
        vec3 finalDisplacement = normal * ((combinedNoise * 0.15) + mouseEffect);
        pos += finalDisplacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        // Dynamic multi-color blend with time-based variation
        float t1 = sin(vPosition.x * 2.0 + time * 0.5) * 0.5 + 0.5;
        float t2 = cos(vPosition.y * 2.0 + time * 0.3) * 0.5 + 0.5;
        
        // Add swirling effect to color mixing
        float swirl = sin(length(vPosition.xy) * 4.0 - time * 0.5) * 0.5 + 0.5;
        
        vec3 color = mix(color1, color2, t1);
        color = mix(color, color3, t2 * swirl);
        
        // Reduce overall color intensity
        color *= 0.5;
        
        // Add subtle pulsing with reduced intensity
        float pulse = sin(time * 0.5) * 0.05 + 0.95;
        color *= pulse;
        
        // Increase base opacity and fresnel contribution
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
        color += fresnel * 0.05;
        
        // Increased base opacity from 0.15 to 0.3
        float alpha = 0.3 + fresnel * 0.05;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
  };

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();

    // Very subtle mouse following with slower response
    target.current.x = (state.mouse.x * viewport.width) / 12;
    target.current.y = (state.mouse.y * viewport.height) / 12;

    // Even smoother interpolation
    mouse.current.x += (target.current.x - mouse.current.x) * 0.01;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.01;

    // Update mouse uniforms with reduced scaling
    materialRef.current.uniforms.mousePos.value.set(
      state.mouse.x * 1.5,
      state.mouse.y * 1.5
    );

    // Calculate mouse intensity with reduced base value
    const mouseSpeed = Math.sqrt(
      Math.pow(mouse.current.x - target.current.x, 2) +
        Math.pow(mouse.current.y - target.current.y, 2)
    );

    // Smoother intensity transitions with reduced values
    materialRef.current.uniforms.mouseIntensity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.mouseIntensity.value,
      Math.min(mouseSpeed + 0.05, 0.5),
      0.03
    );

    // Subtler position updates
    meshRef.current.position.x = mouse.current.x * 0.03;
    meshRef.current.position.y = mouse.current.y * 0.03;

    meshRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1 -
      mouse.current.y * 0.003;

    meshRef.current.rotation.y =
      state.clock.getElapsedTime() * 0.1 + mouse.current.x * 0.003;
  });

  return (
    <mesh ref={meshRef} scale={2.1}>
      <icosahedronGeometry args={[1, 7]} />
      <shaderMaterial
        ref={materialRef}
        args={[shader]}
        transparent
        side={THREE.FrontSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default AbstractShape;
