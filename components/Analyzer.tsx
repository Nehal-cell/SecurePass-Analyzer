import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, Shield, Activity, Clock, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { analyzePassword } from '../utils/analyzer';
import StrengthMeter from './StrengthMeter';
import InfoCard from './InfoCard';
import SecurityDetails from './SecurityDetails';

interface Props {
  onBack: () => void;
}

const Analyzer: React.FC<Props> = ({ onBack }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const result = useMemo(() => analyzePassword(password), [password]);
  
  // Only show results if user has typed something
  const hasInput = password.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium"
        >
          <div className="p-1.5 rounded-full bg-slate-800 mr-2 group-hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
              <Shield className="w-10 h-10 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Password Strength <span className="text-indigo-400">Analyzer</span>
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Advanced heuristic analysis with entropy calculation.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          
          {/* Input Section */}
          <div className="relative mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-2">
              Enter Password to Analyze
            </label>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20 group-focus-within:opacity-100 transition duration-1000 group-hover:opacity-100"></div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="relative block w-full px-4 py-4 bg-slate-950 border border-slate-700 rounded-lg text-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none"
                placeholder="Type a password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!touched) setTouched(true);
                }}
                autoComplete="off"
                autoFocus
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Analysis Dashboard */}
          <div className={`transition-all duration-500 ease-in-out ${hasInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden'}`}>
            
            <StrengthMeter score={result.score} category={result.category} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <InfoCard 
                title="Entropy (Bits)" 
                value={result.entropy} 
                description="Information density."
                icon={<Activity className="w-5 h-5" />}
              />
              <InfoCard 
                title="Est. Crack Time" 
                value={result.crackTime}
                description="Brute-force (10B/sec)"
                icon={<Clock className="w-5 h-5" />}
              />
              <InfoCard 
                title="Status" 
                value={result.isCommon ? "Compromised" : "Unique"}
                description={result.isCommon ? "In common DB" : "Not in common DB"}
                icon={<AlertTriangle className="w-5 h-5" />}
                alert={result.isCommon}
              />
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
               <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                 <h3 className="text-md font-semibold text-slate-300 mb-4 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                   Security Recommendations
                 </h3>
                 <ul className="space-y-3">
                   {result.recommendations.map((rec, index) => (
                     <li key={index} className="flex items-start gap-3 text-sm text-slate-400">
                       <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                       {rec}
                     </li>
                   ))}
                 </ul>
               </div>
            )}

            <SecurityDetails password={password} />

          </div>

          {/* Empty State / Prompt */}
          {!hasInput && touched && (
             <div className="text-center py-12 text-slate-500">
               <p>Start typing to see security analysis...</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Analyzer;