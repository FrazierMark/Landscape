/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from 'leva';

const Terrain = ({ position = [0, -0, 0], constant }) => {

  const { wireframe, speed, materialType, displacementScale } = useControls("Terrain", {
    wireframe: false,
    speed: { value: 1, min: 0, max: 5, step: 0.01 },
    materialType: {
      options: {
        Mountains: 'mountains',
        MudField: 'mud',
        Sand: 'sand'
      },
      value: 'mountains'
    },
    displacementScale: { value: 1, min: 0, max: 5, step: 0.01 }
  });

  // Load the appropriate materials based on the selected type
  let materialTextures;
  switch (materialType) {
    case 'mountains':
      materialTextures = [
        "./mountains/Albedo.png",
        "./mountains/Displacement3.png",
        "./mountains/Normal.png",
        "./mountains/Roughness.png",
        "./mountains/AO.png",
        "./mountains/Metalness.png"
      ];
      break;
    case 'mud':
      materialTextures = [
        "./mud/Albedo.png",
        "./mud/Displacement.png",
        "./mud/Normal.png",
        "./mud/Roughness.png",
        "./mud/AO.png"
      ];
      break;
    case 'sand':
      materialTextures = [
        "./sand/BaseColor.png",
        "./sand/Displacement.png",
        "./sand/Roughness.png",
        "./sand/Normal.png",
        "./sand/Roughness.png",
        "./sand/AO.png"
      ];
      break;
  }

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap, metalness] = useLoader(
    TextureLoader, materialTextures
  );

  const terrain = useRef();
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
    // Constant is the distance from origin to plane along vector
    return normals.map((normal) => {
      const plane = new THREE.Plane(normal);
      plane.constant = constant;
      return plane;
    });
  }, [constant]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.clippingPlanes = clippingPlanes;
    }
  }, [clippingPlanes]);

  useFrame((state, delta) => {
    terrain.current.position.z -= delta * speed;

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
      <planeGeometry args={[13, 13, 150, 150]} />

      <meshStandardMaterial
        ref={materialRef}
        castShadow
        receiveShadow
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={displacementScale}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        wireframe={wireframe}
        clippingPlanes={[clippingPlanes]}
      />
    </mesh>
  );
}

export default Terrain