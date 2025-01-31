import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileData from '../components/Coding/ProfileData';
import ProfileHeader from '../components/Coding/ProfileHeader';
import LeetCode from '../components/Coding/LeetCode';
import CodeChef from '../components/Coding/CodeChef';
import CodeForces from '../components/Coding/CodeForces';
import GeeksForGeeks from '../components/Coding/GeeksForGeeks';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const Coding = () => {
  const [codingStats, setCodingStats] = useState({
    leetcode: null,
    codechef: null,
    geeksforgeeks: null,
    codeforces: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showCacheAlert, setShowCacheAlert] = useState(false);
  const [platform, setPlatform] = useState("LeetCode");

  const shouldRefreshCache = () => {
    const lastRefresh = localStorage.getItem('lastApiRefresh');
    if (!lastRefresh) return true;
    
    const timeSinceLastRefresh = Date.now() - parseInt(lastRefresh);
    return timeSinceLastRefresh > CACHE_DURATION;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      const endpoints = {
        leetcode: {
          url: 'https://alfa-leetcode-api.onrender.com/userProfile/Subodh07',
          options: { method: 'GET' }
        },
        codechef: {
          url: 'https://codechef-api.vercel.app/handle/subodh5131',
          options: { method: 'GET' }
        },
        geeksforgeeks: {
          url: `https://api.allorigins.win/get?url=${encodeURIComponent('https://geeks-for-geeks-api.vercel.app/subodhkangale07')}`,
          options: { method: 'GET' }
        },
        codeforces: {
          url: `https://api.allorigins.win/get?url=${encodeURIComponent('https://codeforces.com/api/user.info?handles=subodh07')}`,
          options: { method: 'GET' }
        }
      };

      Object.keys(endpoints).forEach(platform => {
        try {
          const storedData = localStorage.getItem(platform);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCodingStats(prev => ({
              ...prev,
              [platform]: platform === 'codeforces' && parsedData.result ? 
                parsedData.result[0] : parsedData
            }));
          }
        } catch (e) {
          console.error(`Error loading ${platform} from localStorage:`, e);
        }
      });

      const needsRefresh = shouldRefreshCache();
      
      if (needsRefresh) {
        try {
          const responses = await Promise.allSettled(
            Object.entries(endpoints).map(async ([platform, config]) => {
              try {
                const response = await fetch(config.url, config.options);
                
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let data = await response.json();
                
                if (platform === 'geeksforgeeks' || platform === 'codeforces') {
                  try {
                    data = JSON.parse(data.contents);
                  } catch (e) {
                    console.error(`Error parsing ${platform} data:`, e);
                    return [platform, null];
                  }
                }
                
                const processedData = platform === 'codeforces' && data.result ? 
                  data.result[0] : data;
                
                localStorage.setItem(platform, JSON.stringify(data));
                return [platform, processedData];
              } catch (error) {
                console.error(`Error fetching ${platform} data:`, error);
                const storedData = localStorage.getItem(platform);
                if (storedData) {
                  const parsedData = JSON.parse(storedData);
                  return [platform, platform === 'codeforces' && parsedData.result ? 
                    parsedData.result[0] : parsedData];
                }
                return [platform, null];
              }
            })
          );

          const newData = {};
          responses.forEach((result) => {
            if (result.status === 'fulfilled' && result.value?.[1]) {
              const [platform, data] = result.value;
              newData[platform] = data;
            }
          });

          setCodingStats(prev => ({
            ...prev,
            ...newData
          }));

          const currentTime = Date.now();
          localStorage.setItem('lastApiRefresh', currentTime.toString());
          setLastUpdated(currentTime);
          setShowCacheAlert(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setShowCacheAlert(true);
        }
      } else {
        const lastRefresh = parseInt(localStorage.getItem('lastApiRefresh'));
        setLastUpdated(lastRefresh);
        setShowCacheAlert(true);
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const componentMapping = {
    LeetCode: LeetCode,
    CodeChef: CodeChef,
    CodeForces: CodeForces,
    GeeksForGeeks: GeeksForGeeks
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#090517] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mt-16">
        {showCacheAlert && (
          <div className="mb-4 p-4 rounded-lg bg-blue-900/20 border border-blue-800 text-blue-100">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                You're viewing cached data from {formatLastUpdated(lastUpdated)}. 
                Data is automatically refreshed weekly to ensure optimal performance.
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <ProfileHeader />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-2/3"
          >
            <ProfileData setPlatform={setPlatform} />
          </motion.div>
        </div>
        <div>
          {React.createElement(componentMapping[platform] || 'div')}
        </div>
      </div>
    </div>
  );
};

export default Coding;
