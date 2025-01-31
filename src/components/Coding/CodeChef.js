import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Star, Globe, Flag, TrendingUp, Award } from 'lucide-react';

// Custom Card Components
const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-700">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">
    {children}
  </h2>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const CodeChef = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem("codechef");
      if (data) {
        setProfileData(JSON.parse(data));
      } else {
        setError("No CodeChef data found");
      }
    } catch (err) {
      setError("Error loading CodeChef data");
      console.error("Error parsing CodeChef data:", err);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-black to-[#4F46E5] p-8 flex items-center justify-center">
        <Card className="bg-gradient-to-r from-[#1F2937] to-[#374151]">
          <CardContent>
            <p className="text-white text-lg">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-black to-[#4F46E5] p-8 flex items-center justify-center">
        <Card className="bg-gradient-to-r from-[#1F2937] to-[#374151]">
          <CardContent>
            <p className="text-white text-lg">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formattedRatingData = profileData.ratingData.map(item => ({
    name: item.code,
    rating: parseInt(item.rating),
    rank: parseInt(item.rank)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#090517] p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-[#1F2937] to-[#374151]">
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profileData.profile}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full border-4 border-[#A855F7]"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#4F46E5] rounded-full p-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{profileData.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#9CA3AF]" />
                    <span className="text-[#D1D5DB]">Rank: {profileData.globalRank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-5 h-5 text-[#9CA3AF]" />
                    <img src={profileData.countryFlag} alt={profileData.countryName} className="w-6 h-4" />
                    <span className="text-[#D1D5DB]">Rank: {profileData.countryRank}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9CA3AF] mb-1">Current Rating</p>
                  <h2 className="text-3xl font-bold text-white">{profileData.currentRating}</h2>
                </div>
                <TrendingUp className="w-8 h-8 text-[#3B82F6]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9CA3AF] mb-1">Highest Rating</p>
                  <h2 className="text-3xl font-bold text-[#FBBF24]">{profileData.highestRating}</h2>
                </div>
                <Trophy className="w-8 h-8 text-[#FBBF24]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9CA3AF] mb-1">Stars</p>
                  <h2 className="text-3xl font-bold text-[#A855F7]">{profileData.stars}</h2>
                </div>
                <Award className="w-8 h-8 text-[#A855F7]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Graph */}
        <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
          <CardHeader>
            <CardTitle className="text-white">Rating Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedRatingData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#A855F7" 
                    strokeWidth={2}
                    dot={{ fill: '#A855F7', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeChef;