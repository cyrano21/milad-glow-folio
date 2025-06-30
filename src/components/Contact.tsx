
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, PaperPlaneTilt } from 'phosphor-react';
import { toast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.contact-title', {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power2.out'
    })
    .from('.contact-form > *', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.social-links > *', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl font-light mb-6 text-gradient-primary">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 glass rounded-xl bg-transparent border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-foreground placeholder-muted-foreground"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-4 glass rounded-xl bg-transparent border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-foreground placeholder-muted-foreground"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-6 py-4 glass rounded-xl bg-transparent border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-foreground placeholder-muted-foreground resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="submit-btn w-full btn-glow bg-gradient-primary text-background px-8 py-4 rounded-xl text-lg font-medium hover:glow-primary transition-all duration-300 flex items-center justify-center gap-3"
            >
              Send Message
              <PaperPlaneTilt size={20} />
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-4 text-gradient-secondary">
                Get In Touch
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                I'm always excited to work on new projects and collaborate with talented individuals. 
                Whether you have a specific project in mind or just want to connect, feel free to reach out.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4 text-foreground">
                Response Time
              </h4>
              <p className="text-muted-foreground font-light">
                I typically respond within 24 hours. For urgent projects, 
                feel free to connect with me on social media.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium mb-4 text-foreground">
                Connect With Me
              </h4>
              <div className="social-links flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover p-4 rounded-xl transition-all duration-300 hover:glow-primary group"
                >
                  <GithubLogo size={24} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover p-4 rounded-xl transition-all duration-300 hover:glow-secondary group"
                >
                  <LinkedinLogo size={24} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
