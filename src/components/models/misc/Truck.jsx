/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 truck.glb --transform --shadows 
Files: truck.glb [170.7KB] > /Users/daniyal.farooque/Documents/JSProject/Mario-Kart-3.js/public/models/misc/truck-transformed.glb [21.69KB] (87%)
*/

import React, { useRef } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useStore } from "../../store";
import { useFrame } from '@react-three/fiber';

export function Truck(props) {
  const { nodes, materials } = useGLTF('./models/misc/truck-transformed.glb')

  const { actions } = useStore();
  const ref = useRef();
  const [scale, setScale] = React.useState(1);
  const frames = useRef(0);
  const body = useRef();
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if(scale < 1 && frames.current > 0){
      frames.current -= 1 * delta * 144;

    }
  }
  );

  return (
    <>
    <RigidBody type="fixed" name="itemBox"
      sensor
      ref={body}
      onIntersectionEnter={({other}) => {
        console.log("Intersection entered with: ", other.rigidBodyObject.name);
        if(other.rigidBodyObject.name === "player"){
        
        actions.setItem(props.item);
        setScale(0);
        frames.current = 400;
        body.current.setEnabled(false);
        }
      }}
      position={props.position}
      colliders={false}
    >
    <CuboidCollider args={[1.5, 1.5, 1.5]} />
    </RigidBody>
    <group ref={ref} position={props.position} rotation={props.rotation} dispose={null} scale={[scale*100,scale*100,scale*100]} >
      <mesh castShadow receiveShadow geometry={nodes.MM_Camion_ParteDelantera.geometry} material={materials.mobile_Camion} position={[0.187, 0.047, 0.052]} rotation={[Math.PI / 2, 0, -1.616]} scale={scale*0.01} />
      <mesh castShadow receiveShadow geometry={nodes.MM_Camion_CristalParabrisas.geometry} material={materials.MM_Camion1} position={[0.199, 0.062, 0.052]} rotation={[Math.PI / 2, 0, -1.616]} scale={scale*0.01} />
      <mesh castShadow receiveShadow geometry={nodes.MM_Camion_RuedaDelantera01.geometry} material={materials.Material} position={[0.205, 0.044, 0.042]} rotation={[Math.PI / 2, 0, -1.616]} scale={scale*0.01} />
      <mesh castShadow receiveShadow geometry={nodes.MM_Camion_ParteTrasera.geometry} material={materials.mobile_Camion_trans} position={[0.188, 0.047, 0.052]} rotation={[Math.PI / 2, 0, -1.616]} scale={scale*0.01} />
    </group>
      </>
  )


}

useGLTF.preload('./models/misc/truck-transformed.glb')
