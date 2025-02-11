/* eslint-disable react/no-unknown-property */
import { useControls } from "leva";
import Terrain from './Terrain';
import ClippingPlaneHelper from './ClippinPlaneHelper';
import { BaseGlb } from './BaseGlb';
import * as THREE from "three"


const ComposedTerrain = () => {

  const { constant, transparent } = useControls("plane", {
    transparent: true,
    constant: { value: 5, min: -1, max: 50, step: 0.01 },
  });

  const clippingPlanesHelperPositions = [
    { position: [0, -1, -constant], rotation: [0, 0, 0], },
    {
      position: [-constant, -1, 0],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      position: [constant, -1, 0],
      rotation: [0, Math.PI / 2, 0],
    },
    { position: [0, -1, constant], rotation: [0, 0, 0], },
  ];


  const red = new THREE.Color("red")
  const blue= new THREE.Color("blue")
  const green= new THREE.Color("green")

  return (
    <>
      <Terrain position={[0, -2.3, 29.982]} color={red} constant={constant} />
      <Terrain position={[0, -2.3, 15]} color={blue} constant={constant} />
      <Terrain position={[0, -2.3, 0]} color={green} constant={constant} />

      <BaseGlb position={[0, -2.8, 0 ]} scale={0.045} />

      {clippingPlanesHelperPositions.map((plane, i) => (
        <ClippingPlaneHelper key={i} position={plane.position} rotation={plane.rotation} constant={constant} transparent={transparent} />
      ))}

    </>
  );
}

export default ComposedTerrain