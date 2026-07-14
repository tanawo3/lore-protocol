# Lore Protocol

Lore Protocol is a decentralized lending protocol designed to evaluate loan proposals on the GenLayer Network securely. It utilizes GenLayer Smart Contracts (Python) to read text-based proposals and perform validator consensus (powered by AI oracles) to evaluate the safety and legitimacy of loan requests.

## Features

- **Global Centralized Ledger**: Connects automatically to the permanent GenLayer smart contract without requiring deployment by individual users.
- **Consensus-Driven Evaluation**: Uses GenLayer validators to form consensus on the safety of text-based loan proposals in real-time.
- **High-End UI/UX**: Built with React, Tailwind CSS, and Framer Motion, featuring an Awwwards-tier minimal, cinematic, dark-themed design.
- **Web3 Wallet Support**: Directly interacts with the GenLayer network using `genlayer-js`.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Blockchain SDK**: `genlayer-js`
- **Smart Contracts**: GenLayer Python VM

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the DApp**:
   ```bash
   npm run dev
   ```

3. **Interact**: 
   - Connect your Web3 wallet (MetaMask, OKX, Rabby).
   - The DApp will automatically hook into the **Global Lore Protocol Ledger**.
   - **Request**: Submit a new loan request with a detailed rationale.
   - **Evaluate**: Trigger the GenLayer Validator Network to run an AI consensus and evaluate the proposal.

*Built for GenLayer.*
