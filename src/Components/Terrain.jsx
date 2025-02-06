/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from 'leva';
import ClippingPlaneHelper from './ClippinPlaneHelper';

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
        Cobblestones: 'cobblestones'
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
        "./sand/Normal.png",
        "./sand/Roughness.png",
        "./sand/AO.png",
        "./sand/Gloss.png"
      ];
      break;
    case 'rails':
      materialTextures = [
        "./rails/RAIL_COLOR.png",
        "./rails/RAIL_DEPTH.png",
        "./rails/RAIL_NORMAL.png",
        "./rails/RAIL_ROUGHNESS.png",
        "./rails/RAIL_AO.png",
        "./rails/RAIL_GLOSS.png",
        "./cobblestones/COBBLESTONES_BUMP.png"
      ]
      break;
    case 'cobblestones':
      materialTextures = [
        "./cobblestones/COBBLESTONES_COLOR.png",
        "./cobblestones/COBBLESTONES_DEPTH.png",
        "./cobblestones/COBBLESTONES_NORMAL.png",
        "./cobblestones/COBBLESTONES_ROUGHNESS.png",
        "./cobblestones/COBBLESTONES_AO.png",
        "./cobblestones/COBBLESTONES_GLOSS.png",
        "./cobblestones/COBBLESTONES_BUMP.png"
      ];
  }

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap, metalness, bump] = useLoader(
    TextureLoader, materialTextures
  );

  const terrain = useRef();
  const materialRef = useRef();
  const panelMaterialRef1 = useRef();
  const panelMaterialRef2 = useRef();
  const panelMaterialRef3 = useRef();
  const panelMaterialRef4 = useRef();

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






  // const sidePanelClippingPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), constant)


  useEffect(() => {


    if (materialRef.current) {
      materialRef.current.clippingPlanes = clippingPlanes;
    }

    // if (panelMaterialRef.current) {
    //   panelMaterialRef.current.clippingPlanes = sidePanelClippingPlane;
    // }

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
        // clippingPlanes={[clippingPlanes]}
        />
      </mesh>

      {/* // <ClippingPlaneHelper ref={} key={i} position={plane.position} rotation={plane.rotation} constant={constant} /> */}

      {/* <mesh position={[0, -2.5, -constant]} rotation={[0, 0, 0]} >
          <planeGeometry attach="geometry" args={[15, 2]} />
          <meshStandardMaterial
            ref={panelMaterialRef1}
            attach="material"
            roughness={1}
            metalness={0}
            // color={transparent ? "#f5f5f5" : "#212121"}
            // opacity={transparent ? 0 : 1}
            // transparent={transparent}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh position={[-constant, -2.5, 0]} rotation={[0, Math.PI / 2, 0]} >
          <planeGeometry attach="geometry" args={[15, 2]} />
          <meshStandardMaterial
            ref={panelMaterialRef2}
            attach="material"
            roughness={1}
            metalness={0}
            // color={transparent ? "#f5f5f5" : "#212121"}
            // opacity={transparent ? 0 : 1}
            // transparent={transparent}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh position={[constant, -2.5, 0]} rotation={[0, Math.PI / 2, 0]} >
          <planeGeometry attach="geometry" args={[15, 2]} />
          <meshStandardMaterial
            ref={panelMaterialRef3}
            attach="material"
            roughness={1}
            metalness={0}
            // color={transparent ? "#f5f5f5" : "#212121"}
            // opacity={transparent ? 0 : 1}
            // transparent={transparent}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh position={[0, -2.5, constant]} rotation={[0, 0, 0]} >
          <planeGeometry attach="geometry" args={[15, 2]} />
          <meshStandardMaterial
            ref={panelMaterialRef4}
            attach="material"
            roughness={1}
            metalness={0}
            // color={transparent ? "#f5f5f5" : "#212121"}
            // opacity={transparent ? 0 : 1}
            // transparent={transparent}
            side={THREE.DoubleSide}
          />
        </mesh> */}


    </>
  );
}

export default Terrain