import React from 'react';
import { motion } from 'framer-motion';
import { Code, GitPullRequest, Activity, Users } from 'lucide-react';
import StatBox from './StatBox';

const ProfileHeader = ({ userData, stats }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12"
      variants={item}
    >
      <div className="relative group w-32 h-32 md:w-40 md:h-40">
        <motion.img 
          src={userData?.avatar_url}
          alt="Profile" 
          className="rounded-full w-full h-full border-4 border-[#4F46E5] shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#4F46E5] px-3 py-1 rounded-full text-xs md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {userData?.login}
        </motion.div>
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#A855F7] bg-clip-text text-transparent mb-2"
          variants={item}
        >
          {userData?.name}
        </motion.h1>
        <motion.p 
          className="text-[#9CA3AF] mb-6 text-sm md:text-base"
          variants={item}
        >
          {userData?.bio}
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          <StatBox icon={<Code />} label="Repositories" value={userData?.public_repos} />
          <StatBox icon={<GitPullRequest />} label="Pull Requests" value={stats.totalPRs} />
          <StatBox icon={<Activity />} label="Contributions" value={stats.totalCommits} />
          <StatBox icon={<Users />} label="Followers" value={userData?.followers} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;