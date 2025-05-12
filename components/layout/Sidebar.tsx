"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Beer, X, Menu, Shuffle, Star } from 'lucide-react';

const Sidebar = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Full Collection', icon: <Beer size={22} /> },
        { href: '/random', label: 'Random', icon: <Shuffle size={22} /> },
        { href: '/favorites', label: 'Favorites', icon: <Star size={22} /> },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobileSidebarOpen) {
            document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
        } else {
            document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
        }
        return () => {
            document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
        };
    }, [isMobileSidebarOpen]);

    // Inverted Color Variables (Dark Theme)
    const mainTextColor = "text-neutral-100"; // Was text-beer-cafe-noir (dark)
    const mutedTextColor = "text-neutral-400"; // Was text-beer-cafe-noir/70 (darker)
    const iconColor = "text-neutral-300";
    const hoverBgColor = "hover:bg-neutral-700"; // Was hover:bg-beer-jonquil/20 (light accent bg)
                                                 // Alternative: hover:bg-white/10 or hover:bg-beer-jonquil/5
    const hoverTextColor = "hover:text-beer-jonquil"; // Jonquil (accent) should pop on dark hover bg

    const lightBorderColor = "border-neutral-600"; // For borders on dark background
    const slightlyLighterBorderColor = "border-neutral-700"; // For less prominent borders

    return (
        <>
            {!isMobileSidebarOpen && (
                <button
                    aria-label="Open sidebar"
                    className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-md
                                 bg-[#533527]
                                ${mainTextColor} focus:outline-none focus:ring-2 focus:ring-beer-jonquil`}
                    onClick={() => setIsMobileSidebarOpen(true)}
                >
                    <Menu size={28} />
                </button>
            )}

            {isMobileSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30 bg-black/50"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                    fixed lg:sticky inset-y-0 left-0
                    z-40 h-screen
                    w-full sm:w-72 md:w-80 lg:w-64
                      bg-[#533527] shadow-xl 
                    border-r ${lightBorderColor} {/* Was border-beer-beaver/50 */}
                    flex flex-col p-5 sm:p-6
                    transition-transform duration-300 ease-in-out
                `}
            >
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                    {/* Assuming text-beer-jonquil is a bright accent color that works on dark backgrounds */}
                    <div className={`text-2xl sm:text-3xl font-bold text-neutral-100 flex items-center`}>
                        <span>BeerShelf</span>
                    </div>
                    <button
                        aria-label="Close sidebar"
                        className={`lg:hidden p-1 ${iconColor} ${hoverTextColor}`} // Uses updated iconColor & hoverTextColor
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        <X size={28} />
                    </button>
                </div>

                <nav className="flex-grow overflow-y-auto">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.label} className="mb-3 sm:mb-4">
                                <Link
                                    href={item.href}
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className={`flex items-center p-3 sm:p-3.5 rounded-lg transition-colors duration-200
                                               text-lg sm:text-xl ${mainTextColor} ${hoverBgColor} ${hoverTextColor}
                                               focus:outline-none focus:ring-1 ring-beer-jonquil`}
                                >
                                    {item.icon && <span className={`mr-3 sm:mr-4 opacity-90 shrink-0 ${iconColor}`}>{item.icon}</span>}
                                    <span className="truncate font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={`mt-auto pt-4 border-t ${slightlyLighterBorderColor}`}> {/* Was border-beer-beaver/30 */}
                    <p className={`text-sm text-neutral-100 mt-5 text-center`}>
                        © {new Date().getFullYear()} Beer Enthusiast
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;