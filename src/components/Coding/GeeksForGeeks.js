import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Code, Zap, Award, BookOpen, Github, Calendar } from 'lucide-react';

const GeeksForGeeksDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [difficultyData, setDifficultyData] = useState([]);

  useEffect(() => {
    // Get data from localStorage
    const data = JSON.parse(localStorage.getItem("geeksforgeeks") || "{}");
    
    // Set default values if data is missing
    const processedData = {
      info: {
        userName: data.info?.userName || "N/A",
        profilePicture: data.info?.profilePicture || "https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg",
        instituteRank: data.info?.instituteRank || "N/A",
        currentStreak: data.info?.currentStreak || "0",
        maxStreak: data.info?.maxStreak || "0",
        institution: data.info?.institution || "N/A",
        languagesUsed: data.info?.languagesUsed || "",
        codingScore: data.info?.codingScore || "0",
        totalProblemsSolved: data.info?.totalProblemsSolved || "0",
      },
      solvedStats: {
        school: { count: data.solvedStats?.school?.count || 0 },
        basic: { count: data.solvedStats?.basic?.count || 0 },
        easy: { count: data.solvedStats?.easy?.count || 0 },
        medium: { count: data.solvedStats?.medium?.count || 0 },
        hard: { count: data.solvedStats?.hard?.count || 0 }
      }
    };

    setProfileData(processedData);

    // Process difficulty data for charts
    const difficulties = [
      { name: 'School', value: processedData.solvedStats.school.count },
      { name: 'Basic', value: processedData.solvedStats.basic.count },
      { name: 'Easy', value: processedData.solvedStats.easy.count },
      { name: 'Medium', value: processedData.solvedStats.medium.count },
      { name: 'Hard', value: processedData.solvedStats.hard.count }
    ];
    
    setDifficultyData(difficulties);
  }, []); // Run once on component mount

  const COLORS = ['#4F46E5', '#A855F7', '#3B82F6', '#10B981', '#EF4444'];
  const DIFFICULTY_COLORS = {
    School: '#4F46E5',
    Basic: '#A855F7',
    Easy: '#3B82F6',
    Medium: '#10B981',
    Hard: '#EF4444'
  };

  const StatCard = ({ icon: Icon, title, value, className }) => (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-xl ${className}`}>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <p className="text-gray-200 font-medium">{`${label}`}</p>
          <p className="text-gray-300">{`Problems: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Show loading state if data is not yet loaded
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#090517]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-xl">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={profileData.info.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-indigo-600"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{profileData.info.userName}</h1>
                <p className="text-gray-400">{profileData.info.institution}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {profileData.info.languagesUsed.split(', ').map((lang) => (
                    <span key={lang} className="px-3 py-1 rounded-full text-sm bg-indigo-600/20 text-indigo-400">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={Trophy} 
            title="Institute Rank" 
            value={profileData.info.instituteRank} 
          />
          <StatCard 
            icon={Award} 
            title="Current Streak" 
            value={profileData.info.currentStreak} 
          />
          <StatCard 
            icon={Zap} 
            title="Max Streak" 
            value={profileData.info.maxStreak} 
          />
          <StatCard 
            icon={Code} 
            title="Coding Score" 
            value={profileData.info.codingScore} 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Problem Difficulty Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={difficultyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value">
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-xl">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Problems Solved Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                {difficultyData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-gray-400">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Problems Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400">Total Problems Solved</p>
                  <p className="text-3xl font-bold text-white">{profileData.info.totalProblemsSolved}</p>
                </div>
              </div>
              <div className="hidden md:block h-16 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ value: parseInt(profileData.info.totalProblemsSolved) }]}>
                    <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeeksForGeeksDashboard;