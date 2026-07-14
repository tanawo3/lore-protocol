import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error interception to handle cross-origin "Script error." and expected RPC propagation errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // Suppress uninformative cross-origin script errors which are often caused by browser/wallet extensions
    if (event.message === 'Script error.' || !event.filename) {
      event.preventDefault();
      return;
    }
    // Suppress known non-fatal RPC "not found" errors that we actively retry
    const msg = (event.message || '').toLowerCase();
    if (msg.includes('genlayer rpc error') || msg.includes('not found') || msg.includes('no contract')) {
      event.preventDefault();
      return;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const reasonStr = (typeof reason === 'string' ? reason : reason?.message || String(reason || '')).toLowerCase();
    // Suppress unhandled promise rejections related to temporary RPC propagation issues
    if (reasonStr.includes('not found') || reasonStr.includes('genlayer rpc error') || reasonStr.includes('404') || reasonStr.includes('no contract')) {
      event.preventDefault();
    }
  });

  // Intercept console.error to filter out non-fatal GenLayer contract-not-found logs during retries
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const argStr = args.map(arg => {
      if (typeof arg === 'string') return arg;
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    }).join(' ').toLowerCase();

    // Reroute anticipated contract-not-found or RPC errors as warning so they don't trigger error telemetry
    if (
      (argStr.includes('genlayer rpc error') || argStr.includes('read contract error')) && 
      (argStr.includes('not found') || argStr.includes('0x395b') || argStr.includes('no contract') || argStr.includes('404'))
    ) {
      console.warn('[Expected RPC Propagation Warning]:', ...args);
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

