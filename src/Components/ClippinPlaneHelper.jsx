/* eslint-disable react/no-unknown-property */
import * as THREE from "three";

const ClippingPlaneHelper = ({ position, transparent, rotation }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry attach="geometry" args={[15, 2]} />
      <meshStandardMaterial
        attach="material"
        roughness={1}
        metalness={0}
        color={transparent ? "#f5f5f5" : "#212121"}
        opacity={transparent ? 0 : 1}
        transparent={transparent}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default ClippingPlaneHelper