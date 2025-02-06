/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export function BaseGlb(props) {
  const { nodes, materials } = useGLTF('/Base-v1.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Base.geometry}
        material={materials.lambert28}
      />
    </group>
  )
}

useGLTF.preload('/Base-v1.glb')
