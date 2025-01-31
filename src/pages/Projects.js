import React, { useState, useEffect } from 'react';
import { Code2, Globe, ExternalLink, Github, Calendar, Clock, Tag, CheckSquare, ArrowRight, Layers, Hammer, Eye } from 'lucide-react';

const websiteProjects = [
  {
    name: "JobHunt",
    type: "Job Potal ",
    date: "Sep 2024",
    link: "https://job-portal-three-omega.vercel.app/",
    github: "https://github.com/subodhkangale07/JobPortal",
    description: "Designed and implemented a full-stack job portal with functionalities for recruiters to post jobs and students to apply.",
    functionality: [
      "User authentication and role-based access control",
      "Post job openings with details like skills required, location, and salary.",
      "Send job application status updates and new job alerts",
      "Display all active job postings with filters for easy navigation."
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Vite"],
    features: [
      "User Authentication: Student and recruiter login/signup.",
      "Student Profile: Dashboard, resume upload, saved jobs, and application tracking.",
      "Recruiter Profile: Company registration, job posting, and application management.",
      "Job Search & Filtering: Advanced search and filters by location, role, and skills."
    ],
    category: "Job Portal"
  },
  {
    name: "Shopping Cart Web Application",
    type: "E-commerce Platform",
    date: "July 2024",
    link: "https://shopping-cart-gamma-green.vercel.app/",
    github: "https://github.com/subodhkangale07/Shopping-cart",
    description: "An e-commerce shopping cart application with Redux state management for cart operations.",
    functionality: [
      "Dynamic product listings",
      "Add and remove items from the cart",
      "Redux-based state management",
      "Optimized performance using React Hooks"
    ],
    technologies: ["HTML", "Tailwind CSS", "JavaScript", "React", "Redux"],
    features: [
      "User-friendly UI components",
      "Dynamic product rendering",
      "Cart operations with Redux",
      "Performance optimization with React Hooks"
    ],
    category: "E-commerce"
  },
    {
      name: "React News Portal",
      type: "News Website",
      date: "Jun 2024",
      link: "https://subodhkangale07.github.io/News-App/",
      github: "https://github.com/subodhkangale07/News-App",
      description: "A dynamic news portal for publishing and managing articles with a file upload system.",
      functionality: [
        "Secure user authentication with JWT",
        "News article CRUD operations",
        "Category and tag-based filtering",
        "File upload and management system",
        "Responsive design for all devices"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "TailwindCSS"],
      features: [
        "Rich text editor for content creation",
        "Image and document upload support",
        "Category-based article organization",
        "Search and filtering options",
        "User-friendly dashboard for content management"
      ],
      category: "Media"
    },
    {
      name: "File Upload and Download App",
      type: "File Management System",
      date: "Dec 2024",
      link: "https://file-upload-backend-v6c5.vercel.app/",
      github: "https://github.com/SubodhKangale/file-upload-Backend",
      description: "A React app that allows users to upload, download, and manage files through a backend server.",
      functionality: [
        "File upload using multipart/form-data",
        "Download files by unique ID",
        "View list of uploaded files",
        "Secure backend API integration"
      ],
      technologies: ["React", "Node.js", "Express", "Multer", "Axios"],
      features: [
        "File upload with progress tracking",
        "Download by unique file ID",
        "List view of uploaded files",
        "Environment variable support for API configuration"
      ],
      category: "Productivity"
    }
];

const mobileProjects = [
  {
    name: "HostelLocator",
    type: "Hostel Accomodation",
    date: "Aug 2024",
    link: "https://github.com/subodhkangale07/HostelLocator",
    github: "https://github.com/subodhkangale07/HostelLocator",
    description: "Developed a mobile application to help students find nearby hostels and receive real-time updates on bed vacancies",
    functionality: [
      "View Available Hostels",
      "Hostel Owner Interface",
      "Advanced Search Filters",
      "Real-time data updates"
    ],
    technologies: ["React Native", "Redux", "Node.js", "MongoDB", "Express"],
    features: [
      "Admin Dashboard",
      "Hostel Availability",
      "Hostel Details",
      "Secure authentication"
    ],
    category: "Hostel"
  },
];

const AnimatedTag = ({ children }) => {
  return (
    <span className="px-4 py-2 bg-[#374151] text-[#D1D5DB] rounded-full text-sm transform hover:scale-105 hover:bg-[#4F46E5] transition-all duration-300 cursor-default hover:shadow-glow flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
      {children}
    </span>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        activeTab === id 
          ? 'bg-[#4F46E5] text-white shadow-glow' 
          : 'text-[#9CA3AF] hover:text-white'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div 
      className={`transform transition-all duration-700 w-full ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#1F2937] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#374151] group hover:border-[#4F46E5] overflow-hidden">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F46E5] to-[#A855F7]"></div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-[#4F46E5] transition-colors">
                  {project.name}
                </h3>
                <span className="px-3 py-1 bg-[#4F46E5]/20 text-[#4F46E5] rounded-full text-sm font-semibold">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#9CA3AF]">
                <span className="flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-[#4F46E5]" />
                  {project.date}
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <Tag size={14} className="text-[#4F46E5]" />
                  {project.type}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              {project.github && (
                <a 
                  href={project.github} 
                  className="p-2 rounded-lg bg-[#374151] text-[#A855F7] hover:text-[#4F46E5] transition-all duration-300 hover:scale-105 hover:shadow-glow"
                  aria-label="View GitHub Repository"
                >
                  <Github size={24} />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  className="p-2 rounded-lg bg-[#374151] text-[#A855F7] hover:text-[#4F46E5] transition-all duration-300 hover:scale-105 hover:shadow-glow"
                  aria-label="View Live Project"
                >
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#9CA3AF] text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Expand Button */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#374151] text-[#D1D5DB] hover:text-white transition-all duration-300 hover:bg-[#4F46E5] hover:shadow-glow"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show less' : 'View details'}
            <ArrowRight size={16} className={`transform transition-transform duration-300 group-hover/btn:translate-x-1 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>

          {/* Expandable Content */}
          <div className={`grid transition-all duration-500 ease-in-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                <TabButton id="features" label="Features" icon={CheckSquare} />
                <TabButton id="tech" label="Technologies" icon={Hammer} />
                <TabButton id="details" label="Core Details" icon={Layers} />
              </div>

              {/* Tab Content */}
              <div className="bg-[#1a1a1a]/50 rounded-lg p-6">
                {activeTab === 'features' && (
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#9CA3AF] hover:text-white transition-colors group/item">
                        <CheckSquare size={20} className="mt-1 text-[#4F46E5] group-hover/item:text-[#A855F7] transition-colors" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'tech' && (
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <AnimatedTag key={index}>{tech}</AnimatedTag>
                    ))}
                  </div>
                )}

                {activeTab === 'details' && (
                  <ul className="space-y-3">
                    {project.functionality.map((func, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#9CA3AF] hover:text-white transition-colors group/item">
                        <Layers size={20} className="mt-1 text-[#4F46E5] group-hover/item:text-[#A855F7] transition-colors" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const allProjects = [...websiteProjects, ...mobileProjects];

  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category.toLowerCase() === activeFilter);

  const categories = ['all', ...new Set(allProjects.map(p => p.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 mt-10 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4F46E5] to-[#A855F7] text-transparent bg-clip-text animate-gradient">
            Projects Portfolio
          </h1>
          <p className="text-[#9CA3AF] text-lg">
            Explore my recent development projects
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-[#4F46E5] text-white shadow-glow'
                  : 'bg-[#374151] text-[#D1D5DB] hover:bg-[#4F46E5] hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS
const style = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 8s ease infinite;
  }

  .shadow-glow {
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.3);
  }
`;

export default Projects;