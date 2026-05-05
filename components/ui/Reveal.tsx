'use client';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Reveal({ 
  children, 
  delay = 0, 
  className = '', 
  type = 'fade-up',
  as: Component = 'div'
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  type?: 'fade-up' | 'slide-left' | 'fade-scale' | 'fade';
  as?: React.ElementType;
}) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.15 });

  const getTransform = () => {
    switch (type) {
      case 'slide-left': return '-translate-x-[24px]';
      case 'fade-scale': return 'scale-95';
      case 'fade': return '';
      case 'fade-up':
      default: return 'translate-y-[24px]';
    }
  };

  const baseClass = `transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]`;
  const hiddenClass = `opacity-0 ${getTransform()}`;
  const visibleClass = `opacity-100 translate-y-0 translate-x-0 scale-100`;

  return (
    <Component 
      ref={ref} 
      className={`${className} ${baseClass} ${isRevealed ? visibleClass : hiddenClass}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
