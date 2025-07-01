
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Eye, Star, Calendar } from 'phosphor-react';
import Image from '@/components/ui/Image';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with real-time inventory and AI recommendations",
      tech: ["React", "Node.js", "MongoDB"],
      category: "web",
      image: "/images/project-1.svg",
      github: "#",
      demo: "#",
      status: "completed",
      year: "2024",
      featured: true
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "Analytics platform with machine learning insights and predictive modeling",
      tech: ["Next.js", "Python", "TensorFlow"],
      category: "ai",
      image: "/images/project-2.svg",
      github: "#",
      demo: "#",
      status: "completed",
      year: "2024",
      featured: true
    },
    {
      id: 3,
      title: "Social Media App",
      description: "Real-time messaging and content sharing platform with advanced privacy",
      tech: ["React Native", "Firebase", "Socket.io"],
      category: "mobile",
      image: "/images/project-3.svg",
      github: "#",
      demo: "#",
      status: "in-progress",
      year: "2024",
      featured: false
    },
    {
      id: 4,
      title: "Task Management",
      description: "Collaborative project management tool with team analytics",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      category: "web",
      image: "/images/project-4.svg",
      github: "#",
      demo: "#",
      status: "completed",
      year: "2023",
      featured: false
    },
    {
      id: 5,
      title: "Crypto Tracker",
      description: "Real-time cryptocurrency portfolio tracker with advanced charts",
      tech: ["React", "Chart.js", "WebSocket"],
      category: "web",
      image: "/images/project-5.svg",
      github: "#",
      demo: "#",
      status: "completed",
      year: "2023",
      featured: false
    },
    {
      id: 6,
      title: "Travel Planner",
      description: "AI-powered travel itinerary generator with budget optimization",
      tech: ["Svelte", "OpenAI", "Maps API"],
      category: "ai",
      image: "/images/project-6.svg",
      github: "#",
      demo: "#",
      status: "completed",
      year: "2024",
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'web', name: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    // Simplified entrance animation without opacity conflicts
    gsap.fromTo(cards, 
      {
        y: 100,
        scale: 0.9
      },
      {
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Simplified hover animations
    Array.from(cards).forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredProjects]);

  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gradient-primary relative">
            Featured Projects
            <span className="absolute -top-4 -right-4 w-3 h-3 bg-gradient-primary rounded-full animate-ping"></span>
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
            A collection of my latest work showcasing <span className="text-gradient-secondary font-medium">modern web technologies</span> and 
            <span className="text-gradient-primary font-medium"> creative problem-solving</span>
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`group px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  filter === category.id
                    ? 'bg-gradient-primary text-background glow-primary'
                    : 'glass glass-hover text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category.name}
                  <span className="text-xs opacity-75">({category.count})</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card glass glass-hover rounded-2xl overflow-hidden relative group"
            >
              {/* Status indicator */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-gradient-primary text-background px-3 py-1 rounded-full text-xs font-medium">
                  <Star size={12} />
                  Featured
                </div>
              )}

              {/* Status badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {project.status === 'completed' ? 'Completed' : 'In Progress'}
                </div>
              </div>
              
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-muted to-card relative overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  fallback="/placeholder.svg"
                />
              </div>

              {/* Project Info */}
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-gradient-primary transition-all duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {project.year}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-white/5 text-muted-foreground rounded-full border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    className="flex-1 bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:glow-primary transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Eye size={16} />
                      Live Demo
                    </span>
                    <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                  <a
                    href={project.github}
                    className="glass glass-hover px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center group hover:glow-secondary"
                  >
                    <GithubLogo size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="group glass glass-hover px-8 py-3 rounded-full text-muted-foreground hover:text-foreground transition-all duration-300 hover:glow-primary">
            <span className="flex items-center gap-2">
              View All Projects
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
