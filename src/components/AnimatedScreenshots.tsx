import { useEffect, useRef, useState } from 'react';

export default function AnimatedScreenshots() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much the element is in view
      // When element enters from bottom, progress goes from 0 to 1
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start animation when element is about to enter viewport
      const startPoint = windowHeight;
      const endPoint = windowHeight * 0.3; // Fully scaled when 30% from top
      
      let progress = 0;
      if (elementTop <= startPoint && elementTop >= endPoint) {
        progress = 1 - (elementTop - endPoint) / (startPoint - endPoint);
      } else if (elementTop < endPoint) {
        progress = 1;
      }
      
      setScrollProgress(progress);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Ensure baseUrl always ends with /
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

  const screenshots = [
    {
      src: `${baseUrl}screenshot-2.jpg`,
      alt: 'Habit calendar view with streak visualization',
    },
    {
      src: `${baseUrl}screenshot-1.jpg`,
      alt: 'Habit list view showing daily tracking',
    },
    {
      src: `${baseUrl}screenshot-3.jpg`,
      alt: 'Habit statistics and progress tracking',
    },
  ];

  // Calculate scale: starts at 0.7, grows to 1.0 as you scroll up
  const minScale = 0.7;
  const maxScale = 1.0;
  
  // Function to calculate scale for each image based on position
  const getImageScale = (index: number) => {
    // Middle image (index 1) scales first, then side images
    let adjustedProgress = scrollProgress;
    
    if (index === 1) {
      // Middle image: full progress
      adjustedProgress = Math.min(scrollProgress * 1.5, 1);
    } else {
      // Side images (0 and 2): delayed progress
      adjustedProgress = Math.max((scrollProgress - 0.3) * 1.5, 0);
      adjustedProgress = Math.min(adjustedProgress, 1);
    }
    
    return minScale + (maxScale - minScale) * adjustedProgress;
  };

  // Calculate rotation for side images
  const getRotation = (index: number) => {
    if (index === 1) return 0; // No rotation for middle
    
    const progress = Math.max((scrollProgress - 0.3) * 1.5, 0);
    const maxRotation = index === 0 ? 3 : -3; // Left tilts right, right tilts left
    return maxRotation * (1 - Math.min(progress, 1));
  };

  // Calculate Y offset (float up effect)
  const getYOffset = (index: number) => {
    const scale = getImageScale(index);
    const progress = (scale - minScale) / (maxScale - minScale);
    return (1 - progress) * 20; // Move up 20px as they scale
  };

  return (
    <div
      ref={containerRef}
      className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3"
    >
      {screenshots.map((screenshot, index) => {
        const scale = getImageScale(index);
        const opacity = 0.5 + (scale - minScale) / (maxScale - minScale) * 0.5;
        const rotation = getRotation(index);
        const yOffset = getYOffset(index);
        const shadowIntensity = (scale - minScale) / (maxScale - minScale);
        
        return (
          <figure
            key={index}
            className="transition-all duration-300 ease-out overflow-hidden"
            style={{
              transform: `scale(${scale}) translateY(${yOffset}px) rotate(${rotation}deg)`,
              opacity,
              boxShadow: `0 ${10 + shadowIntensity * 15}px ${30 + shadowIntensity * 30}px rgba(0, 0, 0, ${0.2 + shadowIntensity * 0.3})`,
            }}
          >
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              className="w-full object-cover"
              style={{
                height: '112.5%',
                objectPosition: 'center',
                marginTop: '-12.5%',
              }}
              loading="eager"
            />
          </figure>
        );
      })}
    </div>
  );
}
