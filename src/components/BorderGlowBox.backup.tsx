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
    glowInset = 0,
    children,
    borderWidth = 1.5
}: BorderGlowBoxProps & { children?: React.ReactNode; borderWidth?: number }) => {
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
    const strokeWidth = borderWidth;

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

    const smokeFilterId = `smoke-filter-${id}`;
    const lightGradientId = `light-gradient-${id}`;
    const borderMaskId = `border-mask-${id}`;
    const borderGlowId = `border-glow-${id}`;

    // Light configurations: [rxRadius, ryRadius, duration, delay, reverse]
    const lights = [
        [60, 25, 10, 0, false],
        [40, 20, 12, -4, false],
        [80, 30, 8, -2, false],
        [35, 22, 14, -6, false],
        [50, 28, 16, 0, true],
        [70, 32, 11, -3, false],
        [45, 24, 15, -5, true],
        [55, 26, 9, -1, false],
        [65, 29, 13, -7, true],
        [75, 31, 10.5, -2.5, false],
    ];

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
                        <filter id={smokeFilterId} x="-200%" y="-200%" width="500%" height="500%">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.015"
                                numOctaves="3"
                                result="turbulence"
                                seed="2"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="turbulence"
                                scale="15"
                                xChannelSelector="R"
                                yChannelSelector="G"
                                result="displaced"
                            />
                            <feGaussianBlur in="displaced" stdDeviation="8" result="blurred" />
                            <feColorMatrix
                                in="blurred"
                                type="matrix"
                                values="1 0 0 0 0
                                        0 1 0 0 0
                                        0 0 1 0 0
                                        0 0 0 1.5 0"
                                result="brightened"
                            />
                        </filter>

                        <radialGradient id={lightGradientId}>
                            <stop offset="0%" stopColor={lightColor} stopOpacity="1" />
                            <stop offset="40%" stopColor={lightColor} stopOpacity="0.6" />
                            <stop offset="70%" stopColor={lightColor} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
                        </radialGradient>

                        <mask id={borderMaskId}>
                            <rect width="100%" height="100%" fill="black" />
                            <path
                                d={glowPathData}
                                fill="none"
                                stroke="white"
                                strokeWidth={glowWidth * 3}
                            />
                        </mask>

                        <filter id={borderGlowId} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <g mask={`url(#${borderMaskId})`}>
                        {lights.map(([rxRadius, ryRadius, duration, delay, reverse], index) => (
                            <ellipse
                                key={index}
                                rx={rxRadius}
                                ry={ryRadius}
                                fill={`url(#${lightGradientId})`}
                                filter={`url(#${smokeFilterId})`}
                                opacity="0.85"
                            >
                                <animateMotion
                                    dur={`${duration}s`}
                                    begin={`${delay}s`}
                                    repeatCount="indefinite"
                                    path={glowPathData}
                                    rotate="auto"
                                    keyPoints={reverse ? "1;0" : "0;1"}
                                    keyTimes="0;1"
                                    calcMode="linear"
                                />
                            </ellipse>
                        ))}
                    </g>

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
                {children}
            </div>
        </div>
    );
};
