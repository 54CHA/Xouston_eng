"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <span className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 blur-lg opacity-25" />
              <span className="relative px-6 py-2 text-sm text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                404 Error
              </span>
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-white">Page</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              Not Found
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-neutral-400 text-lg mb-12"
          >
            The requested page could not be found on the server.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center px-8 py-3 text-sm text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
