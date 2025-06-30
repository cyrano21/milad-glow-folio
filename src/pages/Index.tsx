
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [locomotiveScroll, setLocomotiveScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    // Initialize Locomotive Scroll after preloader
    if (!loading) {
      const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
        smooth: true,
        multiplier: 1.2,
        class: 'is-reveal',
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      });

      setLocomotiveScroll(scroll);

      // Update ScrollTrigger when Locomotive Scroll updates
      scroll.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: (document.querySelector('[data-scroll-container]') as HTMLElement)?.style.transform ? 'transform' : 'fixed'
      });

      ScrollTrigger.addEventListener('refresh', () => scroll.update());
      ScrollTrigger.refresh();

      return () => {
        if (scroll) scroll.destroy();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [loading]);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-dark text-foreground overflow-x-hidden">
      <div data-scroll-container>
        <Navigation />
        
        <main>
          <div data-scroll-section>
            <Hero />
          </div>
          
          <div data-scroll-section>
            <About />
          </div>
          
          <div data-scroll-section>
            <Projects />
          </div>
          
          <div data-scroll-section>
            <Contact />
          </div>
          
          <div data-scroll-section>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
