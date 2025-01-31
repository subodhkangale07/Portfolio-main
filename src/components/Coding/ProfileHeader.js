import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap } from 'lucide-react';
import subodh from '../../assest/subodh_pic.jpg'

const ProfileInfo = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 justify-center sm:justify-start">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#A855F7] flex items-center justify-center">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div>
      <p className="text-[#9CA3AF] text-xs">{label}</p>
      <p className="text-white font-medium text-sm md:text-base">{value}</p>
    </div>
  </div>
);

const ProfileHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full lg:w-1/3"
    >
      <div className="bg-gradient-to-br from-[#1F2937] to-[#374151] rounded-xl p-4 md:p-6 shadow-xl mt-5 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-center sm:items-start lg:items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-r from-[#4F46E5] to-[#A855F7] flex-shrink-0"
          >
            <img 
              src={subodh} 
              alt="Subodh Kangale" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          <div className="flex-1 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-xl md:text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Subodh Kangale
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <ProfileInfo 
                icon={MapPin}
                label="Country"
                value="India"
              />

              <ProfileInfo 
                icon={GraduationCap}
                label="College"
                value="Walchand College of Engineering"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;