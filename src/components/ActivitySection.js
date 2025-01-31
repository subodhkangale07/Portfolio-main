import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4F46E5', '#A855F7', '#3B82F6', '#FBBF24', '#EC4899'];

const ActivitySection = ({ stats, langStats }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
      variants={item}
    >
      <motion.div 
        className="bg-[#1F2937] rounded-lg p-4 md:p-6 shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
          <Activity size={20} className="text-[#4F46E5]" />
          Contribution Activity
        </h2>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.contributions}>
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#374151', border: 'none' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
              <Area 
                type="monotone" 
                dataKey="commits" 
                stroke="#4F46E5" 
                fill="url(#colorCommits)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div 
        className="bg-[#1F2937] rounded-lg p-4 md:p-6 shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap size={20} className="text-[#4F46E5]" />
          Technology Stack
        </h2>
        <div className="h-48 md:h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={langStats}
                innerRadius={45}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
              >
                {langStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#374151', border: 'none' }}
                itemStyle={{ color: '#FFFFFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {langStats.map((lang, index) => (
            <motion.span 
              key={lang.name}
              className="px-3 py-1 rounded-full text-xs md:text-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] + '40', color: COLORS[index % COLORS.length] }}
              whileHover={{ scale: 1.1 }}
            >
              {lang.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActivitySection;