
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate footer entrance
    gsap.from(footerRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        amount: 1,
        from: 'random'
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
    <footer className="relative py-16 mt-32 glass">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-particle absolute w-2 h-2 bg-primary/30 rounded-full top-1/4 left-1/4"></div>
        <div className="footer-particle absolute w-1 h-1 bg-secondary/40 rounded-full top-1/2 left-1/2"></div>
        <div className="footer-particle absolute w-3 h-3 bg-accent/20 rounded-full top-3/4 right-1/4"></div>
        <div className="footer-particle absolute w-1.5 h-1.5 bg-primary/40 rounded-full top-1/3 right-1/3"></div>
      </div>

      <div ref={footerRef} className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-3xl font-light tracking-wider text-gradient-primary mb-4">
              MILAD
            </div>
            <p className="text-muted-foreground font-light">
              Crafting premium digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-medium mb-4 text-foreground">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block mx-auto text-muted-foreground hover:text-foreground transition-colors duration-300 font-light"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-medium mb-4 text-foreground">
              Connect
            </h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover p-3 rounded-lg transition-all duration-300 hover:glow-primary group"
              >
                <GithubLogo size={20} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover p-3 rounded-lg transition-all duration-300 hover:glow-secondary group"
              >
                <LinkedinLogo size={20} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-muted-foreground font-light flex items-center justify-center gap-2">
            © 2024 Milad. Made with 
            <Heart size={16} className="text-primary animate-pulse-glow" /> 
            and cutting-edge tech.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
