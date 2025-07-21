'use client';
import { Sprout, Tractor, HandCoins } from 'lucide-react';

export default function Benefits() {
    return (
        <>
            <div className='flex flex-col items-center justify-center text-center px-10 md:px-20 py-10 md:py-24 gap-y-10 bg-primary' id='benefits'>
                <h1 className='font-bold text-2xl text-white bg-transparent'>Why Choose Sahnam?</h1>

                <div className='flex flex-col md:flex-row md:gap-x-5 gap-y-5 bg-transparent' data-aos="fade-up">
                    <div className='flex flex-col bg-background/25 backdrop-blur-[5px] rounded-3xl items-center justify-center shadow-md gap-y-2 px-5 py-7 md:w-1/3 hover:scale-105'>
                        <div className='bg-primary/30 p-3 rounded-full'>
                            <Sprout className='w-12 h-12 text-background bg-transparent' />
                        </div>
                        <h2 className='font-semibold text-lg bg-transparent text-background'>Plant Without the Hassle</h2>
                        <p className='bg-transparent text-background'>No need for land or tools—just invest through Sahnam and watch your impact grow.</p>
                    </div>

                    <div className='flex flex-col bg-background/25 backdrop-blur-[5px] rounded-3xl items-center justify-center shadow-md gap-y-2 px-5 py-7 md:w-1/3 hover:scale-105'>
                        <div className='bg-primary/30 p-3 rounded-full'>
                            <Tractor className='w-12 h-12 text-white bg-transparent' />
                        </div>
                        <h2 className='font-semibold text-lg bg-transparent text-background'>Support Local Farmers</h2>
                        <p className='bg-transparent text-background'>Your funds go directly to help farmers grow more and harvest better.</p>
                    </div>

                    <div className='flex flex-col bg-background/25 backdrop-blur-[5px] rounded-3xl items-center justify-center shadow-md gap-y-2 px-5 py-7 md:w-1/3 hover:scale-105'>
                        <div className='bg-primary/30 p-3 rounded-full'>
                            <HandCoins className='w-12 h-12 text-white bg-transparent' />
                        </div>
                        <h2 className='font-semibold text-lg bg-transparent text-background'>Shared Profits</h2>
                        <p className='bg-transparent text-background'>Enjoy fair profit-sharing from each harvest based on the agreed scheme.</p>
                    </div>
                </div>
            </div>
        </>
    )
}