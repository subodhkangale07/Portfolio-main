import React from 'react';
import {
  Code2, Database, Server, Globe, Terminal,
  Cpu, Github, Bot, Laptop, Cloud,
  MonitorSmartphone, Boxes, FileJson, Layout,
  Shield, Binary, Network, Settings, Coffee,
  Smartphone, Lock, Key, KeyRound, Braces,
  Hash, Fingerprint, Webhook, List, Box,
   // Import necessary icons
} from 'lucide-react';

// Skill icon mapping with specific icons for each skill
const skillIcons = {
  // Programming Languages
  "Java": Coffee,
  "JavaScript": Braces,
  "Python": Bot,
  "C++": Code2,
  "C": Terminal,
  
  // Frontend
  "React.js": Globe,
  "HTML": Layout,
  "CSS": MonitorSmartphone,
  "Tailwind CSS": Boxes,
  "Bootstrap": Layout,
  
  // Backend
  "Node.js": Server,
  "Express.js": Server,
  "MongoDB": Database,
  "SQL": Database,
  
  // Cloud & Tools
  "Firebase": Shield,
  "Git": Github, // Using git-merge icon for Git
  "GitHub": Github, // Direct icon for GitHub
  
  // Computer Science
  "Operating Systems": Settings,
  "Computer Networks": Network,
  "DBMS": Database,
  "OOP": Coffee,
  
  // Android Development
  "React Native": Smartphone,
  "Expo": MonitorSmartphone,
  "Android Studio": Smartphone,
  
  // Authentication
  "Firebase Authentication": Shield,
  "OAuth": Lock,
  "JWT": Key,
  "Bcrypt": Hash,
  
  // Project Management Tools
  "JIRA": List, // Using List icon for JIRA
  "GITHUB": Github // Using Github icon for GitHub
};

const SkillCard = ({ title, items, icon: Icon }) => (
  <div className="bg-gradient-to-br from-[#1F2937] to-[#374151] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#4F46E5]/20">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-black/30">
        <Icon className="w-6 h-6 text-[#4F46E5]" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="grid grid-cols-1 gap-3">
      {items.map((item, index) => {
        const ItemIcon = skillIcons[item.name] || Terminal;
        return (
          <div
            key={index}
            className="relative overflow-hidden"
          >
            <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 text-[#D1D5DB] hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#A855F7] hover:text-white group transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 z-10">
                <ItemIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-medium z-10 text-emerald-400 group-hover:text-emerald-300">{item.percentage}%</span>
              {/* Progress bar */}
              <div 
                className="absolute left-0 top-0 h-full bg-[#4F46E5]/20 transition-all duration-300 group-hover:bg-[#4F46E5]/40"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const Skills = () => {
  const skillsData = [
    {
      title: "Programming Languages",
      icon: Code2,
      items: [
        { name: "C++", percentage: 90 },
        { name: "JavaScript", percentage: 85 },
        { name: "C", percentage: 75 },
        { name: "Python", percentage: 75 },
        { name: "Java", percentage: 70 },
        
      ]
    },
    {
      title: "Frontend Development",
      icon: Globe,
      items: [
        { name: "React.js", percentage: 88 },
        { name: "HTML", percentage: 95 },
        { name: "CSS", percentage: 85 },
        {name : "Next.Js", percentage:80},
        { name: "Tailwind CSS", percentage: 80 },
        { name: "Bootstrap", percentage: 75 },
      ]
    },
    {
      title: "Backend Development",
      icon: Server,
      items: [
        { name: "Node.js", percentage: 85 },
        { name: "Express.js", percentage: 80 },
        { name: "MongoDB", percentage: 75 },
        { name: "SQL", percentage: 50 },
      
      ]
    },
    {
      title: "Cloud & Tools",
      icon: Cloud,
      items: [
        { name: "Firebase", percentage: 50 },
        { name: "Git", percentage: 60 },
        { name: "GitHub", percentage: 76 },
        {name: "AWS", percentage: 70},
      ]
    },
    {
      title: "Computer Science",
      icon: Cpu,
      items: [
        { name: "Operating Systems", percentage: 85 },
        { name: "Computer Networks", percentage: 80 },
        { name: "DBMS", percentage: 85 },
        { name: "OOP", percentage: 90 },
        { name: "Data Structures", percentage: 85 },
      ]
    },
    {
      title: "Android Development",
      icon: Smartphone,
      items: [
        { name: "React Native", percentage: 80 },
        { name: "Expo", percentage: 75 },
        { name: "Android Studio", percentage: 70 }
      ]
    },
    {
      title: "Authentication & Firebase",
      icon: Lock,
      items: [
        { name: "Firebase Authentication", percentage: 85 },
        { name: "OAuth", percentage: 80 },
        { name: "JWT", percentage: 75 },
        { name: "Bcrypt", percentage: 70 },
        
      ]
    },
    {
      title: "Project Management Tool",
      icon: List, // You can use a related icon like List here
      items: [
        { name: "JIRA", percentage: 40 },
        { name: "GITHUB", percentage: 75 },
        { name: "ZOHO", percentage: 50}
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090517] to-black">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent 
            animate-gradient-x">
            Technical Skills
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#4F46E5] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#A855F7] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

          {/* Skill Cards */}
          {skillsData.map((category, index) => (
            <SkillCard
              key={index}
              title={category.title}
              items={category.items}
              icon={category.icon}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Skills;