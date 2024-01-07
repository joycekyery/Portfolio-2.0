

import React, {  useEffect, useMemo, useRef, useState } from "react";
import { Canvas,useFrame, } from "@react-three/fiber";
import { Clone , Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import FluidBackground from "./FluidBackground";
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");
function generateArray(n) {
    var result = [];
    for (var i = -n; i <= n; i++) {
        result.push(i);
    }
    return result;
}

const  Jellyfishs=({ isMobile })=> {
    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

  const jellyfish = useGLTF("./jellyfish/jellyfish_icon.gltf");
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
      hasTexture:{value:true},
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
    // console.log(meshRef.current)
    let time = state.clock.getElapsedTime();
    for(let i=0;i<45;i++){
        meshRef.current.children[i].children[0].rotation.y=time;
        meshRef.current.children[i].children[0].children[0].children[0].material=shader;
        meshRef.current.children[i].children[0].children[0].children[0].material.uniforms.time.value =time+i*8;
    };
}
  });
  if (vertex == "" || fragment == "" ) return null;
  let xNum=generateArray(4)
  let yNum=generateArray(2)

  if (vertex == "" || fragment == "" ) return null;
  return (
            <mesh  >
       <hemisphereLight intensity={0.8} groundColor='#5cffe9' /> 
       <pointLight intensity={500} color='#f5d8ae'
          angle={0.6} castShadow position={[0,8,8]}/>
                <mesh ref={meshRef} >
               { xNum.map((i,jkey)=>{
                    return(
                        yNum.map((j,ikey)=>{
                        return(

                        <group key={(jkey+1)*(ikey+1)}
                        position={isMobile ? [0, 0, 0] : [i*2, j*3, 3]}
                        rotation={[0,0,0.3]}
                        >
                            
                            <Clone
                            object={jellyfish.scene}
                            scale={isMobile ? 5 : 8}
                            />
                        </group>
                        )})
                )})}

           
            </mesh>
            <FluidBackground/>
            </mesh>
       
    );
}


const JellyfishCanvas = () => {
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
    <div className="h-screen bg-primary">
    <Canvas
    //   frameloop='demand'
      shadows
    //   dpr={[1, 2]}
    orthographic 
    camera={{ zoom: 100, position: [0, 0, 100]}}
      gl={{ preserveDrawingBuffer: true }}
    >
        <Jellyfishs isMobile={isMobile} />
        {/* <FluidBackground/> */}
      <Preload all />
    </Canvas>
    </div>
  );
};

const Home=(props)=>{
    return <JellyfishCanvas/>;
}



export default Home ;
