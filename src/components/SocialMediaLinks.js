import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialMediaLinks = ({ links }) => {
  return (
    <div className="flex justify-center space-x-4 sm:space-x-6 mt-12">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-4 rounded-full bg-[#1F2937] hover:bg-[#374151] transition-colors duration-300 backdrop-blur-sm border border-[#4F46E5]/20"
        >
          {/* Render the appropriate icon based on the link type */}
          {link.type === 'github' && <Github className="w-6 h-6 text-[#A855F7]" />}
          {link.type === 'linkedin' && <Linkedin className="w-6 h-6 text-[#A855F7]" />}
          {link.type === 'email' && <Mail className="w-6 h-6 text-[#A855F7]" />}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;