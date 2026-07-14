import React, { useEffect, useState } from 'react';
import { Settings, Wallet, ArrowUpRight, Loader2, CheckCircle2, XCircle, Activity, Hexagon, RefreshCw } from 'lucide-react';
import { useGenLayer } from './hooks/useGenLayer';
import { InitializationView } from './components/InitializationView';
import { LoreDashboard } from './components/LoreDashboard';
import { GenLayerNetwork } from './utils/networkConfig';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const genLayer = useGenLayer();
  const {
    address,
    isConnected,
    connect,
    disconnect,
    contractAddress,
    setContractAddress,
    deployContract,
    isDeploying,
    networkName,
    recentTransactions,
    error,
    setError
  } = genLayer;

  const [showConfigGuide, setShowConfigGuide] = useState(false);

  useEffect(() => {
    if (contractAddress && contractAddress !== "") {
      genLayer.fetchProposals();
    }
  }, [contractAddress, genLayer.fetchProposals]);

  const getExplorerUrl = (txHash: string) => {
    return `http://localhost:4000/transactions/${txHash}`;
  };

  return (
    <div className="h-screen w-screen text-white font-sans flex flex-col p-2 sm:p-3 overflow-hidden selection:bg-white/20 selection:text-white">
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 relative z-10 min-h-0">
        
        {/* Fluid Island Navigation */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col sm:flex-row justify-between items-center bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full p-1.5 sm:pl-4 sm:pr-1.5 mb-2 mx-auto w-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative z-50 shrink-0"
        >
          <div className="flex items-center gap-4 py-2 sm:py-0">
            <Hexagon className="w-5 h-5 text-white opacity-80" strokeWidth={1.5} />
            <h1 className="text-lg font-medium tracking-tight uppercase">
              Lore Protocol
            </h1>
          </div>
          
          <div className="flex gap-4 items-center">
            
            <button
              onClick={isConnected ? disconnect : connect}
              className="group relative flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-colors spring-transition"
            >
              <span className="tracking-wide">
                {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-black/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" strokeWidth={2} />
              </div>
            </button>
            {isConnected && (
              <button
                disabled={isDeploying}
                onClick={async () => {
                  localStorage.removeItem('LORE_CONTRACT_ADDRESS_V2');
                  setContractAddress('');
                  await deployContract();
                }}
                className="group relative flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-white/10 border border-white/20 text-white rounded-full font-medium text-sm hover:bg-white/20 transition-colors spring-transition disabled:opacity-50"
                title="Deploy Contract"
              >
                <span className="tracking-wide">
                  {isDeploying ? 'DEPLOYING...' : 'DEPLOY CONTRACT'}
                </span>
                {!isDeploying && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" strokeWidth={2} />
                  </div>
                )}
              </button>
            )}
          </div>
        </motion.header>

        {/* Setup Guide - Refined Modal */}
        <AnimatePresence>
          {showConfigGuide && (
            <motion.div 
              initial={{ height: 0, opacity: 0, filter: 'blur(10px)' }}
              animate={{ height: "auto", opacity: 1, filter: 'blur(0px)' }}
              exit={{ height: 0, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden mb-16"
            >
              <div className="doppel-shell p-2 max-w-3xl mx-auto">
                <div className="doppel-core p-8 bg-black/40 backdrop-blur-md">
                  <div className="flex justify-between items-start mb-8">
                    <h4 className="text-2xl font-medium tracking-tight">Wallet Config Required</h4>
                    <button onClick={() => setShowConfigGuide(false)} className="text-white/40 hover:text-white transition-colors">
                      <XCircle className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-4">
                      <div className="text-[10px] text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">RPC Details</div>
                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between"><span className="text-white/40">Network Name:</span> <span>Genlayer Studio</span></div>
                        <div className="flex justify-between"><span className="text-white/40">RPC URL:</span> <span>https://studio.genlayer.com/api</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Chain ID:</span> <span>61999</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Currency:</span> <span>GEN</span></div>
                      </div>
                    </div>
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Gas Tokens</div>
                        <p className="text-white/70 mt-3 leading-relaxed">Testnet GEN tokens are required to pay for transaction fees on the network.</p>
                      </div>
                      <a href="https://faucet.genlayer.com" target="_blank" rel="noreferrer" className="group flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                        <span className="font-medium">Access Faucet</span>
                        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-0 relative z-10 w-full py-0 overflow-y-auto hide-scrollbar">
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-xl border border-red-500/30 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-sm font-medium text-white">{error}</p>
                <button onClick={() => setError(null)} className="ml-4 text-white/40 hover:text-white transition-colors">
                  <XCircle className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!contractAddress || contractAddress === "" ? (
              <motion.div 
                key="init"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="flex-1 flex flex-col items-center justify-center w-full"
              >
                <InitializationView 
                  onDeploy={deployContract} 
                  isDeploying={isDeploying} 
                  address={address} 
                />
              </motion.div>
            ) : (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], staggerChildren: 0.1 }}
                className="w-full h-full flex flex-col min-h-0"
              >
                <LoreDashboard genLayer={genLayer} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Activity Log (Floating Minimalist) */}
          {recentTransactions.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="fixed bottom-12 right-6 w-80 z-50 pointer-events-none"
            >
              <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-auto">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <h3 className="text-[9px] font-medium text-white/50 uppercase tracking-widest">
                    Network Activity
                  </h3>
                  <span className="text-[9px] font-mono text-white/30">{networkName}</span>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto hide-scrollbar">
                  <AnimatePresence>
                    {recentTransactions.slice(0, 3).map((tx) => (
                      <motion.div 
                        key={tx.hash} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group flex justify-between items-center p-2 hover:bg-white/[0.05] rounded-lg transition-colors gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            {tx.status === 'pending' && <Loader2 className="w-3 h-3 text-white/50 animate-spin" />}
                            {tx.status === 'success' && <CheckCircle2 className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />}
                            {tx.status === 'failed' && <XCircle className="w-3 h-3 text-red-400" strokeWidth={1.5} />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-medium capitalize text-white/90 truncate">
                              {tx.type.replace('_', ' ').toLowerCase()}
                            </div>
                            <div className="text-[9px] text-white/40 mt-0.5">
                              {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>

                        <a 
                          href={getExplorerUrl(tx.hash)}
                          target="_blank" 
                          rel="noreferrer"
                          className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all spring-transition shrink-0"
                        >
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}
        </main>
        
        {/* Minimal Footer */}
        <footer className="w-full flex justify-between items-center py-2 mt-2 text-[9px] text-white/30 uppercase tracking-widest border-t border-white/5 shrink-0">
          <button onClick={() => setShowConfigGuide(!showConfigGuide)} className="hover:text-white transition-colors">
            {showConfigGuide ? "Close Config" : "Network Config"}
          </button>
          <span>Powered by GenLayer</span>
        </footer>
      </div>
    </div>
  );
}
