// Constants and data structure for the coding dashboard
const PLATFORM_COLORS = {
  LeetCode: '#FFA116',
  CodeForces: '#1890FF',
  GeeksForGeeks: '#2E8B57',
  CodeChef: '#5B4638'
};

const DIFFICULTY_COLORS = {
  Easy: '#22C55E',
  Medium: '#FBBF24',
  Hard: '#EF4444'
};

export const userData = {
  personalInfo: {
    username: "jlaqrHup",
    fullName: "Subodh Kangale",
    institution: "Walchand College of Engineering, Sangli",
    country: "India",
    languages: ["Java", "C++", "JavaScript"]
  },
  statistics: {
    totalSolved: 726,
    totalAttempted: 334,
    submissions: 334,
    contests: 75,
    globalRank: 316,
    activeDays: 423,
    maxStreak: 45,
    currentStreak: 3,
    viewCount: 0,
    reputation: 3,
    badgeCount: 8
  },
  platformStats: {
    LeetCode: {
      rating: 1901,
      solved: 584,
      rank: "Knight",
      contests: 25,
      bestRank: 316,
      currentStreak: 3,
      maxStreak: 45
    },
    CodeForces: {
      rating: 1105,
      solved: 36,
      rank: "Pupil",
      contests: 14,
      bestRank: 1123
    },
    GeeksForGeeks: {
      score: 1577,
      solved: 5,
      rank: "55",
      articles: 5
    },
    CodeChef: {
      rating: 1628,
      solved: 101,
      rank: "2★",
      contests: 36,
      globalRank: 25098,
      countryRank: 22359
    }
  },
  problemStats: {
    byDifficulty: [
      { name: "Easy", solved: 207, total: 830, color: DIFFICULTY_COLORS.Easy },
      { name: "Medium", solved: 317, total: 1742, color: DIFFICULTY_COLORS.Medium },
      { name: "Hard", solved: 60, total: 757, color: DIFFICULTY_COLORS.Hard }
    ],
    byLanguage: [
      { name: "Java", solved: 737, color: "#B07219" },
      { name: "JavaScript", solved: 11, color: "#F7DF1E" },
      { name: "C++", solved: 4, color: "#F34B7D" }
    ]
  },
  activityData: {
    submissions: [
      { month: "Jul", count: 45 },
      { month: "Aug", count: 38 },
      { month: "Sep", count: 42 },
      { month: "Oct", count: 41 },
      { month: "Nov", count: 50 },
      { month: "Dec", count: 58 },
      { month: "Jan", count: 60 }
    ],
    weeklyActivity: [
      { day: "Mon", problems: 12 },
      { day: "Tue", problems: 15 },
      { day: "Wed", problems: 8 },
      { day: "Thu", problems: 10 },
      { day: "Fri", problems: 14 },
      { day: "Sat", problems: 18 },
      { day: "Sun", problems: 9 }
    ]
  },
  recentAchievements: [
    { 
      title: "200 Days Streak",
      platform: "LeetCode",
      date: "2024",
      description: "Maintained a continuous coding streak for 200 days",
      icon: "Trophy"
    },
    { 
      title: "Knight Badge",
      platform: "LeetCode",
      date: "2024",
      description: "Achieved Knight ranking on LeetCode",
      icon: "Award"
    },
    {
      title: "College Rank 1",
      platform: "GeeksForGeeks",
      date: "2024",
      description: "Top performer in the institution",
      icon: "Crown"
    }
  ]
};

export const chartConfig = {
  commonOptions: {
    theme: {
      background: 'transparent',
      textColor: '#9CA3AF',
      fontSize: 12,
      axis: {
        domain: {
          line: {
            stroke: '#4B5563'
          }
        }
      }
    }
  }
};
