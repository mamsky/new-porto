"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LanyardModel from "./LanyardModel";

export default function LanyardViewer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-[500px] bg-transparent">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <LanyardModel path="/card.glb" imageUrl={imageUrl} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
