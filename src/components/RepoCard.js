import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, GitFork, Star } from 'lucide-react';

const RepoCard = ({ repo }) => (
  <motion.div 
    className="bg-[#1F2937] rounded-lg overflow-hidden border border-transparent hover:border-[#4F46E5]"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div>
          <h3 className="font-semibold text-base md:text-lg mb-2 truncate">{repo.name}</h3>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs px-2 py-1 rounded bg-[#374151] text-[#9CA3AF]">
              {repo.language || 'Unknown'}
            </span>
            {repo.topics?.slice(0, 2).map(topic => (
              <motion.span 
                key={topic} 
                className="text-xs px-2 py-1 rounded bg-[#4F46E5]/20 text-[#4F46E5]"
                whileHover={{ scale: 1.1 }}
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-[#374151] rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ExternalLink className="text-[#9CA3AF] hover:text-[#4F46E5]" size={18} />
        </motion.a>
      </div>
      <p className="text-[#9CA3AF] text-xs md:text-sm mb-4 line-clamp-2">
        {repo.description || 'No description available'}
      </p>
      <div className="flex items-center gap-4 text-[#9CA3AF] text-xs md:text-sm">
        <div className="flex items-center gap-1">
          <Star size={16} />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={16} />
          <span>{repo.forks_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default RepoCard;