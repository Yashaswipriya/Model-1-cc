"use client";

import React, { useRef, useEffect, memo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ThreeBlobProps {
  triangleCount?: number;      // default 160000
  rotationSpeedX?: number;     // default 0.25
  rotationSpeedY?: number;     // default 0.5
  startAnimation?: boolean;    // control animation
}

const ThreeBlob: React.FC<ThreeBlobProps> = memo(
  ({
    triangleCount = 160000,
    rotationSpeedX = 0.25,
    rotationSpeedY = 0.5,
    startAnimation = false,
  }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!mountRef.current) return;

      let camera: THREE.PerspectiveCamera,
        scene: THREE.Scene,
        renderer: THREE.WebGLRenderer,
        mesh: THREE.Mesh;

      const width = mountRef.current.clientWidth;
      const height =  mountRef.current.clientHeight;

      // Camera
      camera = new THREE.PerspectiveCamera(27, width / height, 1, 3500);
      camera.position.z = 2750;

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050505);
      scene.fog = new THREE.Fog(0x050505, 2000, 3500);

      // Lights
      scene.add(new THREE.AmbientLight(0xcccccc));
      const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
      light1.position.set(1, 1, 1);
      scene.add(light1);
      const light2 = new THREE.DirectionalLight(0xffffff, 4.5);
      light2.position.set(0, -1, 0);
      scene.add(light2);

      // Geometry
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      const normals: number[] = [];
      const colors: number[] = [];
      const color = new THREE.Color();

      const n = 800,
        n2 = n / 2;
      const d = 12,
        d2 = d / 2;

      const pA = new THREE.Vector3();
      const pB = new THREE.Vector3();
      const pC = new THREE.Vector3();
      const cb = new THREE.Vector3();
      const ab = new THREE.Vector3();

      for (let i = 0; i < triangleCount; i++) {
        const x = Math.random() * n - n2;
        const y = Math.random() * n - n2;
        const z = Math.random() * n - n2;

        const ax = x + Math.random() * d - d2;
        const ay = y + Math.random() * d - d2;
        const az = z + Math.random() * d - d2;

        const bx = x + Math.random() * d - d2;
        const by = y + Math.random() * d - d2;
        const bz = z + Math.random() * d - d2;

        const cx = x + Math.random() * d - d2;
        const cy = y + Math.random() * d - d2;
        const cz = z + Math.random() * d - d2;

        positions.push(ax, ay, az, bx, by, bz, cx, cy, cz);

        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);

        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);
        cb.normalize();

        const nx = cb.x;
        const ny = cb.y;
        const nz = cb.z;

        normals.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);

        const vx = x / n + 0.5;
        const vy = y / n + 0.5;
        const vz = z / n + 0.5;

        color.setRGB(vx, vy, vz);
        const alpha = Math.random();

        colors.push(
          color.r,
          color.g,
          color.b,
          alpha,
          color.r,
          color.g,
          color.b,
          alpha,
          color.r,
          color.g,
          color.b,
          alpha
        );
      }

      function disposeArray(this: any) {
        this.array = null;
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3).onUpload(disposeArray)
      );
      geometry.setAttribute(
        "normal",
        new THREE.Float32BufferAttribute(normals, 3).onUpload(disposeArray)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 4).onUpload(disposeArray)
      );

      geometry.computeBoundingSphere();

      const material = new THREE.MeshPhongMaterial({
        color: 0xd5d5d5,
        specular: 0xffffff,
        shininess: 250,
        side: THREE.DoubleSide,
        vertexColors: true,
        transparent: true,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Animate
      const animate = () => {
        if (!startAnimation) return;
        const time = Date.now() * 0.001;
        mesh.rotation.x = time * rotationSpeedX;
        mesh.rotation.y = time * rotationSpeedY;
        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(animate);

      // Resize handler
      const handleResize = () => {
        if (!mountRef.current) return;
        const newWidth = mountRef.current.clientWidth;
        const newHeight = window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      };
    }, [triangleCount, rotationSpeedX, rotationSpeedY, startAnimation]);

    return (
      <div className="relative w-full h-full">
        <div ref={mountRef} className="w-full h-full" />
        
        {/* Illuminora Text Belt */}
        <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none -translate-y-1/2">
          <motion.div
            className="flex whitespace-nowrap text-white text-[9rem] 3xl:text-[10rem] font-bold"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 5,
              ease: "linear",
            }}
          >
            {"ILLUMINORA • ".repeat(20)}
          </motion.div>
        </div>

        {/* Button below the belt */}
        <div className="absolute top-[65%] left-1/2 -translate-x-1/2">
          <button className="group inline-flex items-center bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-pink-600 transition">
            About Us
            <ArrowRight
              className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1"
              size={25}
            />
          </button>
        </div>
      </div>
    );
  }
);

ThreeBlob.displayName = "ThreeBlob";

export default ThreeBlob;
