"use client"

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 2,
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0
  });

  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current)}${suffix}`
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

interface AnimatedStatProps {
  icon: React.ElementType;
  value: string;
  label: string;
  delay?: number;
  isVisible: boolean;
}

export function AnimatedStat({ icon: Icon, value, label, delay = 0, isVisible }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // Parse value to extract number and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericValue = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="text-center group"
    >
      <motion.div 
        className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10"
        whileHover={{ 
          scale: 1.15, 
          rotate: 5,
          backgroundColor: 'rgba(255,255,255,0.15)'
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
      </motion.div>
      
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {isInView ? (
          <AnimatedCounter 
            value={numericValue} 
            suffix={suffix}
            duration={2}
          />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      
      <motion.div 
        className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
