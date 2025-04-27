import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

// CSS Morphing SVG Waves Background (browser compatible)
const AnimatedBackground = () => {
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);
  const path4Ref = useRef(null);

  useEffect(() => {
    // Helper to interpolate between two values
    const lerp = (a, b, t) => a + (b - a) * t;
    // Helper to interpolate between two path control points
    function interpolatePath(start, end, t) {
      return start.map((s, i) => lerp(s, end[i], t));
    }
    // Path control points for each wave
    const wave1A = [400, 50];
    const wave1B = [400, 650];
    const wave2A = [400, 650];
    const wave2B = [400, 50];
    const wave3A = [400, 200];
    const wave3B = [400, 600];
    const wave4A = [400, 600];
    const wave4B = [400, 200];

    let frame = 0;
    let running = true;
    function animate() {
      frame++;
      const now = performance.now();
      // Use sin for smooth looping
      const t1 = (Math.sin(now / 1000 * Math.PI / 5) + 1) / 2; // 10s
      const t2 = (Math.sin(now / 1000 * Math.PI / 6.5) + 1) / 2; // 13s
      const t3 = (Math.sin(now / 1000 * Math.PI / 9) + 1) / 2; // 18s
      const t4 = (Math.sin(now / 1000 * Math.PI / 12) + 1) / 2; // 24s

      // For each wave, interpolate the control point
      const [y1, y1q] = interpolatePath([400, wave1A[1]], [400, wave1B[1]], t1);
      const [y2, y2q] = interpolatePath([400, wave2A[1]], [400, wave2B[1]], t2);
      const [y3, y3q] = interpolatePath([400, wave3A[1]], [400, wave3B[1]], t3);
      const [y4, y4q] = interpolatePath([400, wave4A[1]], [400, wave4B[1]], t4);

      // Set the d attribute for each path
      if (path1Ref.current) path1Ref.current.setAttribute('d', `M0,${y1} Q360,${y1q} 720,${y1} T1440,${y1} V600 H0 Z`);
      if (path2Ref.current) path2Ref.current.setAttribute('d', `M0,${y2} Q360,${y2q} 720,${y2} T1440,${y2} V600 H0 Z`);
      if (path3Ref.current) path3Ref.current.setAttribute('d', `M0,${y3} Q360,${y3q} 720,${y3} T1440,${y3} V600 H0 Z`);
      if (path4Ref.current) path4Ref.current.setAttribute('d', `M0,${y4} Q360,${y4q} 720,${y4} T1440,${y4} V600 H0 Z`);

      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  // Animated particle drops
  const dropsRef = useRef([]);
  const dropsSvgRef = useRef(null);
  useEffect(() => {
    // Generate drops (bokeh circles)
    const drops = Array.from({length: 35}, () => ({
      x: Math.random() * 1440,
      y: Math.random() * 600,
      r: 16 + Math.random() * 24,
      opacity: 0.08 + Math.random() * 0.13,
      speed: 0.4 + Math.random() * 0.7
    }));
    dropsRef.current = drops;
    let running = true;
    function animateDrops() {
      for (let drop of dropsRef.current) {
        drop.y += drop.speed;
        if (drop.y - drop.r > 600) {
          drop.y = -drop.r;
          drop.x = Math.random() * 1440;
        }
      }
      if (dropsSvgRef.current) {
        for (let i = 0; i < dropsRef.current.length; i++) {
          const el = dropsSvgRef.current.children[i];
          const drop = dropsRef.current[i];
          if (el) {
            el.setAttribute('cx', drop.x);
            el.setAttribute('cy', drop.y);
          }
        }
      }
      if (running) requestAnimationFrame(animateDrops);
    }
    animateDrops();
    return () => { running = false; };
  }, []);

  return (
    <div className="morphing-waves-bg">
      {/* Animated particle drops */}
      <svg width="100%" height="100%" viewBox="0 0 1440 600" style={{position:'absolute', left:0, top:0, zIndex:0, pointerEvents:'none'}}>
        <defs>
          <filter id="blurDrop" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g ref={dropsSvgRef}>
          {Array.from({length: 35}).map((_, i) => (
            <circle key={i} cx="0" cy="0" r={18 + Math.random()*22} fill="#fff" opacity={0.09 + Math.random()*0.13} style={{mixBlendMode:'screen'}} filter="url(#blurDrop)" />
          ))}
        </g>
      </svg>
      {/* Main wave */}
      <svg className="wave wave1" viewBox="0 0 1440 600" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7be495" />
            <stop offset="100%" stopColor="#51b6e0" />
          </linearGradient>
        </defs>
        <path ref={path1Ref} className="wave-path1" fill="url(#waveGradient)" opacity="1" style={{mixBlendMode:'screen', filter:'brightness(1.1)'}} d="M0,400 Q360,50 720,400 T1440,400 V600 H0 Z" />
      </svg>
      {/* Magenta wave */}
      <svg className="wave wave2" viewBox="0 0 1440 600" width="100%" height="100%" preserveAspectRatio="none">
        <path ref={path2Ref} className="wave-path2" fill="#d000ff" opacity="0.98" style={{mixBlendMode:'screen', filter:'brightness(1.1)'}} d="M0,400 Q360,650 720,400 T1440,400 V600 H0 Z" />
      </svg>
      {/* Orange wave */}
      <svg className="wave wave3" viewBox="0 0 1440 600" width="100%" height="100%" preserveAspectRatio="none">
        <path ref={path3Ref} className="wave-path3" fill="#ffb347" opacity="0.9" style={{mixBlendMode:'screen', filter:'brightness(1.1)'}} d="M0,400 Q360,200 720,400 T1440,400 V600 H0 Z" />
      </svg>
      {/* Cyan wave */}
      <svg className="wave wave4" viewBox="0 0 1440 600" width="100%" height="100%" preserveAspectRatio="none">
        <path ref={path4Ref} className="wave-path4" fill="#00e6ff" opacity="0.85" style={{mixBlendMode:'screen', filter:'brightness(1.1)'}} d="M0,400 Q360,600 720,400 T1440,400 V600 H0 Z" />
      </svg>

    </div>
  );
};

export default AnimatedBackground;
