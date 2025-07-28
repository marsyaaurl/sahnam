import { NextRequest, NextResponse } from 'next/server';

// Mock data - ganti dengan data asli dari database
const mockInvestmentData = [
  {
    id: 1,
    plant: 'Cabai',
    amount: 1000000,
    status: 'growing',
    expectedReturn: 1500000,
    maturityDate: '2024-12-31'
  },
  {
    id: 2,
    plant: 'Tomat',
    amount: 750000,
    status: 'mature',
    expectedReturn: 1200000,
    maturityDate: '2024-08-15'
  }
];

// Handler untuk GET request - mengambil data investasi
export async function GET() {
  try {
    // Di sini Anda bisa mengambil data dari database
    // const data = await database.getInvestments();
    
    // Untuk sekarang menggunakan mock data
    const data = mockInvestmentData;
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching investment data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investment data' }, 
      { status: 500 }
    );
  }
}

// Handler untuk POST request - generate AI insights
export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }
    
    // Di sini Anda bisa integrasi dengan AI service seperti OpenAI
    // const aiResponse = await openai.chat.completions.create({...});
    
    // Untuk sekarang menggunakan mock response
    const mockAIResponse = {
      output: `🌱 **Analisis Investasi Tanaman Anda**

📊 **Tanaman Paling Menguntungkan:**
• Cabai: ROI 50% (Rp 1.5M dari Rp 1M)
• Tomat: ROI 60% (Rp 1.2M dari Rp 750K)

🔄 **Status Investasi:**
• 1 investasi sudah matang (Tomat)
• 1 investasi masih berkembang (Cabai)

💡 **Rekomendasi Selanjutnya:**
• Diversifikasi ke tanaman dengan siklus lebih pendek
• Pertimbangkan investasi pada sayuran hijau (kangkung, bayam)
• Alokasikan 30% untuk tanaman musiman

⚠️ **Tips Mengelola Risiko:**
• Pantau cuaca dan kondisi iklim
• Jangan investasi semua di satu jenis tanaman
• Siapkan dana cadangan 20% dari total investasi
• Konsultasi dengan ahli pertanian setempat

*Analisis berdasarkan data per ${new Date().toLocaleDateString('id-ID')}*`
    };
    
    return NextResponse.json(mockAIResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI insights' }, 
      { status: 500 }
    );
  }
}

// Optional: Handler untuk method lain
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}