import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useDrag } from 'react-use-gesture'
import { OrbitControls } from '@react-three/drei';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

function RotatingModel({ url }) {
  const mesh = useRef();
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
    }
  });

 
  console.log(window.innerHeight)
  return (
    <mesh ref={mesh} scale={window.innerHeight/5000}>
      <Model url={url} />
    </mesh>
  );
}

function NerfGun() {
  return (
    <Canvas gl={{alpha: true}} style={{ position: "absolute", marginLeft: "50%", background: '', width: "300px", height:"300px" }}>
      <ambientLight intensity={4}/>
      <pointLight position={[10, 10, 10]} />
      <RotatingModel url={"./nerfgun.glb"} />
      ./src/assets/nerfgun.glb
      <OrbitControls enableZoom={false} enablePan={false}/>
    </Canvas>
  );
}

export default NerfGun;


// ./src/assets/nerfgun.glb