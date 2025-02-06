"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  Database,
  LineChart,
  Layers,
} from "lucide-react";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import dynamic from "next/dynamic";
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiSwift,
  SiDocker,
  SiGo,
  SiKotlin,
  SiNodedotjs,
  SiCplusplus,
  SiCsharp,
  SiRust,
  SiOpenjdk,
  SiDart,
  SiNextdotjs,
  SiVuedotjs,
} from "react-icons/si";

// Dynamically import the AbstractShape to avoid SSR issues
const AbstractShape = dynamic(() => import("./three/AbstractShape"), {
  ssr: false,
});

export default function Team() {
  const techStack = [
    { icon: SiGo, color: "#CBD5E1", label: "Go" }, // slate-300
    { icon: SiDart, color: "#CBD5E1", label: "Dart" }, // slate-300
    { icon: SiReact, color: "#CBD5E1", label: "React" }, // slate-300
    { icon: SiTypescript, color: "#CBD5E1", label: "TypeScript" }, // slate-300
    { icon: SiCplusplus, color: "#CBD5E1", label: "C++" }, // slate-300
    { icon: SiKotlin, color: "#CBD5E1", label: "Kotlin" }, // slate-300
    { icon: SiCsharp, color: "#CBD5E1", label: "C#" }, // slate-300
    { icon: SiSwift, color: "#CBD5E1", label: "Swift" }, // slate-300
    { icon: SiRust, color: "#CBD5E1", label: "Rust" }, // slate-300
    { icon: SiOpenjdk, color: "#CBD5E1", label: "Java" }, // slate-300
    { icon: SiNodedotjs, color: "#CBD5E1", label: "Node.js" }, // slate-300
    { icon: SiPython, color: "#CBD5E1", label: "Python" }, // slate-300
    { icon: SiVuedotjs, color: "#CBD5E1", label: "Vue" }, // slate-300
    { icon: SiNextdotjs, color: "#CBD5E1", label: "Next.js" }, // slate-300
  ];

  return (
    <section
      id="team"
      className="relative min-h-screen flex items-center py-16 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            <div className="lg:sticky lg:top-24">
              <motion.div className="mb-6">
                <span className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 blur-lg opacity-25" />
                  <span className="relative px-4 sm:px-6 py-2 text-sm text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                    Our Team
                  </span>
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                  Full Cycle
                </span>
                <br />
                <span className="text-white">Development</span>
              </h2>

              <p className="text-lg sm:text-xl text-indigo-200 mb-8 sm:mb-12">
                Our team brings together professionals from various fields:
                experienced frontend, backend and fullstack developers, UI/UX
                designers, mobile development specialists, DevOps
                engineers and digital marketers
                <br />
                <br />
                We create comprehensive solutions: from architecture design to
                project launch and support
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-start">
                {techStack.map((Item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                    className="relative group cursor-pointer"
                  >
                    <Item.icon
                      style={{ color: Item.color }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300 
                        drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]
                        group-hover:drop-shadow-[0_0_16px_${Item.color}90]`}
                    />
                    <motion.span
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                        text-xs sm:text-sm text-white/70 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 whitespace-nowrap"
                    >
                      {Item.label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute lg:relative inset-0 -top-80 lg:inset-auto h-full lg:h-[800px]"
            style={{ zIndex: 10 }}
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
              <AbstractShape />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
