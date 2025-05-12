"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Image paths
const mugImg = "/images/hero/Mug.png";
const cheersImg = "/images/hero/image 11_05_2025, 03_31_05.png";
const drinkingImg = "/images/hero/image 11_05_2025, 03_31_04.png";
const hopImg = "/images/hero/image 11_05_2025, 03_31_01.png";
const bottleImg = "/images/hero/garrafa.png";

const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.15,
        },
    },
};

const imageItemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.7, rotate: -12 },
    visible: {
        opacity: 1, y: 0, scale: 1, rotate: 0,
        transition: { type: "spring", stiffness: 90, damping: 14 },
    },
    float: (i: number) => ({
        y: ["0%", "-2%", "0%", "2%", "0%"],
        rotate: [-1, 1, -1, 1, -1],
        transition: {
            duration: 6 + (i % 3) * 1.2 + Math.random() * 2.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 1.5,
        },
    }),
    hover: { scale: 1.08, transition: { duration: 0.3 } },
};

const textContentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.25,
        },
    },
};

const textElementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


interface ImageStyle {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    x?: string;
    y?: string;
    zIndex?: number;
    sm?: Partial<Omit<ImageStyle, 'sm' | 'lg'>>;
    lg?: Partial<Omit<ImageStyle, 'sm' | 'lg'>>;
}

interface ImageConfig {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
    style: ImageStyle;
}


const HeroSection = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const getResponsiveStyle = (baseStyle: ImageStyle): React.CSSProperties => {
        if (!isClient) {
            return baseStyle as React.CSSProperties;
        }

        const smStyles = window.innerWidth >= 640 ? baseStyle.sm || {} : {};
        const lgStyles = window.innerWidth >= 1024 ? baseStyle.lg || {} : {};
        return { ...baseStyle, ...smStyles, ...lgStyles } as React.CSSProperties;
    };


    const backgroundImages: ImageConfig[] = [
        { id: 'hop', src: hopImg, alt: 'Hop', width: 100, height: 100,
            className: "w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] lg:w-[100px] lg:h-[100px] opacity-40 dark:opacity-50",
            style: { top: '15%', left: '10%', sm: { top: '10%', left: '10%' } } },
        { id: 'bottle', src: bottleImg, alt: 'Bottle', width: 70, height: 180,
            className: "w-[25px] h-[70px] sm:w-[40px] sm:h-[110px] lg:w-[70px] lg:h-[180px] opacity-30 dark:opacity-40",
            style: { bottom: '15%', left: '5%', sm: { bottom: '15%', left: '5%' } } },
        { id: 'mug', src: mugImg, alt: 'Mug', width: 110, height: 110,
            className: "w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] lg:w-[110px] lg:h-[110px] opacity-35 dark:opacity-45",
            style: { top: '15%', right: '10%', sm: { top: '12%', right: '8%' } } },
        { id: 'drinking', src: drinkingImg, alt: 'Drinking', width: 120, height: 120,
            className: "w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px] opacity-40 dark:opacity-50",
            style: { bottom: '25%', right: '8%', sm: { bottom: '20%', right: '5%' } } },
    ];

    const centralImage: ImageConfig = { id: 'cheers', src: cheersImg, alt: 'Cheers', width: 200, height: 200,
        className: "w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] opacity-80 dark:opacity-90 drop-shadow-xl",
        style: { top: '50%', left: '50%', x: '-50%', y: '-50%', zIndex: 12 }
    };


    return (
        <motion.section
            className="relative text-center py-12 sm:py-20 px-4 shadow-lg overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col items-center justify-center"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {backgroundImages.map((img, index) => (
                    <motion.div
                        key={img.id}
                        className={`absolute ${img.className}`}
                        style={getResponsiveStyle(img.style)}
                        custom={index}
                        animate={["visible", "float"]}
                    >
                        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="h-auto object-contain" />
                    </motion.div>
                ))}
            </div>

            {/* Content Layer (Text and Central Image) */}
            <motion.div
                className="relative z-10 flex flex-col items-center w-full max-w-3xl px-4" // Main text block is z-10
                variants={textContentVariants}
            >
                {/* Central "Cheers" Image */}
                <motion.div
                    className={`mb-[-20px] xs:mb-[-30px] sm:mb-[-40px] lg:mb-[-60px] ${centralImage.className}`}
                    style={getResponsiveStyle(centralImage.style)}
                    variants={imageItemVariants}
                    custom={backgroundImages.length}
                    animate={["visible", "float"]}
                    whileHover="hover"
                >
                    <Image src={centralImage.src} alt={centralImage.alt} width={centralImage.width} height={centralImage.height} className="h-auto object-contain" priority />
                </motion.div>

                <motion.h1
                    className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-3 sm:mt-4 text-beer-timberwolf dark:text-beer-jonquil drop-shadow-2xl"
                    variants={textElementVariants}
                >
                    Discover Your Perfect Pint
                </motion.h1>

                <motion.p
                    className="text-base sm:text-lg max-w-md sm:max-w-xl lg:max-w-2xl mx-auto my-4 sm:my-6 text-beer-timberwolf/90 dark:text-beer-cafe-noir/95 drop-shadow-md"
                    variants={textElementVariants}
                >
                    Explore a curated collection of unique and flavorful beers. From hoppy IPAs to rich stouts, find your next favorite.
                </motion.p>
            </motion.div>

        </motion.section>
    );
};

export default HeroSection;