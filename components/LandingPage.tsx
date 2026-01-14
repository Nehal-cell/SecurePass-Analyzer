import React from 'react';
import { Shield, Lock, Zap, ChevronRight, Activity, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-4 selection:bg-indigo-500/30">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-float delay-500"></div>
        </div>

        <div className="z-10 max-w-5xl mx-auto text-center pt-12 md:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-indigo-300 text-sm mb-8 backdrop-blur-md shadow-lg animate-fade-in-up hover:border-indigo-500/50 transition-colors cursor-default">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Client-Side Only • Zero-Knowledge Architecture
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up delay-100 drop-shadow-2xl">
                How Strong is Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Digital Armor?</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
                Analyze your password strength with military-grade entropy calculations. 
                Running entirely in your browser—your secrets <span className="text-slate-200 font-semibold">never leave this device</span>.
            </p>

            {/* CTA Button */}
            <button 
                onClick={onStart}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full text-lg font-bold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)] animate-fade-in-up delay-300 active:scale-95"
            >
                Start Analysis
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto z-10 w-full px-4 animate-fade-in-up delay-500 pb-12">
            <FeatureCard 
                icon={<Lock className="w-6 h-6 text-emerald-400" />}
                title="Zero Knowledge"
                desc="No data transfer. Hashing and analysis happen locally on your device via Web Crypto API."
            />
            <FeatureCard 
                icon={<Activity className="w-6 h-6 text-indigo-400" />}
                title="Entropy Analysis"
                desc="Scientific calculation of information density (bits) to accurately predict brute-force resistance."
            />
            <FeatureCard 
                icon={<Zap className="w-6 h-6 text-amber-400" />}
                title="Instant Feedback"
                desc="Real-time evaluation of character diversity, sequential patterns, and dictionary attacks."
            />
        </div>
        
        <div className="absolute bottom-6 text-slate-600 text-xs md:text-sm z-10 font-medium">
            Resume Project {new Date().getFullYear()} • SecurePass Labs
        </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:bg-slate-800/60 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1">
        <div className="mb-5 p-3 bg-slate-950 rounded-2xl w-fit border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;