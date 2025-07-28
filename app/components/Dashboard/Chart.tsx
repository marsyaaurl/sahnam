'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import supabase from '@/lib/supabaseClient';

export default function Chart() {
  const [chartData, setChartData] = useState<{ name: string; profits: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) return;

      const user = sessionData.session.user;

      const { data, error } = await supabase
        .from('invests')
        .select(`
          amount,
          plant_id,
          plants (
            name,
            profits
          )
        `)
        .eq('user_id', user.id);

      if (error || !data) {
        console.error('Failed to fetch investments:', error?.message);
        return;
      }

      const plantProfitMap: { [plantName: string]: number } = {};

      data.forEach((investment) => {
        const plant = Array.isArray(investment.plants) ? investment.plants[0] : investment.plants;
        if (plant) {
          const name = plant.name;
          const profit = plant.profits;
          const total = investment.amount * profit;

          if (name in plantProfitMap) {
            plantProfitMap[name] += total;
          } else {
            plantProfitMap[name] = total;
          }
        }
      });

      const chartFormatted = Object.entries(plantProfitMap).map(([name, profits]) => ({
        name,
        profits,
      }));

      setChartData(chartFormatted);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-96 p-4 mt-8 ">
      <h2 className="text-lg font-semibold mb-4">Profit per Plants</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `Rp${value.toLocaleString()}`} />
          <Bar dataKey="profits" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
