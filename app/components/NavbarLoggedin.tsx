'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LogoPutih from '../../public/assets/LogoPutih.png';
import Image from 'next/image';
import { Menu, X, LayoutDashboard, BookOpen, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function NavbarLoggedin() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: 'Dashboard', href: '/Dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Catalog', href: '/Catalog', icon: <BookOpen size={18} /> },
        { name: 'My Plants', href: '/MyPlants', icon: <Leaf size={18} /> },
    ];

    return (
        <nav>
            {/* Desktop */}
            <div className="hidden md:flex flex-col gap-y-1 bg-primary text-background h-screen fixed ml-3 mt-2 mb-2 rounded-2xl px-4 py-4 items-center">
                <div className="flex flex-col justify-center items-center w-full">
                    <Image src={LogoPutih} alt="Logo" className="w-10 h-auto" />
                </div>
                <div className="flex flex-col gap-y-1 mt-3 w-full">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-x-2 px-3 py-2 rounded-md w-full ${
                                pathname === item.href ? 'bg-primaryLight text-primary font-semibold' : ''
                            }`}
                        >
                            {item.icon}
                            <h3 className="font-medium">{item.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Topbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-primary text-background p-4 flex items-center justify-between z-50">
                <Image src={LogoPutih} alt="Logo" className="w-8 h-auto" />
                <button onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sliding Menu */}
            <div className={`md:hidden fixed top-16 left-0 w-3/4 h-full bg-primary text-background z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col px-6 py-4 gap-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-x-2 px-3 py-2 rounded-md ${
                                pathname === item.href ? 'bg-green-200 text-primary font-semibold' : ''
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
