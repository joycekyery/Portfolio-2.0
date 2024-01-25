import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Clone, Preload, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");
function generateArray(n) {
  var result = [];
  for (var i = -n; i <= n; i++) {
    result.push(i);
  }
  return result;
}

const Jellyfishs = ({ isMobile }) => {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  const jellyfish = useGLTF("./jellyfish/jellyfish_icon.gltf");
  const texture = useTexture("./jellyfish/Material__2basecolortexture.png");

  // AEDDE0
  // DDCFCF
  // E3CACA
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder
    axios
      .get("/shaders/threeColors/vertexShader.glsl")
      .then((res) => setVertex(res.data));
    axios
      .get("/shaders/threeColors/fragmentShader.glsl")
      .then((res) => setFragment(res.data));
  }, []);
  const meshRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      texture1: { value: texture },
      hasTexture: { value: true },
      resolution: { value: new THREE.Vector4() },
      baseFirst: { value: new THREE.Vector3(120 / 255, 158 / 255, 113 / 255) },
      baseSecond: { value: new THREE.Vector3(224 / 255, 148 / 255, 66 / 255) },
      baseThird: { value: new THREE.Vector3(0 / 255, 0 / 255, 0 / 255) },
    }),
    []
  );

  let shader = new THREE.ShaderMaterial({
    uniforms: { ...uniforms },
    vertexShader: vertex,
    fragmentShader: fragment,
  });
  useFrame((state) => {
    if (meshRef.current != null) {
      // console.log(meshRef.current)
      let time = state.clock.getElapsedTime();
      for (let i = 0; i < 45; i++) {
        meshRef.current.children[i].children[0].rotation.y = time;
        meshRef.current.children[
          i
        ].children[0].children[0].children[0].material = shader;
        meshRef.current.children[
          i
        ].children[0].children[0].children[0].material.uniforms.time.value =
          time + i * 8;
      }
    }
  });
  let xNum = generateArray(4);
  let yNum = generateArray(2);
  if (vertex == "" || fragment == "") return null;
  return (
    <mesh>
      <mesh ref={meshRef}>
        {xNum.map((i, jkey) => {
          return yNum.map((j, ikey) => {
            return (
              <group
                key={(jkey + 1) * (ikey + 1)}
                position={isMobile ? [0, 0, 0] : [i * 2, j * 3, 3]}
                rotation={[0, 0, 0.3]}
              >
                <Clone object={jellyfish.scene} scale={isMobile ? 5 : 8} />
              </group>
            );
          });
        })}
      </mesh>
    </mesh>
  );
};

const JellyfishsCanvas = ({ isMobile }) => {
  return (
    <Canvas
      //   frameloop='demand'
      shadows
      //   dpr={[1, 2]}
      orthographic
      camera={{ zoom: 100, position: [0, 0, 100] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Jellyfishs isMobile={isMobile} />
      <Preload all />
    </Canvas>
  );
};

export { JellyfishsCanvas, Jellyfishs };
