import React, { useEffect, useState } from 'react';
import { PasswordHash } from '../types';
import { hashPassword } from '../utils/cryptoUtils';
import { Lock, ShieldCheck, Database, Server } from 'lucide-react';

interface Props {
  password?: string;
}

const SecurityDetails: React.FC<Props> = ({ password }) => {
  const [hashData, setHashData] = useState<PasswordHash | null>(null);

  useEffect(() => {
    if (password) {
      hashPassword(password).then(setHashData);
    } else {
      setHashData(null);
    }
  }, [password]);

  return (
    <div className="mt-8 border-t border-slate-700 pt-8">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        Backend Simulation & Security Concepts
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Hashing Demo */}
        <div className="bg-slate-900 rounded-lg p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-slate-300">Secure Storage (SHA-256 + Salt)</h4>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            In a real backend, we never store the raw password. We combine it with a random "salt" and hash it. 
            This prevents Rainbow Table attacks.
          </p>
          
          <div className="space-y-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500">Random Salt (16 bytes)</span>
              <div className="font-mono text-xs text-yellow-500 bg-slate-950 p-2 rounded border border-slate-800 break-all">
                {hashData ? hashData.salt : "Waiting for input..."}
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500">SHA-256 Hash Output</span>
              <div className="font-mono text-xs text-emerald-500 bg-slate-950 p-2 rounded border border-slate-800 break-all">
                {hashData ? hashData.hash : "Waiting for input..."}
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Info */}
        <div className="bg-slate-900 rounded-lg p-5 border border-slate-700 flex flex-col justify-between">
           <div>
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-bold text-slate-300">Zero-Knowledge Architecture</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unlike traditional server-side validators, this tool runs <strong>entirely in your browser</strong>. 
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-500">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                Your password is never sent over the network.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                Entropy calculation happens locally in JavaScript.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                Hashing uses the browser's native Web Crypto API.
              </li>
            </ul>
           </div>
           <div className="mt-4 pt-4 border-t border-slate-800">
             <div className="flex items-center gap-2 text-slate-400">
               <Database className="w-4 h-4" />
               <span className="text-xs">Database Schema Simulation:</span>
             </div>
             <code className="block mt-2 text-xs text-indigo-300 font-mono">
               User(id: UUID, username: String, password_hash: String, salt: String)
             </code>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SecurityDetails;