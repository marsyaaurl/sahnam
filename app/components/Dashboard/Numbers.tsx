'use client';
import supabase from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function Numbers() {
  const [totalPlants, setTotalPlants] = useState<number>(0);
  const [totalProfits, setTotalProfits] = useState<number>(0);
  const [potentialProfits, setPotentialProfits] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
          window.location.href = '/Login';
          return;
        }

        const user = sessionData.session.user;

        // Fetch investment data with plant details
        const { data, error } = await supabase
          .from('invests')
          .select(`
            amount,
            created_at,
            plant_id,
            plants (
              profits,
              duration
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          // Calculate total plants (total investment amount)
          const totalInvestment = data.reduce((acc, cur) => acc + cur.amount, 0);
          setTotalPlants(totalInvestment);

          // Calculate profits
          const currentDate = dayjs();
          let realizedProfits = 0;
          let expectedProfits = 0;

          data.forEach((investment) => {
            const plant = Array.isArray(investment.plants) ? investment.plants[0] : investment.plants;
            if (plant) {
              const investmentDate = dayjs(investment.created_at);
              const durationInDays = plant.duration;
              const maturityDate = investmentDate.add(durationInDays, 'day');
              
              // Profits sudah dalam rupiah, jadi langsung pakai
              const profit = plant.profits;
              
              // Add to expected profits (total potential profit)
              expectedProfits += profit;
              
              // Check if investment has matured for realized profits
              if (currentDate.isAfter(maturityDate) || currentDate.isSame(maturityDate, 'day')) {
                realizedProfits += profit;
              }
            }
          });

          setTotalProfits(realizedProfits);
          setPotentialProfits(expectedProfits);
        }
      } catch (error) {
        console.error('Error in Numbers component:', error);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  return (
    <div className="flex flex-row gap-x-10 w-full mt-8">
      <div className="rounded-xl shadow-md bg-white p-6 w-80">
        <h2 className="text-lg font-semibold">Total Plants</h2>
        <p className="text-3xl font-bold text-primary">{formatCurrency(totalPlants)}</p>
      </div>
      
      <div className="rounded-xl shadow-md bg-white p-6 w-80">
        <h2 className="text-lg font-semibold">Realized Profits</h2>
        <p className="text-3xl font-bold text-yellow-500">Rp{formatCurrency(totalProfits)}</p>
        <p className="text-sm text-gray-500">From matured investments</p>
      </div>
      
      <div className="rounded-xl shadow-md bg-white p-6 w-80">
        <h2 className="text-lg font-semibold">Expected Profits</h2>
        <p className="text-3xl font-bold text-green-500">Rp{formatCurrency(potentialProfits)}</p>
        <p className="text-sm text-gray-500">Total potential profit</p>
      </div>
    </div>
  );
}