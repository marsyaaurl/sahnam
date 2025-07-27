'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabaseClient';
import Link from "next/link";

type Plants = {
    plant_id: string;
    name: string;
    price: number;
    desc: string;
    photo: string;
    duration: number;
    profits: number;
}

export default function CatalogCard() {
    const [plants, setPlants] = useState<Plants[]>([]);
    useEffect(() => {
        const fetchPlants = async () => {
            const { data, error } = await supabase
                .from('plants')
                .select('plant_id, name, price, desc, photo, duration, profits');
                if(error) console.error(error);
                if(data) setPlants(data);
        }
    fetchPlants();
    }, [])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:px-4 py-6">
                {plants.map((plant) => (
                    <div key={plant.plant_id} className="flex flex-col px-5 pt-5 pb-2 bg-white shadow-md rounded-2xl gap-y-2 h-full justify-between">
                        {/* Wrapper konten atas */}
                        <div className="flex flex-col gap-y-2 flex-grow">
                            <div className="flex items-center justify-center bg-primary rounded-xl">
                            <Image
                                src={`/assets/${plant.photo}`}
                                alt={plant.name}
                                width={100}
                                height={100}
                                className="w-32"
                            />
                            </div>
                            <h2 className="font-semibold text-xl">{plant.name}</h2>
                            <p className="text-sm text-justify">{plant.desc}</p>
                            <h4 className="text-lg text-primary text-justify font-bold">Rp{plant.price}</h4>
                            <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <p className="text-xs font-semibold">Duration</p>
                                <h4 className="text-xs text-red-400 font-semibold">{plant.duration} Days</h4>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-xs font-semibold">Profits</p>
                                <h4 className="text-xs text-yellow-400 font-semibold">Rp{plant.profits}</h4>
                            </div>
                            </div>
                        </div>

                        {/* Tombol Invest di bawah */}
                        <Link href={`/Catalog/${plant.plant_id}`} className="bg-primary text-background py-1 rounded-md text-center font-semibold hover:bg-primaryLight transition-colors">
                            Invest
                        </Link>
                    </div>

                ))}
            </div>
        </>
    )
}