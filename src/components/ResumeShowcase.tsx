import React, { useRef, useState } from 'react';

export default function ResumeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation (-10 to 10 degrees)
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;
    const rotateX = -((mouseY - centerY) / (rect.height / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to initial state
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative mx-auto mt-20 max-w-5xl px-4 py-8 md:mt-32"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <div className="absolute inset-x-0 -top-20 -z-10 flex justify-center">
        <div className="h-44 w-3/4 rounded-full bg-accent-primary/20 blur-[100px]" />
      </div>

      <div
        className={`relative flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8 transition-transform ${isHovered ? 'duration-100 ease-out' : 'duration-700 ease-in-out'}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Left Resume (PT-BR) */}
        <div
          className="group relative w-full max-w-sm transform transition-all duration-500 hover:z-30 hover:scale-[1.02] md:w-[45%]"
          style={{ transform: 'translateZ(30px) rotateY(2deg)' }}
        >
          {/* Subtle static border glow */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-accent-primary/60 via-transparent to-transparent opacity-50" />
          {/* Hover glow */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent-primary to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

          <div className="relative overflow-hidden rounded-xl bg-dark-800 shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-white/5 bg-dark-900/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs font-medium text-text-tertiary">Português - BR</span>
            </div>
            <img
              src="/resume-example-ptbr.png"
              alt="Exemplo de Currículo em Português"
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Resume (EN) */}
        <div
          className="group relative w-full max-w-sm transform transition-all duration-500 hover:z-30 hover:scale-[1.02] md:w-[45%]"
          style={{ transform: 'translateZ(50px) rotateY(-2deg)' }}
        >
          {/* Subtle static border glow */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-bl from-accent-secondary/60 via-transparent to-transparent opacity-50" />
          {/* Hover glow */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-bl from-accent-secondary to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

          <div className="relative overflow-hidden rounded-xl bg-dark-800 shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-white/5 bg-dark-900/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs font-medium text-text-tertiary">English - EN</span>
            </div>
            <img
              src="/resume-example-en.png"
              alt="English Resume Example"
              className="w-full h-auto object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
