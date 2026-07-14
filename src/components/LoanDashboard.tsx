import React, { useState } from 'react';
import { useGenLayer } from '../hooks/useGenLayer';
import { Send, Zap, Loader2, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoreDashboard: React.FC<{ genLayer: ReturnType<typeof useGenLayer> }> = ({ genLayer }) => {
  const [proposalId, setProposalId] = useState('');
  const [creator, setBorrower] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');
  const [textProposal, setTextProposal] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('0');
  
  const [viewMode, setViewMode] = useState<'submit' | 'evaluate'>('submit');
  const [selectedProposalId, setSelectedProposalId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pendingProposals = genLayer.proposals.filter(p => p.state === 'PENDING_EVALUATION');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalId || !creator || !requestedAmount || !textProposal) return;
    await genLayer.submitProposal(proposalId, creator, parseInt(requestedAmount, 10), textProposal);
    setProposalId(''); setBorrower(''); setRequestedAmount(''); setTextProposal(''); setCollateralAmount('0');
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProposalId) return;
    await genLayer.evaluateProposal(selectedProposalId);
    setSelectedProposalId('');
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 font-sans text-white min-h-0">
      
      {/* Global Ledger Banner - Editorial Split */}
      <AnimatePresence>
        {genLayer.worldLore && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="doppel-shell p-1 shrink-0"
          >
            <div className="doppel-core p-4 bg-white/[0.01] backdrop-blur-3xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="w-full md:w-1/3">
                <div className="text-[8px] uppercase tracking-[0.2em] font-medium text-white/50 mb-1">State Engine</div>
                <h2 className="text-xl font-medium tracking-tighter leading-tight">Global Ledger Narrative</h2>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {genLayer.worldLore}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 min-h-0 flex-1">
        
        {/* Action Panel (Forms) */}
        <motion.div 
          layout
          className="xl:col-span-4 doppel-shell p-1 h-full overflow-y-auto flex flex-col hide-scrollbar"
        >
          <div className="doppel-core p-4 bg-white/[0.02] flex-1 flex flex-col min-h-0">
            {/* Minimalist Tabs */}
            <div className="flex gap-1 mb-2 p-1 bg-black/40 rounded-full border border-white/5 w-fit shrink-0">
              <button 
                onClick={() => setViewMode('submit')}
                className={`px-4 py-1 rounded-full text-[9px] font-medium uppercase tracking-widest transition-colors spring-transition ${viewMode === 'submit' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Request
              </button>
              <button 
                onClick={() => setViewMode('evaluate')}
                className={`px-4 py-1 rounded-full text-[9px] font-medium uppercase tracking-widest transition-colors spring-transition ${viewMode === 'evaluate' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Evaluate
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {viewMode === 'submit' ? (
                <motion.form 
                  key="submit"
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  onSubmit={handleSubmit} 
                  className="flex-1 flex flex-col gap-2 justify-center min-h-0 mt-1"
                >
                  <div className="shrink-0">
                    <label className="block text-[8px] text-white/40 font-medium uppercase tracking-widest mb-0.5">Identifier</label>
                    <input type="text" value={proposalId} onChange={e => setProposalId(e.target.value)} className="w-full bg-transparent border-b border-white/10 px-0 py-1 text-xs text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20" placeholder="REQ-001" required />
                  </div>
                  <div className="shrink-0">
                    <label className="block text-[8px] text-white/40 font-medium uppercase tracking-widest mb-0.5">Borrower Identity</label>
                    <input type="text" value={creator} onChange={e => setBorrower(e.target.value)} className="w-full bg-transparent border-b border-white/10 px-0 py-1 text-xs text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20" placeholder="Alice" required />
                  </div>
                  <div className="shrink-0">
                    <label className="block text-[8px] text-white/40 font-medium uppercase tracking-widest mb-0.5">Reputation Points</label>
                    <input type="number" value={requestedAmount} onChange={e => setRequestedAmount(e.target.value)} className="w-full bg-transparent border-b border-white/10 px-0 py-1 text-xs text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20 font-mono" placeholder="1000" required />
                  </div>
                  <div className="flex-1 flex flex-col min-h-0 shrink-0">
                    <label className="block text-[8px] text-white/40 font-medium uppercase tracking-widest mb-0.5">Rationale</label>
                    <textarea value={textProposal} onChange={e => setTextProposal(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 h-12 resize-none mt-1 shrink-0" placeholder="Detailed rationale..." required />
                  </div>
                  
                  <button type="submit" className="group relative w-full flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5 bg-white text-black rounded-full font-medium text-[10px] hover:bg-gray-200 transition-colors spring-transition mt-2 shrink-0">
                    <span className="tracking-wide uppercase tracking-wider">Submit</span>
                    <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Send className="w-3 h-3 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" strokeWidth={2} />
                    </div>
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="evaluate"
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  onSubmit={handleEvaluate} 
                  className="flex-1 flex flex-col gap-2 justify-center min-h-0"
                >
                  <div className="relative shrink-0 mt-2">
                    <label className="block text-[8px] text-white/40 font-medium uppercase tracking-widest mb-1">Pending Proposal</label>
                    
                    {/* Custom Dropdown UI */}
                    <div className="relative mt-1">
                      <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer flex justify-between items-center"
                      >
                        <span className={selectedProposalId ? "text-white" : "text-white/20"}>
                          {selectedProposalId || "Select proposal to evaluate..."}
                        </span>
                        <ChevronDown className={`w-3 h-3 text-white/40 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden max-h-32 overflow-y-auto"
                          >
                            {pendingProposals.length === 0 ? (
                               <li className="px-3 py-2 text-white/30 text-[10px] font-medium italic">No pending proposals</li>
                            ) : pendingProposals.map(p => (
                              <li 
                                key={p.proposal_id}
                                onClick={() => { setSelectedProposalId(p.proposal_id); setIsDropdownOpen(false); }}
                                className="px-3 py-2 hover:bg-white/10 cursor-pointer transition-colors text-white text-xs border-b border-white/5 last:border-0"
                              >
                                {p.proposal_id}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <button type="submit" disabled={genLayer.isEvaluating || !selectedProposalId} className="group relative w-full flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5 bg-white text-black rounded-full font-medium text-[10px] hover:bg-gray-200 transition-colors spring-transition mt-4 disabled:opacity-50 shrink-0">
                    <span className="tracking-wide uppercase tracking-wider">{genLayer.isEvaluating ? 'Evaluating...' : 'Run Consensus'}</span>
                    <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      {genLayer.isEvaluating ? (
                        <Loader2 className="w-3 h-3 text-black animate-spin" strokeWidth={2} />
                      ) : (
                        <Zap className="w-3 h-3 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" strokeWidth={2} />
                      )}
                    </div>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Ledger View (Cards) */}
        <div className="xl:col-span-8 flex flex-col h-full min-h-0">
          <div className="flex justify-between items-end mb-4 shrink-0">
            <h3 className="text-lg font-medium tracking-tight">Active Ledger</h3>
            <button onClick={genLayer.fetchProposals} disabled={genLayer.isFetching} className="text-[8px] text-white/40 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5 group">
              <span className="group-hover:tracking-[0.25em] transition-all">Refresh</span>
              <Loader2 className={`w-2.5 h-2.5 ${genLayer.isFetching ? 'animate-spin text-white' : ''}`} strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {genLayer.proposals.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/30 border border-dashed border-white/10 rounded-2xl">
                <p className="font-medium text-[10px] uppercase tracking-widest">Empty Ledger</p>
              </div>
            ) : (
              <AnimatePresence>
                {genLayer.proposals.map((prop, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: index * 0.08, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    key={prop.proposal_id} 
                    className="doppel-shell p-1 group"
                  >
                    <div className="doppel-core bg-black/60 p-4 flex flex-col md:flex-row gap-4">
                      
                      {/* Left: Metadata */}
                      <div className="w-full md:w-1/3 flex flex-col justify-between border-r border-white/5 pr-4">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-base font-medium tracking-tight">{prop.proposal_id}</h4>
                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                              <ArrowUpRight className="w-2.5 h-2.5 text-white/30 group-hover:text-white transition-colors" strokeWidth={2} />
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em] block mb-0.5">Borrower</span>
                            <span className="text-[10px] font-mono text-white/80">{prop.creator}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-base font-mono text-white/90">${prop.reputation_points}</span>
                          
                          <div className={`px-2 py-0.5 rounded-full text-[7px] font-medium uppercase tracking-widest border
                            ${prop.state === 'PENDING_EVALUATION' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 
                              prop.state === 'APPROVED' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                              'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                            {prop.state.replace('_', ' ')}
                          </div>
                        </div>
                      </div>

                      {/* Right: Content & Consensus */}
                      <div className="w-full md:w-2/3 flex flex-col gap-3">
                        <div>
                          <span className="text-[8px] text-white/40 uppercase tracking-[0.2em] block mb-1">Rationale</span>
                          <p className="text-[10px] text-white/60 leading-relaxed font-light">{prop.lore_entry}</p>
                        </div>

                        {prop.state !== 'PENDING_EVALUATION' && (
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em] block mb-1 flex items-center gap-1.5">
                              <Zap className="w-2.5 h-2.5" /> Consensus Output
                            </span>
                            <div className="text-[10px] text-white/80 leading-relaxed font-light">
                              {prop.narrative}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
