import { FaJava } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPython,
  SiDocker,
  SiNodedotjs,
  SiMongodb,
  SiAngular,
  SiIonic,
} from 'react-icons/si';

const iconMap = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  FastAPI: SiFastapi,
  Python: SiPython,
  Docker: SiDocker,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  Angular: SiAngular,
  'Ionic-Angular': SiIonic,
};

export function SkillIcon({ name, className = 'text-6xl' }) {
  const Icon = iconMap[name];
  if (!Icon) return <span className={className}>⚡</span>;
  return <Icon className={className} />;
}
