import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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
      <boxGeometry />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}

const CanvasScene = () => {
  return (
    <Canvas
      shadows
      gl={{ localClippingEnabled: true, logarithmicDepthBuffer: true }}
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
      <Box position={[0, 0, 0]} />
      <ShadowPlane position={[0, 0, -0.5]} />
      <OrbitControls />
      {/* <Leva hidden /> */}
      <Perf position="top-left" />

      <ComposedTerrain />
    </Canvas>
  );
};

export default CanvasScene;
