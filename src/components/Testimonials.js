import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Loader } from 'lucide-react';
import summaryApi from '../BackendConnect';
import ThankYouMessage from './ThankYouMessage ';

const AnimalIcons = {
  Owl: () => (
    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M32 8C19.85 8 10 17.85 10 30c0 12.15 9.85 22 22 22s22-9.85 22-22c0-12.15-9.85-22-22-22zm0 40c-9.925 0-18-8.075-18-18s8.075-18 18-18 18 8.075 18 18-8.075 18-18 18z" fill="#4F46E5"/>
        <circle cx="24" cy="26" r="4" fill="#4F46E5"/>
        <circle cx="40" cy="26" r="4" fill="#4F46E5"/>
        <path d="M32 36c-4 0-7 3-7 7h14c0-4-3-7-7-7z" fill="#4F46E5"/>
      </svg>
    </div>
  ),
  Fox: () => (
    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M32 12L16 28h32L32 12zm-8 20c0 4.4 3.6 8 8 8s8-3.6 8-8H24z" fill="#A855F7"/>
        <circle cx="26" cy="34" r="2" fill="#A855F7"/>
        <circle cx="38" cy="34" r="2" fill="#A855F7"/>
      </svg>
    </div>
  ),
  Bear: () => (
    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <circle cx="24" cy="24" r="6" fill="#EC4899"/>
        <circle cx="40" cy="24" r="6" fill="#EC4899"/>
        <path d="M32 32c-6 0-10 4-10 8s4 8 10 8 10-4 10-8-4-8-10-8z" fill="#EC4899"/>
      </svg>
    </div>
  )
};

const animals = Object.keys(AnimalIcons);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    content: '',
    rating: 5,
    name: '',
    role: '',
    likes: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const AnimalIcon = AnimalIcons[animals[randomIndex]];
    return <AnimalIcon />;
  };

  // Rest of the functions remain the same...
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(summaryApi.get.url);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e) => {
    setNewTestimonial({
      ...newTestimonial,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setNewTestimonial({ ...newTestimonial, rating });
  };

  const handleLike = async (testimonialIndex) => {
    try {
      const response = await fetch(summaryApi.like.url, {
        method: summaryApi.like.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: testimonialIndex}),
      });
      const data = await response.json();
      setTestimonials(
        testimonials.map((t, i) =>
          i === testimonialIndex ? { ...t, likes: data.likes } : t
        )
      );
      fetchTestimonials();
    } catch (error) {
      console.error('Error liking testimonial:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(summaryApi.add.url, {
        method: summaryApi.add.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTestimonial),
      });
      const data = await response.json();
      setTestimonials([...testimonials, data]);
      setNewTestimonial({
        content: '',
        rating: 5,
        name: '',
        role: '',
        likes: 0,
      });
      setShowThankYouMessage(true);
      fetchTestimonials();
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 text-white">
        Testimonials
        </h2>

        {/* Add Testimonial Form */}
        <form onSubmit={handleSubmit} className="mb-16 bg-[#1F2937] p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6">Share Your Experience</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="flex-1 p-3 rounded-lg bg-[#374151] text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="role"
                value={newTestimonial.role}
                onChange={handleInputChange}
                placeholder="Your role"
                className="flex-1 p-3 rounded-lg bg-[#374151] text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <textarea
              name="content"
              value={newTestimonial.content}
              onChange={handleInputChange}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full p-3 rounded-lg bg-[#374151] text-white border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 cursor-pointer ${
                      i < newTestimonial.rating ? 'text-[#FBBF24] fill-current' : 'text-gray-500'
                    }`}
                    onClick={() => handleRatingChange(i + 1)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Review</span>
                )}
              </button>
            </div>
          </div>
        </form>
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#1F2937] rounded-xl p-6 shadow-lg flex flex-col"
            >
              {/* Profile Section */}
              <div className="flex items-center mb-4">
                {getRandomAnimal()}
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-white">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Description - Limited to 3 lines */}
              <p className="text-gray-300 line-clamp-3 mb-4">
                {testimonial.content}
              </p>

              {/* Rating and Likes */}
              <div className="mt-auto flex items-center justify-between">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-[#FBBF24] fill-current" 
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleLike(testimonial._id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ThumbsUp className="w-5 h-5" />
                      <span>{testimonial.likes}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        {showThankYouMessage && <ThankYouMessage onClose={() => setShowThankYouMessage(false)} />}
      </div>
    </section>
  );
};

export default Testimonials;