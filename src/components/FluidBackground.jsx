

import React, {  useEffect, useMemo, useRef, useState } from "react";
import { Canvas,useFrame,useThree } from "@react-three/fiber";
import {  Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");

export function Jellyfishs({ isMobile }) {
    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

  const texture = useTexture("./jellyfish/Material__2basecolortexture.png");
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder
    axios.get("/shaders/threeColors/vertexShader.glsl").then((res) => setVertex(res.data));
    axios.get("/shaders/threeColors/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);
  const meshRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      texture1:{value: texture},
      hasTexture:{value:false},
      resolution: { value: new THREE.Vector4() },
      baseFirst : { value: new THREE.Vector3(120./255., 158./255., 113./255.)},
      baseSecond : { value: new THREE.Vector3(224./255., 148./255., 66./255.)},
      baseThird : { value: new THREE.Vector3(0./255., 0./255., 0./255.)},
    }),
    []
  );

  let shader= new THREE.ShaderMaterial(
    {

        uniforms: {...uniforms, },
        vertexShader: vertex,
        fragmentShader: fragment,
        
    
    }

  )
  useFrame((state) => {
    if(meshRef.current!=null){

    let time = state.clock.getElapsedTime();

    meshRef.current.material.uniforms.time.value = time*0.1;
}
  });

  const size = useThree(state => state.size)
  const { factor } = useThree(state => state.viewport)
  if (vertex == "" || fragment == "" ) return null;
  return (

                <mesh ref={meshRef} >


            <planeGeometry  args={[size.width, size.height]} scale={factor}/>
      <shaderMaterial
        uniforms={{...uniforms, hasTexture:{value:false},}}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
            </mesh>
       
    );
}


const FluidBackground = (props) => {
   
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
  
        <Jellyfishs isMobile={isMobile} />

  );
};




export default FluidBackground;
