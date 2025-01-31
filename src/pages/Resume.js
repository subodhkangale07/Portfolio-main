import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Terminal, Book, Briefcase, Calendar, Star } from 'lucide-react';

const Section = ({ title, icon: Icon, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="mb-8 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#A855F7]">
          <Icon 
            className={`w-6 h-6 text-white transition-all duration-300
                       ${isHovered ? 'rotate-12 scale-110' : ''}`}
          />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#D1D5DB] bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#374151]/50 shadow-xl">
        {children}
      </div>
    </div>
  );
};

const SkillBadge = ({ skill }) => (
  <span className="px-4 py-2 bg-gradient-to-r from-[#374151] to-[#1F2937] text-[#D1D5DB] rounded-lg text-sm
                   hover:from-[#4F46E5] hover:to-[#A855F7] hover:text-white transition-all duration-300
                   transform hover:scale-105 cursor-default shadow-lg">
    {skill}
  </span>
);

const ProjectCard = ({ title, description, link, points, date }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`p-6 rounded-xl bg-gradient-to-b from-[#1F2937] to-[#1a1a1a] transition-all duration-300
                  border border-[#374151]/30 backdrop-blur-sm
                  ${isHovered ? 'transform -translate-y-1 shadow-2xl' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-[#374151]/50 hover:bg-[#4F46E5] transition-all duration-300 group"
        >
          <ExternalLink className="w-5 h-5 text-[#D1D5DB] group-hover:text-white" />
        </a>
      </div>
      <p className="text-[#A855F7] font-medium mb-4">{description}</p>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="text-[#D1D5DB] text-sm flex items-start gap-3 group">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] mt-2 group-hover:scale-150 transition-transform duration-300" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AchievementCard = ({ achievement }) => (
  <div className="p-4 rounded-xl bg-gradient-to-r from-[#1F2937] to-[#1a1a1a] hover:from-[#374151] hover:to-[#1F2937] 
                  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                  border border-[#374151]/30">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-[#4F46E5] mb-1">{achievement.platform}</h3>
        {achievement.handle && (
          <p className="text-[#D1D5DB] text-sm mb-1">@{achievement.handle}</p>
        )}
        {achievement.solved && (
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
            <Star className="w-4 h-4 text-[#FBBF24]" />
            <span>Problems Solved: {achievement.solved}</span>
          </div>
        )}
        {achievement.rating && (
          <p className="text-[#FBBF24] text-sm">Rating: {achievement.rating}</p>
        )}
        {achievement.result && (
          <p className="text-[#A855F7] text-sm">{achievement.result}</p>
        )}
      </div>
    </div>
  </div>
);

const Resume = () => {
  const education = [
    { 
      degree: "B.TECH, Computer Engineering", 
      school: "Walchand College of Engineering, Sangli", 
      year: "2022 - 2026", 
      gpa: "7.5 GPA (upto VI sem)" 
    },
    { 
      degree: "12th Grade", 
      school: "ST Paul Jr College, Nagpur", 
      year: "2022", 
      gpa: "84%" 
    }
  ];

  const technicalSkills = {
    languages: ['C++', 'Java (basic)', 'JavaScript', 'Python (basic)', 'SQL', 'C (basic)'],
    frameworks: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Git', 'GitHub'],
    cloudTech: ['Microsoft Azure', 'Firebase'],
    frontend: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'MongoDB'],
    coursework: ['Operating Systems', 'Computer Networks', 'DBMS', 'OOP']
  };

  const projects = [
    {
      title: 'JobHunt',
      description: 'Full-Stack Job Portal Application',
      date: 'Sep 2024',
      link: 'https://job-portal-three-omega.vercel.app/',
      points: [
        'Developed JobHunt, a full-stack job portal application using React, Node.js, and MongoDB.',
        'Implemented student/recruiter login and signup with secure user authentication.',
        'Built functionalities for recruiters to register companies, post job openings, and manage applications.',
        'Enabled students to search and apply for jobs based on their skills and interests.'
      ]
    },
    {
      title: 'HostelLocator',
      description: 'Hostel Accommodation Management Platform',
      date: 'Jun 2024',
      link: 'https://github.com/subodhkangale07/HostelLocator',
      points: [
        'Designed and developed a responsive web app for hostel accommodation management using React and Node.js.',
        'Displayed available hostels, their location, and owner details with filtering and sorting options.',
        'Implemented dynamic routing and interactive UI for enhanced user experience.',
        'Optimized performance and ensured cross-device compatibility.'
      ]
    },
    {
      title: 'File Upload System',
      description: 'Secure File Management Solution',
      date: 'May 2024',
      link: 'https://file-upload-backend-v6c5.vercel.app/',
      points: [
        'Built a file upload system using Node.js, Express, and MongoDB to manage document storage.',
        'Implemented secure file upload and retrieval with proper validation and storage limits.',
        'Designed an intuitive interface allowing users to upload, view, and delete files efficiently.',
        'Enhanced backend performance by integrating AWS S3 for scalable file storage.'
      ]
    }
  ];
  

  const achievements = [
    { platform: 'LeetCode', handle: 'Subodh07', solved: '450+', rating: '1900+' },
    { platform: 'GeeksForGeeks', handle: 'subodhkangale07', solved: '500+' },
    { platform: 'CodeChef', handle: 'subodh5131', rating: '1600+ (3⭐)' },
    { platform: 'WCPC Final Round', result: 'Secured a position in the Top 20' },
    { platform: 'CodeCrunch for RAIT', result: 'Achieved 2th place' },
    { platform: 'GSSoC24', result: 'Secured a position in the Top 10' }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#3B82F6] 
                         bg-clip-text text-transparent animate-gradient-x pb-2">
            SUBODH KANGALE
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-[#9CA3AF] text-lg">
            <a href="tel:7709894512" 
               className="hover:text-white transition-colors flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              93222XXXXX
            </a>
            <a href="mailto:subodhkangale@gmail.com" 
               className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              Email
            </a>
            <a href="https://www.linkedin.com/in/subodhkangale07/" 
               className="flex items-center gap-2 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="https://github.com/subodhkangale07" 
               className="flex items-center gap-2 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>

        {/* Education */}
        <Section title="Education" icon={Book}>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="group flex flex-col sm:flex-row sm:justify-between sm:items-center 
                                        p-4 rounded-lg hover:bg-[#1F2937]/50 transition-colors duration-300">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#4F46E5] transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-[#9CA3AF] mt-1">{edu.school}</p>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="text-[#D1D5DB]">{edu.year}</p>
                  <p className="text-[#A855F7] font-medium">{edu.gpa}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Technical Skills */}
        <Section title="Technical Skills" icon={Terminal}>
          <div className="space-y-6">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div key={category} className="group">
                <h3 className="text-lg font-medium text-[#A855F7] mb-3 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="Projects" icon={Briefcase}>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                date={project.date}
                link={project.link}
                points={project.points}
              />
            ))}
          </div>
        </Section>

        {/* Achievements */}
        <Section title="Achievements" icon={Award}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Resume;