import { useId, useState, useRef, useEffect } from 'react';

interface BorderGlowBoxProps {
    borderColor?: string;
    lightColor?: string;
    borderOpacity?: number;
    className?: string;
    glowWidth?: number;
    glowInset?: number;
}

export const BorderGlowBox = ({
    borderColor = "#1f5899ff",
    lightColor = "#ffffff",
    borderOpacity = 0.5,
    className = "",
    glowWidth = 1,
    glowInset = 0
}: BorderGlowBoxProps) => {
    const id = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    const { width, height } = dimensions;
    const rx = 6;
    const strokeWidth = 1.5;

    const getPathData = (w: number, h: number, radius: number, offset: number) => {
        if (w <= 0 || h <= 0) return "";
        const r = Math.max(0, Math.min(radius, w / 2, h / 2));
        const s = offset;

        return `
            M ${r + s},${s}
            H ${w - r - s}
            A ${r},${r} 0 0 1 ${w - s},${r + s}
            V ${h - r - s}
            A ${r},${r} 0 0 1 ${w - r - s},${h - s}
            H ${r + s}
            A ${r},${r} 0 0 1 ${s},${h - r - s}
            V ${r + s}
            A ${r},${r} 0 0 1 ${r + s},${s}
            Z
        `;
    };

    const borderPathData = getPathData(width, height, rx, strokeWidth / 2);

    const glowRx = Math.max(0, rx - glowInset);
    const glowPathData = getPathData(width, height, glowRx, (strokeWidth / 2) + glowInset);

    const smokeFilterId = `smoke-texture-${id}`;
    const lightGradientId = `light-gradient-${id}`;
    const lightMaskId = `light-mask-${id}`;
    const borderGlowId = `border-glow-${id}`;

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className}`}>
            <div className="absolute inset-0 bg-[#050510]/10 backdrop-blur-md rounded-[6px]" />

            {width > 0 && height > 0 && (
                <svg
                    width={width}
                    height={height}
                    className="absolute inset-0 pointer-events-none overflow-visible"
                >
                    <defs>
                        <filter id={smokeFilterId} x="-50%" y="-50%" width="200%" height="200%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="3" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" />
                            <feGaussianBlur stdDeviation="8" />
                        </filter>

                        <radialGradient id={lightGradientId}>
                            <stop offset="0%" stopColor={lightColor} stopOpacity="1" />
                            <stop offset="40%" stopColor={lightColor} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
                        </radialGradient>

                        <mask id={lightMaskId}>
                            <rect width="100%" height="100%" fill="black" />

                            <circle r="200" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="12s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                />
                            </circle>
                            <circle r="200" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="12s"
                                    begin="-4s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                />
                            </circle>
                            <circle r="200" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="12s"
                                    begin="-8s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                />
                            </circle>

                            <circle r="80" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="11s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                />
                            </circle>

                            <circle r="60" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="17s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                    keyPoints="1;0"
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                            </circle>

                            <circle r="90" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="13s"
                                    begin="-5s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                />
                            </circle>

                            <circle r="70" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="19s"
                                    begin="-2s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                    keyPoints="1;0"
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                            </circle>

                            <circle r="50" fill={`url(#${lightGradientId})`}>
                                <animateMotion
                                    dur="7s"
                                    begin="-1s"
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                />
                            </circle>

                            <path d={borderPathData} fill="black" />
                        </mask>

                        <filter id={borderGlowId} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <path
                        d={glowPathData}
                        fill="none"
                        stroke={lightColor}
                        strokeWidth={glowWidth}
                        filter={`url(#${smokeFilterId})`}
                        mask={`url(#${lightMaskId})`}
                        opacity="1"
                        strokeLinecap="round"
                    />

                    <path
                        d={borderPathData}
                        fill="none"
                        stroke={borderColor}
                        strokeWidth={strokeWidth}
                        filter={`url(#${borderGlowId})`}
                        strokeOpacity={borderOpacity}
                    />
                </svg>
            )}

            <div className="relative h-full w-full flex items-center justify-center">
            </div>
        </div>
    );
};
