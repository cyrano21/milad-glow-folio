
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Hero entrance animations
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .from(ctaRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.6')
    .from(splineRef.current, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1.2');

    // Floating orbs animation
    gsap.to('.glow-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        amount: 1.5,
        from: 'random'
      }
    });

    // Parallax effect for hero content
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>
      <div className="glow-orb glow-orb-3"></div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div ref={titleRef}>
            <h1 className="text-5xl md:text-7xl font-extralight leading-tight mb-6">
              Hi, I'm{' '}
              <span className="text-gradient-primary font-light">Milad</span>
              <br />
              <span className="text-gradient-secondary">Web Developer</span>
            </h1>
          </div>
          
          <div ref={subtitleRef}>
            <p className="text-xl text-muted-foreground mb-8 font-light leading-relaxed max-w-lg">
              Crafting premium digital experiences with cutting-edge technologies and elegant design solutions.
            </p>
          </div>
          
          <button
            ref={ctaRef}
            onClick={() => scrollToSection('#contact')}
            className="btn-glow bg-gradient-primary text-background px-8 py-4 rounded-full text-lg font-medium hover:glow-primary hover:scale-105 transition-all duration-300"
          >
            Hire Me
          </button>
        </div>

        {/* Right Content - Spline 3D */}
        <div ref={splineRef} className="relative">
          <div className="aspect-square w-full max-w-lg mx-auto">
            <iframe
              src="https://my.spline.design/untitled-e70cf66b3d972c9de9b96de896c10d2e/"
              width="100%"
              height="100%"
              className="rounded-2xl"
              style={{ border: 'none' }}
              title="3D Hero Animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
