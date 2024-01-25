import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import { easing } from "maath";
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");

const Jellyfish = ({
  isMobile,
  meshOnclick = () => {},
  isRotatetion = false,
  onLoaded = () => {},
}) => {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");
  const [dummy] = useState(() => new THREE.Object3D());
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
  useEffect(() => {
    if (vertex !== "" || fragment !== "") {
      onLoaded();
    }
  }, [onLoaded, vertex, fragment]);
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
  useFrame((state, dt) => {
    if (meshRef.current != null) {
      // console.log(meshRef.current);
      dummy.lookAt(state.pointer.x, state.pointer.y, 1);
      easing.dampQ(meshRef.current.quaternion, dummy.quaternion, 0.15, dt);
      let time = state.clock.getElapsedTime();
      if (isRotatetion) {
        meshRef.current.children[0].children[0].children[0].children[0].rotation.z =
          time * 2;
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
        meshRef.current.rotation.z = 0.3;
      } else {
        meshRef.current.children[0].children[0].position.y =
          Math.sin(time) * 0.3;
      }

      //shader
      meshRef.current.children[0].children[0].children[0].children[0].material =
        shader;
      meshRef.current.children[0].children[0].children[0].children[0].material.uniforms.time.value =
        time;
    }
  });

  if (vertex == "" || fragment == "") return null;
  return (
    <mesh
      ref={meshRef}
      onClick={(e) => {
        meshOnclick(e);
      }}
      position={isMobile ? [0, 0, 0] : [0, -1, 0]}
    >
      <group
      // rotation={[0,0,0.3]}
      >
        <primitive
          object={jellyfish.scene}
          scale={isMobile ? 5 : 20}
          rotation={[0, 1.5, 0]}
        />
      </group>
    </mesh>
  );
};

const JellyfishCanvas = ({
  isMobile,
  meshOnclick,
  isRotatetion,
  cameraSetting = {},
  onLoaded,
}) => {
  return (
    <Canvas
      eventPrefix="client"
      eventSource={document.getElementById("root")}
      //   frameloop='demand'
      shadows
      //   dpr={[1, 2]}
      orthographic
      camera={{ zoom: 100, position: [0, 0, 100], ...cameraSetting }}
    >
      <Jellyfish
        onLoaded={onLoaded}
        isMobile={isMobile}
        meshOnclick={meshOnclick}
        isRotatetion={isRotatetion}
      />
      <Preload all />
    </Canvas>
  );
};

export { JellyfishCanvas, Jellyfish };
