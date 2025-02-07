/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';
import Lights from './Lights';
import { Perf } from 'r3f-perf';
import ComposedTerrain from './ComposedTerrain';
import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';


function Box({ boxRef, ...props }) {
  const { value: boxColor } = useControls("BoxColor", { value: "#78ffe3" })

  return (
    <mesh ref={boxRef} {...props} castShadow>
      <boxGeometry args={[10.5, 0.4, 10.5]} />
      <meshBasicMaterial color={boxColor} />
    </mesh>
  );
}

const CanvasScene = () => {
  const boxRef = useRef();
  const { exposure, decay, blur } = useControls("GodRays", {
    exposure: { value: 0.5, min: 0, max: 10, step: 0.01 },
    decay: { value: 0.4, min: 0, max: 1, step: 0.01 },
    blur: { value: 0.9, min: 0, max: 1, step: 0.01 },
  })

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
      {/* <ShadowPlane position={[0, 0, -0.5]} /> */}
      <OrbitControls />
      {/* <Leva hidden /> */}
      <Perf position="top-left" />
      <Environment preset="dawn" />
      <ComposedTerrain />

      <Box position={[0, -2.64, 0]} boxRef={boxRef} />
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.7}
          mipmapBlur
          intensity={0.4}
          luminanceSmoothing={0.2}
        />

        {boxRef.current && (
          <GodRays
            sun={boxRef.current}
            exposure={exposure}
            decay={decay}
            blur={blur}
            samples={10}
            density={0.5}
            weight={0.5}
          />
        )}
      </EffectComposer>
    </Canvas>
  );
};

export default CanvasScene;
