/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from 'leva';

const Terrain = ({ position = [0, -0, 0], constant, color }) => {

  const { wireframe, speed, materialType, displacementScale, planeColor } = useControls("Terrain", {
    wireframe: false,
    planeColor: false,
    speed: { value: 0, min: 0, max: 50, step: 0.01 },
    materialType: {
      options: {
        Mountains: 'mountains',
        MudField: 'mud',
        Sand: 'sand',
        Rails: 'rails',
        Cobblestones: 'cobblestones',
        Coffee: 'coffee',
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
        "./sand/Normal.png",
        "./sand/Roughness.png",
        "./sand/AO.png",
      ];
      break;
    case 'rails':
      materialTextures = [
        "./rails/RAIL_COLOR.png",
        "./rails/RAIL_DEPTH.png",
        "./rails/RAIL_NORMAL.png",
        "./rails/RAIL_ROUGHNESS.png",
        "./rails/RAIL_AO.png",
      ]
      break;
    case 'cobblestones':
      materialTextures = [
        "./cobblestones/COBBLESTONES_COLOR.png",
        "./cobblestones/COBBLESTONES_DEPTH.png",
        "./cobblestones/COBBLESTONES_NORMAL.png",
        "./cobblestones/COBBLESTONES_ROUGHNESS.png",
        "./cobblestones/COBBLESTONES_AO.png",
      ];
      break;
    case 'coffee':
      materialTextures = [
        "./coffee/COFFEE_COLOR.png",
        "./coffee/COFFEE_DEPTH.png",
        "./coffee/COFFEE_NORMAL.png",
        "./coffee/COFFEE_ROUGHNESS.png",
        "./coffee/COFFEE_AO.png",
      ];
      break;
  }

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap, metalness, bump] = useLoader(
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


  const speedFactor = 0.1001 * speed

  useFrame((state, delta) => {
    terrain.current.position.z -= delta * speedFactor;

    if (terrain.current.position.z < -15) {
      terrain.current.position.z = 29.892;
    }
  });

  return (
    <>
      <mesh
        ref={terrain}
        position={position}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[16.0068, 15.026, 50, 50]} />

        <meshStandardMaterial
          color={planeColor ? color : ""}
          ref={materialRef}
          castShadow
          receiveShadow
          map={colorMap}
          displacementMap={displacementMap}
          displacementScale={displacementScale}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          metalnessMap={metalness}
          bumpMap={bump}
          wireframe={wireframe}
        />
      </mesh>
    </>
  );
}

export default Terrain