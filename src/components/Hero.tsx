
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkle } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Cursor follow effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const tl = gsap.timeline({ delay: 0.5 });
    
    // Enhanced hero entrance animations
    tl.from(titleRef.current, {
      opacity: 0,
      y: 100,
      rotationX: 90,
      filter: 'blur(20px)',
      duration: 1.5,
      ease: 'power3.out'
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=1')
    .from(ctaRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: 180,
      duration: 1,
      ease: 'back.out(2)'
    }, '-=0.8')
    .from(splineRef.current, {
      opacity: 0,
      x: 200,
      rotationY: 90,
      duration: 2,
      ease: 'power3.out'
    }, '-=1.5');

    // Enhanced floating orbs animation
    gsap.to('.glow-orb', {
      y: -30,
      x: 15,
      rotation: 360,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 2,
        from: 'random'
      }
    });

    // Parallax effect for hero content with rotation
    gsap.to(heroRef.current, {
      yPercent: -30,
      rotationX: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Cursor animation
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mousePosition]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-5 h-5 pointer-events-none z-50 mix-blend-difference"
        style={{ 
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(1px)'
        }}
      />

      {/* Enhanced background orbs */}
      <div className="glow-orb glow-orb-1">
        <Sparkle size={24} className="text-primary animate-pulse" />
      </div>
      <div className="glow-orb glow-orb-2">
        <Sparkle size={32} className="text-secondary animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="glow-orb glow-orb-3">
        <Sparkle size={20} className="text-accent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div ref={titleRef}>
            <h1 className="text-5xl md:text-7xl font-extralight leading-tight mb-6 relative">
              <span className="inline-block hover:scale-110 transition-transform duration-300">Hi,</span>{' '}
              <span className="inline-block hover:scale-110 transition-transform duration-300">I'm</span>{' '}
              <br />
              <span className="text-gradient-primary font-light relative inline-block group">
                Milad
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-primary rounded-full animate-bounce opacity-75"></span>
              </span>
              <br />
              <span className="text-gradient-secondary inline-block hover:rotate-2 transition-transform duration-300">
                Web Developer
              </span>
            </h1>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-xl text-muted-foreground mb-8 font-light leading-relaxed max-w-lg">
              Crafting <span className="text-gradient-primary font-medium">premium digital experiences</span> with 
              cutting-edge technologies and <span className="text-gradient-secondary font-medium">elegant design solutions</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <button
              ref={ctaRef}
              onClick={() => scrollToSection('#contact')}
              className="group btn-glow bg-gradient-primary text-background px-8 py-4 rounded-full text-lg font-medium hover:glow-primary hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button
              onClick={() => scrollToSection('#about')}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <span>Discover More</span>
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Right Content - Enhanced Spline 3D */}
        <div ref={splineRef} className="relative">
          <div className="aspect-square w-full max-w-lg mx-auto relative group">
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-primary p-1 animate-spin-slow opacity-75">
              <div className="w-full h-full bg-background rounded-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <iframe
                src="https://my.spline.design/untitled-e70cf66b3d972c9de9b96de896c10d2e/"
                width="100%"
                height="100%"
                className="rounded-2xl group-hover:scale-105 transition-transform duration-500"
                style={{ border: 'none' }}
                title="3D Hero Animation"
              />
            </div>
            
            {/* Floating elements around 3D */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-secondary rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-primary rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;
