'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import styles from './SparkleFx.module.scss';

interface SparkleFxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    speed?: 'slow' | 'medium' | 'fast';
    count?: number;
    trigger?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const SparkleFx = forwardRef<HTMLDivElement, SparkleFxProps>(({
    children,
    speed = 'medium',
    count = 50,
    trigger = true,
    className,
    style,
    ...rest
}, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeParticlesRef = useRef<number>(0);
    const intervalIdRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const getSpeedRange = () => {
            switch (speed) {
                case 'slow':
                    return [8, 12];
                case 'medium':
                    return [5, 8];
                case 'fast':
                    return [3, 5];
                default:
                    return [5, 8];
            }
        };

        const speedRange = getSpeedRange();

        const createParticle = () => {
            if (activeParticlesRef.current >= count) return;

            const particle = document.createElement('div');
            particle.className = styles.sparkleParticle;

            // Random size between 2px and 4px
            const size = Math.random() * 2 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position within container
            const rect = container.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // Random animation duration within speed range
            const duration = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
            particle.style.animationDuration = `${duration}s`;

            // Random direction
            const angle = Math.random() * 360;
            const distance = 100 + Math.random() * 100;
            particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);

            container.appendChild(particle);
            activeParticlesRef.current++;

            particle.addEventListener('animationend', () => {
                container.removeChild(particle);
                activeParticlesRef.current--;
            });
        };

        const startEmitting = () => {
            if (intervalIdRef.current === null) {
                intervalIdRef.current = window.setInterval(() => {
                    if (activeParticlesRef.current < count) {
                        createParticle();
                    }
                }, 100);
            }
        };

        const stopEmitting = () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };

        if (trigger) {
            startEmitting();
        } else {
            stopEmitting();
        }

        return () => {
            stopEmitting();
        };
    }, [count, speed, trigger]);

    return (
        <div
            ref={ref || containerRef}
            className={`${styles.sparkleContainer} ${className || ''}`}
            style={style}
            {...rest}>
            {children}
        </div>
    );
});

SparkleFx.displayName = 'SparkleFx';
export { SparkleFx };