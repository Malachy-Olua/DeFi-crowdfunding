import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Campaigns from "./Pages/Campaigns";
import MyCampaings from "./Pages/MyCampaings";
import Donations from "./Pages/Donations";
import CreateCampaign from "./Pages/CreateCampaign";
import Layout from "../src/Pages/Layout";
import './App.css';

import styled from "styled-components";

import '@rainbow-me/rainbowkit/styles.css';
import {connectorsForWallets , RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet,
  trustWallet, 
  mewWallet,   
  omniWallet, 
  imTokenWallet, 
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, polygon } from 'wagmi/chains';


export default function App() {

  const { chains, provider } = configureChains(
    [mainnet, polygon],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      
    ]
  );
  
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        rainbowWallet({ chains }),
        walletConnectWallet({ chains }),
        coinbaseWallet({ chains }),
        metaMaskWallet({ chains }),
        trustWallet({ chains }), 
      ],
    },
    {
      groupName: 'other',
      wallets: [
        braveWallet({ chains }),
        mewWallet({ chains }),
        omniWallet({ chains }),
        imTokenWallet({ chains }),
      ],
    },
  ]);
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });
  
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />}/>
              <Route path="/" element={<Layout/>}>
                <Route path="/Campaigns" element={<Campaigns />} />
                <Route path="/MyCampaings" element={<MyCampaings />} />
                <Route path="/Donations" element={<Donations />} />
                <Route path="/CreateCampaign" element={<CreateCampaign />} />
              </Route> 
            </Route>
          </Routes> 
        </BrowserRouter> 
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

const Div = styled.div`


`