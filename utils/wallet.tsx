import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useConnectionConfig } from './connection';
import { Button, Modal } from 'antd';

import Wallet from '@project-serum/sol-wallet-adapter';

import {
  WalletAdapter,
  SolongWalletAdapter,
  PhantomWalletAdapter,
  SolletExtensionAdapter,
  MathWalletAdapter,
  SolflareExtensionWalletAdapter,
} from '../wallet-adapters';

const ASSET_URL = 'https://cdn.jsdelivr.net/gh/solana-labs/oyster@main/assets/wallets';

export const WALLET_PROVIDERS = [
  {
    name: 'sollet.io',
    url: 'https://www.sollet.io',
    icon: `${ASSET_URL}/sollet.svg`,
  },
  {
    name: 'Sollet Extension',
    url: 'https://www.sollet.io/extension',
    icon: `${ASSET_URL}/sollet.svg`,
    adapter: SolletExtensionAdapter as any,
  },
  {
    name: 'Solong',
    url: 'https://www.solong.com',
    icon: `${ASSET_URL}/solong.png`,
    adapter: SolongWalletAdapter,
  },
 {
    name: 'Solflare',
    url: 'https://solflare.com/access-wallet',
    icon: `${ASSET_URL}/solflare.svg`,
  },
  {
    name: 'Solflare Extension',
    url: 'https://solflare.com',
    icon: `${ASSET_URL}/solflare.svg`,
    adapter: SolflareExtensionWalletAdapter,
  },
  {
    name: 'Phantom',
    url: 'https://www.phantom.app',
    icon: `https://www.phantom.app/img/logo.png`,
    adapter: PhantomWalletAdapter,
  },
  {
    name: 'MathWallet',
    url: 'https://www.mathwallet.org',
    icon: `${ASSET_URL}/mathwallet.svg`,
    adapter: MathWalletAdapter,
  },
];

const WalletContext = React.createContext<null | WalletContextValues>(null);

interface WalledProviderProps {
  children: React.ReactNode;
}

export function WalletProvider({ children }: WalledProviderProps) {
  const { endpoint } = useConnectionConfig();

  const [autoConnect, setAutoConnect] = useState(false);
  const [providerUrl, setProviderUrl] = useState(WALLET_PROVIDERS[0].url);

  const provider = useMemo(() => WALLET_PROVIDERS.find(({ url }) => url === providerUrl), [providerUrl]);

  const [wallet, setWallet] = useState<WalletAdapter | undefined>(undefined);

  useEffect(() => {
    if (provider) {
      const updateWallet = () => {
        // hack to also update wallet synchronously in case it disconnects
        // eslint-disable-next-line 
        const newWallet = new (provider.adapter || Wallet)(providerUrl, endpoint) as WalletAdapter;
        setWallet(newWallet);
      };

      if (document.readyState !== 'complete') {
        // wait to ensure that browser extensions are loaded
        const listener = () => {
          updateWallet();
          window.removeEventListener('load', listener);
        };
        window.addEventListener('load', listener);
        return () => window.removeEventListener('load', listener);
      } else {
        updateWallet();
      }
	  
    }
  }, [provider, providerUrl, endpoint]);
  
  useEffect(() => {
		setAutoConnect(true);
   }, [ providerUrl ]);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        if (wallet?.publicKey) {
          localStorage.removeItem('feeDiscountKey');
          setConnected(true);
          const walletPublicKey = wallet.publicKey.toBase58();
          const keyToDisplay =
            walletPublicKey.length > 20
              ? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
                walletPublicKey.length - 7,
                walletPublicKey.length,
              )}`
              : walletPublicKey;
        }
      });

      wallet.on('disconnect', () => {
        setConnected(false);
        localStorage.removeItem('feeDiscountKey');
      });
    }

    return () => {
      setConnected(false);
      if (wallet && wallet.connected) {
        wallet.disconnect();
        setConnected(false);
      }
    };
  }, [wallet]);

  useEffect(() => {
    if (wallet && autoConnect) {
      wallet.connect();
      setAutoConnect(false);
    }

    return () => { };
  }, [wallet, autoConnect]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const select = useCallback(() => setIsModalVisible(true), []);
  const close = useCallback(() => setIsModalVisible(false), []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        select,
        providerUrl,
        setProviderUrl,
        providerName: WALLET_PROVIDERS.find(({ url }) => url === providerUrl)?.name ?? providerUrl,
      }}
    >
      {children}
      <Modal
        title="Select Wallet"
        okText="Connect"
        visible={isModalVisible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={close}
        width={400}
      >
        {WALLET_PROVIDERS.map((provider) => {
          const onClick = function () {
            setProviderUrl(provider.url);
            //setAutoConnect(true);
            close();
          };

          return (
            <Button
              key={provider.url}
              size="large"
              type={providerUrl === provider.url ? 'primary' : 'ghost'}
              onClick={onClick}
              icon={
                <img alt={`${provider.name}`} width={20} height={20} src={provider.icon} style={{ marginRight: 8 }} />
              }
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                marginBottom: 8,
              }}
            >
              {provider.name}
            </Button>
          );
        })}
      </Modal>
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('Missing wallet context');
  }

  const wallet = context.wallet;
  return {
    connected: context.connected,
    wallet: wallet,
    providerUrl: context.providerUrl,
    setProvider: context.setProviderUrl,
    providerName: context.providerName,
    select: context.select,
    connect() {
      wallet ? wallet.connect() : context.select();
    },
    disconnect() {
      wallet?.disconnect();
    },
  };
}
