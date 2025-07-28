'use client';
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/Logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavbarLandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    return (
        <>
            <nav className="flex flex-row items-center justify-between px-8 py-3 mb-5 w-full fixed bg-background z-50 rounded-b-3xl">
                <div>
                    <Link href="">
                        <Image src={Logo} alt="Logo Sahnam" className="w-[40px]" />
                    </Link>
                </div>

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✖' : '☰'}
                </button>

                {/* Navbar Desktop */}
                <div className="hidden md:flex flex-row gap-x-10">
                    <Link href="#home">
                        <h3 className={`text-sm font-semibold hover:text-primary hover:border-b-2 hover:border-b-primary ${pathName === '#home' ? 'text-primary border-b-2 border-b-primary' : 'text-text'}`}>Home</h3>
                    </Link>
                    <Link href="#benefits">
                        <h3 className={`text-sm font-semibold hover:text-primary hover:border-b-2 hover:border-b-primary ${pathName === '#benefist' ? 'text-primary border-b-2 border-b-primary' : 'text-text'}`}>Benefits</h3>
                    </Link>
                    <Link href="#steps">
                        <h3 className={`text-sm font-semibold hover:text-primary hover:border-b-2 hover:border-b-primary ${pathName === '#steps' ? 'text-primary border-b-2 border-b-primary' : 'text-text'}`}>Steps</h3>
                    </Link>
                </div>

                <div className="hidden md:block">
                    <Link href="/Login">
                        <h3 className="font-semibold text-primary border-primary border-2 rounded-full px-2 py-1 text-sm hover:border-none hover:bg-primary hover:text-background hover:py-[6px] hover:px-[10px]">Login</h3>
                    </Link>
                </div>

                {/* Navbar Mobile */}
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full flex flex-col gap-y-3 bg-white px-6 py-4 md:hidden z-10">
                        <Link href="#home">
                            <h3 className="font-semibold text-md text-text">Home</h3>
                        </Link>
                        <Link href="#benefits">
                            <h3 className="font-semibold text-md text-text">Benefits</h3>
                        </Link>
                        <Link href="#steps">
                            <h3 className="font-semibold text-md text-text">Steps</h3>
                        </Link>
                        <Link href="/Login">
                            <h3 className="font-semibold text-md text-text">Login</h3>
                        </Link>
                    </div>
                )}
            </nav>
        </>
    )
}