'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type PlantData = {
  name: string;
  photo: string;
  price: number;
  duration: number;
  profits: number;
  desc: string;
};

type InvestWithPlant = {
  invest_id: string;
  user_id: string;
  plant_id: string;
  amount: number;
  total_price: number;
  plants: PlantData;
};

type SupabaseInvestData = {
  invest_id: string;
  user_id: string;
  plant_id: string;
  amount: number;
  total_price: number;
  plants: PlantData[] | PlantData;
};

export default function AIInsights() {
  const [output, setOutput] = useState<string>('Loading AI insights...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setOutput('Checking authentication...');
        
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
          setOutput('Please login to view AI insights.');
          window.location.href = '/Login';
          return;
        }

        const user = sessionData.session.user;
        setOutput('Loading your investment data...');

        const { data, error } = await supabase
          .from('invests')
          .select(`
            invest_id,
            user_id,
            plant_id,
            amount,
            total_price,
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
          console.error('Error fetching investments:', error.message);
          setOutput(`Error loading data: ${error.message}`);
          return;
        }

        const investmentData: InvestWithPlant[] = (data as SupabaseInvestData[]).map((item) => ({
          ...item,
          plants: Array.isArray(item.plants) ? item.plants[0] : item.plants,
        }));
        
        await generateAIInsights(investmentData);
        
      } catch (error) {
        console.error('Error in fetchData:', error);
        setOutput(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAIOutput = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^[\s]*[-•]\s*(.*?)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gm, (match) => {
        if (match.includes('<ul>') || match.includes('<li>') || match.includes('</p><p>')) {
          return match;
        }
        return match.trim() ? `<p>${match}</p>` : '';
      })
      .replace(/<p><\/p>/g, '')
      .replace(/<\/p><p>/g, '</p><br><p>');
  };
  
  const generateAIInsights = async (investmentData: InvestWithPlant[]) => {
    try {
      if (!investmentData || investmentData.length === 0) {
        setOutput('No investment data available for analysis. Start your first investment to get AI insights!');
        return;
      }

      setOutput('Analyzing your investments with AI...');
      
      const formattedData = investmentData.map(investment => ({
        plant_name: investment.plants.name,
        amount_invested: investment.amount,
        total_price: investment.total_price,
        plant_price: investment.plants.price,
        duration_months: investment.plants.duration,
        expected_profit_percentage: investment.plants.profits,
        description: investment.plants.desc,
        expected_return: investment.total_price + (investment.total_price * investment.plants.profits / 100),
        roi_percentage: investment.plants.profits
      }));

      const prompt = `
        I have the following plant investment data:

        ${JSON.stringify(formattedData, null, 2)}

        Please analyze this data and provide insights in a well-formatted manner covering:
        - Most profitable plants 
        - Recommendations for next investments

        Respond in English with clear, user analysis in paragraph format. Make it informative and actionable.
      `;

      const aiResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error(`AI API error! status: ${aiResponse.status}`, errorText);
        
        if (aiResponse.status === 405) {
          throw new Error('AI API endpoint not configured properly. Please ensure /api/generate route exists with POST method.');
        } else if (aiResponse.status === 404) {
          throw new Error('AI API endpoint not found. Please create /api/generate/route.ts file.');
        } else {
          throw new Error(`AI API error: ${aiResponse.status} - ${errorText}`);
        }
      }
      
      const aiText = await aiResponse.text();
      if (!aiText) {
        throw new Error('Empty response from AI API');
      }
      
      let aiData: { output?: string };
      try {
        aiData = JSON.parse(aiText);
      } catch (parseError) {
        console.error('AI JSON parse error:', parseError);
        console.error('AI Response text:', aiText);
        throw new Error('Invalid JSON response from AI API');
      }
      
      setOutput(aiData.output || 'Sorry, AI did not provide a valid response.');
      
    } catch (error) {
      console.error('Error generating AI insights:', error);
      setOutput(`Error generating insights: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the console for more details.`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-full h-96 p-4 mt-8 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">AI Insights</h2>
        {isLoading && (
          <div className="flex items-center text-sm text-gray-500">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </div>
        )}
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div 
          className="text-gray-700 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ 
            __html: formatAIOutput(output) 
          }}
        />
      </div>
    </div>
  );
}