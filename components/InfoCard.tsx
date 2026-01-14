import React from 'react';

interface Props {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  alert?: boolean;
}

const InfoCard: React.FC<Props> = ({ title, value, description, icon, alert }) => {
  return (
    <div className={`p-4 rounded-xl border ${alert ? 'bg-red-900/10 border-red-500/30' : 'bg-slate-800 border-slate-700'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className={`text-2xl font-bold ${alert ? 'text-red-400' : 'text-slate-100'}`}>{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${alert ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-cyan-400'}`}>
          {icon}
        </div>
      </div>
      {description && (
        <p className="mt-2 text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};

export default InfoCard;