import React from 'react';
import { Loader2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InitializationView: React.FC<{ onDeploy: () => void; isDeploying: boolean; address: string }> = ({ onDeploy, isDeploying, address }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
      
      {/* Decorative Eyebrow */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-medium text-white/50 mb-8"
      >
        World Builder Engine
      </motion.div>

      {/* Main Typography */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
      >
        Initialize the <br className="hidden sm:block" />
        Lore Protocol.
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="text-white/40 text-base max-w-[40ch] mx-auto leading-relaxed mb-16"
      >
        Deploy the intelligent consensus engine on GenLayer to begin evaluating community lore entries.
      </motion.p>
      
      {/* Button-in-Button Architecture */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <button
          onClick={onDeploy}
          disabled={isDeploying || !address}
          className="group relative flex items-center justify-between gap-6 pl-8 pr-2 py-2 bg-white text-black rounded-full font-medium text-base hover:bg-gray-200 transition-colors spring-transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="tracking-wide">
            {isDeploying ? 'Deploying Protocol...' : 'Initialize Contract'}
          </span>
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-black/20 group-active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            {isDeploying ? (
              <Loader2 className="w-5 h-5 text-black animate-spin" strokeWidth={2} />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" strokeWidth={2} />
            )}
          </div>
        </button>
      </motion.div>

      {!address && (
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-white/30 uppercase tracking-widest font-mono"
        >
          Please connect wallet first
        </motion.p>
      )}
    </div>
  );
};
