'use client';
import Link from "next/link";
import Image from "next/image";
import LogoHero from "../../../public/assets/LogoHero.png";

export default function Footer() {
  return (
    <footer className="bg-primary px-10 py-10 text-background mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 bg-transparent md:grid-cols-3 gap-8">
        {/* Logo & Slogan */}
        <div className='bg-transparent'>
          <Image
            src={LogoHero}
            alt="Sahnam Logo"
            width={150}
            height={50}
            className="mb-4 bg-transparent"
          />
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-1 text-sm bg-transparent">
          <h3 className="font-semibold mb-1 bg-transparent">Quick Links</h3>
          <Link href="/" className='bg-transparent hover:text-gray-300'>Home</Link>
          <Link href="/" className='bg-transparent hover:text-gray-300'>Benefits</Link>
          <Link href="/" className='bg-transparent hover:text-gray-300'>Steps</Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2 text-sm bg-transparent">
          <h3 className="font-semibold mb-1 bg-transparent">Follow Us</h3>
          <div className="flex gap-4 text-lg bg-transparent">
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className='bg-transparent text-sm hover:text-gray-300'>Instagram</Link>
            <Link href="https://wa.me/628123456789" target="_blank" aria-label="WhatsApp" className='bg-transparent text-sm hover:text-gray-300'>WhatsApp</Link>
            <Link href="mailto:info@seacatering.com" aria-label="Email" className='bg-transparent text-sm hover:text-gray-300'>Email</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-primaryLight bg-transparent">
        © 2025 Sahnam. All rights reserved.
      </div>
    </footer>
  );
}