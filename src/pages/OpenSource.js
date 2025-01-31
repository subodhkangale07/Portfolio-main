import React, { useState, useEffect } from 'react';
import { 
  Github, Star, GitFork, Code, Users, ExternalLink, 
  BookOpen, GitPullRequest, Activity, Calendar,
  Clock, Award, Zap, Bookmark, AlertCircle
} from 'lucide-react';
import RepoCard from '../components/RepoCard';
import TabButton from '../components/TabButton';
import ProfileHeader from '../components/ProfileHeader';
import ActivitySection from '../components/ActivitySection';

const GITHUB_TOKEN = process.env.REACT_APP_SUBODH;


const OpenSource = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contributedRepos, setContributedRepos] = useState([]);
  const [activeTab, setActiveTab] = useState('personal');
  const [stats, setStats] = useState({
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    contributions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [langStats, setLangStats] = useState([]);
  const [remainingRequests, setRemainingRequests] = useState(null);

  // Helper function to make authenticated GitHub API requests
  const fetchWithAuth = async (url) => {
    const headers = {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    };
    const response = await fetch(url, { headers });
    
    // Check and store rate limit information
    const rateLimit = response.headers.get('X-RateLimit-Remaining');
    setRemainingRequests(rateLimit);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      } else if (response.status === 401) {
        throw new Error('Invalid GitHub access token. Please check your configuration.');
      } else {
        throw new Error(`GitHub API error: ${response.status}`);
      }
    }
    
    return response.json();
  };

  // Function to fetch contribution data using the GitHub API
  const fetchContributionData = async (username) => {
    try {
      // Get contributions for the last year
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      // Format the date range for the query
      const fromDate = oneYearAgo.toISOString().split('T')[0];
      const toDate = today.toISOString().split('T')[0];
      
      // Fetch commit activity using the GitHub API
      const commitData = await fetchWithAuth(
        `https://api.github.com/search/commits?q=author:${username}+author-date:${fromDate}..${toDate}&per_page=100`
      );
      
      // Group commits by month
      const monthlyCommits = {};
      commitData.items.forEach(item => {
        const date = new Date(item.commit.author.date);
        const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        monthlyCommits[monthYear] = (monthlyCommits[monthYear] || 0) + 1;
      });
      
      // Create an array of the last 12 months
      const last12Months = Array.from({ length: 12 }).map((_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        return {
          name: date.toLocaleString('default', { month: 'short' }),
          commits: monthlyCommits[date.toLocaleString('default', { month: 'short', year: 'numeric' })] || 0
        };
      }).reverse();
      
      return last12Months;
    } catch (error) {
      console.warn('Failed to fetch contribution data:', error);
      // Fallback to simulated data if the API fails
      return Array.from({ length: 12 }).map((_, i) => ({
        name: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }),
        commits: 0,
      })).reverse();
    }
  };

  const fetchTotalIssues = async (username) => {
    try {
      const data = await fetchWithAuth(
        `https://api.github.com/search/issues?q=author:${username}+type:issue`
      );
      return data.total_count || 0;
    } catch (error) {
      console.warn('Failed to fetch issues:', error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        if (!GITHUB_TOKEN) {
          throw new Error('GitHub access token not configured. Please add NEXT_PUBLIC_GITHUB_TOKEN to your environment variables.');
        }

        setError(null);
        
        // Fetch basic user data
        const userData = await fetchWithAuth('https://api.github.com/users/subodhkangale07');
        setUserData(userData);
  
        // Fetch repositories with pagination
        let allRepos = [];
        let page = 1;
        let hasMore = true;
        
        while (hasMore) {
          const reposData = await fetchWithAuth(
            `https://api.github.com/users/subodhkangale07/repos?per_page=100&page=${page}`
          );
          if (reposData.length === 0) {
            hasMore = false;
          } else {
            allRepos = [...allRepos, ...reposData];
            page++;
          }
        }
        
        setRepos(allRepos);
  
        // Fetch contributed repositories
        const contributedData = await fetchWithAuth(
          'https://api.github.com/search/issues?q=author:subodhkangale07+type:pr+is:merged&per_page=100'
        );
        
        // Get unique repositories from PRs with proper error handling
        const uniqueRepos = [...new Set(contributedData.items.map(pr => pr.repository_url))];
        const repoPromises = uniqueRepos.map(url => fetchWithAuth(url).catch(() => null));
        const repoDetails = (await Promise.all(repoPromises)).filter(Boolean);
        setContributedRepos(repoDetails);
  
        // Calculate language statistics
        const languages = {};
        allRepos.forEach(repo => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });
        
        const langData = Object.entries(languages)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
        setLangStats(langData);
  
        // Calculate total commits with improved error handling
        let totalCommits = 0;
        for (const repo of allRepos) {
          try {
            const commitsData = await fetchWithAuth(
              `https://api.github.com/repos/${userData.login}/${repo.name}/commits?per_page=1`
            );
            totalCommits += Array.isArray(commitsData) ? commitsData.length : 0;
          } catch (error) {
            console.warn(`Failed to fetch commits for ${repo.name}:`, error);
            continue;
          }
        }
  
        setStats({
          totalCommits,
          totalPRs: contributedData.items.length,
          totalIssues: await fetchTotalIssues(userData.login),
          contributions: await fetchContributionData(userData.login)
        });
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchGitHubData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-[#090517] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto p-8">
          <AlertCircle size={48} className="text-red-500" />
          <h2 className="text-xl font-semibold">Failed to Load GitHub Profile</h2>
          <p className="text-[#9CA3AF] mb-4">{error}</p>
          {remainingRequests !== null && (
            <p className="text-sm text-[#9CA3AF]">
              API Requests Remaining: {remainingRequests}
            </p>
          )}
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#4F46E5] rounded-lg hover:bg-[#4F46E5]/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 bg-[#090517] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader userData={userData} stats={stats} />
        <ActivitySection stats={stats} langStats={langStats} />
        
        <div className="mb-8">
          <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide">
            <TabButton
              active={activeTab === 'personal'} 
              onClick={() => setActiveTab('personal')}
              icon={<BookOpen size={16} />}
              label="Personal Projects"
            />
            <TabButton 
              active={activeTab === 'contributed'} 
              onClick={() => setActiveTab('contributed')}
              icon={<GitPullRequest size={16} />}
              label="Contributions"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {(activeTab === 'personal' ? repos : contributedRepos).length > 0 ? (
              (activeTab === 'personal' ? repos : contributedRepos).map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-[#9CA3AF]">
                No repositories found
              </div>
            )}
          </div>
        </div>

        {(stats.totalPRs > 0 || stats.totalCommits > 0) && (
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#A855F7] rounded-lg p-1">
            <div className="bg-[#1F2937] rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Award className="text-[#FBBF24]" size={24} />
                <div>
                  <h3 className="font-semibold">Active Contributor</h3>
                  <p className="text-sm text-[#9CA3AF]">
                    {stats.totalPRs} PRs merged across {contributedRepos.length} repositories
                  </p>
                </div>
              </div>
              <div className="text-[#FBBF24]">+{stats.totalCommits} commits</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenSource;