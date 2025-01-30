"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

export default function BioHackBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ASCII effect
    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = '#88ff88';
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.position = 'fixed';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.zIndex = '-1';
    effect.domElement.style.opacity = '0.15';

    containerRef.current.appendChild(effect.domElement);

    // Controls
    const controls = new TrackballControls(camera, effect.domElement);
    controls.rotateSpeed = 2;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    // DNA Helix Creation
    const dnaGroup = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -10, 0),
      new THREE.Vector3(10, 10, 0),
    ]);

    // Create the strands
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    // Create spheres for base pairs
    const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x88ff88,
      opacity: 0.8,
      transparent: true 
    });

    // Create two helices
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      const angle1 = t * Math.PI * 8;
      const angle2 = angle1 + Math.PI;

      const radius = 3;
      
      // First strand
      const sphere1 = new THREE.Mesh(sphereGeometry, material);
      sphere1.position.set(
        Math.cos(angle1) * radius,
        i - 25,
        Math.sin(angle1) * radius
      );
      dnaGroup.add(sphere1);

      // Second strand
      const sphere2 = new THREE.Mesh(sphereGeometry, material);
      sphere2.position.set(
        Math.cos(angle2) * radius,
        i - 25,
        Math.sin(angle2) * radius
      );
      dnaGroup.add(sphere2);

      // Base pairs (connecting lines)
      if (i % 3 === 0) {
        const baseGeometry = new THREE.BoxGeometry(radius * 2, 0.1, 0.1);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x88ff88 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = i - 25;
        base.rotation.y = angle1;
        dnaGroup.add(base);
      }
    }

    scene.add(dnaGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x88ff88, 0.8);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      
      dnaGroup.rotation.y += 0.005;
      controls.update();
      
      effect.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      effect.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(effect.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
} 