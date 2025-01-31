import React from 'react';
import { Trophy, Users, Clock, Award, TrendingUp, Calendar } from 'lucide-react';

// Custom Card Components
const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

// Helper function to format timestamp to readable date
const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to format "last online" time
const formatLastOnline = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const CodeForces = () => {
  const codeforcesData = JSON.parse(localStorage.getItem("codeforces") || "{}");
  const userData = codeforcesData.result?.[0];

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-[#090517] p-8 flex items-center justify-center">
        <Card className="bg-gradient-to-r from-[#1F2937] to-[#374151]">
          <CardContent>
            <p className="text-white text-lg">No CodeForces data found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#090517] p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-[#1F2937] to-[#374151]">
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={userData.titlePhoto}
                  alt={userData.handle}
                  className="w-24 h-24 rounded-full border-4 border-[#A855F7]"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#4F46E5] rounded-full p-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">{userData.handle}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm capitalize
                    ${userData.rank === 'pupil' ? 'bg-green-500' :
                      userData.rank === 'newbie' ? 'bg-gray-500' : 'bg-blue-500'} 
                    text-white`}>
                    {userData.rank}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#9CA3AF]" />
                    <span className="text-[#D1D5DB]">Friends: {userData.friendOfCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#9CA3AF]" />
                    <span className="text-[#D1D5DB]">Last online: {formatLastOnline(userData.lastOnlineTimeSeconds)}</span>
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
                  <h2 className="text-3xl font-bold text-white">{userData.rating}</h2>
                </div>
                <TrendingUp className="w-8 h-8 text-[#3B82F6]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9CA3AF] mb-1">Max Rating</p>
                  <h2 className="text-3xl font-bold text-[#FBBF24]">{userData.maxRating}</h2>
                </div>
                <Trophy className="w-8 h-8 text-[#FBBF24]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9CA3AF] mb-1">Max Rank</p>
                  <h2 className="text-3xl font-bold text-[#A855F7] capitalize">{userData.maxRank}</h2>
                </div>
                <Award className="w-8 h-8 text-[#A855F7]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Card */}
        <Card className="bg-gradient-to-br from-[#1F2937] to-[#374151]">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-[#9CA3AF]" />
                <div>
                  <p className="text-[#9CA3AF] text-sm">Registered</p>
                  <p className="text-white">{formatDate(userData.registrationTimeSeconds)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Trophy className="w-6 h-6 text-[#9CA3AF]" />
                <div>
                  <p className="text-[#9CA3AF] text-sm">Contribution</p>
                  <p className="text-white">{userData.contribution}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeForces;