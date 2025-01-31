import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Send, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import summaryApi from '../BackendConnect';

const backendURL = 'https://your-backend-url.com'; // Replace with your actual backend URL

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState(null); // For response handling

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Backend API call
    try {
      const response = await fetch(summaryApi.contact.url, {
        method: summaryApi.contact.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissionResponse({ success: true, message: 'Contact form submitted successfully!' });
      } else {
        setSubmissionResponse({ success: false, message: 'Error submitting form. Please try again.' });
      }
    } catch (error) {
      console.error('Error connecting to the API:', error);
      setSubmissionResponse({ success: false, message: 'Server error. Please try again later.' });
    }

    // Reset the form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmissionResponse(null);
    }, 3000);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#090517] relative overflow-hidden mt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section with enhanced animations */}
      <div className={`w-full bg-gradient-to-r  border-[#374151] relative transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-fade-in text-center lg:text-left relative">
            {/* Decorative element   */}
            <div className="absolute -top-10 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-20 h-1 bg-gradient-to-r from-[#4F46E5] to-[#A855F7]"></div>

            <h1 className="text-4xl md:text-6xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#A855F7] bg-clip-text text-transparent">
                Subodh Kangale
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] to-[#A855F7] transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
            </h1>
            <p className="mt-4 text-xl text-[#D1D5DB] font-light tracking-wide">
              Full Stack Developer & Software Engineer
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-8">
              <a href="tel:7709894512"
                className="group flex items-center px-6 py-3 bg-[#374151] rounded-full hover:bg-[#4F46E5] transition-all duration-300 hover:shadow-lg hover:shadow-[#4F46E5]/20">
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative">
                  93222XXXXX
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </a>
              <a href="mailto:guddi7709894512@gmail.com"
                className="group flex items-center px-6 py-3 bg-[#374151] rounded-full hover:bg-[#4F46E5] transition-all duration-300 hover:shadow-lg hover:shadow-[#4F46E5]/20">
                <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative">
                  subodhkangale@gmail.com
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
              {[
                { platform: 'linkedin', url: 'https://www.linkedin.com/in/subodhkangale07' },
                { platform: 'github', url: 'https://github.com/subodhkangale07' },
              ].map(({ platform, url }, index) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-[#374151] rounded-full hover:bg-[#4F46E5] transition-all duration-300 hover:shadow-lg hover:shadow-[#4F46E5]/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {platform === 'linkedin' && <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
                  {platform === 'github' && <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
                  {platform === 'globe' && <Globe className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}

                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 capitalize">{platform}</span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Contact Form Section with enhanced interactivity */}
      <div className={`w-full py-16 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative">
              <div className="sticky top-8">
                <h2 className="text-3xl font-bold text-[#FBBF24] mb-6 relative inline-block">
                  Get in Touch
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FBBF24] transform scale-x-0 animate-expand"></div>
                </h2>
                <p className="text-[#D1D5DB] mb-8 leading-relaxed">
                  Feel free to reach out for collaborations or just a friendly hello. I'm always open to discussing new projects and opportunities.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Phone, text: '93222XXXXX', href: 'tel:93222XXXXX' },
                    { icon: Mail, text: 'subodhkangale@gmail.com', href: 'mailto:subodhkangale@gmail.com' },
                    { icon: MapPin, text: 'Nagpur, Maharastra' }
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center text-[#D1D5DB] group p-4 rounded-lg hover:bg-[#374151] transition-all duration-300"
                    >
                      <item.icon className="w-6 h-6 mr-4 text-[#A855F7] group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:text-white transition-colors duration-300">{item.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#1F2937] p-8 rounded-lg shadow-lg relative overflow-hidden group">
              {/* Success overlay */}
              <div className={`absolute inset-0 bg-[#4F46E5] flex items-center justify-center transition-opacity duration-300 ${isSubmitted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="text-white text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                  <p className="text-xl font-bold">Message Sent Successfully!</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'subject', label: 'Subject', type: 'text' },
                  { name: 'message', label: 'Message', type: 'textarea' }
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label className="block text-[#D1D5DB] mb-2 font-medium">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className={`w-full px-4 py-3 rounded bg-[#374151] text-white border-2 transition-all duration-300 ${activeField === field.name
                            ? 'border-[#A855F7] shadow-lg shadow-[#A855F7]/20'
                            : 'border-[#4F46E5] hover:border-[#A855F7]'
                          } focus:outline-none focus:ring-2 focus:ring-[#A855F7] h-32`}
                        value={formData[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        onFocus={() => setActiveField(field.name)}
                        onBlur={() => setActiveField(null)}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className={`w-full px-4 py-3 rounded bg-[#374151] text-white border-2 transition-all duration-300 ${activeField === field.name
                            ? 'border-[#A855F7] shadow-lg shadow-[#A855F7]/20'
                            : 'border-[#4F46E5] hover:border-[#A855F7]'
                          } focus:outline-none focus:ring-2 focus:ring-[#A855F7]`}
                        value={formData[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        onFocus={() => setActiveField(field.name)}
                        onBlur={() => setActiveField(null)}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-[#4F46E5] to-[#A855F7] text-white py-4 rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#4F46E5]/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;