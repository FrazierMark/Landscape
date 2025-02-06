import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

import { Leva } from 'leva';
import { useRef } from 'react';
import Lights from './Lights';
import ShadowPlane from './ShadowPlane';
import { Perf } from 'r3f-perf';
import ComposedTerrain from './ComposedTerrain';


function Box(props) {
  const ref = useRef();

  // useFrame(
  //   (state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta)
  // );
  return (
    <mesh ref={ref} {...props} castShadow>
      <boxGeometry args={[11, 1, 11, 10, 20]} />
      <meshStandardMaterial color='orange' wireframe />
    </mesh>
  );
}

const CanvasScene = () => {
  return (
    <Canvas
      shadows
      gl={{ localClippingEnabled: true }}
      camera={{ position: [0, 0, 14] }}
      style={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
      }}
    >

      <Lights />
      {/* <Box position={[0, -3, 0]} /> */}
      {/* <ShadowPlane position={[0, 0, -0.5]} /> */}
      <OrbitControls />
      {/* <Leva hidden /> */}
      <Perf position="top-left" />
      <Environment preset="dawn" />
      <ComposedTerrain />
    </Canvas>
  );
};

export default CanvasScene;
