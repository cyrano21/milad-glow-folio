
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate logo entrance
    tl.from('.preloader-logo', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out'
    })
    // Animate progress bar
    .to('.progress-bar', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out'
    }, '-=0.5')
    // Wait a moment
    .to({}, { duration: 0.3 })
    // Fade out preloader
    .to('.preloader', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader">
      <div className="preloader-logo text-gradient-primary">
        MILAD
      </div>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
      <div className="mt-8 text-muted-foreground text-sm tracking-widest">
        LOADING EXPERIENCE
      </div>
    </div>
  );
};

export default Preloader;
