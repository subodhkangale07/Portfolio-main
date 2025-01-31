import React from 'react';
import { 
  GraduationCap, School, BookOpen, Calendar, Award, 
  MapPin, Trophy, Star, Lightbulb, BookOpenCheck,
  GraduationCap as Degree, BookText, Building2
} from 'lucide-react';

const AchievementItem = ({ text }) => (
  <div className="flex items-center gap-2 text-sm text-emerald-400 hover:scale-105 transition-transform">
    <Star className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const EducationCard = ({ 
  title, 
  institution, 
  year, 
  score, 
  scoreLabel, 
  location, 
  achievements,
  courses,
  icon: Icon 
}) => (
  <div className="w-full bg-gradient-to-br from-[#1F2937]/80 to-[#374151]/80 backdrop-blur-lg p-8 rounded-2xl 
    transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-[#4F46E5]/20 group
    animate-fade-in-up">
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-[#A855F7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#4F46E5]/20 group-hover:bg-[#4F46E5]/30 transition-colors duration-300
              animate-bounce-slow">
              <Icon className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#4F46E5] transition-colors duration-300">
                {title}
              </h3>
              <p className="text-lg text-[#9CA3AF] mt-1">{institution}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#D1D5DB] hover:translate-x-2 transition-transform">
              <Calendar className="w-5 h-5 text-[#4F46E5]" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-3 text-[#D1D5DB] hover:translate-x-2 transition-transform">
              <MapPin className="w-5 h-5 text-[#4F46E5]" />
              <span>{location}</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#4F46E5]" />
                  <span className="text-[#D1D5DB]">{scoreLabel}</span>
                </div>
                <span className="text-lg font-bold text-emerald-400">{score}</span>
              </div>
              {typeof score === 'number' && (
                <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4F46E5] to-[#A855F7] transform origin-left transition-all duration-1000 ease-out group-hover:scale-x-105"
                    style={{ width: `${score}%`, animation: 'progressBar 1.5s ease-out' }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements && (
            <div className="space-y-4 animate-fade-in-right">
              <div className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-[#4F46E5]" />
                <h4 className="text-lg font-semibold">Key Achievements</h4>
              </div>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <AchievementItem key={index} text={achievement} />
                ))}
              </div>
            </div>
          )}

          {courses && (
            <div className="space-y-4 animate-fade-in-left">
              <div className="flex items-center gap-2 text-white">
                <BookOpenCheck className="w-5 h-5 text-[#4F46E5]" />
                <h4 className="text-lg font-semibold">Notable Courses</h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#D1D5DB] hover:translate-x-2 transition-transform">
                    <Lightbulb className="w-4 h-4 text-[#4F46E5]" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const EntranceCard = ({ 
  title, 
  institution, 
  year, 
  score, 
  scoreLabel, 
  location, 
  icon: Icon 
}) => (
  <div className="w-full bg-gradient-to-br from-[#1F2937]/80 to-[#374151]/80 backdrop-blur-lg p-6 rounded-2xl 
    transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-[#4F46E5]/20 group
    animate-fade-in-up">
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-[#A855F7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#4F46E5]/20 group-hover:bg-[#4F46E5]/30 transition-colors duration-300
            animate-bounce-slow">
            <Icon className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-[#4F46E5] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-lg text-[#9CA3AF] mt-1">{institution}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-[#D1D5DB] hover:translate-x-2 transition-transform">
            <Calendar className="w-5 h-5 text-[#4F46E5]" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-3 text-[#D1D5DB] hover:translate-x-2 transition-transform">
            <MapPin className="w-5 h-5 text-[#4F46E5]" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#4F46E5]" />
            <span className="text-[#D1D5DB]">{scoreLabel}</span>
          </div>
          <span className="text-lg font-bold text-emerald-400">{score}</span>
        </div>
      </div>
    </div>
  </div>
);

const Education = () => {
  const educationData = [
    {
      title: "B.TECH, Computer Engineering",
      institution: "Walchand College of Engineering, Sangli",
      year: "2022 - 2026",
      score: 75,
      scoreLabel: "GPA (upto VI sem)",
      location: "Sangli, Maharashtra",
      icon: GraduationCap,
      courses: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Database Management",
        "Computer Networks",
        "Web Development",
        "AI/ML"
      ]
    },
    {
      title: "12th Grade (HSC)",
      institution: "ST Paul Jr College",
      year: "2022",
      score: 84,
      scoreLabel: "Percentage",
      location: "Nagpur, Maharashtra",
      icon: School,
      courses: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
        "English"
      ]
    },
    {
      title: "10th Grade (SSC)",
      institution: "Avail Convent & High School",
      year: "2020",
      score: 83,
      scoreLabel: "Percentage",
      location: "Nagpur, Maharashtra",
      icon: BookOpen,
      courses: [
        "Mathematics",
        "Science",
        "Social Studies",
        "English",
        "Hindi"
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090517] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent 
            animate-gradient-x">
            Education Journey
          </h2>
          <p className="text-[#9CA3AF] text-xl max-w-3xl mx-auto animate-fade-in">
            A comprehensive overview of my academic achievements and learning experiences
          </p>
        </div>

        {/* Academic Education Section - Now First */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 pl-4 border-l-4 border-[#4F46E5] animate-fade-in">
            Academic Education
          </h3>
          <div className="space-y-8">
            {educationData.map((education, index) => (
              <EducationCard
                key={index}
                {...education}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes progressBar {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Education;