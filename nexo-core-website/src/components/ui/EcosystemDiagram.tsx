import { motion } from 'framer-motion';

const MODULES = [
  { id: 'infra', label: 'INFRA', color: '#3AAB5C', secondaryColor: '#1F7A3D', angle: 0 },
  { id: 'chain', label: 'CHAIN', color: '#5B4FBE', secondaryColor: '#7B6FDE', angle: 90 },
  { id: 'money', label: 'MONEY', color: '#D4831A', secondaryColor: '#E9A033', angle: 180 },
  { id: 'hq', label: 'NEXO HQ', color: '#2A3E52', secondaryColor: '#4A6480', angle: 270 },
] as const;

const ORBIT_RADIUS = 130;
const CENTER = 200;
const CENTER_R = 44;
const SAT_R = 26;

export default function EcosystemDiagram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-auto max-w-[420px] mx-auto" aria-label="NEXO Ecosystem Diagram">
        <defs>
          {/* Core gradient */}
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6B72" />
            <stop offset="100%" stopColor="#3AAB5C" />
          </linearGradient>

          {/* Module gradients */}
          {MODULES.map((mod) => (
            <linearGradient key={`grad-${mod.id}`} id={`grad-${mod.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={mod.color} />
              <stop offset="100%" stopColor={mod.secondaryColor} />
            </linearGradient>
          ))}

          {/* Glow filters */}
          <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="coreOuterGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feFlood floodColor="#2A9A96" floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="satGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Orbit ring gradient */}
          <radialGradient id="orbitRingGrad" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(42,154,150,0.06)" />
          </radialGradient>
        </defs>

        {/* Outer ambient ring — subtle depth */}
        <circle cx={CENTER} cy={CENTER} r={170} fill="none" stroke="rgba(42,154,150,0.05)" strokeWidth="40" />

        {/* Orbit ring / track */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Second inner orbit ring */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_RADIUS - 20}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* Rotating constellation */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        >
          {/* Dashed connecting lines with draw animation */}
          {MODULES.map((mod, i) => {
            const rad = (mod.angle * Math.PI) / 180;
            const x = CENTER + ORBIT_RADIUS * Math.cos(rad);
            const y = CENTER + ORBIT_RADIUS * Math.sin(rad);
            return (
              <motion.line
                key={`line-${mod.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={`url(#grad-${mod.id})`}
                strokeWidth="1"
                strokeDasharray="3 6"
                strokeOpacity={0.35}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.25, ease: 'easeOut' }}
              />
            );
          })}

          {/* Satellite Nodes */}
          {MODULES.map((mod, i) => {
            const rad = (mod.angle * Math.PI) / 180;
            const x = CENTER + ORBIT_RADIUS * Math.cos(rad);
            const y = CENTER + ORBIT_RADIUS * Math.sin(rad);
            return (
              <motion.g
                key={mod.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8 + i * 0.2, type: 'spring' as const, stiffness: 200 }}
              >
                {/* Subtle glow behind node */}
                <circle
                  cx={x}
                  cy={y}
                  r={SAT_R + 8}
                  fill={mod.color}
                  opacity={0.08}
                  filter="url(#satGlow)"
                />
                {/* Node circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={SAT_R}
                  fill={`url(#grad-${mod.id})`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
                {/* Inner highlight */}
                <circle
                  cx={x - 4}
                  cy={y - 4}
                  r={SAT_R * 0.6}
                  fill="rgba(255,255,255,0.08)"
                />
                {/* Counter-rotate text for readability */}
                <motion.text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="7.5"
                  fontFamily="'Space Mono', monospace"
                  fontWeight="700"
                  letterSpacing="0.8"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {mod.label}
                </motion.text>
              </motion.g>
            );
          })}
        </motion.g>

        {/* Center CORE node — the hero */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' as const, stiffness: 180 }}
        >
          {/* Outer pulsing glow ring */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={CENTER_R + 16}
            fill="none"
            stroke="url(#coreGrad)"
            strokeWidth="1"
            strokeOpacity={0.2}
            animate={{ r: [CENTER_R + 16, CENTER_R + 22, CENTER_R + 16], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Secondary glow ring */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={CENTER_R + 8}
            fill="none"
            stroke="url(#coreGrad)"
            strokeWidth="0.5"
            strokeOpacity={0.15}
            animate={{ r: [CENTER_R + 8, CENTER_R + 12, CENTER_R + 8], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Main core circle */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={CENTER_R}
            fill="url(#coreGrad)"
            filter="url(#coreOuterGlow)"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {/* Inner highlight for depth */}
          <circle
            cx={CENTER - 6}
            cy={CENTER - 6}
            r={CENTER_R * 0.65}
            fill="rgba(255,255,255,0.1)"
          />

          {/* Text */}
          <text
            x={CENTER}
            y={CENTER - 6}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="11"
            fontFamily="'Space Mono', monospace"
            fontWeight="700"
            letterSpacing="1.5"
          >
            NEXO
          </text>
          <text
            x={CENTER}
            y={CENTER + 10}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.85)"
            fontSize="10"
            fontFamily="'Space Mono', monospace"
            fontWeight="700"
            letterSpacing="2"
          >
            CORE
          </text>
        </motion.g>

        {/* Decorative particle dots around the orbit */}
        {[0, 45, 135, 225, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const outerR = ORBIT_RADIUS + 35 + (i % 2 === 0 ? 10 : 0);
          const x = CENTER + outerR * Math.cos(rad);
          const y = CENTER + outerR * Math.sin(rad);
          return (
            <motion.circle
              key={`particle-${angle}`}
              cx={x}
              cy={y}
              r={1.5}
              fill="rgba(42,154,150,0.4)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
            />
          );
        })}
      </svg>
    </div>
  );
}
