"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Mesh } from "three";

function LanyardModel({ path }: { path: string }) {
  const gltf = useGLTF(path);
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t) * 0.2; // goyang kiri-kanan
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.05; // ayun vertikal halus
    }
  });

  return (
    <primitive ref={ref} object={gltf.scene} scale={3} position={[1, -2, 0]} />
  );
}

export default function LanyardViewer() {
  return (
    <div className="w-full h-[500px] bg-transparent">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={30} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <LanyardModel path="/card.glb" />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
