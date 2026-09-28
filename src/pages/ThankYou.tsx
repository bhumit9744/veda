import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="w-full font-sans bg-[#0f365eeb] h-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <img src="/assets/images/logo.png" alt="Veda Life Spaces" draggable="false" className="max-w-[200px]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-[#b89a6b]">Thank you !</h1>
        <p className="text-xl md:text-2xl mb-8">We have received your enquiry. Our team will get back to you soon.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-transparent border-2 border-white text-white px-8 py-3 uppercase tracking-wider hover:bg-white hover:text-[#0f365e] transition-colors"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}
