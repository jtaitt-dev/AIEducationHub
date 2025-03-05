import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ParticleControls } from './ParticleControls';

interface ParticleSettings {
  count: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

export function AIBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    frameId: number | null;
  } | null>(null);

  const [settings, setSettings] = useState<ParticleSettings>({
    count: 2000,
    size: 0.03,
    speed: 1,
    color: "#0066cc",
    opacity: 0.8,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create WebGL renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(settings.count * 3);
    const initialY = new Float32Array(settings.count);

    for (let i = 0; i < settings.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      initialY[i] = positions[i * 3 + 1]; // Store initial Y position
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('initialY', new THREE.BufferAttribute(initialY, 1));

    const material = new THREE.PointsMaterial({
      size: settings.size,
      sizeAttenuation: true,
      transparent: true,
      color: new THREE.Color(settings.color),
      opacity: settings.opacity,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation
    let frameId: number | null = null;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const initialY = particles.geometry.attributes.initialY.array as Float32Array;
      const time = Date.now() * 0.001 * settings.speed;

      for (let i = 0; i < settings.count; i++) {
        const ix = i * 3;
        const x = positions[ix];

        // Create flowing sine wave effect
        positions[ix + 1] = initialY[i] + 
          Math.sin(time + x * 0.5) * 0.5 + // Primary wave
          Math.sin(time * 0.5 + x * 0.3) * 0.2; // Secondary wave
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.0002 * settings.speed; // Very slow rotation for added depth

      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Store references for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      frameId: null,
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [settings]); // Re-create scene when settings change

  return (
    <>
      <div 
        ref={containerRef} 
        className="absolute inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      />
      <ParticleControls onSettingsChange={setSettings} />
    </>
  );
}