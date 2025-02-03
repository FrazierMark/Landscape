/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from "@react-three/fiber";
const Terrain = ({ position = [0, -0, 0], constant }) => {
  const terrain = useRef();

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap, metalness] = useLoader(
    TextureLoader, [
    "./mountains/Albedo.png",
    "./mountains/Displacement3.png",
    "./mountains/Normal.png",
    "./mountains/Roughness.png",
    "./mountains/AO.png",
    "./mountains/Metalness.png"
  ]
    // ["./mud/Albedo.png", "./mud/Displacement.png", "./mud/Normal.png", "./mud/Roughness.png", "./mud/AO.png"]
  );

  const materialRef = useRef();

  const clippingPlanes = useMemo(() => {
    // Define the normals for four clipping planes
    const normals = [
      new THREE.Vector3(0, 0, -1), // Front plane
      new THREE.Vector3(-1, 0, 0), // Right plane
      new THREE.Vector3(1, 0, 0), // Left plane
      new THREE.Vector3(0, 0, 1), // Back plane
    ];

    // Create the planes with the defined normals
    return normals.map((normal) => {
      const plane = new THREE.Plane(normal);
      plane.constant = constant;
      return plane;
    });
  }, [constant]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.clippingPlanes = clippingPlanes; // Update its clippingPlanes property
    }
  }, [clippingPlanes]);

  useFrame((state, delta) => {
    terrain.current.position.z -= delta;

    if (terrain.current.position.z < -13.0) {
      terrain.current.position.z = 20.0;
    }
  });

  return (
    <mesh
      ref={terrain}
      position={position}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[13, 13, 250, 250]} />

      <meshStandardMaterial
        ref={materialRef}
        castShadow
        receiveShadow
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={1.2}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        // wireframe={true}
        clippingPlanes={[clippingPlanes]}
      />
    </mesh>
  );
}

export default Terrain