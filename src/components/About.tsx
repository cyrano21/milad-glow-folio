"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Globe,
  Palette,
  Lightning,
  Database,
  DeviceMobile,
  Trophy,
  Heart,
} from "phosphor-react";
import Image from "@/components/ui/Image";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: "HTML/CSS", color: "hsl(14 100% 57%)", level: 95 },
    { icon: Globe, name: "JavaScript", color: "hsl(53 93% 54%)", level: 90 },
    { icon: Palette, name: "React", color: "hsl(193 95% 68%)", level: 92 },
    { icon: Lightning, name: "GSAP", color: "hsl(82 77% 55%)", level: 88 },
    { icon: Database, name: "Node.js", color: "hsl(120 100% 40%)", level: 85 },
    {
      icon: DeviceMobile,
      name: "Mobile Dev",
      color: "hsl(280 100% 75%)",
      level: 80,
    },
  ];

  const stats = [
    { number: "5+", label: "Years Experience", icon: Trophy },
    { number: "50+", label: "Projects Completed", icon: Code },
    { number: "100%", label: "Client Satisfaction", icon: Heart },
  ];

  useEffect(() => {
    // Debug: Log profile image path
    console.log("About Debug - Profile image path: /images/profile.png");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(imageRef.current, {
      opacity: 0,
      x: -150,
      rotationY: -90,
      filter: "blur(20px)",
      duration: 1.5,
      ease: "power3.out",
    })
      .from(
        contentRef.current?.children || [],
        {
          opacity: 0,
          y: 50,
          rotationX: 45,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=1"
      )
      .from(
        skillsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0.5,
          rotation: 180,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "-=0.8"
      )
      .from(
        statsRef.current?.children || [],
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // Enhanced image interactions
    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener("mouseenter", () => {
        gsap.to(imageElement, {
          scale: 1.1,
          rotation: 5,
          filter: "brightness(1.2)",
          duration: 0.5,
          ease: "power2.out",
        });
      });

      imageElement.addEventListener("mouseleave", () => {
        gsap.to(imageElement, {
          scale: 1,
          rotation: 0,
          filter: "brightness(1)",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }

    // Skills progress animation
    const skillElements = skillsRef.current?.children;
    if (skillElements) {
      Array.from(skillElements).forEach((skill, index) => {
        const progressBar = skill.querySelector(".skill-progress");
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${skills[index].level}%`,
              duration: 1.5,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skill,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="w-80 h-80 mx-auto relative">
              {/* Animated rings */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full glow-primary opacity-30 animate-pulse"></div>
              <div
                className="absolute inset-2 bg-gradient-secondary rounded-full glow-secondary opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="relative w-full h-full glass rounded-full p-2 overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full transition-transform duration-300"
                  loadingClassName="w-full h-full rounded-full"
                  errorClassName="w-full h-full bg-gradient-to-br from-muted to-card rounded-full flex items-center justify-center text-6xl text-gradient-primary"
                  fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23333'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3EM%3C/text%3E%3C/svg%3E"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-gradient-primary relative">
                About Me
                <span className="absolute -top-2 -right-8 text-xs text-muted-foreground opacity-50 rotate-12">
                  ✨ Creative
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                I'm a passionate{" "}
                <span className="text-gradient-primary font-medium">
                  full-stack developer
                </span>{" "}
                with over 5 years of experience creating digital experiences
                that blend functionality with stunning visual design. I
                specialize in{" "}
                <span className="text-gradient-secondary font-medium">
                  modern web technologies
                </span>{" "}
                and have a keen eye for detail.
              </p>
            </div>

            <div>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                My journey in web development started with a curiosity for how
                things work, and has evolved into a love for crafting{" "}
                <span className="text-gradient-primary font-medium">
                  premium, user-centric applications
                </span>
                that push the boundaries of what's possible on the web.
              </p>
            </div>

            {/* Stats Section */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 py-6">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="glass glass-hover p-4 rounded-xl transition-all duration-300 group-hover:scale-105">
                    <stat.icon
                      size={24}
                      className="mx-auto mb-2 text-gradient-primary"
                    />
                    <div className="text-2xl font-light text-gradient-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Skills Grid */}
            <div>
              <h3 className="text-2xl font-light mb-6 text-gradient-secondary">
                Core Skills
              </h3>
              <div ref={skillsRef} className="space-y-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="glass glass-hover p-4 rounded-xl group cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon
                          size={24}
                          className="transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
                          style={{ color: skill.color }}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="skill-progress h-full bg-gradient-to-r transition-all duration-300"
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                        }}
                      ></div>
                    </div>

                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl"
                      style={{ backgroundColor: skill.color }}
                    ></div>
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
