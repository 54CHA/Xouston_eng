"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Scene from "./three/Scene";
import { useModal } from "@/contexts/ModalContext";
import styles from './styles.module.css'

export default function Hero() {
  const { openRequestModal } = useModal();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Scene />

      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 relative z-10"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="relative mb-4 sm:mb-6 bg-transparent">
            <div className={styles.titleGradient}/>

            <h1 className="text-[2.5rem] leading-tight sm:text-6xl font-bold relative">
              <motion.div
                className="inline-block"
                variants={item}
              >
                <span className="animate-text-gradient bg-clip-text [-webkit-background-clip:text] text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500">
                  Creating Digital
                </span>
              </motion.div>
              <br />
              <motion.span className="inline-block text-white" variants={item}>
                Excellence
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            variants={item}
            className="text-base sm:text-xl md:text-2xl text-indigo-200 mb-8 sm:mb-12 max-w-[90%] "
          >
            We create unique mobile and web solutions that drive the growth of progressive businesses
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openRequestModal}
              className="group relative w-full sm:w-auto"
              variants={item}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500 group-hover:duration-200 animate-tilt" />
              <div className="relative flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium mb-1">
                <motion.span
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Submit Request
                </motion.span>
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </motion.button>

            <motion.a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto"
              variants={item}
            >
              <div className="relative flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300">
                <motion.span
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  Explore Services
                </motion.span>
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
