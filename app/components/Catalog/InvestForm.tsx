'use client';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PlantData {
  plant_id: string;
  name: string;
  photo: string;
  price: number;
  duration: number;
  profits: number;
  desc: string;
}

interface InvestFormProps {
  plant_id: string;
}

export default function InvestForm({ plant_id }: InvestFormProps) {
  const [userID, setUserID] = useState<string | null>(null);
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!plant_id) return;

    const fetchUserAndPlant = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
          window.location.href = '/Login';
          return;
        }

        const user = sessionData.session.user;
        setUserID(user.id);

        const { data: plant, error: plantError } = await supabase
          .from('plants')
          .select('*')
          .eq('plant_id', plant_id)
          .single();

        if (plantError) {
          console.error('Error fetching plant:', plantError.message);
          setMessage('Error loading plant.');
        } else {
          setPlantData(plant);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setMessage('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPlant();
  }, [plant_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    if (!userID || !plantData) {
      setMessage('Missing user or plant data.');
      setSubmitting(false);
      return;
    }

    const totalPrice = plantData.price * amount;

    const { error } = await supabase.from('invests').insert([
      {
        user_id: userID,
        plant_id: plantData.plant_id,
        amount,
        total_price: totalPrice,
        payment_method: paymentMethod,
      },
    ]);

    if (error) {
      console.error(error.message);
      setMessage('❌ Failed to invest.');
    } else {
      setMessage('✅ Investment successful!');
    }

    setSubmitting(false);
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (!plantData) return <p className="text-center py-6">Plant data not found.</p>;

  return (
    <div className="flex w-full py-6 gap-x-10 items-center">
      <div className='flex flex-row w-1/2 gap-x-5'>
        <Image
          src={`/assets/${plantData.photo}`}
          alt={plantData.name}
          width={200}
          height={200}
          className='bg-primary rounded-xl'
        />
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-y-3'>
            <p className="font-semibold text-4xl">{plantData.name}</p>
            <p className="">{plantData.desc}</p>
          </div>
          <div className='flex flex-col gap-y-1'>
            <h4 className="text-2xl text-primary font-bold">Rp{plantData.price}</h4>
            <p className='font-semibold'>Duration: <span className='text-yellow-400'>{plantData.duration} Days</span></p>
            <p className='font-semibold'>Profits: <span className='text-red-400'>Rp{plantData.profits}</span></p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold">Amount of Plants</label>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border px-3 py-2 rounded w-96"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="E-Wallet">E-Wallet</option>
            <option value="Kartu Kredit">Kartu Kredit</option>
          </select>
        </div>

        <div className='flex flex-row justify-between'>
            <h3 className='font-semibold'>Total Price</h3>
            <h3 className='font-bold text-primary'>Rp{plantData.price * amount}</h3>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primaryLight disabled:opacity-50"
        >
          Invest
        </button>

        {message && <p className="text-sm mt-2 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}