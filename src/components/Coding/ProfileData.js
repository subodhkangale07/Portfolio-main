import React from 'react';
import { motion } from 'framer-motion';

const platformLogo = {
  leetcode: "https://codolio.com/icons/leetcode_light.png",
  codechef: "https://codolio.com/icons/codechef_light.png",
  gfg: "https://codolio.com/icons/gfg.png",
  codeforces: "https://codolio.com/icons/codeforces.png",
};

const platformUrls = {
  leetcode: "https://leetcode.com/",
  geeksforgeeks: "https://auth.geeksforgeeks.org/user/",
  codechef: "https://www.codechef.com/users/",
  codeforces: "https://codeforces.com/profile/"
};

const getLogoUrl = (platformName) => {
  const name = platformName.toLowerCase();
  if (name === 'leetcode') return platformLogo.leetcode;
  if (name === 'geeksforgeeks') return platformLogo.gfg;
  if (name === 'codechef') return platformLogo.codechef;
  if (name === 'codeforces') return platformLogo.codeforces;
  return '';
};

const ProfileCard = ({ profile, index, setPlatform }) => {
  const handleCardClick = (e) => {
    e.stopPropagation();
    setPlatform(profile.name);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    const platform = profile.name.toLowerCase();
    const baseUrl = platformUrls[platform];
    if (baseUrl) {
      window.open(baseUrl + profile.userId.replace('@', ''), '_blank');
    }
  };

  return (
    <motion.div
      key={profile.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="group bg-gradient-to-br from-[#1F2937] to-[#374151] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Platform Logo */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#A855F7] flex items-center justify-center overflow-hidden"
      >
        <motion.img 
          src={getLogoUrl(profile.name)}
          alt={`${profile.name} logo`}
          className="w-12 h-12 object-contain"
          whileHover={{ rotate: -5 }}
        />
      </motion.div>
      
      {/* Profile Info */}
      <div className="text-center relative z-10">
        <motion.h3 
          className="text-xl font-bold text-white mb-2"
          whileHover={{ scale: 1.05 }}
        >
          {profile.name}
        </motion.h3>
        <motion.p 
          className="text-[#9CA3AF] text-sm mb-4"
          whileHover={{ scale: 1.05 }}
        >
          {profile.userId}
        </motion.p>
        
        {/* View Profile Button */}
        <motion.button
          onClick={handleProfileClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-4 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] text-white rounded-lg font-medium 
                     hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl
                     hover:from-[#4F46E5] hover:to-[#A855F7]"
        >
          <span className="flex items-center justify-center gap-2">
            View Profile
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProfileData = ({ setPlatform }) => {
  const profiles = [
    {
      "name": "LeetCode",
      "userId": "@Subodh07"
    },
    {
      "name": "GeeksForGeeks",
      "userId": "@subodhkangale07"
    },
    {
      "name": "CodeChef",
      "userId": "@subodh5131"
    },
    
  ];

  return (
    <div className="bg-gradient-to-br bg-[#090517] p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profiles.map((profile, index) => (
          <ProfileCard 
            key={profile.name}
            profile={profile}
            index={index}
            setPlatform={setPlatform}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileData;