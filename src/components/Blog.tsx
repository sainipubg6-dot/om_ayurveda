"use client";

import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const posts = [
  {
    title: "The Power of Swarna Bhasma in Modern Recovery",
    excerpt: "Discover how ancient gold-based formulations are helping modern athletes achieve peak performance and faster recovery.",
    date: "Oct 12, 2024",
    author: "Dr. Arvind Sharma",
    image: "https://images.unsplash.com/photo-1611073113643-6765b3f2c9f8?auto=format&fit=crop&q=80&w=600",
    category: "Performance"
  },
  {
    title: "Understanding Your Dosha: A Guide to Balance",
    excerpt: "Vata, Pitta, or Kapha? Learn how to identify your unique body type and live in harmony with your natural constitution.",
    date: "Oct 08, 2024",
    author: "Dr. Meera Pathak",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    category: "Wellness"
  },
  {
    title: "Natural Solutions for Chronic Joint Pain",
    excerpt: "Moving beyond painkillers: How Ayurvedic oils and therapies provide long-term relief for arthritis and stiffness.",
    date: "Sep 28, 2024",
    author: "Dr. Vikram Singh",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    category: "Pain Relief"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-brand-cream relative">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold font-serif text-lg uppercase tracking-[0.3em] mb-4">Ayurvedic Wisdom</h2>
            <h3 className="text-brand-forest font-serif text-4xl md:text-5xl">Health Insights & Articles</h3>
          </div>
          <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 rounded-full px-8">
            View All Articles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <article key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-brand-gold/10 hover:border-brand-gold transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-black font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-brand-black/40 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                </div>
                
                <h4 className="text-brand-forest font-serif text-2xl font-bold mb-4 group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h4>
                <p className="text-brand-black/60 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-brand-goldDark font-bold hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;