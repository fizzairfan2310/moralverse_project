import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './ThreeDCharacter.css';

function ThreeDCharacter({ modelUrl, isPlaying = false, size = 'large' }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const mixerRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !modelUrl) return;

    const currentContainer = containerRef.current;
    const scene = new THREE.Scene();
    
    // Camera settings: Z ko 3.5 rakha hai zoom ke liye
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0.6, 3.5); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentContainer.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      
      model.position.x = -center.x;
      model.position.z = -center.z;
      
      // BOTTOM PADDING FIX: 
      // Pehle -0.8 tha, ab -0.5 kar diya hai taaki character mazeed UPAR chala jaye
      model.position.y = -0.5; 

      scene.add(model);

      // HAND GESTURES: Internal animations load karein
      if (gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (modelRef.current) {
        // SLOW ROTATION: Bohat hi smooth aur slow speed
        modelRef.current.rotation.y += 0.005;

        // Talking Gestures (Jab story play ho rahi ho)
        if (isPlaying) {
          // Subtle breathing & movement
          modelRef.current.position.y = -0.5 + Math.sin(Date.now() * 0.002) * 0.02;
          modelRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.02;
        }
      }
      
      // Iske bagair hand gestures nahi dikhengi
      if (mixerRef.current) {
        mixerRef.current.update(0.016);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, isPlaying]);

  return (
    <div className={`threed-character-container ${size}`}>
      <div ref={containerRef} className="threed-canvas" />
      {isPlaying && <div className="talking-glow-circle"></div>}
    </div>
  );
}

export default ThreeDCharacter;