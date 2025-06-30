import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with real-time inventory",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/placeholder.svg",
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "Analytics platform with machine learning insights",
      tech: ["Next.js", "Python", "TensorFlow"],
      image: "/placeholder.svg",
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "Social Media App",
      description: "Real-time messaging and content sharing platform",
      tech: ["React Native", "Firebase", "Socket.io"],
      image: "/placeholder.svg",
      github: "#",
      demo: "#"
    },
    {
      id: 4,
      title: "Task Management",
      description: "Collaborative project management tool",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      image: "/placeholder.svg",
      github: "#",
      demo: "#"
    },
    {
      id: 5,
      title: "Crypto Tracker",
      description: "Real-time cryptocurrency portfolio tracker",
      tech: ["React", "Chart.js", "WebSocket"],
      image: "/placeholder.svg",
      github: "#",
      demo: "#"
    },
    {
      id: 6,
      title: "Travel Planner",
      description: "AI-powered travel itinerary generator",
      tech: ["Svelte", "OpenAI", "Maps API"],
      image: "/placeholder.svg",
      github: "#",
      demo: "#"
    }
  ];

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    gsap.from(cards, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Hover animations for each card
    Array.from(cards).forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.project-glow'), {
          opacity: 1,
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.project-glow'), {
          opacity: 0,
          duration: 0.3
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-gradient-primary">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            A collection of my latest work showcasing modern web technologies and creative problem-solving
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass glass-hover rounded-2xl overflow-hidden relative group"
            >
              {/* Glow effect */}
              <div className="project-glow absolute inset-0 bg-gradient-primary opacity-0 blur-xl -z-10 rounded-2xl"></div>
              
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-muted to-card p-8 flex items-center justify-center">
                <div className="text-4xl text-gradient-primary font-light">
                  {project.id}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-white/5 text-muted-foreground rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    className="flex-1 bg-gradient-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:glow-primary transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.github}
                    className="glass glass-hover px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    <GithubLogo size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
