import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Trophy, Target, Code, Star, GitBranch, Calendar } from 'lucide-react';

const LeetCode = () => {
  // Parse the leetcode data from localStorage
  const leetcodeData = JSON.parse(localStorage.getItem("leetcode") || "{}");
  console.log("leetcodeData",leetcodeData);
  const difficultyColors = {
    Easy: '#00b8a3',
    Medium: '#ffc01e',
    Hard: '#ef4743',
  };

  const pieData = [
    { name: 'Easy', value: leetcodeData.easySolved, total: leetcodeData.totalEasy },
    { name: 'Medium', value: leetcodeData.mediumSolved, total: leetcodeData.totalMedium },
    { name: 'Hard', value: leetcodeData.hardSolved, total: leetcodeData.totalHard },
  ];

  const submissionData = leetcodeData.totalSubmissions?.map(item => ({
    name: item.difficulty,
    Solved: item.count,
    Total: item.submissions,
  })) || [];

  const stats = [
    { 
      icon: Trophy,
      label: 'Ranking',
      value: leetcodeData.ranking?.toLocaleString(),
      color: 'text-yellow-500'
    },
    {
      icon: Target,
      label: 'Total Solved',
      value: leetcodeData.totalSolved?.toLocaleString(),
      color: 'text-blue-500'
    },
    {
      icon:Code,
      label: 'Contribution Points',
      value: leetcodeData.contributionPoint?.toLocaleString(),
      color: 'text-red-500'
    },
    {
      icon: Star,
      label: 'Reputation',
      value: leetcodeData.reputation?.toLocaleString(),
      color: 'text-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-[#090517] p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem Solving Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">Problem Solving Progress</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={Object.values(difficultyColors)[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-700 p-2 rounded shadow">
                            <p className="text-sm">{`${data.name}: ${data.value}/${data.total}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {Object.entries(difficultyColors).map(([difficulty, color]) => (
                <div key={difficulty} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
                  <span className="text-sm">{difficulty}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submission Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">Submission Statistics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={submissionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ payload, label }) => {
                      if (payload && payload.length) {
                        return (
                          <div className="bg-gray-700 p-2 rounded shadow">
                            <p className="text-sm font-bold">{label}</p>
                            {payload.map((entry) => (
                              <p key={entry.name} className="text-sm">
                                {`${entry.name}: ${entry.value}`}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="Solved" fill="#4f46e5" />
                  <Bar dataKey="Total" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold mb-4">Recent Submissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3">Problem</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Language</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {leetcodeData.recentSubmissions?.slice(0, 5).map((submission, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700"
                  >
                    <td className="py-3">{submission.title}</td>
                    <td className={`py-3 ${
                      submission.statusDisplay === 'Accepted' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {submission.statusDisplay}
                    </td>
                    <td className="py-3">{submission.lang}</td>
                    <td className="py-3">
                      {new Date(submission.timestamp * 1000).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeetCode;