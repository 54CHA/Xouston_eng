"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe,
  Rocket,
  Database,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useRef, useState } from "react";
import { IconBrandTelegram } from "@tabler/icons-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiTelegram,
  SiVk,
} from "react-icons/si";

const services = [
  {
    title: "Websites",
    description: "Modern, fast and responsive websites for your business",
    delay: 0.2,
    icon: Globe,
    startingPrice: "from $400",
    stack: [
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiReact, name: "React" },
      { icon: SiTailwindcss, name: "Tailwind" },
    ],
  },
  {
    title: "Web Applications",
    description:
      "Complex web applications with rich functionality and interactivity",
    delay: 0.3,
    icon: Code2,
    startingPrice: "from $700",
    stack: [
      { icon: SiReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiNodedotjs, name: "Node.js" },
    ],
  },
  {
    title: "Telegram Mini Apps",
    description:
      "We create mini-applications for Telegram with rich functionality and bot integration",
    delay: 0.4,
    icon: IconBrandTelegram,
    startingPrice: "from $300",
    stack: [
      { icon: SiTelegram, name: "Telegram" },
      { icon: SiReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
    ],
  },
  {
    title: "Mobile Applications",
    description: "Native applications for iOS and Android with modern design",
    delay: 0.5,
    icon: Smartphone,
    startingPrice: "from $800",
    stack: [
      { icon: SiKotlin, name: "Kotlin" },
      { icon: SiSwift, name: "Swift" },
      { icon: SiFlutter, name: "Flutter" },
    ],
  },
  {
    title: "Special Projects",
    description:
      "Non-standard solutions and custom development for your unique tasks",
    delay: 0.6,
    icon: Rocket,
    startingPrice: "by agreement",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [rotations, setRotations] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardRef: React.RefObject<HTMLDivElement>,
    title: string
  ) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate relative position (0 to 1)
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    // Convert to degrees (-20 to 20 degrees)
    const rotateY = (relativeX - 0.5) * 20;
    const rotateX = -(relativeY - 0.5) * 20;

    setRotations((prev) => ({
      ...prev,
      [title]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (title: string) => {
    setRotations((prev) => ({
      ...prev,
      [title]: { x: 0, y: 0 },
    }));
  };

  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleFlip = (title: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Create individual refs for each service card
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRef4 = useRef<HTMLDivElement>(null);
  const cardRef5 = useRef<HTMLDivElement>(null);

  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4, cardRef5];

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="" />

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Header Section */}
        <motion.div style={{ y }} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 blur-lg opacity-25" />
              <span className="relative px-6 py-2 text-sm text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                Our Services
              </span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-white">Transforming your ideas into</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              digital reality
            </span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className={`group relative min-h-[250px] ${
                  index === 4
                    ? "md:col-span-2 lg:col-span-1 lg:col-start-2"
                    : ""
                }`}
              >
                <div
                  ref={cardRefs[index]}
                  className="relative w-full h-full"
                  style={{
                    perspective: "1000px",
                    transform: `perspective(1000px) rotateY(${
                      rotations[service.title]?.y || 0
                    }deg) rotateX(${rotations[service.title]?.x || 0}deg)`,
                    transition: "transform 0.1s ease-out",
                  }}
                  onClick={() => toggleFlip(service.title)}
                  onMouseMove={(e) =>
                    handleMouseMove(e, cardRefs[index], service.title)
                  }
                  onMouseLeave={() => handleMouseLeave(service.title)}
                >
                  {/* Front of card */}
                  <div
                    data-title={service.title}
                    className="absolute w-full h-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 p-8 rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: flippedCards[service.title]
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Icon - Updated styles */}
                    <div className="absolute -top-4 -right-4 transition-all duration-300 group-hover:scale-[1.2] group-hover:rotate-3">
                      <service.icon className="w-[110px] h-[110px] rotate-[10deg] text-white/[0.05] group-hover:text-indigo-300/[0.3] transition-colors duration-300 " />
                    </div>

                    {/* Number indicator */}
                    <div className="relative z-10">
                      <div className="relative inline-flex mb-6">
                        <span className="px-3 py-1 text-sm text-white/90 bg-white/5 rounded-full border border-white/10">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-indigo-300 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors pb-8">
                        {service.description}
                      </p>

                      {/* Arrow indicator */}
                    </div>
                    <div className="absolute bottom-5 right-10 flex items-center text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm">More info</span>
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute w-full h-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 p-8 rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: flippedCards[service.title]
                        ? "rotateY(0deg)"
                        : "rotateY(-180deg)",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <h4 className="text-xl font-medium mb-4 text-white group-hover:text-indigo-300 transition-colors">
                        &quot;{service.title}&quot;
                      </h4>
                      <div className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                        {service.startingPrice}
                      </div>

                      {/* Stack icons */}
                      {service.stack && (
                        <div className="flex gap-4">
                          {service.stack.map((tech) => (
                            <div
                              key={tech.name}
                              className="group/icon relative"
                            >
                              <tech.icon className="w-6 h-6 text-white/50 hover:text-white/90 transition-colors" />
                              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                                {tech.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
