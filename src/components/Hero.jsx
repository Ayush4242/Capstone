import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
      {/* Background Image: High-Definition Ocean ARGO Float & Marine Life */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.09] origin-bottom"
        style={{
          backgroundImage: `url('/hero-ocean-argo.jpg')`,
        }}
      >
        {/* Crisp left scrim so foreground text is 100% legible without cluttering the float and dolphins */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030b17] via-[#030b17]/95 via-40% to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b17]/60 via-transparent to-[#030b17]/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main Editorial Headline & CTA */}
        <div className="max-w-3xl text-left space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tight leading-[1.05] font-['Outfit',sans-serif] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            Explore Our Oceans. <br />
            <span className="text-sky-300">
              Understand Our Planet.
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Track real-time temperature, salinity, and oxygen measurements from thousands of ARGO floats drifting across the world's oceans.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              to="/explorer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <span>Open Ocean Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all"
            >
              How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
