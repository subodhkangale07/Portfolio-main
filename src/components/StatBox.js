import React from 'react';
import { motion } from 'framer-motion';

const StatBox = ({ icon, label, value }) => (
  <motion.div 
    className="bg-[#374151] rounded-lg p-3 md:p-4"
    whileHover={{ scale: 1.05, backgroundColor: '#4F46E5' }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center gap-2 md:gap-3">
      {React.cloneElement(icon, { size: 18, className: "text-[#A855F7]" })}
      <div>
        <div className="text-xs md:text-sm text-[#9CA3AF]">{label}</div>
        <div className="font-semibold text-base md:text-lg">{value}</div>
      </div>
    </div>
  </motion.div>
);

export default StatBox;