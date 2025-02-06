"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileSignature,
  Paintbrush,
  Code2,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    icon: FileSignature,
    title: "Contract Signing",
    description:
      "We discuss all project details, prepare and sign a contract with clear terms",
    gradient: "from-violet-500 to-indigo-500",
    features: [
      "Terms agreement",
      "Timeline definition",
      "Cost fixation",
      "Document signing",
    ],
  },
  {
    icon: Paintbrush,
    title: "Design Development and Approval",
    description:
      "We create a unique design, taking into account your preferences and modern trends",
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Prototyping",
      "UI/UX design",
      "Responsive layout",
      "Design approval",
    ],
  },
  {
    icon: Code2,
    title: "Product Development",
    description:
      "We transform the design into a fully functional product and conduct testing",
    gradient: "from-emerald-500 to-green-500",
    features: [
      "Frontend development",
      "Backend development",
      "API integration",
      "Code optimization",
    ],
  },
  {
    icon: FileText,
    title: "Content Population",
    description:
      "We populate the site with content, upload photos and textual materials",
    gradient: "from-amber-500 to-orange-500",
    features: [
      "Content creation",
      "Image optimization",
      "Data structuring",
      "Content verification",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Delivery",
    description:
      "We conduct final testing, help deploy the project and transfer all necessary data",
    gradient: "from-rose-500 to-red-500",
    features: [
      "Testing",
      "Bug fixing",
      "Documentation",
      "Project handover",
    ],
  },
  // {
  //   icon: Settings,
  //   title: "Additional Services",
  //   description: "We provide additional services for your project development.",
  //   gradient: "from-purple-500 to-pink-500",
  //   features: [
  //     "SEO optimization",
  //     "Technical support",
  //     "Analytics",
  //     "Marketing promotion"
  //   ]
  // }
];

// Create a separate component for each card to properly use hooks
function ProcessCard({
  step,
  index,
  containerRef,
}: {
  step: (typeof steps)[0];
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${index * 0.15} start`, `${(index + 1) * 0.15} start`],
  });

  // Smoother opacity transition
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 1],
    [0, 0, 0.5, 1, 1]
  );

  // More natural easing for the y movement
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [300, 300, 0, 0]);

  const nextCardProgress = useScroll({
    target: containerRef,
    offset: [`${(index + 1) * 0.15} start`, `${(index + 2) * 0.15} start`],
  });

  // Smoother scale reduction with easeInOut
  const scale = useTransform(
    nextCardProgress.scrollYProgress,
    [0, 0.4, 0.8, 1],
    [1, 1, 0.97, 0.95]
  );

  // Add subtle rotation for more depth
  const rotate = useTransform(
    nextCardProgress.scrollYProgress,
    [0, 1],
    [0, -0.5]
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `calc(20vh + ${index * 30}px)`,
        opacity,
        y,
        scale,
        rotateX: rotate,
        transformPerspective: 1000,
        width: "100%",
        maxWidth: "900px",
      }}
      className="group mx-auto"
      transition={{ ease: "easeInOut" }}
    >
      <div className="relative overflow-hidden bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${step.gradient} blur-2xl`}
        />

        <div className="relative p-8">
          {/* Header Section with improved layout */}
          <div className="flex items-start gap-6 mb-8">
            <div
              className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${step.gradient} p-[1px] shadow-lg`}
            >
              <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-xl">
                <step.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white/60 mb-3">
                Stage {index + 1}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {step.title}
              </h3>
            </div>
          </div>

          {/* Description with improved typography */}
          <p className="text-white/70 text-base leading-relaxed mb-8">
            {step.description}
          </p>

          {/* Features with enhanced styling */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {step.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="flex items-center gap-3 group/feature"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient} group-hover/feature:scale-125 transition-transform duration-300`}
                />
                <span className="text-sm text-white/70 group-hover/feature:text-white/90 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-25 blur-2xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-t from-white/5 to-transparent opacity-25 blur-2xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-20">
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
                How We Work
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
            <span className="text-white">Development</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              Process
            </span>
          </motion.h2>
        </motion.div>

        {isClient ? (
          <div
            className="relative"
            style={{
              height: `${(steps.length + 0.15) * 100}vh`,
              minHeight: `${steps.length * 250}px`,
            }}
          >
            {steps.map((step, index) => (
              <ProcessCard
                key={step.title}
                step={step}
                index={index}
                containerRef={containerRef}
              />
            ))}
          </div>
        ) : (
          // Loading state
          <div className="relative min-h-[100vh] flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}
