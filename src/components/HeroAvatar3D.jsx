import { useEffect, useRef } from 'react';

const MAX_ROTATE_Y = 32;
const MAX_ROTATE_X = 22;
const SMOOTHING = 0.08;

export default function HeroAvatar3D({ src, alt }) {
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const shadowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const section = document.getElementById('home');

    const updateTarget = (clientX, clientY) => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      target.current.x = Math.max(-1, Math.min(1, (clientX - centerX) / (rect.width / 2)));
      target.current.y = Math.max(-1, Math.min(1, (clientY - centerY) / (rect.height / 2)));
    };

    const onMouseMove = (e) => updateTarget(e.clientX, e.clientY);

    const onSectionMove = (e) => updateTarget(e.clientX, e.clientY);

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    const tick = () => {
      const layer = layerRef.current;
      if (!layer) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      current.current.x += (target.current.x - current.current.x) * SMOOTHING;
      current.current.y += (target.current.y - current.current.y) * SMOOTHING;

      const rotateY = current.current.x * MAX_ROTATE_Y;
      const rotateX = -current.current.y * MAX_ROTATE_X;
      const floatY = Math.sin(Date.now() / 2000) * 6;

      layer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${floatY}px)`;

      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateZ(-50px) scale(0.9) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    if (section) {
      section.addEventListener('mousemove', onSectionMove);
      section.addEventListener('mouseleave', onLeave);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (section) {
        section.removeEventListener('mousemove', onSectionMove);
        section.removeEventListener('mouseleave', onLeave);
      }
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-avatar-stage relative flex items-center justify-end"
    >
      <div ref={layerRef} className="hero-avatar-layer relative">
        <div
          ref={shadowRef}
          className="hero-avatar-shadow absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            right: 10,
            width: 'min(22vw, 410px)',
            height: 'min(40vw, 760px)',
            borderRadius: '50%',
            background: 'conic-gradient(rgb(28, 216, 210), rgb(0, 191, 143), rgb(48, 43, 99), rgb(28, 216, 210))',
          }}
        />
        <img
          src={src}
          alt={alt}
          className="hero-avatar-img relative object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
