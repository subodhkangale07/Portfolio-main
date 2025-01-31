import React from 'react';
import { motion } from 'framer-motion';

const TabButton = ({ active, onClick, icon, label }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
      active 
        ? 'bg-[#4F46E5] text-white' 
        : 'bg-[#374151] text-[#9CA3AF] hover:bg-[#4F46E5]/20'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    {label}
  </motion.button>
);

export default TabButton;