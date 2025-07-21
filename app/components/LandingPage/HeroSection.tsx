'use client';
import LandingPagePhoto from "../../../public/assets/LandingPagePhoto.jpg";
import LogoHero from "../../../public/assets/LogoHero.png";
import LandingPagePhotoCropped from "../../../public/assets/LandingPagePhotoCropped.jpg";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <>
            <div className="flex flex-row gap-x-10 items-center justify-center md:px-10 md:py-20" id="home">
                {/* Mobile layout */}
                <div className="relative w-full h-screen md:hidden">
                    <Image 
                        src={LandingPagePhotoCropped} 
                        className="w-full object-cover h-auto rounded-[40px]" 
                        alt="Farmer"
                    />
                    <div className="bg-primary w-full h-[828px] absolute top-0 opacity-50 rounded-[40px]"></div>
                    
                    {/* Logo positioned above text container */}
                    <div className="absolute bottom-0 left-0 right-0 mx-5 mb-36">
                        <Image 
                            src={LogoHero}
                            className="w-72 h-auto mb-10 mx-auto"
                            alt="Sahnam Logo"
                        />
                        
                        {/* Text container */}
                        <div className="flex flex-col gap-y-4 px-6 py-8 bg-background/25 backdrop-blur-[3px] rounded-[40px]">
                            <h1 className="text-4xl font-medium">
                                <span className="text-primary">Grow</span> Your Impact. Invest in <span className="text-primary">Nature.</span>
                            </h1>
                            <h3 className="text-md">
                                Start greening the planet from your home. With Sahnam, even small spaces can spark big change.
                            </h3>
                            <Link href="">
                                <div className="flex flex-row gap-x-4">
                                    <div className="flex flex-row bg-primary w-fit items-center justify-center px-3 py-1 gap-x-3 rounded-xl hover:bg-primaryLight hover:scale-105 transition-all duration-300">
                                        <button className="flex flex-row w-fit text-background font-medium justify-center text-lg">
                                            Start to Invest
                                        </button>
                                    </div>
                                    <div className="flex flex-row border-primary bg-transparent hover:bg-primary border-2 w-fit items-center justify-center px-3 py-1 gap-x-3 rounded-xl hover:scale-105 transition-all duration-300">
                                        <button className="flex flex-row w-fit text-primary hover:text-background font-medium justify-center text-lg">
                                            Be our Farmer
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:flex md:flex-row md:gap-x-10 md:items-center md:w-full">
                    <Image 
                        src={LandingPagePhoto} 
                        className="w-1/2 object-cover h-auto rounded-[40px]" 
                        alt="Farmer"
                    />
                    <div className="flex flex-col gap-y-4 w-1/2 justify-center py-10">
                        <h1 className="text-6xl font-medium">
                            <span className="text-primary">Grow</span> Your Impact. Invest in <span className="text-primary">Nature.</span>
                        </h1>
                        <h3 className="text-lg">
                            Start greening the planet from your home. With Sahnam, even small spaces can spark big change.
                        </h3>
                        <Link href="">
                            <div className="flex flex-row gap-x-5">
                                <div className="flex flex-row bg-primary w-fit items-center justify-center px-3 py-1 gap-x-3 rounded-xl hover:bg-primaryLight hover:scale-105 transition-all duration-300">
                                    <button className="flex flex-row w-fit text-background font-medium justify-center text-lg">
                                        Start to Invest
                                    </button>
                                </div>
                                <div className="flex flex-row border-primary bg-transparent hover:bg-primary border-2 w-fit items-center justify-center px-3 py-1 gap-x-3 rounded-xl hover:scale-105 transition-all duration-300">
                                    <button className="flex flex-row w-fit text-primary hover:text-background font-medium justify-center text-lg">
                                        Be our Farmer
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}