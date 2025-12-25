"use client";

import React from "react";
import { motion } from "framer-motion";

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // පටන් ගද්දි: පේන්නෙ නෑ, ටිකක් පහල තියෙන්නේ
      whileInView={{ opacity: 1, y: 0 }} // Scroll කරාම: පේන්න ගන්නවා, උඩට එනවා
      viewport={{ once: true, margin: "-100px" }} // එක පාරයි වෙන්නේ (ආයේ උඩට ගියාම නැති වෙන්නෙ නෑ)
      transition={{ duration: 0.8, ease: "easeOut" }} // තත්පර 0.8ක් හිමින් එනවා
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;