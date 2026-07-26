'use client'

import { useState } from 'react';
import Link from "next/link";

export default function Header() {
    const [isEnterDataSubNavOpen, setIsEnterDataSubNavOpen] = useState<boolean>(false);

    let timer: any = null;

    function handleClick(event: any) {
        setIsEnterDataSubNavOpen(!isEnterDataSubNavOpen)
        event.preventDefault();
    }

    function handleMouseOver() {
        setIsEnterDataSubNavOpen(true);
        if (timer) {
            clearTimeout(timer);
        }
    }

    function handleMouseOut(): void {
        timer = setTimeout(() => {
            setIsEnterDataSubNavOpen(false);
        }, 1000);
    }

    return (
        <header>
            <nav id="main-menu-navigation" aria-label="Main">
            <ul className="flex flex-row gap-8 items-center px-8 py-3 bg-[#092E6E]" >
                    <li>
                        <Link 
                            href="/"
                            className="text-xl text-[#F4E2A3] hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]">
                            Web Application for Reporting Data
                        </Link>
                    </li>
                    <li 
                        className={isEnterDataSubNavOpen ? 'open' : ''}
                        onClick={handleClick}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        >
                        <Link
                            href=""
                            className="text-xl text-[#F4E2A3] cursor-pointer hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]"
                            aria-expanded={isEnterDataSubNavOpen}
                            >
                            Enter Data
                        </Link>
                        <ul className={`${isEnterDataSubNavOpen ? 'block' : 'hidden'} absolute bg-[#092E6E] text-xl text-[#F4E2A3] px-2 pb-2 mt-3 ml-[-10px]`}>
                            <li>
                                <Link
                                    href="/enter-data/services"
                                    className="w-[100%] block hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]"
                                    >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/enter-data/services"
                                    className="w-[100%] block hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]"
                                    >
                                    Volunteer Cleanup
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/enter-data/services"
                                    className="w-[100%] block hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]"
                                    >
                                    Other
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li><Link className="text-xl text-[#F4E2A3] hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]" href="/enter-data/services">
                        Visualize Metrics
                    </Link></li>
                    <li><Link className="text-xl text-[#F4E2A3] hover:bg-[#E5B922] hover:text-[#092E6E] p-2 hover:underline decoration-[#092E6E] focus:bg-[#E5B922] focus:text-[#092E6E]" href="/">
                        Search Events & Cleanups
                    </Link></li>
                </ul>
            </nav>
        </header>
    );
}

/* <li>
    <Link href="/">
        <img
            src="/logo.png"
            alt="Keep Pensacola Beautiful logomark"
            width={80}
            height={80}
        />
    </Link>
</li> */