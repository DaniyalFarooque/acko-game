/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\gift.glb --shadows --transform 
Files: .\gift.glb [694.14KB] > C:\Users\mouli\dev\r3f-vite-starter\public\models\misc\gift-transformed.glb [86.34KB] (88%)
Author: gorzi (https://sketchfab.com/gorzi90)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gift-f3d8abcd3b9442f39a9a2017d59b56a1
Title: Gift
*/

import React, { useRef } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useStore } from "../../store";
import { useFrame } from '@react-three/fiber';

export function PerilBox(props) {
  const { nodes, materials } = useGLTF('./models/misc/gift-transformed.glb');
  const { actions } = useStore();
  const ref = useRef();
  const [scale, setScale] = React.useState(0.6);
  const frames = useRef(0);
  const body = useRef();
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(time) * 0.1 + 2.5;
    ref.current.rotation.x = Math.sin(time) * 0.1;
    ref.current.rotation.y += delta;
    ref.current.rotation.z = Math.sin(time) * 0.5;
    if(scale < 0.6 && frames.current > 0){
      frames.current -= 1 * delta * 144;

    }
    // if(frames.current <= 0){
    //   setScale(Math.min(scale + 0.5 * delta, 0.6));
    //   if(body.current){
    //     body.current.setEnabled(true);
    //   }
    // }
  }
  );
  return (
    <>
    <RigidBody type="fixed" name="itemBox"
      sensor
      ref={body}
      onIntersectionEnter={({other}) => {
        if(other.rigidBodyObject.name === "player"){
          actions.openModal();
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
    <group ref={ref} position={props.position} scale={scale} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Cube000.geometry} material={materials.Material} position={[0.077, 0.5, -0.019]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube000_1.geometry} material={materials['Material.001']} position={[0.077, 0.5, -0.019]} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      </>
  )

}

useGLTF.preload('./models/misc/gift-transformed.glb')
