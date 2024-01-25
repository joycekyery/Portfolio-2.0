import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import Loading from "./Loading";
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");
import { motion, AnimatePresence } from "framer-motion";

export function Fluid({ isMobile, onLoaded = () => {} }) {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  const texture = useTexture("./jellyfish/Material__2basecolortexture.png");
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
      hasTexture: { value: false },
      resolution: { value: new THREE.Vector4() },
      baseFirst: { value: new THREE.Vector3(174 / 255, 221 / 255, 224 / 255) },
      baseSecond: { value: new THREE.Vector3(221 / 255, 207 / 255, 207 / 255) },
      baseThird: { value: new THREE.Vector3(227 / 255, 202 / 255, 202 / 255) },
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
      let time = state.clock.getElapsedTime();

      meshRef.current.material.uniforms.time.value = time * 0.3;
    }
  });

  const size = useThree((state) => state.size);
  const { factor } = useThree((state) => state.viewport);
  if (vertex == "" || fragment == "") return null;
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} scale={factor} />
      <shaderMaterial
        uniforms={{ ...uniforms, hasTexture: { value: false } }}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const FluidBackground = ({ onLoaded }) => {
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

  return <Fluid isMobile={isMobile} onLoaded={onLoaded} />;
};

const FluidBackgroundCanvas = ({ onLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFluidLoaded, setIsFluidLoaded] = useState(false);

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
    <AnimatePresence>
      {!isFluidLoaded && (
        <motion.div
          key="loadingBg"
          className="flex items-center justify-center w-screen h-screen bg-[#e3caca] fixed top-0 left-0 z-[10000]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
        >
          <Loading />
        </motion.div>
      )}
      <Canvas
        //   frameloop='demand'
        shadows
        //   dpr={[1, 2]}
        orthographic
        camera={{ zoom: 200, position: [0, 0, 100] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <FluidBackground
          onLoaded={() => {
            setIsFluidLoaded(true);
            onLoaded();
          }}
        />
        <Preload all />
      </Canvas>
    </AnimatePresence>
  );
};

export { FluidBackground, FluidBackgroundCanvas };
