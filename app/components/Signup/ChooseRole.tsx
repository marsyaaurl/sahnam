'use client';
import { useRouter } from "next/navigation";
import { HandCoins, Tractor } from "lucide-react";

export default function ChooseRole() {
    const router = useRouter();

    const handleChoose = (role: string) => {
        router.push(`/Signup?role=${role}`);
    };

    return (
        <>
            <div className="flex flex-col items-centers justify-center py-44 gap-y-10">
                <h1 className="text-center font-bold text-2xl">Choose Your Role</h1>
                <div className="flex flex-row items-center justify-center gap-x-10">
                    <button 
                        className="flex flex-col gap-y-3 items-center justify-center rounded-2xl px-16 py-10 border-2 border-primary bg-transparent hover:bg-primary hover:text-background hover:scale-105" 
                        onClick={() => handleChoose('Investor')}
                        >
                        <div className='bg-primary/30 p-3 rounded-full'>
                            <HandCoins className='w-12 h-12 text-background bg-transparent' />
                        </div>
                        <h3 className="font-semibold text-lg">Investor</h3>
                    </button>
                    <button 
                        className="flex flex-col gap-y-3 items-center justify-center rounded-2xl px-16 py-10 border-2 border-primary bg-transparent hover:bg-primary hover:text-background hover:scale-105"
                        onClick={() => handleChoose('Farmer')}
                        >
                        <div className='bg-primary/30 p-3 rounded-full'>
                            <Tractor className='w-12 h-12 text-background bg-transparent' />
                        </div>
                        <h3 className="font-semibold text-lg">Farmer</h3>
                    </button>
                </div>
            </div>
        </>
    )
}