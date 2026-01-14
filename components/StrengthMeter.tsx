import React from 'react';
import { StrengthCategory } from '../types';

interface Props {
  score: number;
  category: StrengthCategory;
}

const StrengthMeter: React.FC<Props> = ({ score, category }) => {
  const getColor = (score: number) => {
    if (score > 80) return 'bg-emerald-500';
    if (score > 60) return 'bg-green-500';
    if (score > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full mt-6 mb-4">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-medium text-slate-400">Security Score</span>
        <span className={`text-xl font-bold ${getColor(score).replace('bg-', 'text-')}`}>
          {category}
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden relative">
        <div 
          className={`h-full transition-all duration-500 ease-out ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
        {/* Tick marks for visual separation */}
        <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-slate-800 opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800 opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-slate-800 opacity-20"></div>
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs text-slate-500">{score}/100</span>
      </div>
    </div>
  );
};

export default StrengthMeter;