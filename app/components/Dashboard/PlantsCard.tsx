'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

type InvestWithPlant = {
  invest_id: string;
  user_id: string;
  plant_id: string;
  amount: number;
  total_price: number;
  plants: {
    name: string;
    photo: string;
    price: number;
    duration: number;
    profits: number;
    desc: string;
  };
};

export default function PlantsCard() {
  const [invests, setInvests] = useState<InvestWithPlant[]>([]);
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        window.location.href = '/Login';
        return;
      }

      const user = sessionData.session.user;
      setUserID(user.id);

      const { data, error } = await supabase
        .from('invests')
        .select(`
          *,
          plants (
            name,
            photo,
            price,
            duration,
            profits,
            desc
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching plants:', error.message);
      } else {
        setInvests(data as InvestWithPlant[]);
      }
    };

    fetchData();
  }, []);

  const handleStopInvesting = async (id: string) => {
    const { error } = await supabase
      .from('invests')
      .delete()
      .eq('invest_id', id);

    if (error) {
      console.error(error.message);
    } else {
      // Hapus data dari state biar UI langsung update
      setInvests((prev) => prev.filter((invest) => invest.invest_id !== id));
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 w-max py-6 px-1">
        {invests.map((invest) => (
          <div
            key={invest.invest_id}
            className="flex-shrink-0 w-64 flex flex-col px-5 pt-5 pb-2 bg-white shadow-md rounded-2xl gap-y-2 justify-between"
          >
            <div className="flex flex-col gap-y-2 flex-grow">
                <div className="flex items-center justify-center bg-primary rounded-xl">
                <Image
                    src={`/assets/${invest.plants.photo}`}
                    alt={invest.plants.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-contain"
                />
                </div>
                <h2 className="font-semibold text-xl">{invest.plants.name}</h2>
                <p className="text-sm text-justify">{invest.plants.desc}</p>
                <div className="flex justify-between">
                <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold">Duration</p>
                    <h4 className="text-xs text-red-400 font-semibold">
                    {invest.plants.duration} Days
                    </h4>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold">Profits</p>
                    <h4 className="text-xs text-yellow-400 font-semibold">
                    Rp{invest.plants.profits}
                    </h4>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold">Amount</p>
                    <h4 className="text-xs text-primary font-semibold">
                    {invest.amount}pcs
                    </h4>
                </div>
                </div>
            </div>

            <button onClick={() => handleStopInvesting(invest.invest_id)} className="bg-red-500 text-background py-1 rounded-md text-center font-semibold hover:bg-red-200 transition-colors">
                Stop Investing
            </button>
            </div>
        ))}
        </div>
    </div>
  );
}
