"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid gap-6"
    >
      {children}
    </motion.section>
  );
}
