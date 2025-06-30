
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Globe, Palette, Lightning, Database, DeviceMobile } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: 'HTML/CSS', color: 'hsl(14 100% 57%)' },
    { icon: Globe, name: 'JavaScript', color: 'hsl(53 93% 54%)' },
    { icon: Palette, name: 'React', color: 'hsl(193 95% 68%)' },
    { icon: Lightning, name: 'GSAP', color: 'hsl(82 77% 55%)' },
    { icon: Database, name: 'Node.js', color: 'hsl(120 100% 40%)' },
    { icon: DeviceMobile, name: 'Mobile Dev', color: 'hsl(280 100% 75%)' }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(imageRef.current, {
      opacity: 0,
      x: -100,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .from(contentRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.8')
    .from(skillsRef.current?.children || [], {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.6');

    // Image hover animation
    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('mouseenter', () => {
        gsap.to(imageElement, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      imageElement.addEventListener('mouseleave', () => {
        gsap.to(imageElement, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full glow-primary opacity-50"></div>
              <div className="relative w-full h-full glass rounded-full p-2">
                <div className="w-full h-full bg-gradient-to-br from-muted to-card rounded-full flex items-center justify-center text-6xl text-gradient-primary">
                  M
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gradient-primary">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                digital experiences that blend functionality with stunning visual design. 
                I specialize in modern web technologies and have a keen eye for detail.
              </p>
            </div>

            <div>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                My journey in web development started with a curiosity for how things work, 
                and has evolved into a love for crafting premium, user-centric applications 
                that push the boundaries of what's possible on the web.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-light mb-6 text-gradient-secondary">
                Core Skills
              </h3>
              <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="glass glass-hover p-4 rounded-xl text-center group cursor-pointer"
                  >
                    <skill.icon 
                      size={32} 
                      className="mx-auto mb-2 transition-all duration-300 group-hover:scale-110"
                      style={{ color: skill.color }}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
