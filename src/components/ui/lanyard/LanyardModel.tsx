import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface LanyardModelProps {
  path: string;
  imageUrl: string;
}

export default function LanyardModel({ path, imageUrl }: LanyardModelProps) {
  const gltf = useGLTF(path);
  const texture = useTexture(imageUrl);
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t) * 0.2; // goyang kiri-kanan
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.05; // ayun vertikal halus
    }
  });

  useEffect(() => {
    if (!ref.current) return;
    ref.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name.toLowerCase().includes("card")) {
          (mesh.material as THREE.MeshStandardMaterial).map = texture;
          (mesh.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      }
    });
  }, [texture]);

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={3}
      position={[0.5, -1.5, 0]}
    />
  );
}
